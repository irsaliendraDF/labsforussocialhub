"use client";

import { useMemo, useState } from "react";
import { ENGAGEMENT_KINDS, type EngagementEntry } from "@/lib/types";
import { CHANNELS, pillarColor } from "@/lib/content";
import { fmtDateTime, fmtLongDate } from "@/lib/dates";
import { useEngagement } from "@/lib/useEngagement";
import { usePosts } from "@/lib/usePosts";
import { ToastProvider, useToast } from "./Toast";

function Board() {
  const { entries, loading, preview, add, update, remove } = useEngagement();
  const { posts } = usePosts();
  const toast = useToast();

  const [platform, setPlatform] = useState<string>("Instagram");
  const [kind, setKind] = useState<string>("Comment");
  const [who, setWho] = useState("");
  const [summary, setSummary] = useState("");
  const [link, setLink] = useState("");
  const [busy, setBusy] = useState(false);

  // Pinned once at mount rather than read during render, so the list stays
  // stable across re-renders instead of shifting under the user.
  const [cutoff] = useState(() => Date.now() - 14 * 24 * 60 * 60 * 1000);

  /** Posts published in the last 14 days are the ones still worth watching. */
  const live = useMemo(() => {
    return posts.filter(
      (p) =>
        p.publish_status === "published" &&
        p.published_at &&
        new Date(p.published_at).getTime() >= cutoff,
    );
  }, [posts, cutoff]);

  const open = entries.filter((e) => e.status === "Needs reply");
  const done = entries.filter((e) => e.status !== "Needs reply").slice(0, 15);

  async function logIt() {
    if (!summary.trim()) return;
    setBusy(true);
    await add({
      platform: platform as EngagementEntry["platform"],
      kind: kind as EngagementEntry["kind"],
      who: who.trim() || null,
      summary: summary.trim(),
      link: link.trim() || null,
      status: "Needs reply",
    });
    setWho("");
    setSummary("");
    setLink("");
    setBusy(false);
    toast("Logged");
  }

  return (
    <>
      {preview && (
        <div className="setup-banner">
          <strong>Preview mode.</strong> Connect Supabase and the engagement log
          becomes shared across the team.
        </div>
      )}

      <div className="composer">
        <h3 className="composer-title">Log something that needs a reply</h3>
        <div className="composer-row">
          <label>
            Platform
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              {CHANNELS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>
            Type
            <select value={kind} onChange={(e) => setKind(e.target.value)}>
              {ENGAGEMENT_KINDS.map((k) => (
                <option key={k}>{k}</option>
              ))}
            </select>
          </label>
          <label>
            Who
            <input
              type="text"
              placeholder="@handle"
              value={who}
              onChange={(e) => setWho(e.target.value)}
            />
          </label>
          <label className="grow">
            What they said
            <input
              type="text"
              placeholder="Asked whether the space is open on Sundays"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && logIt()}
            />
          </label>
          <label>
            Link
            <input
              type="url"
              placeholder="Optional"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </label>
          <button
            className="composer-add"
            type="button"
            onClick={logIt}
            disabled={busy || !summary.trim()}
          >
            {busy ? "Saving…" : "Log it"}
          </button>
        </div>
      </div>

      <div className="eng-cols">
        <section>
          <h2 className="strat-sub" style={{ marginTop: 0 }}>
            Needs a reply
            {open.length > 0 && (
              <span className="kcount" style={{ marginLeft: 9 }}>
                {open.length}
              </span>
            )}
          </h2>
          <p className="strat-subnote">
            Aim to clear this daily. Reply speed is what makes a community space
            feel like one, and both platforms reward it.
          </p>

          {loading ? (
            <div className="count">Loading…</div>
          ) : open.length === 0 ? (
            <div className="empty">
              Nothing waiting. Log anything that comes in so the next person
              knows it was handled.
            </div>
          ) : (
            open.map((e) => (
              <div className="eng-row" key={e.id}>
                <div className="ex">
                  <h4>{e.summary}</h4>
                  <div className="em">
                    <span>{e.platform}</span>
                    <span>{e.kind}</span>
                    {e.who && <span>{e.who}</span>}
                    <span>{fmtDateTime(e.created_at)}</span>
                  </div>
                </div>
                <div className="eng-actions">
                  {e.link && (
                    <a
                      className="btn sm"
                      href={e.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open
                    </a>
                  )}
                  <button
                    className="btn sm solid"
                    onClick={() => {
                      const by = prompt("Replied. Who handled it?") ?? "";
                      void update(e.id, {
                        status: "Replied",
                        handled_by: by.trim() || null,
                        handled_at: new Date().toISOString(),
                      });
                      toast("Marked replied");
                    }}
                  >
                    Replied
                  </button>
                  <button
                    className="btn sm"
                    onClick={() =>
                      void update(e.id, {
                        status: "No reply needed",
                        handled_at: new Date().toISOString(),
                      })
                    }
                  >
                    No reply
                  </button>
                </div>
              </div>
            ))
          )}
        </section>

        <section>
          <h2 className="strat-sub" style={{ marginTop: 0 }}>
            Live in the last two weeks
          </h2>
          <p className="strat-subnote">
            Posts still collecting comments. Open one and check it before you
            close the laptop.
          </p>

          {live.length === 0 ? (
            <div className="empty">
              Nothing published in the last two weeks.
            </div>
          ) : (
            live.map((p) => (
              <div
                className="eng-row"
                key={p.id}
                style={{ borderLeftColor: pillarColor(p.pillar) }}
              >
                <div className="ex">
                  <h4>{p.title}</h4>
                  <div className="em">
                    <span>{p.channel}</span>
                    <span>{p.pillar}</span>
                    <span>
                      Went out{" "}
                      {fmtLongDate((p.published_at ?? "").slice(0, 10))}
                    </span>
                  </div>
                </div>
                {p.published_url && (
                  <div className="eng-actions">
                    <a
                      className="btn sm"
                      href={p.published_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Check comments
                    </a>
                  </div>
                )}
              </div>
            ))
          )}

          <h2 className="strat-sub">Recently handled</h2>
          {done.length === 0 ? (
            <div className="empty">Nothing logged as handled yet.</div>
          ) : (
            done.map((e) => (
              <div className="eng-row done" key={e.id}>
                <div className="ex">
                  <h4>{e.summary}</h4>
                  <div className="em">
                    <span>{e.platform}</span>
                    <span>{e.status}</span>
                    {e.handled_by && <span>by {e.handled_by}</span>}
                    <span>{fmtDateTime(e.handled_at)}</span>
                  </div>
                </div>
                <div className="eng-actions">
                  <button
                    className="btn sm danger"
                    onClick={() => void remove(e.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </>
  );
}

export default function EngagementBoard() {
  return (
    <ToastProvider>
      <Board />
    </ToastProvider>
  );
}
