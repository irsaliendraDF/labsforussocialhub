import { SYSTEMS_OF_CARE } from "@/lib/inacts";

export const metadata = { title: "Systems of Care · InACTS" };

export default function SystemsOfCarePage() {
  return (
    <>
      <div className="page-head wide">
        <span className="eyebrow">The work</span>
        <h1>Systems of Care</h1>
        <p>{SYSTEMS_OF_CARE.intro}</p>
      </div>

      {SYSTEMS_OF_CARE.sections.map((s) => (
        <section key={s.heading}>
          <h2 className="subhead">{s.heading}</h2>
          <p>{s.body}</p>
        </section>
      ))}
    </>
  );
}
