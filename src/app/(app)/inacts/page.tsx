import Link from "next/link";
import { INACTS_PILLARS } from "@/lib/content";
import { LOOP, ON_THE_RECORD } from "@/lib/inacts";

export const metadata = { title: "Overview · InACTS" };

export default function InactsOverviewPage() {
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">The institute</span>
        <h1>InACTS</h1>
        <p>
          InACTS writes the how and the why. Lab for Us holds the room where
          the work gets made, and the Digital Library is where the two meet.
        </p>
      </div>

      <h2 className="subhead">The loop</h2>
      <div className="in-loop">
        {LOOP.map((s) => (
          <div className="in-loop-step" key={s.n}>
            <div className="in-loop-n">{s.n}</div>
            <div className="in-loop-t">{s.title}</div>
            <p className="in-loop-b">{s.body}</p>
          </div>
        ))}
      </div>
      <p className="note in-note">
        The loop is what funders are asked to fund, not either side alone. A
        piece that cannot be placed on it probably belongs on the{" "}
        <Link href="/">Lab for Us</Link> feed. Plan against the pillars on the{" "}
        <Link href="/inacts/calendar">content calendar</Link>.
      </p>

      <h2 className="subhead">What we publish</h2>
      <div className="in-pillars">
        {INACTS_PILLARS.map((p) => (
          <div className="in-pillar" key={p.name}>
            <span className="in-dot" style={{ background: p.color }} />
            <div>
              <div className="in-pillar-name">{p.name}</div>
              <p className="in-pillar-desc">{p.description}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="subhead">On the record</h2>
      <dl className="in-facts">
        {ON_THE_RECORD.map((f) => (
          <div className="in-fact" key={f.label}>
            <dt>{f.label}</dt>
            <dd>{f.body}</dd>
          </div>
        ))}
      </dl>
      <p className="note in-note">
        Already published by NSCAD or McGill, so it can be repeated outside the
        team without asking first.
      </p>
    </>
  );
}
