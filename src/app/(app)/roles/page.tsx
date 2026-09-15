import Link from "next/link";
import { OUTSTANDING, PEOPLE, STEPS } from "@/lib/blueprint";

export const metadata = { title: "Roles · Lab for Us" };

const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

export default function RolesPage() {
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">The space</span>
        <h1>Roles</h1>
        <p>
          One page for each person who works inside the service blueprint:
          what the role is, what matters most, the steps they own in a visit,
          and what is still on their list. Each page is read from the
          blueprint itself, so it changes when the blueprint does.
        </p>
      </div>

      <div className="bp-people">
        {PEOPLE.map((p) => {
          const steps = STEPS.filter((s) => s.owners?.includes(p.id)).length;
          const items = OUTSTANDING.reduce(
            (n, g) => n + g.items.filter((i) => i.owners.includes(p.id)).length,
            0,
          );
          return (
            <Link href={`/roles/${p.id}`} className="assetbox bp-person-card" key={p.id}>
              <h2>{p.name}</h2>
              {p.role ? (
                <p className="bp-person-role">{p.role}</p>
              ) : (
                <p className="bp-person-role bp-slot-inline">Role to confirm</p>
              )}
              <p className="bp-person-context">{p.context}</p>
              <p className="bp-person-stats">
                {plural(steps, "step", "steps")} in a visit ·{" "}
                {plural(items, "item", "items")} on the list
              </p>
              <span className="bp-person-go">Open the overview →</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
