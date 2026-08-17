import Link from "next/link";
import { PILLARS, TEMPLATES } from "@/lib/content";

export const metadata = { title: "Pillars — Lab for Us" };

export default function PillarsPage() {
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Strategy</span>
        <h1>Content pillars</h1>
        <p>
          Five themes drawn from what Lab for Us is. Every post ladders up to
          one, and the colour follows it everywhere: the calendar chips, the
          kanban cards, the template bands, and the analytics rollups.
        </p>
      </div>

      <div className="pillars">
        {PILLARS.map((p) => (
          <div className="pill" key={p.name}>
            <div className="cap" style={{ background: p.color }} />
            <div className="bd">
              <h3>
                <span className="dot" style={{ background: p.color }} />
                {p.name}
              </h3>
              <p>{p.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="strat-sub">What each pillar has to work with</h2>
      <p className="strat-subnote">
        The templates built for each theme. Open them from{" "}
        <Link href="/templates">Templates</Link>.
      </p>

      <div className="stack">
        {PILLARS.map((p) => {
          const mine = TEMPLATES.filter((t) => t.pillar === p.name);
          return (
            <div className="assetbox" key={p.name}>
              <div className="tpl-group-head" style={{ marginBottom: 10 }}>
                <span className="dot" style={{ background: p.color }} />
                <h3 style={{ marginBottom: 0 }}>{p.name}</h3>
                <span className="cnt">
                  {mine.length} template{mine.length === 1 ? "" : "s"}
                </span>
              </div>
              <p className="strat-lead" style={{ marginBottom: 12 }}>
                {p.description}
              </p>
              <div className="fmts">
                {mine.map((t) => (
                  <span className="fmtchip" key={t.name}>
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
