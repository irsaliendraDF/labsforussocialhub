import { Fragment } from "react";
import BlueprintDiagram from "@/components/BlueprintDiagram";
import { LayerGlyph } from "@/components/BlueprintIcons";
import { Rich } from "@/components/BlueprintBits";
import {
  ACCESS_TIERS,
  DECIDED_ON,
  DECISIONS,
  LAYERS,
  LINES,
  MANDATE,
  MOMENTS,
  OUTSTANDING,
  OWNER_NAMES,
  STEPS,
  type LayerId,
  type OutstandingItem,
  type Tone,
} from "@/lib/blueprint";

export const metadata = { title: "Service blueprint · Lab for Us" };

const WORDS = ["no", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const word = (n: number) => WORDS[n] ?? String(n);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const LAYER_COLOR: Record<LayerId, string> = {
  physical: "#2a6a12",
  user: "#a5820c",
  digital: "#2b29e6",
  inperson: "#2a6a12",
  backstage: "#5350c4",
  support: "#6a6155",
};

const WHERE_LABEL: Record<OutstandingItem["where"], string> = {
  in_person: "In person",
  digital_library: "Digital Library",
  social_hub: "Social Hub",
};

const KEY = [
  { color: "#2a6a12", label: "In person, in the space" },
  { color: "#2b29e6", label: "Digital Library" },
  { color: "#0f8f97", label: "Social Hub" },
  { color: "#a5820c", label: "The visitor’s own step" },
  { color: "#c72b4d", label: "New, to scope with Paul" },
];

const BADGE: Record<Tone, string> = {
  done: "badge ok",
  doing: "badge info",
  open: "badge warn",
};

function Star() {
  return (
    <svg className="bp-star" viewBox="-9 -9 18 18" aria-hidden="true">
      <polygon
        points="0,-7 1.7,-2.35 6.66,-2.16 2.76,0.9 4.12,5.66 0,2.9 -4.12,5.66 -2.76,0.9 -6.66,-2.16 -1.7,-2.35"
        fill="currentColor"
      />
    </svg>
  );
}

export default function BlueprintPage() {
  const stars = STEPS.filter((s) => s.star);
  /** The moments the open decisions sit in, so the sentence below cannot go stale. */
  const starMoments = [...new Set(stars.map((s) => s.moment))].map(
    (id) => MOMENTS.find((m) => m.id === id)?.label ?? id,
  );
  const settled = DECISIONS.filter((d) => d.settled).length;

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">The space</span>
        <h1>Service blueprint</h1>
        <p>
          One visit to Lab for Us, all the way down: the Social Hub that brings
          people in, the Digital Library that holds the booking, and the space
          where things change hands. Read a column top to bottom for one moment
          in full, or a row left to right to follow one kind of work all the
          way through.
        </p>
        <p className="note">
          Updated {DECIDED_ON} with the decisions from the review with Shakara
          and April.
        </p>
      </div>

      <section className="bp-section">
        <h2 className="bp-h2">How to read it</h2>
        <div className="bp-layers">
          {LAYERS.map((l) => (
            <div className="bp-layer" style={{ color: LAYER_COLOR[l.id] }} key={l.id}>
              <div className="bp-layer-name">
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <LayerGlyph kind={l.icon} />
                </svg>
                {l.label}
              </div>
              <p>{l.note}</p>
            </div>
          ))}
        </div>

        <div className="bp-key">
          {KEY.map((k) => (
            <span className="bp-key-item" style={{ color: k.color }} key={k.label}>
              <span className="bp-sw" />
              {k.label}
            </span>
          ))}
          <span className="bp-key-item" style={{ color: "#e04e10" }}>
            <Star />
            Needs a decision
          </span>
        </div>

        <div className="bp-lines">
          {LINES.map((line) => (
            <div key={line.label}>
              <b>{line.label}.</b> {line.note}
              {line.above === "support" && (
                <>
                  {" "}
                  <b>
                    {cap(word(stars.length))} orange{" "}
                    {stars.length === 1 ? "star is" : "stars are"} still open
                  </b>
                  {starMoments.length === 1
                    ? `, ${stars.length === 1 ? "in" : stars.length === 2 ? "both in" : "all in"} ${starMoments[0]}`
                    : `, spread across ${word(starMoments.length)} moments`}
                  . Nothing is broken in the software at those steps: what is
                  missing is a person named to pick the work up.
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="bp-section">
        <h2 className="bp-h2">One visit, all the way down</h2>
        <BlueprintDiagram />
        <p className="bp-caption">
          {cap(word(settled))} of the {word(DECISIONS.length)} decisions are
          settled outright.{" "}
          <b>
            Bookings and approvals both land at team@inacts.ca, with Anissa
            approving, and everything borrowed is used in the space
          </b>
          . What is left sits at the end of a visit: who moves a photo from the
          room to the calendar, which waits on a branding strategy for the
          space. The software’s front half is built, with changes coming from
          Paul: the approval step goes back into signup, and bookings gain an
          event type and a weekly printable list.
        </p>
      </section>

      <section className="bp-section">
        <h2 className="bp-h2">What Shakara and April decided</h2>
        <p className="bp-lede">
          {cap(word(settled))} of the {word(DECISIONS.length)} are settled
          outright. The booking inbox still needs its address, and posting
          waits on a branding strategy for the space.
        </p>
        <div className="bp-decisions">
          {DECISIONS.map((d) => (
            <div key={d.n} className={`assetbox bp-decision${d.settled ? " settled" : ""}`}>
              <div className="bp-dhead">
                <span className="bp-dnum">{d.n}</span>
                <div className="bp-dq">{d.question}</div>
              </div>
              <div className="bp-dopts">
                {d.parts.map((p) => (
                  <div key={p.label} className={`bp-dopt ${p.kind}`}>
                    <span className="k">{p.label}</span>
                    <Rich text={p.text} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bp-section">
        <h2 className="bp-h2">Who gets the space</h2>
        <div className="assetbox">
          <div className="bp-tiers">
            {ACCESS_TIERS.map((t) => (
              <div className="bp-tier" key={t.n}>
                <span className="bp-tn">{t.n}</span>
                <div>
                  <b>{t.who}</b> <Rich text={t.text} />
                </div>
              </div>
            ))}
          </div>
          <p className="bp-mandate">
            <b>{MANDATE.lead}</b> <Rich text={MANDATE.text} />
          </p>
        </div>
      </section>

      <section className="bp-section">
        <h2 className="bp-h2">Everything still open</h2>
        <p className="bp-lede">
          In the order it unblocks. The first rows are the answers the rest is
          waiting on.
        </p>
        <div className="tablewrap">
          <table className="bp-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Where</th>
                <th>Who</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {OUTSTANDING.map((g) => (
                <Fragment key={g.group}>
                  <tr className="bp-group">
                    <td colSpan={4}>{g.group}</td>
                  </tr>
                  {g.items.map((it) => (
                    <tr key={it.title}>
                      <td className="bp-item">
                        {it.title}
                        <small>
                          <Rich text={it.detail} />
                        </small>
                      </td>
                      <td className="bp-where">{WHERE_LABEL[it.where]}</td>
                      <td className="bp-who">
                        {it.owners.map((o) => (
                          <span key={o} className={`bp-owner ${o}`}>{OWNER_NAMES[o]}</span>
                        ))}
                      </td>
                      <td>
                        <span className={BADGE[it.tone]}>{it.status}</span>
                      </td>
                    </tr>
                  ))}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
