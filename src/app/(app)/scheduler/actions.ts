"use server";

import { revalidatePath } from "next/cache";
import { getServerClient } from "@/lib/supabase/server";
import { publishPost } from "@/lib/publish";

/**
 * The hub has no login — it's an internal tool the team opens on their
 * laptops — so these actions run against the anon key and rely on the RLS
 * policies in supabase/schema.sql, which grant the board to `anon`.
 */
async function db() {
  const supabase = await getServerClient();
  if (!supabase) throw new Error("Supabase isn't connected yet.");
  return supabase;
}

export async function schedulePostAction(postId: string, scheduledAt: string) {
  const supabase = await db();

  const when = new Date(scheduledAt);
  if (Number.isNaN(when.getTime())) {
    return { ok: false, message: "That date and time didn't parse." };
  }

  const { error } = await supabase
    .from("posts")
    .update({
      scheduled_at: when.toISOString(),
      publish_status: "scheduled",
      status: "Scheduled",
      publish_error: null,
    })
    .eq("id", postId);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/scheduler");
  return { ok: true, message: "Scheduled." };
}

export async function cancelScheduleAction(postId: string) {
  const supabase = await db();

  const { error } = await supabase
    .from("posts")
    .update({
      scheduled_at: null,
      publish_status: "draft",
      status: "Ready",
      publish_error: null,
    })
    .eq("id", postId);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/scheduler");
  return { ok: true, message: "Taken off the schedule." };
}

export async function publishNowAction(postId: string) {
  const result = await publishPost(postId);
  revalidatePath("/scheduler");
  return result;
}

/** Marks a post as posted by hand — the fallback path while approvals pend. */
export async function markPostedAction(postId: string, url: string | null) {
  const supabase = await db();

  const { error } = await supabase
    .from("posts")
    .update({
      publish_status: "published",
      status: "Posted",
      published_at: new Date().toISOString(),
      published_url: url || null,
      publish_error: null,
    })
    .eq("id", postId);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/scheduler");
  return { ok: true, message: "Marked as posted." };
}
