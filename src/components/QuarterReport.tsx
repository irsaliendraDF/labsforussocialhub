"use client";

import { useMemo, useState } from "react";
import { pillarColor } from "@/lib/content";
import { fmtDate } from "@/lib/dates";
import type { Row } from "./AnalyticsView";

const num = (n: number | null | undefined) => n ?? 0;
const engagements = (r: Row) =>
  num(r.likes) + num(r.comments) + num(r.saves) + num(r.shares);

function fmtNum(n: number): string {
  return n.toLocaleString();
}

/** Calendar quarters. Funders check in quarterly, not monthly. */
const QUARTERS = [
  { q: 1, label: "Q1 (Jan to Mar)", start: "01-01", end: "03-31" },
  { q: 2, label: "Q2 (Apr to Jun)", start: "04-01", end: "06-30" },
  { q: 3, label: "Q3 (Jul to Sep)", start: "07-01", end: "09-30" },
  { q: 4, label: "Q4 (Oct to Dec)", start: "10-01", end: "12-31" },
];

/** Rolls a dimension up with the three numbers a funder actually reads. */
function rollup(rows: Row[], key: (r: Row) => string | null) {
  const map = new Map<string, { eng: number; reach: number; count: number }>();
  for (const r of rows) {
    const k = key(r);
    if (!k) continue;
    const cur = map.get(k) ?? { eng: 0, reach: 0, count: 0 };
    cur.eng += engagements(r);
    cur.reach += num(r.reach);
    cur.count += 1;
    map.set(k, cur);
  }
  return [...map.entries()]
    .map(([name, v]) => ({ name, ...v }))
    .sort((a, b) => b.eng - a.eng);
}

function currentQuarter(d = new Date()) {
  return Math.floor(d.getMonth() / 3) + 1;
}

