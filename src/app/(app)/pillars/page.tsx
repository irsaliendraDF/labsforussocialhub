import { PILLARS, TEMPLATES, canvaEditUrl } from "@/lib/content";
import { getServerClient } from "@/lib/supabase/server";

export const metadata = { title: "Content Pillars · Lab for Us" };
export const dynamic = "force-dynamic";

type Row = {
  name: string;
  pillar: string;
  description: string | null;
  canva_url: string | null;
};

/**
 * Templates come from the DB when it's connected, so a Canva URL can be
 * corrected without a deploy. The static list, which already carries every
 * real design ID, is the fallback and the seed.
 */
async function loadTemplates(): Promise<Row[]> {
  const fallback: Row[] = TEMPLATES.map((t) => ({
    name: t.name,
    pillar: t.pillar,
    description: t.description,
    canva_url: canvaEditUrl(t.canvaId),
  }));

  const supabase = await getServerClient();
  if (!supabase) return fallback;

  const { data, error } = await supabase
    .from("templates")
    .select("name, pillar, description, canva_url, sort_order")
    .order("sort_order");

  if (error || !data?.length) return fallback;

  return (data as Row[]).map((r) => ({
    ...r,
    canva_url:
      r.canva_url || fallback.find((f) => f.name === r.name)?.canva_url || null,
  }));
}

export default async function ContentPillarsPage() {
  const templates = await loadTemplates();

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Strategy</span>
        <h1>Content pillars</h1>
        <p>
          Five themes drawn from what Lab for Us is. Every post ladders up to
          one, and the colour follows it everywhere: calendar chips, kanban
          cards, and the analytics rollups. Open a pillar to see the templates
          built for it. Each one opens that exact design in Canva.
        </p>
      </div>

      {/* Five standing columns, scrolling sideways when they don't all fit. */}
      <div className="pillar-cols">
        {PILLARS.map((p) => {
          const mine = templates.filter((t) => t.pillar === p.name);
          return (
            <div className="pillar-col" key={p.name}>
              <div className="cap" style={{ background: p.color }} />
              <div className="col-head">
                <h2>
                  <span className="dot" style={{ background: p.color }} />
                  {p.name}
                </h2>
                <p>{p.description}</p>
              </div>

              {mine.length > 0 && (
                <details className="fold" open>
                  <summary>
                    What this pillar has to work with
                    <span className="cnt">{mine.length}</span>
                    <span className="chev" aria-hidden="true">
                      ▾
                    </span>
                  </summary>
                  <div className="fold-bd">
                    <div className="tpl-list">
                      {mine.map((t) => (
                        <div
                          className="tpl-row"
                          key={t.name}
                          style={{ borderLeftColor: p.color }}
                        >
                          <div className="tx">
                            <h4>{t.name}</h4>
                            <p>{t.description}</p>
                          </div>
                          {t.canva_url ? (
                            <a
                              className="lnk"
                              href={t.canva_url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Open in Canva
                            </a>
                          ) : (
                            <span className="lnk pending">Link coming</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </details>
              )}
            </div>
          );
        })}
      </div>

      <p className="note">
        Each button opens the exact Lab for Us template in the Canva editor. Use
        <strong> File &rarr; Make a copy</strong> before editing so the master
        template stays clean for the next person.
      </p>
    </>
  );
}
