"use server";

import { revalidatePath } from "next/cache";
import { getServerClient } from "@/lib/supabase/server";
import { publishPost } from "@/lib/publish";

/** Every action re-checks the session: server actions are public endpoints. */
async function requireUser() {
  const supabase = await getServerClient();
  if (!supabase) throw new Error("Supabase isn't connected yet.");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("You need to be signed in.");
  return { supabase, user };
}

export async function schedulePostAction(postId: string, scheduledAt: string) {
  const { supabase } = await requireUser();

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
  const { supabase } = await requireUser();

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
  await requireUser();
  const result = await publishPost(postId);
  revalidatePath("/scheduler");
  return result;
}

/** Marks a post as posted by hand — the fallback path while approvals pend. */
export async function markPostedAction(postId: string, url: string | null) {
  const { supabase } = await requireUser();

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
