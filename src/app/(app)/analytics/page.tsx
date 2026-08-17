import AnalyticsView, { type Row } from "@/components/AnalyticsView";
import SetupBanner from "@/components/SetupBanner";
import { getServerClient } from "@/lib/supabase/server";

export const metadata = { title: "Analytics · Lab for Us" };
export const dynamic = "force-dynamic";

/**
 * `post_metrics` is a time series, one row per capture. For the tab we want
 * the newest capture per post, so we pull them newest-first and keep the first
 * sighting of each post_id.
 */
async function loadRows(): Promise<Row[]> {
  const supabase = await getServerClient();
  if (!supabase) return [];

  const { data: posts } = await supabase
    .from("posts")
    .select(
      "id, title, channel, pillar, format, published_at, post_date, published_url",
    )
    .eq("publish_status", "published")
    .order("published_at", { ascending: false });

  if (!posts?.length) return [];

  const { data: metrics } = await supabase
    .from("post_metrics")
    .select(
      "post_id, captured_at, impressions, reach, likes, comments, saves, shares, clicks",
    )
    .in(
      "post_id",
      posts.map((p) => p.id),
    )
    .order("captured_at", { ascending: false });

  const latest = new Map<string, NonNullable<typeof metrics>[number]>();
  for (const m of metrics ?? []) {
    if (!latest.has(m.post_id)) latest.set(m.post_id, m);
  }

  return posts.map((p) => {
    const m = latest.get(p.id);
    return {
      ...p,
      impressions: m?.impressions ?? null,
      reach: m?.reach ?? null,
      likes: m?.likes ?? null,
      comments: m?.comments ?? null,
      saves: m?.saves ?? null,
      shares: m?.shares ?? null,
      clicks: m?.clicks ?? null,
    } as Row;
  });
}

export default async function AnalyticsPage() {
  const rows = await loadRows();

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Engagement</span>
        <h1>Analytics</h1>
        <p>
          How each post actually landed, rolled up by pillar, format, and
          channel, so the numbers loop back into the strategy and you can see
          which themes are worth more of the week.
        </p>
      </div>

      <SetupBanner what="Post performance" />

      <AnalyticsView rows={rows} />

      <p className="note" style={{ marginTop: 26 }}>
        Numbers refresh once a day from Instagram insights and LinkedIn
        analytics. A post only appears here after it has published through the
        Scheduler with a connected account.
      </p>
    </>
  );
}