export default function QuarterReport({ rows }: { rows: Row[] }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [quarter, setQuarter] = useState(currentQuarter(now));

  const q = QUARTERS.find((x) => x.q === quarter)!;
  const from = `${year}-${q.start}`;
  const to = `${year}-${q.end}`;

  const inQuarter = useMemo(
    () =>
      rows.filter((r) => {
        const d = (r.published_at ?? r.post_date).slice(0, 10);
        return d >= from && d <= to;
      }),
    [rows, from, to],
  );

  const totals = useMemo(() => {
    const reach = inQuarter.reduce((s, r) => s + num(r.reach), 0);
    const impressions = inQuarter.reduce((s, r) => s + num(r.impressions), 0);
    const eng = inQuarter.reduce((s, r) => s + engagements(r), 0);
    const comments = inQuarter.reduce((s, r) => s + num(r.comments), 0);
    return {
      posts: inQuarter.length,
      reach,
      impressions,
      eng,
      comments,
      rate: impressions ? (eng / impressions) * 100 : 0,
    };
  }, [inQuarter]);

  const byPillar = useMemo(
    () => rollup(inQuarter, (r) => r.pillar),
    [inQuarter],
  );
  const byChannel = useMemo(
    () => rollup(inQuarter, (r) => r.channel),
    [inQuarter],
  );
  const top = useMemo(
    () =>
      [...inQuarter]
        .sort((a, b) => engagements(b) - engagements(a))
        .slice(0, 5),
    [inQuarter],
  );

  const years = Array.from({ length: 4 }, (_, i) => now.getFullYear() - i);

  return (
    <>
      <div className="report-head no-print">
        <label className="field">
          Year
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {years.map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </label>
        <label className="field">
          Quarter
          <select
            value={quarter}
            onChange={(e) => setQuarter(Number(e.target.value))}
          >
            {QUARTERS.map((x) => (
              <option key={x.q} value={x.q}>
                {x.label}
              </option>
            ))}
          </select>
        </label>
        <button className="btn" onClick={() => window.print()}>
          Print or save as PDF
        </button>
      </div>

      <div className="report-section">
        <h2 className="strat-sub" style={{ marginTop: 0 }}>
          Lab for Us social media, {q.label} {year}
        </h2>
        <p className="strat-subnote">
          {fmtDate(from)} to {fmtDate(to)}. Figures are the most recent capture
          for each post.
        </p>

        {inQuarter.length === 0 ? (
          <div className="empty">
            Nothing published in this quarter yet. Once posts go out through the
            Scheduler, this fills in on its own.
          </div>
        ) : (
          <>
            <div className="stat-row">
              <div className="stat">
                <div className="lb">Posts published</div>
                <div className="vl">{totals.posts}</div>
              </div>
              <div className="stat">
                <div className="lb">People reached</div>
                <div className="vl">{fmtNum(totals.reach)}</div>
              </div>
              <div className="stat">
                <div className="lb">Times seen</div>
                <div className="vl">{fmtNum(totals.impressions)}</div>
              </div>
              <div className="stat">
                <div className="lb">Engagements</div>
                <div className="vl">{fmtNum(totals.eng)}</div>
                <div className="sb">likes, comments, saves, shares</div>
              </div>
              <div className="stat">
                <div className="lb">Conversations</div>
                <div className="vl">{fmtNum(totals.comments)}</div>
                <div className="sb">comments received</div>
              </div>
            </div>

            <div className="assetbox report-section">
              <h3>What this means</h3>
              <p className="report-quote">
                Lab for Us published {totals.posts} post
                {totals.posts === 1 ? "" : "s"} across Instagram and LinkedIn
                this quarter, reaching {fmtNum(totals.reach)} people and drawing{" "}
                {fmtNum(totals.eng)} interactions, including{" "}
                {fmtNum(totals.comments)} comment
                {totals.comments === 1 ? "" : "s"} from the community. The
                strongest theme was{" "}
                <strong>{byPillar[0]?.name ?? "not yet clear"}</strong>.
              </p>
              <p className="note" style={{ marginTop: 0 }}>
                Copy this paragraph straight into a board or funder update, then
                add the context only a person can give.
              </p>
            </div>

            <h3 className="strat-sub">By content pillar</h3>
            <div className="tablewrap">
              <table className="data">
                <thead>
                  <tr>
                    <th>Pillar</th>
                    <th className="num">Posts</th>
                    <th className="num">Reach</th>
                    <th className="num">Engagements</th>
                  </tr>
                </thead>
                <tbody>
                  {byPillar.map((r) => (
                    <tr key={r.name}>
                      <td style={{ whiteSpace: "nowrap" }}>
                        <span
                          className="dot"
                          style={{
                            background: pillarColor(r.name),
                            display: "inline-block",
                            width: 9,
                            height: 9,
                            borderRadius: "50%",
                            marginRight: 6,
                            boxShadow: "inset 0 0 0 1px rgba(34,31,25,.18)",
                          }}
                        />
                        {r.name}
                      </td>
                      <td className="num">{r.count}</td>
                      <td className="num">{fmtNum(r.reach)}</td>
                      <td className="num">{fmtNum(r.eng)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="strat-sub">By channel</h3>
            <div className="tablewrap">
              <table className="data">
                <thead>
                  <tr>
                    <th>Channel</th>
                    <th className="num">Posts</th>
                    <th className="num">Reach</th>
                    <th className="num">Engagements</th>
                  </tr>
                </thead>
                <tbody>
                  {byChannel.map((r) => (
                    <tr key={r.name}>
                      <td>{r.name}</td>
                      <td className="num">{r.count}</td>
                      <td className="num">{fmtNum(r.reach)}</td>
                      <td className="num">{fmtNum(r.eng)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="strat-sub">Posts that landed best</h3>
            <div className="tablewrap">
              <table className="data">
                <thead>
                  <tr>
                    <th>Published</th>
                    <th>Post</th>
                    <th>Channel</th>
                    <th className="num">Reach</th>
                    <th className="num">Engagements</th>
                  </tr>
                </thead>
                <tbody>
                  {top.map((r) => (
                    <tr key={r.id}>
                      <td style={{ whiteSpace: "nowrap" }}>
                        {fmtDate((r.published_at ?? r.post_date).slice(0, 10))}
                      </td>
                      <td>{r.title}</td>
                      <td>{r.channel}</td>
                      <td className="num">{fmtNum(num(r.reach))}</td>
                      <td className="num">{fmtNum(engagements(r))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
