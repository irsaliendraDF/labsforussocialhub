import { PEOPLE } from "@/lib/inacts";

export const metadata = { title: "People · InACTS" };

export default function InactsPeoplePage() {
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">The institute</span>
        <h1>People</h1>
        <p>
          How each of them shows up in the InACTS story, what they say yes to,
          and what they hand to the other. Written so an invitation can be
          answered without a meeting first.
        </p>
      </div>

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
          </article>
        ))}
      </div>

      <p className="note in-note">
        Drafted from the Branding and Positioning document of April 2026 and
        meant to be argued with. Edit the wording in{" "}
        <code>src/lib/inacts.ts</code> and both cards follow.
      </p>
    </>
  );
}
