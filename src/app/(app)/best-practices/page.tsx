import Link from "next/link";
import { MOMENT_COLOR, Rich, WherePill } from "@/components/BlueprintBits";
import { BEST_PRACTICE, LAYER_LABEL, MOMENTS } from "@/lib/blueprint";

export const metadata = { title: "Best practices · Lab for Us" };

export default function BestPracticesPage() {
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">The space</span>
        <h1>Best practices</h1>
        <p>
          How a visit should run once everything is in place, one moment at a
          time and read down through the layers. This is the version to hand
          someone new. Where a step is not possible yet, the line underneath
          says what it is waiting on.
        </p>
        <p className="note">
          Drawn from the same data as the{" "}
          <Link href="/blueprint">Service blueprint</Link>, so the two always
          agree.
        </p>
      </div>

      <div className="bp-practices">
        {BEST_PRACTICE.map((bp) => {
          const mi = MOMENTS.findIndex((m) => m.id === bp.moment);
          return (
            <section className="assetbox bp-practice" key={bp.moment}>
              <div className="bp-practice-head">
                <span className="bp-practice-bar" style={{ background: MOMENT_COLOR[mi] }} />
                <div>
                  <span className="bp-practice-num">{String(mi + 1).padStart(2, "0")}</span>
                  <h2 className="bp-practice-title">{MOMENTS[mi].label}</h2>
                </div>
              </div>

              <dl className="bp-bands">
                {bp.bands.map((b) => (
                  <div className="bp-band" key={b.layer}>
                    <dt>{LAYER_LABEL[b.layer]}</dt>
                    <dd>
                      <WherePill where={b.where} />
                      <Rich text={b.text} />
                    </dd>
                  </div>
                ))}
              </dl>

              <div className={`bp-gate ${bp.gate.kind}`}>
                <b>{bp.gate.label}:</b> <Rich text={bp.gate.text} />
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
