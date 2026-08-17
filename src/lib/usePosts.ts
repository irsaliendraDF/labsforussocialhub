"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { getBrowserClient } from "./supabase/client";
import type { Post } from "./types";

const COLUMNS =
  "id, title, channel, pillar, format, template, cta, owner, status, post_date, canva_link, caption, scheduled_at, publish_status, platform_post_id, published_at, published_url, publish_error, notes, created_at, updated_at";

/**
 * Shape for a post created locally before Supabase is connected, so the
 * composer still works when previewing. The board starts empty either way.
 */
function blankPost(patch: Partial<Post>): Post {
  const now = new Date().toISOString();
  return {
    id: `preview-${now}-${Math.random().toString(36).slice(2, 8)}`,
    title: "Untitled post",
    channel: "Instagram",
    pillar: "For Us",
    format: null,
    template: null,
    cta: null,
    owner: null,
    status: "Idea",
    post_date: now.slice(0, 10),
    canva_link: null,
    caption: null,
    scheduled_at: null,
    publish_status: "draft",
    platform_post_id: null,
    published_at: null,
    published_url: null,
    publish_error: null,
    notes: null,
    created_at: now,
    updated_at: now,
    ...patch,
  } as Post;
}

export type PostsApi = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  /** True when running on seed data because Supabase isn't configured. */
  preview: boolean;
  add: (p: Partial<Post>) => Promise<void>;
  update: (id: string, patch: Partial<Post>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
};

export function usePosts(): PostsApi {
  const supabase = getBrowserClient();
  const preview = !supabase;

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(!preview);
  const [error, setError] = useState<string | null>(null);

  // Snapshot of the last committed list, used to roll back a failed write.
  // Kept in a ref so the realtime subscription never needs to re-bind.
  const postsRef = useRef(posts);
  useEffect(() => {
    postsRef.current = posts;
  }, [posts]);

  const refresh = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("posts")
      .select(COLUMNS)
      .order("post_date");
    if (error) setError(error.message);
    else {
      setError(null);
      setPosts((data ?? []) as Post[]);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) return;
    // refresh() awaits the network before it touches state, so this is not a
    // synchronous setState — the lint rule just can't see past the async call.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();

    // Realtime is what makes this a shared board: every laptop sees the same
    // picture without a reload.
    const channel = supabase
      .channel("posts-live")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        (payload: RealtimePostgresChangesPayload<Post>) => {
          setPosts((cur) => {
            if (payload.eventType === "DELETE") {
              return cur.filter((p) => p.id !== (payload.old as Post).id);
            }
            const row = payload.new as Post;
            const idx = cur.findIndex((p) => p.id === row.id);
            if (idx === -1) return [...cur, row];
            const next = [...cur];
            next[idx] = row;
            return next;
          });
        },
      )
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase, refresh]);

  const add = useCallback(
    async (p: Partial<Post>) => {
      if (!supabase) {
        setPosts((cur) => [...cur, blankPost(p)]);
        return;
      }
      const { error } = await supabase.from("posts").insert(p);
      if (error) setError(error.message);
      // The realtime INSERT event adds the row.
    },
    [supabase],
  );

  const update = useCallback(
    async (id: string, patch: Partial<Post>) => {
      const before = postsRef.current;
      // Optimistic: dragging a chip should feel instant.
      setPosts((cur) =>
        cur.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      );
      if (!supabase) return;
      const { error } = await supabase.from("posts").update(patch).eq("id", id);
      if (error) {
        setError(error.message);
        setPosts(before); // roll back
      }
    },
    [supabase],
  );

  const remove = useCallback(
    async (id: string) => {
      const before = postsRef.current;
      setPosts((cur) => cur.filter((p) => p.id !== id));
      if (!supabase) return;
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) {
        setError(error.message);
        setPosts(before);
      }
    },
    [supabase],
  );

  return { posts, loading, error, preview, add, update, remove, refresh };
}
