"use client";

import { useMemo, useState, useTransition } from "react";
import { pillarColor } from "@/lib/content";
import { fmtDateTime, fmtLongDate, toDatetimeLocal } from "@/lib/dates";
import { usePosts } from "@/lib/usePosts";
import type { Post, SocialAccount } from "@/lib/types";
import { ToastProvider, useToast } from "./Toast";
import {
  cancelScheduleAction,
  markPostedAction,
  publishNowAction,
  schedulePostAction,
} from "@/app/(app)/scheduler/actions";

type Props = {
  accounts: SocialAccount[];
  igLive: boolean;
  liLive: boolean;
};

function statusBadge(p: Post) {
  switch (p.publish_status) {
    case "published":
      return <span className="badge ok">Published</span>;
    case "scheduled":
      return <span className="badge info">Scheduled</span>;
    case "publishing":
      return <span className="badge warn">Publishing…</span>;
    case "failed":
      return <span className="badge err">Failed</span>;
    default:
      return <span className="badge">Draft</span>;
  }
}

function Board({ accounts, igLive, liLive }: Props) {
  const { posts, loading, preview, refresh } = usePosts();
  const toast = useToast();
  const [pending, startTransition] = useTransition();
  const [schedulingId, setSchedulingId] = useState<string | null>(null);
  const [when, setWhen] = useState<string>("");

  /** Ready to go out but not yet scheduled. */
  const readyToSchedule = useMemo(
    () =>
      posts
        .filter(
          (p) =>
            p.status === "Ready" &&
            (!p.publish_status || p.publish_status === "draft"),
        )
        .sort((a, b) => a.post_date.localeCompare(b.post_date)),
    [posts],
  );

  const upcoming = useMemo(
    () =>
      posts
        .filter((p) => p.publish_status === "scheduled")
        .sort((a, b) =>
          (a.scheduled_at ?? "").localeCompare(b.scheduled_at ?? ""),
        ),
    [posts],
  );

  const failed = useMemo(
    () => posts.filter((p) => p.publish_status === "failed"),
    [posts],
  );

  const published = useMemo(
    () =>
      posts
        .filter((p) => p.publish_status === "published")
        .sort((a, b) =>
          (b.published_at ?? "").localeCompare(a.published_at ?? ""),
        )
        .slice(0, 12),
    [posts],
  );

  function run(fn: () => Promise<{ ok: boolean; message: string }>) {
    startTransition(async () => {
      try {
        const r = await fn();
        toast(r.message);
        await refresh();
      } catch (e) {
        toast(e instanceof Error ? e.message : "Something went wrong.");
      }
    });
  }

  /** Groups a set of posts by calendar day for the queue view. */
  function byDay(list: Post[], key: (p: Post) => string | null) {
    const map = new Map<string, Post[]>();
    for (const p of list) {
      const raw = key(p);
      const day = raw ? raw.slice(0, 10) : p.post_date;
      if (!map.has(day)) map.set(day, []);
      map.get(day)!.push(p);
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }

  return (
    <>
      {preview && (
        <div className="setup-banner">
          <strong>Preview mode.</strong> Connect Supabase to schedule and
          publish for real.
        </div>
      )}

      {/* ---------- Accounts ---------- */}
      <h2 className="strat-sub" style={{ marginTop: 0 }}>
        Connected accounts
      </h2>
      <p className="strat-subnote">
        Direct posting turns on once the account is connected and the platform
        has approved the app. Until then everything still schedules here and
        lands in the queue to post by hand.
      </p>

      <div className="acct-grid">
        {(["Instagram", "LinkedIn"] as const).map((platform) => {
          const acct = accounts.find((a) => a.platform === platform);
          const live = platform === "Instagram" ? igLive : liLive;
          return (
            <div className="acct" key={platform}>
              <div className="hd">
                <h3>{platform}</h3>
                {acct ? (
                  live ? (
                    <span className="badge ok">Posting live</span>
                  ) : (
                    <span className="badge warn">Connected, approval pending</span>
                  )
                ) : (
                  <span className="badge">Not connected</span>
                )}
              </div>
              {acct ? (
                <>
                  <p className="note" style={{ marginTop: 0 }}>
                    {acct.display_name ?? acct.external_account_id}
                    {acct.connected_by && ` · connected by ${acct.connected_by}`}
                  </p>
                  {!live && (
                    <p className="note" style={{ marginTop: 0 }}>
                      {platform === "Instagram"
                        ? "Set INSTAGRAM_PUBLISHING_ENABLED=true once Meta App Review approves content publishing."
                        : "Set LINKEDIN_PUBLISHING_ENABLED=true once the Community Management API is approved."}
                    </p>
                  )}
                </>
              ) : (
                <p className="note" style={{ marginTop: 0 }}>
                  {platform === "Instagram"
                    ? "Needs an Instagram Business or Creator account linked to a Facebook Page, plus a Meta app."
                    : "Needs the Lab for Us LinkedIn Page and a LinkedIn app."}
                </p>
              )}
              <a
                className="btn sm"
                href={`/api/connect/${platform.toLowerCase()}`}
                style={{ alignSelf: "flex-start" }}
              >
                {acct ? "Reconnect" : "Connect"} {platform}
              </a>
            </div>
          );
        })}
      </div>

      {/* ---------- Ready to schedule ---------- */}
      <h2 className="strat-sub">Ready to schedule</h2>
      <p className="strat-subnote">
        Posts you&apos;ve marked <strong>Ready</strong> on the calendar. Pick a
        time and they join the queue.
      </p>

      {loading ? (
        <div className="count">Loading…</div>
      ) : readyToSchedule.length === 0 ? (
        <div className="empty">
          Nothing is Ready yet. Move a post to <strong>Ready</strong> on the
          calendar once its design and caption are done.
        </div>
      ) : (
        readyToSchedule.map((p) => (
          <div
            className="qrow"
            key={p.id}
            style={{ borderLeftColor: pillarColor(p.pillar) }}
          >
            <div className="qt">
              <h4>{p.title}</h4>
              <div className="qm">
                <span>{p.channel}</span>
                <span>{p.pillar}</span>
                <span>Planned {fmtLongDate(p.post_date)}</span>
                {!p.caption && <span>⚠ no caption yet</span>}
              </div>
            </div>
            <div className="qa">
              {schedulingId === p.id ? (
                <>
                  <input
                    type="datetime-local"
                    value={when}
                    onChange={(e) => setWhen(e.target.value)}
                  />
                  <button
                    className="btn sm solid"
                    disabled={pending}
                    onClick={() => {
                      run(() => schedulePostAction(p.id, when));
                      setSchedulingId(null);
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    className="btn sm"
                    onClick={() => setSchedulingId(null)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn sm"
                    onClick={() => {
                      setSchedulingId(p.id);
                      setWhen(toDatetimeLocal(`${p.post_date}T10:00:00`));
                    }}
                  >
                    Schedule
                  </button>
                  <button
                    className="btn sm solid"
                    disabled={pending}
                    onClick={() => run(() => publishNowAction(p.id))}
                  >
                    Publish now
                  </button>
                </>
              )}
            </div>
          </div>
        ))
      )}

      {/* ---------- Upcoming queue ---------- */}
      <h2 className="strat-sub">Upcoming</h2>
      {upcoming.length === 0 ? (
        <div className="empty">Nothing scheduled.</div>
      ) : (
        byDay(upcoming, (p) => p.scheduled_at).map(([day, list]) => (
          <div className="queue-day" key={day}>
            <h3>{fmtLongDate(day)}</h3>
            {list.map((p) => (
              <div
                className="qrow"
                key={p.id}
                style={{ borderLeftColor: pillarColor(p.pillar) }}
              >
                <div className="qt">
                  <h4>{p.title}</h4>
                  <div className="qm">
                    <span>{p.channel}</span>
                    <span>{fmtDateTime(p.scheduled_at)}</span>
                    <span>{p.pillar}</span>
                  </div>
                </div>
                {statusBadge(p)}
                <div className="qa">
                  <button
                    className="btn sm"
                    disabled={pending}
                    onClick={() => run(() => cancelScheduleAction(p.id))}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))
      )}

      {/* ---------- Failed ---------- */}
      {failed.length > 0 && (
        <>
          <h2 className="strat-sub">Needs attention</h2>
          {failed.map((p) => (
            <div
              className="qrow"
              key={p.id}
              style={{
                borderLeftColor: "var(--rasp)",
                flexWrap: "wrap",
              }}
            >
              <div className="qt">
                <h4>{p.title}</h4>
                <div className="qm">
                  <span>{p.channel}</span>
                  <span>Was due {fmtDateTime(p.scheduled_at)}</span>
                </div>
                {p.publish_error && (
                  <div className="errbox">{p.publish_error}</div>
                )}
              </div>
              <div className="qa">
                <button
                  className="btn sm"
                  disabled={pending}
                  onClick={() => run(() => publishNowAction(p.id))}
                >
                  Retry
                </button>
                <button
                  className="btn sm"
                  disabled={pending}
                  onClick={() => {
                    const url = prompt(
                      "Posted it by hand? Paste the live post's URL (or leave blank).",
                    );
                    if (url !== null) {
                      run(() => markPostedAction(p.id, url.trim() || null));
                    }
                  }}
                >
                  Mark posted
                </button>
                <button
                  className="btn sm"
                  disabled={pending}
                  onClick={() => run(() => cancelScheduleAction(p.id))}
                >
                  Unschedule
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* ---------- Published ---------- */}
      <h2 className="strat-sub">Recently published</h2>
      {published.length === 0 ? (
        <div className="empty">Nothing has gone out yet.</div>
      ) : (
        byDay(published, (p) => p.published_at).map(([day, list]) => (
          <div className="queue-day" key={day}>
            <h3>{fmtLongDate(day)}</h3>
            {list.map((p) => (
              <div
                className="qrow"
                key={p.id}
                style={{ borderLeftColor: pillarColor(p.pillar) }}
              >
                <div className="qt">
                  <h4>{p.title}</h4>
                  <div className="qm">
                    <span>{p.channel}</span>
                    <span>{fmtDateTime(p.published_at)}</span>
                  </div>
                </div>
                {statusBadge(p)}
                {p.published_url && (
                  <div className="qa">
                    <a
                      className="btn sm"
                      href={p.published_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </>
  );
}

export default function SchedulerBoard(props: Props) {
  return (
    <ToastProvider>
      <Board {...props} />
    </ToastProvider>
  );
}
