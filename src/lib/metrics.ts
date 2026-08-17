import "server-only";

import { getAdminClient } from "./supabase/server";
import { getProvider } from "./providers";
import type { Post } from "./types";

/**
 * Walks every published post and appends a fresh `post_metrics` row.
 *
 * It's a time series on purpose — one row per capture — so the Analytics tab
 * can chart how a post accrued reach rather than only showing today's number.
 */
export async function runMetricsJob(): Promise<{
  checked: number;
  captured: number;
  skipped: number;
  errors: string[];
}> {
  const admin = getAdminClient();
  if (!admin) return { checked: 0, captured: 0, skipped: 0, errors: [] };

  const { data: posts } = await admin
    .from("posts")
    .select("*")
    .eq("publish_status", "published")
    .not("platform_post_id", "is", null)
    .order("published_at", { ascending: false })
    .limit(200)
    .returns<Post[]>();

  const { data: accounts } = await admin
    .from("social_accounts")
    .select("platform, access_token, external_account_id, created_at")
    .order("created_at", { ascending: false });

  const errors: string[] = [];
  let captured = 0;
  let skipped = 0;

  for (const post of posts ?? []) {
    const account = accounts?.find((a) => a.platform === post.channel);
    const provider = getProvider(post.channel, {
      connected: Boolean(account),
    });

    if (!provider.canPublish || !account) {
      skipped++;
      continue;
    }

    const result = await provider.getMetrics({
      platformPostId: post.platform_post_id!,
      accessToken: account.access_token,
      externalAccountId: account.external_account_id,
    });

    if (!result.ok) {
      errors.push(`${post.title}: ${result.error}`);
      continue;
    }

    const { error } = await admin.from("post_metrics").insert({
      post_id: post.id,
      impressions: result.impressions,
      reach: result.reach,
      likes: result.likes,
      comments: result.comments,
      saves: result.saves,
      shares: result.shares,
      clicks: result.clicks,
      raw: result.raw as never,
    });

    if (error) errors.push(`${post.title}: ${error.message}`);
    else captured++;
  }

  return { checked: posts?.length ?? 0, captured, skipped, errors };
}
