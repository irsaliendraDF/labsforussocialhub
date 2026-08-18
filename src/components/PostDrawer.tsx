"use client";

import { useEffect, useState } from "react";
import {
  CHANNELS,
  CTAS,
  FORMATS,
  PILLARS,
  STATUSES,
  TEMPLATES,
  canvaUrlForTemplate,
  pillarColor,
} from "@/lib/content";
import { fmtLongDate } from "@/lib/dates";
import { buildTrackedUrl, destinationForCta } from "@/lib/utm";
import { PERMISSION_LABELS, PERMISSION_STATUSES, type Post } from "@/lib/types";

type Props = {
  post: Post;
  onClose: () => void;
  onSave: (patch: Partial<Post>) => Promise<void> | void;
  onDelete: () => Promise<void> | void;
};

export default function PostDrawer({ post, onClose, onSave, onDelete }: Props) {
  // The parent mounts this with key={post.id}, so opening a different post
  // gets a fresh component rather than an effect resetting state. That also
  // means a realtime update landing mid-edit can't overwrite what someone is
  // part-way through typing.
  const [draft, setDraft] = useState<Post>(post);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const set = <K extends keyof Post>(k: K, v: Post[K]) => {
    setDraft((d) => ({ ...d, [k]: v }));
    setSaved(false);
  };

  const templatesForPillar = TEMPLATES.filter((t) => t.pillar === draft.pillar);
  const templateUrl = canvaUrlForTemplate(draft.template);

  // Recomputed live so the team sees the tagged link before it is saved.
  const trackedUrl = buildTrackedUrl({
    linkUrl: draft.link_url,
    cta: draft.cta,
    channel: draft.channel,
    pillar: draft.pillar,
    postDate: draft.post_date,
    title: draft.title,
  });

  const needsAlt = Boolean(draft.canva_link) && !draft.alt_text?.trim();
  const permissionBlocked =
    draft.is_reshare && draft.permission_status !== "granted";

  async function save() {
    setSaving(true);
    await onSave({
      title: draft.title,
      channel: draft.channel,
      pillar: draft.pillar,
      format: draft.format,
      template: draft.template,
      cta: draft.cta,
      owner: draft.owner,
      status: draft.status,
      post_date: draft.post_date,
      canva_link: draft.canva_link,
      caption: draft.caption,
      notes: draft.notes,
      link_url: draft.link_url,
      tracked_url: trackedUrl,
      alt_text: draft.alt_text,
      is_reshare: draft.is_reshare,
      permission_status: draft.permission_status,
      permission_source: draft.permission_source,
      permission_note: draft.permission_note,
      permission_recorded_at:
        draft.permission_status === "granted" ||
        draft.permission_status === "declined"
          ? (draft.permission_recorded_at ?? new Date().toISOString())
          : null,
    });
    setSaving(false);
    setSaved(true);
  }

  return (
    <>
      <div className="drawer-scrim" onClick={onClose} aria-hidden="true" />
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label={`Edit post: ${post.title}`}
      >
        <div className="drawer-head">
          <span
            className="dot"
            style={{
              background: pillarColor(draft.pillar),
              width: 12,
              height: 12,
              borderRadius: "50%",
              display: "inline-block",
              marginTop: 7,
              flex: "none",
            }}
          />
          <h2>{draft.title || "Untitled post"}</h2>
          <button className="drawer-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="drawer-body">
          <div className="field grow">
            Title
            <input
              type="text"
              value={draft.title}
              onChange={(e) => set("title", e.target.value)}
            />
          </div>

          <div className="field-row">
            <label className="field">
              Date
              <input
                type="date"
                value={draft.post_date}
                onChange={(e) => set("post_date", e.target.value)}
              />
            </label>
            <label className="field">
              Status
              <select
                value={draft.status}
                onChange={(e) =>
                  set("status", e.target.value as Post["status"])
                }
              >
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="field-row">
            <label className="field">
              Channel
              <select
                value={draft.channel}
                onChange={(e) =>
                  set("channel", e.target.value as Post["channel"])
                }
              >
                {CHANNELS.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="field">
              Pillar
              <select
                value={draft.pillar}
                onChange={(e) => {
                  const pillar = e.target.value;
                  const first = TEMPLATES.find((t) => t.pillar === pillar);
                  setDraft((d) => ({
                    ...d,
                    pillar,
                    // Keep the template valid for the new pillar.
                    template: first ? first.name : d.template,
                  }));
                  setSaved(false);
                }}
              >
                {PILLARS.map((p) => (
                  <option key={p.name}>{p.name}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="field-row">
            <label className="field">
              Template
              <select
                value={draft.template ?? ""}
                onChange={(e) => set("template", e.target.value)}
              >
                {templatesForPillar.map((t) => (
                  <option key={t.name}>{t.name}</option>
                ))}
              </select>
            </label>
            <label className="field">
              Format
              <select
                value={draft.format ?? ""}
                onChange={(e) => set("format", e.target.value)}
              >
                <option value="">Not set</option>
                {[...new Set([...FORMATS, draft.format].filter(Boolean))].map(
                  (f) => (
                    <option key={f as string}>{f as string}</option>
                  ),
                )}
              </select>
            </label>
          </div>

          <div className="field-row">
            <label className="field">
              Owner
              <input
                type="text"
                value={draft.owner ?? ""}
                placeholder="Who's making it"
                onChange={(e) => set("owner", e.target.value)}
              />
            </label>
            <label className="field">
              Call to action
              <select
                value={draft.cta ?? ""}
                onChange={(e) => set("cta", e.target.value)}
              >
                <option value="">Not set</option>
                {[...new Set([...CTAS, draft.cta].filter(Boolean))].map((c) => (
                  <option key={c as string}>{c as string}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="field grow">
            Canva link
            <input
              type="url"
              placeholder="Paste the finished design's link"
              value={draft.canva_link ?? ""}
              onChange={(e) => set("canva_link", e.target.value)}
            />
          </label>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {templateUrl && (
              <a
                className="btn sm"
                href={templateUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open the {draft.template} template
              </a>
            )}
            {draft.canva_link && (
              <a
                className="btn sm"
                href={draft.canva_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open this design
              </a>
            )}
          </div>

          <label className="field grow">
            Alt text
            <textarea
              style={{ minHeight: 62 }}
              placeholder="Describe the image for someone who can't see it. Say what's happening, not 'image of'."
              value={draft.alt_text ?? ""}
              onChange={(e) => set("alt_text", e.target.value)}
            />
          </label>
          <p className="note" style={{ marginTop: -6 }}>
            {needsAlt ? (
              <strong style={{ color: "var(--rasp)" }}>
                This post has a design but no alt text yet.
              </strong>
            ) : (
              "Access is one of our pillars. Every image gets a description."
            )}
          </p>

          <label className="field grow">
            Where the link goes
            <input
              type="url"
              placeholder={destinationForCta(draft.cta)}
              value={draft.link_url ?? ""}
              onChange={(e) => set("link_url", e.target.value)}
            />
          </label>
          {trackedUrl && (
            <div className="tracked">
              <div className="tracked-lb">Tagged link to use in the post</div>
              <code>{trackedUrl}</code>
              <button
                type="button"
                className="btn sm"
                onClick={() => {
                  navigator.clipboard?.writeText(trackedUrl);
                }}
              >
                Copy link
              </button>
            </div>
          )}

          <label
            className="checkline"
            title="Turn this on when the post reuses someone else's work"
          >
            <input
              type="checkbox"
              checked={draft.is_reshare}
              onChange={(e) => {
                const on = e.target.checked;
                setDraft((d) => ({
                  ...d,
                  is_reshare: on,
                  permission_status: on ? "requested" : "not_needed",
                }));
                setSaved(false);
              }}
            />
            This post reshares someone else&apos;s work
          </label>

          {draft.is_reshare && (
            <div className="permission-box">
              <div className="field-row">
                <label className="field">
                  Permission
                  <select
                    value={draft.permission_status}
                    onChange={(e) =>
                      set(
                        "permission_status",
                        e.target.value as Post["permission_status"],
                      )
                    }
                  >
                    {PERMISSION_STATUSES.filter((p) => p !== "not_needed").map(
                      (p) => (
                        <option key={p} value={p}>
                          {PERMISSION_LABELS[p]}
                        </option>
                      ),
                    )}
                  </select>
                </label>
                <label className="field">
                  Whose work
                  <input
                    type="text"
                    placeholder="@handle or name"
                    value={draft.permission_source ?? ""}
                    onChange={(e) => set("permission_source", e.target.value)}
                  />
                </label>
              </div>
              <label className="field grow" style={{ marginTop: 10 }}>
                How it was asked and answered
                <textarea
                  style={{ minHeight: 56 }}
                  placeholder="DM'd them on the 14th, they said yes and asked to be credited as..."
                  value={draft.permission_note ?? ""}
                  onChange={(e) => set("permission_note", e.target.value)}
                />
              </label>
              {permissionBlocked && (
                <div className="errbox" style={{ marginTop: 10 }}>
                  This can&apos;t be scheduled until permission is granted. We
                  repost work by students and young people, so consent gets
                  recorded, not remembered.
                </div>
              )}
            </div>
          )}

          <label className="field grow">
            Caption
            <textarea
              placeholder="The caption that goes out with it. Remember #MadeAtLabForUs."
              value={draft.caption ?? ""}
              onChange={(e) => set("caption", e.target.value)}
            />
          </label>

          <label className="field grow">
            Notes
            <textarea
              style={{ minHeight: 62 }}
              placeholder="Anything the rest of the team should know"
              value={draft.notes ?? ""}
              onChange={(e) => set("notes", e.target.value)}
            />
          </label>

          <p className="note" style={{ marginTop: 4 }}>
            Planned for {fmtLongDate(draft.post_date)}.
            {draft.published_url && (
              <>
                {" "}
                <a
                  href={draft.published_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View the live post
                </a>
                .
              </>
            )}
          </p>

          <button
            className="btn sm danger"
            style={{ alignSelf: "flex-start" }}
            onClick={async () => {
              if (confirm(`Delete "${draft.title}"? This can't be undone.`)) {
                await onDelete();
                onClose();
              }
            }}
          >
            Delete post
          </button>
        </div>

        <div className="drawer-foot">
          <button className="composer-add" onClick={save} disabled={saving}>
            {saving ? "Saving…" : "Save changes"}
          </button>
          {saved && <span className="saved-hint">Saved</span>}
        </div>
      </aside>
    </>
  );
}
