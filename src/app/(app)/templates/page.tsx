import { PILLARS, TEMPLATES, canvaEditUrl } from "@/lib/content";
import { getServerClient } from "@/lib/supabase/server";

export const metadata = { title: "Templates — Lab for Us" };
export const dynamic = "force-dynamic";

type Row = {
  name: string;
  pillar: string;
  description: string | null;
  canva_url: string | null;
};

/**
 * Templates come from the DB when it's connected, so a URL can be corrected
 * without a deploy. The static list — which already carries every real Canva
 * design ID — is the fallback and the seed.
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

  // A row with an empty canva_url still falls back to the known design link.
  return (data as Row[]).map((r) => ({
    ...r,
    canva_url:
      r.canva_url ||
      fallback.find((f) => f.name === r.name)?.canva_url ||
      null,
  }));
}

export default async function TemplatesPage() {
  const templates = await loadTemplates();

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Content</span>
        <h1>Templates</h1>
        <p>
          All 18, grouped by the pillar each one serves. Opening one takes you
          straight into that exact design in Canva. Make a copy there, edit it,
          then paste the finished link back onto the post in the Calendar.
        </p>
      </div>

      {PILLARS.map((p) => {
        const mine = templates.filter((t) => t.pillar === p.name);
        if (!mine.length) return null;
        return (
          <div className="tpl-group" key={p.name}>
            <div className="tpl-group-head">
              <span className="dot" style={{ background: p.color }} />
              <h3>{p.name}</h3>
              <span className="cnt">{mine.length}</span>
            </div>
            <div className="tpls">
              {mine.map((t) => (
                <div className="tpl" key={t.name}>
                  <div className="band" style={{ background: p.color }}>
                    <span>{t.name}</span>
                  </div>
                  <div className="bd">
                    <h3>{t.name}</h3>
                    <div className="for">Feeds: {t.pillar}</div>
                    <p className="desc">{t.description}</p>
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
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <p className="note">
        Each button opens the exact Lab for Us template in the Canva editor. Use
        <strong> File &rarr; Make a copy</strong> before editing so the master
        template stays clean for the next person.
      </p>
    </>
  );
}
