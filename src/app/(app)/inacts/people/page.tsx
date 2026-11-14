import { PEOPLE, TOGETHER } from "@/lib/inacts";

export const metadata = { title: "People · InACTS" };

export default function InactsPeoplePage() {
  return (
    <>
      <div className="page-head wide">
        <span className="eyebrow">The institute</span>
        <h1>People</h1>
        <p>
          How each of them shows up in the InACTS story, what they say yes to,
          and what they hand to the other. Written so an invitation can be
          answered without a meeting first.
        </p>
      </div>

      <h2 className="subhead">Why They Came Together</h2>
      <p>{TOGETHER.why}</p>

      <h2 className="subhead">What the Partnership Means</h2>
      <p>{TOGETHER.means}</p>

      <h2 className="subhead">What It Means for Each of Them</h2>
      <div className="in-people">
        {PEOPLE.map((p) => (
          <article className="in-person" key={p.id}>
            <h2>{p.name}</h2>
            <p className="in-person-title">{p.title}</p>

            <p className="in-person-arch">
              <strong>{p.archetype}.</strong> {p.archetypeNote}
            </p>
            <p className="in-person-sentence">{p.sentence}</p>

            <div className="in-person-block">
              <div className="in-label">Signature topics</div>
              <ul className="in-tags">
                {p.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>

            <div className="in-person-block">
              <div className="in-label">Says yes to</div>
              <ul className="in-list">
                {p.yes.map((y) => (
                  <li key={y}>{y}</li>
                ))}
              </ul>
            </div>

            <div className="in-person-block">
              <div className="in-label">Hands over</div>
              <p className="in-person-routes">{p.routes}</p>
            </div>

            <div className="in-person-block">
              <div className="in-label">Short bio</div>
              <p className="in-person-bio">{p.bio}</p>
            </div>

            {p.results.map((r) => (
              <div className="in-person-block" key={r.label}>
                <div className="in-label">{r.label}</div>
                <p className="in-person-bio">{r.body}</p>
              </div>
            ))}
          </article>
        ))}
      </div>

      <h2 className="subhead">What It Means for the Partnership</h2>
      <dl className="in-facts in-facts-wide">
        {TOGETHER.results.map((r) => (
          <div className="in-fact" key={r.label}>
            <dt>{r.label}</dt>
            <dd>{r.body}</dd>
          </div>
        ))}
      </dl>

      <p className="note in-note">
        Drafted from the Branding and Positioning document of April 2026 and
        meant to be argued with. Edit the wording in{" "}
        <code>src/lib/inacts.ts</code> and both cards follow.
      </p>
    </>
  );
}
