import { NextResponse, type NextRequest } from "next/server";
import { getAdminClient } from "@/lib/supabase/server";
import { parseSignedRequest } from "@/lib/metaSignedRequest";

export const dynamic = "force-dynamic";

/**
 * Meta calls this when someone asks for their data to be deleted. The hub
 * keeps one thing about an Instagram account: the stored connection and its
 * token. That is deleted here, and Meta gets back a page it can show the
 * person, with a confirmation code.
 */
export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  const data = parseSignedRequest(
    (form?.get("signed_request") as string | null) ?? null,
    process.env.INSTAGRAM_APP_SECRET,
  );
  if (!data?.user_id) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const admin = getAdminClient();
  if (admin) {
    await admin
      .from("social_accounts")
      .delete()
      .eq("platform", "Instagram")
      .eq("external_account_id", String(data.user_id));
  }

  const code = crypto.randomUUID();
  const origin = new URL(request.url).origin;
  return NextResponse.json({
    url: `${origin}/data-deletion?code=${code}`,
    confirmation_code: code,
  });
}
