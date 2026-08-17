import { NextResponse, type NextRequest } from "next/server";
import { mintOAuthState } from "@/lib/oauthState";

export const dynamic = "force-dynamic";

/**
 * Kicks off the OAuth handshake for a platform.
 *
 * Both flows are standard authorization-code grants; the only thing gating
 * them is whether the Meta / LinkedIn app credentials are in the environment
 * yet. Until they are, we send the team back with a readable explanation
 * rather than bouncing them to a broken consent screen.
 */
export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ platform: string }> },
) {
  const { platform } = await ctx.params;
  const origin = new URL(request.url).origin;
  const redirectUri = `${origin}/api/connect/${platform}/callback`;

  const missing = (what: string) =>
    NextResponse.redirect(
      new URL(`/scheduler?error=${encodeURIComponent(what)}`, request.url),
    );

  if (platform === "instagram") {
    const appId = process.env.META_APP_ID;
    if (!appId) {
      return missing(
        "Instagram isn't set up yet. Add META_APP_ID and META_APP_SECRET once the Meta app exists.",
      );
    }
    const state = await mintOAuthState();
    const scope = [
      "instagram_basic",
      "instagram_content_publish",
      "instagram_manage_insights",
      "pages_show_list",
      "pages_read_engagement",
    ].join(",");

    const url = new URL("https://www.facebook.com/v21.0/dialog/oauth");
    url.searchParams.set("client_id", appId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("scope", scope);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("state", state);
    return NextResponse.redirect(url.toString());
  }

  if (platform === "linkedin") {
    const clientId = process.env.LINKEDIN_CLIENT_ID;
    if (!clientId) {
      return missing(
        "LinkedIn isn't set up yet. Add LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET once the LinkedIn app exists.",
      );
    }
    const state = await mintOAuthState();
    const scope = [
      "r_organization_social",
      "w_organization_social",
      "rw_organization_admin",
    ].join(" ");

    const url = new URL("https://www.linkedin.com/oauth/v2/authorization");
    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", clientId);
    url.searchParams.set("redirect_uri", redirectUri);
    url.searchParams.set("scope", scope);
    url.searchParams.set("state", state);
    return NextResponse.redirect(url.toString());
  }

  return NextResponse.json({ error: "Unknown platform" }, { status: 404 });
}
