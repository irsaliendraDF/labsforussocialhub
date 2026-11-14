import "server-only";

import { getAdminClient } from "./supabase/server";

/**
 * Instagram long-lived tokens last about 60 days and only renew if asked
 * before they run out (and are at least a day old). This swaps any Instagram
 * token inside its last 14 days for a fresh one. A token that has already
 * expired cannot be renewed: the account has to be reconnected, and the
 * Scheduler shows that state from token_expires_at.
 *
 * Runs from the publish ping, which fires often, so each account is checked
 * far more times than it needs; the 14 day window keeps the actual renewals
 * to about one per account per two months.
 */
export async function refreshExpiringInstagramTokens(): Promise<{
  checked: number;
  refreshed: number;
  failed: number;
}> {
  const admin = getAdminClient();
  if (!admin) return { checked: 0, refreshed: 0, failed: 0 };

  const now = new Date();
  const windowEnd = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  const { data: accounts } = await admin
    .from("social_accounts")
    .select("id, access_token, token_expires_at")
    .eq("platform", "Instagram")
    .gt("token_expires_at", now.toISOString())
    .lte("token_expires_at", windowEnd.toISOString());

  let refreshed = 0;
  let failed = 0;

  for (const a of accounts ?? []) {
    try {
      const res = await fetch(
        `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(a.access_token)}`,
      );
      const json = await res.json();
      if (!res.ok || !json.access_token) {
        failed += 1;
        continue;
      }
      await admin
        .from("social_accounts")
        .update({
          access_token: json.access_token,
          token_expires_at: json.expires_in
            ? new Date(Date.now() + json.expires_in * 1000).toISOString()
            : null,
        })
        .eq("id", a.id);
      refreshed += 1;
    } catch {
      failed += 1;
    }
  }

  return { checked: accounts?.length ?? 0, refreshed, failed };
}
