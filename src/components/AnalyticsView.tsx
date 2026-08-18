"use client";

import { useMemo, useState } from "react";
import { pillarColor } from "@/lib/content";
import { fmtDate } from "@/lib/dates";

export type Row = {
  id: string;
  title: string;
  channel: string;
  pillar: string;
  format: string | null;
  published_at: string | null;
  post_date: string;
  published_url: string | null;
  tracked_url: string | null;
  link_url: string | null;
  impressions: number | null;
  reach: number | null;
  likes: number | null;
  comments: number | null;
  saves: number | null;
  shares: number | null;
  clicks: number | null;
};

const num = (n: number | null | undefined) => n ?? 0;
const engagements = (r: Row) =>
  num(r.likes) + num(r.comments) + num(r.saves) + num(r.shares);

function fmtNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `${Math.round(n / 1000)}k`;
  if (n >= 1_000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

/**
 * Horizontal magnitude bars.
 *
 * Every row carries its name and value as text: the brand's Gold pillar sits
 * at 1.79:1 against the cream surface, so identity and magnitude can never be
 * carried by the fill alone. The 1px inset ring keeps the lightest fills
 * delineated from the track.
 */
function Bars({
  title,
  rows,
  colorFor,
  unit,
}: {
  title: string;
  rows: { name: string; value: number; sub?: string }[];
  colorFor: (name: string) => string;
  unit: string;
}) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  if (!rows.length) return null;

  return (
    <div className="assetbox" style={{ marginBottom: 20 }}>
      <h3>{title}</h3>
      <div className="bars">
        {rows.map((r) => (
          <div className="bar-row" key={r.name}>
            <span className="nm" title={r.name}>
              <span
                className="dot"
                style={{
                  background: colorFor(r.name),
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  marginRight: 7,
                  boxShadow: "inset 0 0 0 1px rgba(34,31,25,.18)",
                }}
              />
              {r.name}
            </span>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${(r.value / max) * 100}%`,
                  background: colorFor(r.name),
                  boxShadow: "inset 0 0 0 1px rgba(34,31,25,.16)",
                }}
                title={`${r.name}: ${r.value.toLocaleString()} ${unit}`}
              />
            </div>
            <span className="vl">
              {fmtNum(r.value)}
              {r.sub && (
                <span style={{ fontWeight: 500, opacity: 0.75 }}> {r.sub}</span>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Rolls a dimension up by total engagements, carrying the post count. */
function rollup(rows: Row[], key: (r: Row) => string | null) {
  const map = new Map<string, { value: number; count: number }>();
  for (const r of rows) {
    const k = key(r);
    if (!k) continue;
    const cur = map.get(k) ?? { value: 0, count: 0 };
    cur.value += engagements(r);
    cur.count += 1;
    map.set(k, cur);
  }
  return [...map.entries()]
    .map(([name, v]) => ({
      name,
      value: v.value,
      sub: `· ${v.count} post${v.count === 1 ? "" : "s"}`,
    }))
    .sort((a, b) => b.value - a.value);
}

type SortKey =
  | "published_at"
  | "title"
  | "channel"
  | "pillar"
  | "reach"
  | "impressions"
  | "engagements";

/**
 * The link reference.
 *
 * Every tagged link the team has put out, in one place they can come back to.
 * Without this the UTM tags exist only inside whatever post used them, which
 * makes checking a campaign in site analytics a scavenger hunt.
 */
function TrackedLinks({ rows }: { rows: Row[] }) {
  const tagged = rows.filter((r) => r.tracked_url);
  if (!tagged.length) return null;

  return (
    <>
      <h2 className="strat-sub">Tracked links</h2>
      <p className="strat-subnote">
        The tagged link behind each post. Paste any of these into your site
        analytics to see what a single post actually drove.
      </p>
      <div className="tablewrap" style={{ marginBottom: 8 }}>
        <table className="data">
          <thead>
            <tr>
              <th>Post</th>
              <th>Channel</th>
              <th>Campaign</th>
              <th>Tagged link</th>
            </tr>
          </thead>
          <tbody>
            {tagged.map((r) => (
              <tr key={r.id}>
                <td>{r.title}</td>
                <td>{r.channel}</td>
                <td style={{ whiteSpace: "nowrap" }}>{r.pillar}</td>
                <td>
                  <a
                    href={r.tracked_url!}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, monospace",
                      fontSize: 11.5,
                      wordBreak: "break-all",
                    }}
                  >
                    {r.tracked_url}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default function AnalyticsView({ rows }: { rows: Row[] }) {
  const [sort, setSort] = useState<SortKey>("published_at");
  const [asc, setAsc] = useState(false);

  const totals = useMemo(() => {
    const reach = rows.reduce((s, r) => s + num(r.reach), 0);
    const impressions = rows.reduce((s, r) => s + num(r.impressions), 0);
    const eng = rows.reduce((s, r) => s + engagements(r), 0);
    return {
      posts: rows.length,
      reach,
      impressions,
      eng,
      rate: impressions ? (eng / impressions) * 100 : 0,
    };
  }, [rows]);

  const byPillar = useMemo(() => rollup(rows, (r) => r.pillar), [rows]);
  const byFormat = useMemo(() => rollup(rows, (r) => r.format), [rows]);
  const byChannel = useMemo(() => rollup(rows, (r) => r.channel), [rows]);

  const sorted = useMemo(() => {
    const val = (r: Row): string | number => {
      switch (sort) {
        case "engagements":
          return engagements(r);
        case "reach":
          return num(r.reach);
        case "impressions":
          return num(r.impressions);
        case "published_at":
          return r.published_at ?? r.post_date;
        default:
          return String(r[sort] ?? "");
      }
    };
    return [...rows].sort((a, b) => {
      const x = val(a);
      const y = val(b);
      const c =
        typeof x === "number" && typeof y === "number"
          ? x - y
          : String(x).localeCompare(String(y));
      return asc ? c : -c;
    });
  }, [rows, sort, asc]);

  function head(label: string, key: SortKey, numeric = false) {
    return (
      <th className={numeric ? "num" : undefined}>
        <button
          onClick={() => {
            if (sort === key) setAsc(!asc);
            else {
              setSort(key);
              setAsc(false);
            }
          }}
          aria-label={`Sort by ${label}`}
        >
          {label}
          {sort === key ? (asc ? " ▲" : " ▼") : ""}
        </button>
      </th>
    );
  }

  if (!rows.length) {
    return (
      <div className="empty">
        No performance data yet. Once posts publish through the Scheduler, the
        daily metrics job pulls their numbers back and they show up here.
      </div>
    );
  }

  const channelColor = (name: string) =>
    name === "Instagram" ? "#db385a" : "#3d3bf5";

  return (
    <>
      <div className="stat-row">
        <div className="stat">
          <div className="lb">Posts published</div>
          <div className="vl">{totals.posts}</div>
        </div>
        <div className="stat">
          <div className="lb">Total reach</div>
          <div className="vl">{fmtNum(totals.reach)}</div>
          <div className="sb">people reached</div>
        </div>
        <div className="stat">
          <div className="lb">Impressions</div>
          <div className="vl">{fmtNum(totals.impressions)}</div>
          <div className="sb">times seen</div>
        </div>
        <div className="stat">
          <div className="lb">Engagements</div>
          <div className="vl">{fmtNum(totals.eng)}</div>
          <div className="sb">likes, comments, saves, shares</div>
        </div>
        <div className="stat">
          <div className="lb">Engagement rate</div>
          <div className="vl">{totals.rate.toFixed(1)}%</div>
          <div className="sb">of impressions</div>
        </div>
      </div>

      <Bars
        title="Engagements by pillar"
        rows={byPillar}
        colorFor={pillarColor}
        unit="engagements"
      />
      <Bars
        title="Engagements by format"
        rows={byFormat}
        colorFor={() => "#9191ea"}
        unit="engagements"
      />
      <Bars
        title="Engagements by channel"
        rows={byChannel}
        colorFor={channelColor}
        unit="engagements"
      />

      <TrackedLinks rows={rows} />

      <h2 className="strat-sub">Every post</h2>
      <p className="strat-subnote">
        Sorted by whichever column you click. The numbers are the most recent
        capture for each post.
      </p>
      <div className="tablewrap">
        <table className="data">
          <thead>
            <tr>
              {head("Published", "published_at")}
              {head("Post", "title")}
              {head("Channel", "channel")}
              {head("Pillar", "pillar")}
              {head("Reach", "reach", true)}
              {head("Impressions", "impressions", true)}
              {head("Engagements", "engagements", true)}
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.id}>
                <td style={{ whiteSpace: "nowrap" }}>
                  {fmtDate((r.published_at ?? r.post_date).slice(0, 10))}
                </td>
                <td>
                  {r.published_url ? (
                    <a
                      href={r.published_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {r.title}
                    </a>
                  ) : (
                    r.title
                  )}
                </td>
                <td>{r.channel}</td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <span
                    className="dot"
                    style={{
                      background: pillarColor(r.pillar),
                      display: "inline-block",
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      marginRight: 6,
                      boxShadow: "inset 0 0 0 1px rgba(34,31,25,.18)",
                    }}
                  />
                  {r.pillar}
                </td>
                <td className="num">{num(r.reach).toLocaleString()}</td>
                <td className="num">{num(r.impressions).toLocaleString()}</td>
                <td className="num">{engagements(r).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
