import { NextResponse, type NextRequest } from "next/server";
import { getAdminClient } from "@/lib/supabase/server";
import { consumeOAuthState } from "@/lib/oauthState";

export const dynamic = "force-dynamic";

function back(request: NextRequest, message: string, ok = false) {
  const url = new URL("/scheduler", request.url);
  url.searchParams.set(ok ? "connected" : "error", message);
  return NextResponse.redirect(url);
}

/**
 * Exchanges the authorization code for a long-lived token and stores it.
 *
 * Tokens are written with the service-role client and are never selected back
 * into any page, the Scheduler reads only display fields.
 */
export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ platform: string }> },
) {
  const { platform } = await ctx.params;
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (searchParams.get("error")) {
    return back(request, searchParams.get("error_description") ?? "Cancelled.");
  }
  if (!code) return back(request, "No authorization code came back.");
  // Echoed state must match the one we minted, or this isn't our flow.
  if (!(await consumeOAuthState(searchParams.get("state")))) {
    return back(request, "That connect link expired. Hit Connect again.");
  }

  const admin = getAdminClient();
  if (!admin) return back(request, "Server isn't configured to store tokens.");

  const redirectUri = `${origin}/api/connect/${platform}/callback`;

  try {
    if (platform === "instagram") {
      const appId = process.env.META_APP_ID!;
      const appSecret = process.env.META_APP_SECRET!;

      // 1. Short-lived user token
      const tokRes = await fetch(
        `https://graph.facebook.com/v21.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&client_secret=${appSecret}&code=${code}`,
      );
      const tok = await tokRes.json();
      if (!tokRes.ok || !tok.access_token) {
        return back(request, tok?.error?.message ?? "Token exchange failed.");
      }

      // 2. Long-lived token (~60 days)
      const longRes = await fetch(
        `https://graph.facebook.com/v21.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${appId}&client_secret=${appSecret}&fb_exchange_token=${tok.access_token}`,
      );
      const long = await longRes.json();
      const accessToken = long.access_token ?? tok.access_token;
      const expiresIn = long.expires_in ?? tok.expires_in ?? null;

      // 3. Find the Page and its linked Instagram Business account
      const pagesRes = await fetch(
        `https://graph.facebook.com/v21.0/me/accounts?fields=name,access_token,instagram_business_account{id,username}&access_token=${encodeURIComponent(accessToken)}`,
      );
      const pages = await pagesRes.json();
      const page = (pages.data ?? []).find(
        (p: { instagram_business_account?: { id: string } }) =>
          p.instagram_business_account?.id,
      );

      if (!page) {
        return back(
          request,
          "No Instagram Business account is linked to a Page on this login. Link @labforus to the Facebook Page first.",
        );
      }

      await admin.from("social_accounts").insert({
        platform: "Instagram",
        display_name: page.instagram_business_account.username ?? page.name,
        external_account_id: page.instagram_business_account.id,
        // Page token is what publishing actually uses.
        access_token: page.access_token ?? accessToken,
        token_expires_at: expiresIn
          ? new Date(Date.now() + expiresIn * 1000).toISOString()
          : null,
        connected_by: "Lab for Us team",
      });

      return back(request, "Instagram connected.", true);
    }

    if (platform === "linkedin") {
      const clientId = process.env.LINKEDIN_CLIENT_ID!;
      const clientSecret = process.env.LINKEDIN_CLIENT_SECRET!;

      const tokRes = await fetch(
        "https://www.linkedin.com/oauth/v2/accessToken",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret,
          }),
        },
      );
      const tok = await tokRes.json();
      if (!tokRes.ok || !tok.access_token) {
        return back(request, tok?.error_description ?? "Token exchange failed.");
      }

      // Which Page does this person administer?
      const orgRes = await fetch(
        "https://api.linkedin.com/rest/organizationAcls?q=roleAssignee&role=ADMINISTRATOR&state=APPROVED",
        {
          headers: {
            Authorization: `Bearer ${tok.access_token}`,
            "LinkedIn-Version": "202409",
            "X-Restli-Protocol-Version": "2.0.0",
          },
        },
      );
      const orgs = await orgRes.json();
      const urn: string | undefined = orgs?.elements?.[0]?.organization;
      if (!urn) {
        return back(
          request,
          "This LinkedIn account doesn't administer a Page, or the app isn't approved for Community Management yet.",
        );
      }

      await admin.from("social_accounts").insert({
        platform: "LinkedIn",
        display_name: "Lab for Us LinkedIn Page",
        external_account_id: urn.split(":").pop(),
        access_token: tok.access_token,
        refresh_token: tok.refresh_token ?? null,
        token_expires_at: tok.expires_in
          ? new Date(Date.now() + tok.expires_in * 1000).toISOString()
          : null,
        connected_by: "Lab for Us team",
      });

      return back(request, "LinkedIn connected.", true);
    }

    return back(request, "Unknown platform.");
  } catch (e) {
    return back(
      request,
      e instanceof Error ? e.message : "Something went wrong connecting.",
    );
  }
}
