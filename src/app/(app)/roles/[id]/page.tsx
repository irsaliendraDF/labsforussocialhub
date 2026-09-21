import Link from "next/link";
import { notFound } from "next/navigation";
import { DecisionStar, MOMENT_COLOR, Rich, STATUS, WherePill } from "@/components/BlueprintBits";
import {
  BEST_PRACTICE,
  LAYER_LABEL,
  MOMENTS,
  OUTSTANDING,
  PEOPLE,
  STEPS,
  type LayerId,
  type MomentId,
  type Tone,
} from "@/lib/blueprint";

export function generateStaticParams() {
  return PEOPLE.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = PEOPLE.find((p) => p.id === id);
  return { title: `${person ? person.name : "Roles"} · Lab for Us` };
}

const BADGE: Record<Tone, string> = {
  done: "badge ok",
  doing: "badge info",
  open: "badge warn",
};

/** The Best practices sentence for one cell, which reads better than the diagram’s broken lines. */
const practiceText = (moment: MomentId, layer: LayerId) =>
  BEST_PRACTICE.find((b) => b.moment === moment)?.bands.find((b) => b.layer === layer)?.text;

export default async function PersonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const person = PEOPLE.find((p) => p.id === id);
  if (!person) notFound();

  const first = person.name.split(" ")[0];
  const owned = STEPS.filter((s) => s.owners?.includes(person.id));
  const byMoment = MOMENTS.map((m, i) => ({ m, i, steps: owned.filter((s) => s.moment === m.id) })).filter(
    (g) => g.steps.length > 0,
  );
  const items = OUTSTANDING.flatMap((g) => g.items.filter((it) => it.owners.includes(person.id)));
  const starred = new Set(owned.filter((s) => s.star).map((s) => s.moment));
  const waitingGates = BEST_PRACTICE.filter((b) => starred.has(b.moment) && b.gate.kind === "waiting");
  const blocked = items.filter((it) => /^(Behind|Waiting)/.test(it.status));

  // The list leads the page when there is one, so the work comes first. An empty
  // list would only open the page with a "nothing here" line, so it stays last.
  const listFirst = items.length > 0;
  const listSection = (
    <section className="bp-section">
      <h2 className="bp-h2">On {first}’s list</h2>
      {items.length > 0 ? (
        <div className="tablewrap">
          <table className="bp-table" style={{ minWidth: 0 }}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr key={it.title}>
                  <td className="bp-item">
                    {it.title}
                    <small>
                      <Rich text={it.detail} />
                    </small>
                  </td>
                  <td>
                    <span className={BADGE[it.tone]}>{it.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="note">Nothing on the open list for {first}.</p>
      )}
    </section>
  );

  return (
    <>
      <Link href="/roles" className="bp-back">
        ← All roles
      </Link>

      <div className="page-head">
        <span className="eyebrow">Roles</span>
        <h1>{person.name}</h1>
        {person.role ? (
          <p>
            <strong>{person.role}</strong>
          </p>
        ) : (
          <p>
            <span className="bp-slot-inline">Role to confirm</span>
          </p>
        )}
        <p>{person.context}</p>
      </div>

      {listFirst && listSection}

      <section className="bp-section">
        <h2 className="bp-h2">What matters most for {first}</h2>
        {person.priorities.length > 0 ? (
          <div className="assetbox">
            <ol className="bp-priorities">
              {person.priorities.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
            <p className="note">In the order that unblocks the most.</p>
          </div>
        ) : (
          <p className="bp-slot">Priorities to add. Nothing is written for {first} yet.</p>
        )}
      </section>

      <section className="bp-section">
        <h2 className="bp-h2">{first}’s part of a visit</h2>
        {byMoment.length > 0 ? (
          <div className="assetbox">
            {byMoment.map((g) => (
              <div className="bp-role-moment" key={g.m.id}>
                <div className="bp-role-moment-head">
                  <span className="bp-practice-bar" style={{ background: MOMENT_COLOR[g.i] }} />
                  <h3>{g.m.label}</h3>
                </div>
                {g.steps.map((s) => {
                  const text = practiceText(s.moment, s.layer);
                  const st = STATUS[s.status];
                  return (
                    <div className="bp-role-step" key={`${s.moment}-${s.layer}-${s.title ?? ""}`}>
                      <span className="bp-role-layer">{LAYER_LABEL[s.layer]}</span>
                      <span className="bp-role-text">
                        <WherePill where={s.where} />
                        {text ? <Rich text={text} /> : [s.title, ...s.lines].join(" ")}
                      </span>
                      <span className="bp-role-status">
                        {s.star && <DecisionStar />}
                        <span className={st.badge}>{st.label}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          <p className="bp-slot">{first} owns no step on the blueprint yet.</p>
        )}
      </section>

      <section className="bp-section">
        <h2 className="bp-h2">Waiting on someone else</h2>
        {waitingGates.length > 0 || blocked.length > 0 ? (
          <div className="assetbox">
            <ul className="bp-waiting">
              {waitingGates.map((g) => (
                <li key={g.moment}>
                  <b>{MOMENTS.find((m) => m.id === g.moment)?.label}:</b> <Rich text={g.gate.text} />
                </li>
              ))}
              {blocked.map((it) => (
                <li key={it.title}>
                  <b>{it.title}:</b> {it.status.toLowerCase()}.
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="note">Nothing of {first}’s is waiting on anyone else.</p>
        )}
      </section>

      {!listFirst && listSection}
    </>
  );
}
