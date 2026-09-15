import Link from "next/link";
import { MOMENT_COLOR, Rich } from "@/components/BlueprintBits";
import { BEST_PRACTICE, LAYER_LABEL, MOMENTS, type Where } from "@/lib/blueprint";

export const metadata = { title: "Best practices · Lab for Us" };

const DOT: Partial<Record<Where, string>> = {
  in_person: "#2a6a12",
  digital_library: "#2b29e6",
  social_hub: "#0f8f97",
};

export default function BestPracticesPage() {
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">The space</span>
        <h1>Best practices</h1>
        <p>
          How a visit should run once everything is in place, one moment per
          column. Each column is the short version. Open one to read that
          moment in full.
        </p>
        <p className="note">
          Drawn from the same data as the{" "}
          <Link href="/blueprint">Service blueprint</Link>, so the two always
          agree.
        </p>
      </div>

      <div className="bp-cols">
        {BEST_PRACTICE.map((bp) => {
          const mi = MOMENTS.findIndex((m) => m.id === bp.moment);
          return (
            <div className="bp-col" key={bp.moment} style={{ borderTopColor: MOMENT_COLOR[mi] }}>
              <span className="bp-col-num">{String(mi + 1).padStart(2, "0")}</span>
              {/* The title link stretches over the whole column, so the column is one target. */}
              <h2 className="bp-col-title">
                <Link href={`/best-practices/${bp.moment}`}>{MOMENTS[mi].label}</Link>
              </h2>

              <div className={`bp-col-gate ${bp.gate.kind}`}>
                <span className="bp-col-chip">{bp.gate.label}</span>
                <span className="bp-col-gatetext">
                  <Rich text={bp.gate.text} />
                </span>
              </div>

              <dl className="bp-col-bands">
                {bp.bands.map((b) => (
                  <div className="bp-col-band" key={b.layer}>
                    <dt>{LAYER_LABEL[b.layer]}</dt>
                    <dd>
                      {b.where && DOT[b.where] && (
                        <span className="bp-col-dot" style={{ background: DOT[b.where] }} aria-hidden="true" />
                      )}
                      <Rich text={b.text} />
                    </dd>
                  </div>
                ))}
              </dl>

              <span className="bp-col-go" aria-hidden="true">Open full view →</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
