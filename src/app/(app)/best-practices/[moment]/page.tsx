import Link from "next/link";
import { notFound } from "next/navigation";
import { MOMENT_COLOR, Rich, WherePill } from "@/components/BlueprintBits";
import { BEST_PRACTICE, LAYER_LABEL, MOMENTS } from "@/lib/blueprint";

export function generateStaticParams() {
  return MOMENTS.map((m) => ({ moment: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ moment: string }> }) {
  const { moment } = await params;
  const m = MOMENTS.find((x) => x.id === moment);
  return { title: m ? `${m.label} · Best practices · Lab for Us` : "Best practices · Lab for Us" };
}

const WORDS = ["zero", "one", "two", "three", "four", "five", "six"];

export default async function MomentPage({ params }: { params: Promise<{ moment: string }> }) {
  const { moment } = await params;
  const mi = MOMENTS.findIndex((m) => m.id === moment);
  const bp = BEST_PRACTICE.find((b) => b.moment === moment);
  if (mi < 0 || !bp) notFound();

  const prev = MOMENTS[mi - 1];
  const next = MOMENTS[mi + 1];

  return (
    <>
      <Link href="/best-practices" className="bp-back">
        ← All moments
      </Link>

      <div className="page-head">
        <span className="eyebrow">Best practices</span>
        <h1>{MOMENTS[mi].label}</h1>
        <p>
          Moment {WORDS[mi + 1]} of {WORDS[MOMENTS.length]}, read down through the
          layers.
        </p>
      </div>

      <nav className="bp-moment-tabs" aria-label="Moments">
        {MOMENTS.map((m, i) => (
          <Link
            key={m.id}
            href={`/best-practices/${m.id}`}
            className="bp-moment-tab"
            aria-current={m.id === moment ? "page" : undefined}
          >
            <span className="bp-moment-tab-dot" style={{ background: MOMENT_COLOR[i] }} aria-hidden="true" />
            {m.label}
          </Link>
        ))}
      </nav>

      <section className="assetbox bp-practice" style={{ borderTop: `5px solid ${MOMENT_COLOR[mi]}` }}>
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

      <nav className="bp-moment-nav" aria-label="Previous and next moment">
        {prev ? <Link href={`/best-practices/${prev.id}`}>← {prev.label}</Link> : <span />}
        {next ? <Link href={`/best-practices/${next.id}`}>{next.label} →</Link> : <span />}
      </nav>
    </>
  );
}
