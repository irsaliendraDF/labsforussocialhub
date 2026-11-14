import { NextResponse, type NextRequest } from "next/server";
import { getAdminClient } from "@/lib/supabase/server";
import { parseSignedRequest } from "@/lib/metaSignedRequest";

export const dynamic = "force-dynamic";

/**
 * Meta calls this when someone removes the app from their Instagram account.
 * The stored token is useless from that moment, so the account is removed and
 * the Scheduler shows it as not connected.
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
  return NextResponse.json({ ok: true });
}
