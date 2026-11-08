"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { getBrowserClient } from "./supabase/client";
import { hubFromPath } from "./hubs";
import type { EngagementEntry } from "./types";

const COLUMNS =
  "id, hub, platform, kind, who, summary, link, post_id, status, handled_by, handled_at, created_at";

/**
 * The engagement log.
 *
 * Deliberately manual. Reading comments and DMs through the platform APIs
 * needs the same approvals that publishing does, and replying is the half of
 * community management that can't wait for that. Logging it by hand works from
 * day one and still gives the team a shared picture of what's been answered.
 */
export function useEngagement() {
  const supabase = getBrowserClient();
  // One log per hub, read from the route the same way the board is.
  const hub = hubFromPath(usePathname());
  const [entries, setEntries] = useState<EngagementEntry[]>([]);
  const [loading, setLoading] = useState(Boolean(supabase));
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from("engagement_log")
      .select(COLUMNS)
      .eq("hub", hub)
      .order("created_at", { ascending: false });
    if (error) setError(error.message);
    else {
      setError(null);
      setEntries((data ?? []) as EngagementEntry[]);
    }
    setLoading(false);
  }, [supabase, hub]);

  useEffect(() => {
    if (!supabase) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh();

    const channel = supabase
      .channel(`engagement-live-${hub}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "engagement_log",
          filter: `hub=eq.${hub}`,
        },
        (payload: RealtimePostgresChangesPayload<EngagementEntry>) => {
          setEntries((cur) => {
            if (payload.eventType === "DELETE") {
              return cur.filter(
                (e) => e.id !== (payload.old as EngagementEntry).id,
              );
            }
            const row = payload.new as EngagementEntry;
            const idx = cur.findIndex((e) => e.id === row.id);
            if (idx === -1) return [row, ...cur];
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
  }, [supabase, refresh, hub]);

  const add = useCallback(
    async (entry: Partial<EngagementEntry>) => {
      if (!supabase) return;
      // Stamped on the way in, so an entry logged on the InACTS side cannot
      // land in the Lab for Us log.
      const { error } = await supabase
        .from("engagement_log")
        .insert({ ...entry, hub });
      if (error) setError(error.message);
    },
    [supabase, hub],
  );

  const update = useCallback(
    async (id: string, patch: Partial<EngagementEntry>) => {
      setEntries((cur) =>
        cur.map((e) => (e.id === id ? { ...e, ...patch } : e)),
      );
      if (!supabase) return;
      const { error } = await supabase
        .from("engagement_log")
        .update(patch)
        .eq("id", id);
      if (error) {
        setError(error.message);
        void refresh();
      }
    },
    [supabase, refresh],
  );

  const remove = useCallback(
    async (id: string) => {
      setEntries((cur) => cur.filter((e) => e.id !== id));
      if (!supabase) return;
      const { error } = await supabase
        .from("engagement_log")
        .delete()
        .eq("id", id);
      if (error) {
        setError(error.message);
        void refresh();
      }
    },
    [supabase, refresh],
  );

  return {
    entries,
    loading,
    error,
    preview: !supabase,
    add,
    update,
    remove,
    refresh,
  };
}
