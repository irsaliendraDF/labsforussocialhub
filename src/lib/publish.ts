import "server-only";

import { getAdminClient } from "./supabase/server";
import { getProvider } from "./providers";
import type { Post } from "./types";

/**
 * Runs one post through its platform provider and records the outcome.
 *
 * Always uses the service-role client: `social_accounts` holds the tokens and
 * is never readable from the browser.
 */
export async function publishPost(postId: string): Promise<{
  ok: boolean;
  message: string;
}> {
  const admin = getAdminClient();
  if (!admin) {
    return { ok: false, message: "Server isn't configured for publishing." };
  }

  const { data: post, error: postErr } = await admin
    .from("posts")
    .select("*")
    .eq("id", postId)
    .single<Post>();

  if (postErr || !post) {
    return { ok: false, message: "Post not found." };
  }

  if (post.publish_status === "published") {
    return { ok: true, message: "Already published." };
  }

  // Consent gate. The "Made here" pillar reposts community work, often by
  // students, so a reshare without recorded permission never goes out, even if
  // someone scheduled it by mistake.
  if (post.is_reshare && post.permission_status !== "granted") {
    await admin
      .from("posts")
      .update({
        publish_status: "failed",
        publish_error:
          "Held back: this reshares someone else's work and permission isn't recorded as granted.",
      })
      .eq("id", postId);
    return {
      ok: false,
      message:
        "Held back: this reshares someone else's work and permission isn't recorded as granted.",
    };
  }

  // Claim the row so two overlapping cron runs can't double-post.
  const { data: claimed } = await admin
    .from("posts")
    .update({ publish_status: "publishing", publish_error: null })
    .eq("id", postId)
    .in("publish_status", ["scheduled", "draft", "failed"])
    .select("id");

  if (!claimed?.length) {
    return { ok: false, message: "Post is already being published." };
  }

  const { data: account } = await admin
    .from("social_accounts")
    .select("*")
    .eq("platform", post.channel)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const provider = getProvider(post.channel, { connected: Boolean(account) });

  const result = await provider.publish({
    post,
    mediaUrl: post.canva_link,
    caption: post.caption ?? post.title,
    altText: post.alt_text,
    accessToken: account?.access_token ?? "",
    externalAccountId: account?.external_account_id ?? "",
  });

  if (result.ok) {
    await admin
      .from("posts")
      .update({
        publish_status: "published",
        status: "Posted",
        platform_post_id: result.platformPostId,
        published_at: new Date().toISOString(),
        published_url: result.publishedUrl,
        publish_error: null,
      })
      .eq("id", postId);
    return { ok: true, message: "Published." };
  }

  await admin
    .from("posts")
    .update({
      publish_status: "failed",
      publish_error: result.error,
    })
    .eq("id", postId);

  return { ok: false, message: result.error };
}

/** Publishes everything whose scheduled time has arrived. */
export async function runPublishQueue(): Promise<{
  attempted: number;
  published: number;
  failed: number;
  details: { id: string; title: string; ok: boolean; message: string }[];
}> {
  const admin = getAdminClient();
  if (!admin) {
    return { attempted: 0, published: 0, failed: 0, details: [] };
  }

  const { data: due } = await admin
    .from("posts")
    .select("id, title")
    .eq("publish_status", "scheduled")
    .lte("scheduled_at", new Date().toISOString())
    .order("scheduled_at")
    .limit(25);

  const details: { id: string; title: string; ok: boolean; message: string }[] =
    [];

  for (const p of due ?? []) {
    const r = await publishPost(p.id);
    details.push({ id: p.id, title: p.title, ok: r.ok, message: r.message });
  }

  return {
    attempted: details.length,
    published: details.filter((d) => d.ok).length,
    failed: details.filter((d) => !d.ok).length,
    details,
  };
}
