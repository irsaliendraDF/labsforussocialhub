"use client";

import { useMemo, useState } from "react";
import {
  CHANNELS,
  HOLIDAYS,
  PILLARS,
  STATUSES,
  TEMPLATES,
  pillarColor,
  weekOf,
} from "@/lib/content";
import { DOW, MONTHS, fmtDate, monthRange, todayIso, toIso } from "@/lib/dates";
import { usePosts } from "@/lib/usePosts";
import type { Post } from "@/lib/types";
import PostDrawer from "./PostDrawer";
import { ToastProvider, useToast } from "./Toast";

type View = "calendar" | "list" | "kanban";

function Board() {
  const { posts, loading, error, preview, add, update, remove } = usePosts();
  const toast = useToast();

  const [channel, setChannel] = useState("All");
  const [pillar, setPillar] = useState("All");
  const [view, setView] = useState<View>("calendar");
  const [openId, setOpenId] = useState<string | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  // Composer state
  const [cChannel, setCChannel] = useState<string>("Instagram");
  const [cPillar, setCPillar] = useState<string>(PILLARS[0].name);
  const [cTemplate, setCTemplate] = useState<string>(
    TEMPLATES.find((t) => t.pillar === PILLARS[0].name)!.name,
  );
  const [cDate, setCDate] = useState<string>(todayIso());
  const [cTitle, setCTitle] = useState("");
  const [adding, setAdding] = useState(false);

  const filtered = useMemo(
    () =>
      posts.filter(
        (p) =>
          (channel === "All" || p.channel === channel) &&
          (pillar === "All" || p.pillar === pillar),
      ),
    [posts, channel, pillar],
  );

  const openPost = posts.find((p) => p.id === openId) ?? null;
  const templatesForPillar = TEMPLATES.filter((t) => t.pillar === cPillar);

  async function addPost() {
    if (!cDate) return;
    setAdding(true);
    await add({
      title: cTitle.trim() || cTemplate,
      channel: cChannel as Post["channel"],
      pillar: cPillar,
      template: cTemplate,
      format: cTemplate,
      status: "Idea",
      post_date: cDate,
      publish_status: "draft",
    });
    setCTitle("");
    setAdding(false);
    toast("Post added");
  }

  return (
    <>
      {preview && (
        <div className="setup-banner">
          <strong>Preview mode.</strong> Supabase isn&apos;t connected yet, so
          anything you plan here lives in this browser tab only and won&apos;t
          be shared with the team. Connect it and the board becomes the real
          shared source of truth.
        </div>
      )}
      {error && (
        <div className="msg err" style={{ marginBottom: 18 }}>
          {error}
        </div>
      )}

      {/* ---------- Composer ---------- */}
      <div className="composer">
        <h3 className="composer-title">Plan a post</h3>
        <div className="composer-row">
          <label>
            Channel
            <select
              value={cChannel}
              onChange={(e) => setCChannel(e.target.value)}
            >
              {CHANNELS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>
            Pillar
            <select
              value={cPillar}
              onChange={(e) => {
                setCPillar(e.target.value);
                const first = TEMPLATES.find(
                  (t) => t.pillar === e.target.value,
                );
                if (first) setCTemplate(first.name);
              }}
            >
              {PILLARS.map((p) => (
                <option key={p.name}>{p.name}</option>
              ))}
            </select>
          </label>
          <label>
            Template
            <select
              value={cTemplate}
              onChange={(e) => setCTemplate(e.target.value)}
            >
              {templatesForPillar.map((t) => (
                <option key={t.name}>{t.name}</option>
              ))}
            </select>
          </label>
          <label>
            Date
            <input
              type="date"
              value={cDate}
              onChange={(e) => setCDate(e.target.value)}
            />
          </label>
          <label className="grow">
            Title
            <input
              type="text"
              value={cTitle}
              placeholder="Working title"
              onChange={(e) => setCTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addPost()}
            />
          </label>
          <button
            className="composer-add"
            type="button"
            onClick={addPost}
            disabled={adding || !cDate}
          >
            {adding ? "Adding…" : "Add to calendar"}
          </button>
        </div>
      </div>

      {/* ---------- Filters ---------- */}
      <div className="filters">
        <div className="frow">
          <span className="lbl">Channel</span>
          <div className="chiprow">
            {["All", ...CHANNELS].map((v) => (
              <button
                key={v}
                type="button"
                className="chipbtn"
                aria-pressed={channel === v}
                onClick={() => setChannel(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
        <div className="frow">
          <span className="lbl">Pillar</span>
          <div className="chiprow">
            {["All", ...PILLARS.map((p) => p.name)].map((v) => (
              <button
                key={v}
                type="button"
                className="chipbtn"
                aria-pressed={pillar === v}
                onClick={() => setPillar(v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="viewtoggle"
        role="group"
        aria-label="Choose calendar view"
      >
        {(["calendar", "list", "kanban"] as View[]).map((v) => (
          <button
            key={v}
            type="button"
            aria-pressed={view === v}
            onClick={() => setView(v)}
          >
            {v[0].toUpperCase() + v.slice(1)}
          </button>
        ))}
      </div>

      <div className="count">
        {loading
          ? "Loading…"
          : `Showing ${filtered.length} of ${posts.length} post${
              posts.length === 1 ? "" : "s"
            }`}
      </div>

      {!loading && posts.length === 0 ? (
        <div className="empty">
          Nothing planned yet. Use <strong>Plan a post</strong> above to put the
          first one on the board.
        </div>
      ) : !loading && filtered.length === 0 ? (
        <div className="empty">
          No posts match these filters. Clear one to see more.
        </div>
      ) : view === "calendar" ? (
        <CalendarView
          list={filtered}
          dragId={dragId}
          setDragId={setDragId}
          onOpen={setOpenId}
          onMove={(id, iso) => update(id, { post_date: iso })}
        />
      ) : view === "list" ? (
        <ListView list={filtered} onOpen={setOpenId} />
      ) : (
        <KanbanView
          list={filtered}
          dragId={dragId}
          setDragId={setDragId}
          onOpen={setOpenId}
          onMove={(id, status) =>
            update(id, { status: status as Post["status"] })
          }
        />
      )}

      {openPost && (
        <PostDrawer
          key={openPost.id}
          post={openPost}
          onClose={() => setOpenId(null)}
          onSave={async (patch) => {
            await update(openPost.id, patch);
            toast("Saved");
          }}
          onDelete={async () => {
            await remove(openPost.id);
            toast("Deleted");
          }}
        />
      )}
    </>
  );
}

/* ------------------------------------------------------------------ */

function CalendarView({
  list,
  dragId,
  setDragId,
  onOpen,
  onMove,
}: {
  list: Post[];
  dragId: string | null;
  setDragId: (id: string | null) => void;
  onOpen: (id: string) => void;
  onMove: (id: string, iso: string) => void;
}) {
  const [over, setOver] = useState<string | null>(null);
  // Always include the current month so a fresh board still shows a grid to
  // drop the first post onto, rather than collapsing to nothing.
  const months = monthRange([...list.map((p) => p.post_date), todayIso()]);

  return (
    <>
      <div className="calview">
        {months.map(([y, m]) => {
          const first = new Date(y, m, 1).getDay();
          const days = new Date(y, m + 1, 0).getDate();
          return (
            <div className="month" key={`${y}-${m}`}>
              <h3>
                {MONTHS[m]} {y}
              </h3>
              <div className="cal-scroll">
                <div className="cal-grid">
                  {DOW.map((d) => (
                    <div className="cal-dow" key={d}>
                      {d}
                    </div>
                  ))}
                  {Array.from({ length: first }, (_, i) => (
                    <div className="cal-cell cal-empty" key={`pad-${i}`} />
                  ))}
                  {Array.from({ length: days }, (_, i) => {
                    const d = i + 1;
                    const iso = toIso(y, m, d);
                    const hol = HOLIDAYS[iso];
                    const dayPosts = list.filter((p) => p.post_date === iso);
                    return (
                      <div
                        key={iso}
                        className={`cal-cell${over === iso ? " dragover" : ""}`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setOver(iso);
                        }}
                        onDragLeave={() =>
                          setOver((o) => (o === iso ? null : o))
                        }
                        onDrop={(e) => {
                          e.preventDefault();
                          setOver(null);
                          const id =
                            e.dataTransfer.getData("text/plain") || dragId;
                          if (id) onMove(id, iso);
                          setDragId(null);
                        }}
                      >
                        <span className="cal-daynum">{d}</span>
                        {hol && (
                          <div
                            className={`hol ${hol.t}`}
                            title={`${
                              hol.t === "off"
                                ? "Holiday or day off: "
                                : "Awareness or celebration: "
                            }${hol.n}`}
                          >
                            {hol.n}
                          </div>
                        )}
                        {dayPosts.map((p) => (
                          <button
                            key={p.id}
                            className={`cal-chip${
                              dragId === p.id ? " dragging" : ""
                            }`}
                            style={{ borderLeftColor: pillarColor(p.pillar) }}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData("text/plain", p.id);
                              setDragId(p.id);
                            }}
                            onDragEnd={() => setDragId(null)}
                            onClick={() => onOpen(p.id)}
                            title={`${p.title} — ${p.channel}, ${p.pillar}, ${p.status}. Click to edit, drag to another day to reschedule.`}
                          >
                            {p.channel === "Instagram" ? "IG " : "LI "}
                            {p.title}
                          </button>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="cal-legend">
        <span>
          <i className="l-off" />
          Public holiday or day off
        </span>
        <span>
          <i className="l-aw" />
          Awareness or celebration day to post for
        </span>
      </div>
      <p className="note">
        Click a post to open it. Drag it to another day to reschedule — everyone
        else sees the move straight away.
      </p>
    </>
  );
}

/* ------------------------------------------------------------------ */

function ListView({
  list,
  onOpen,
}: {
  list: Post[];
  onOpen: (id: string) => void;
}) {
  const sorted = [...list].sort((a, b) =>
    a.post_date.localeCompare(b.post_date),
  );
  return (
    <div className="cal">
      {sorted.map((p) => {
        const col = pillarColor(p.pillar);
        return (
          <button
            key={p.id}
            className="post"
            style={{ borderTopColor: col }}
            onClick={() => onOpen(p.id)}
          >
            <div className="top">
              <span className="date">{fmtDate(p.post_date)}</span>
              <span className="wk">{weekOf(p.post_date)}</span>
              <span className={`ch ${p.channel === "Instagram" ? "ig" : "li"}`}>
                {p.channel}
              </span>
            </div>
            <div className="bd">
              <h3>{p.title}</h3>
              <div className="meta">
                {p.format && <span className="m">{p.format}</span>}
                {p.cta && <span className="m">▶ {p.cta}</span>}
                {p.owner && <span className="m">{p.owner}</span>}
                {p.canva_link && <span className="m">Design ready</span>}
              </div>
              <div className="foot">
                <span className="pil" style={{ color: col }}>
                  ● {p.pillar}
                </span>
                <span className="stt">{p.status}</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function KanbanView({
  list,
  dragId,
  setDragId,
  onOpen,
  onMove,
}: {
  list: Post[];
  dragId: string | null;
  setDragId: (id: string | null) => void;
  onOpen: (id: string) => void;
  onMove: (id: string, status: string) => void;
}) {
  const [over, setOver] = useState<string | null>(null);
  return (
    <>
      <div className="kanban">
        {STATUSES.map((st) => {
          const cards = list
            .filter((p) => p.status === st)
            .sort((a, b) => a.post_date.localeCompare(b.post_date));
          return (
            <div
              key={st}
              className={`kcol${over === st ? " dragover" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setOver(st);
              }}
              onDragLeave={() => setOver((o) => (o === st ? null : o))}
              onDrop={(e) => {
                e.preventDefault();
                setOver(null);
                const id = e.dataTransfer.getData("text/plain") || dragId;
                if (id) onMove(id, st);
                setDragId(null);
              }}
            >
              <h4>
                {st}
                <span className="kcount">{cards.length}</span>
              </h4>
              {cards.map((p) => {
                const col = pillarColor(p.pillar);
                return (
                  <button
                    key={p.id}
                    className={`kcard${dragId === p.id ? " dragging" : ""}`}
                    style={{ borderLeftColor: col }}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData("text/plain", p.id);
                      setDragId(p.id);
                    }}
                    onDragEnd={() => setDragId(null)}
                    onClick={() => onOpen(p.id)}
                  >
                    <h5>{p.title}</h5>
                    <div className="kmeta">
                      <span>{fmtDate(p.post_date)}</span>
                      <span>{p.channel}</span>
                      <span style={{ color: col }}>{p.pillar}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
      <p className="note">
        Drag cards between stages as work moves. Click one to open it and add
        the Canva link or the caption.
      </p>
    </>
  );
}

export default function CalendarBoard() {
  return (
    <ToastProvider>
      <Board />
    </ToastProvider>
  );
}
