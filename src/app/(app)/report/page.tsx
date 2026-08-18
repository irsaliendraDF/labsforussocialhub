import QuarterReport from "@/components/QuarterReport";
import SetupBanner from "@/components/SetupBanner";
import type { Row } from "@/components/AnalyticsView";
import { getServerClient } from "@/lib/supabase/server";

export const metadata = { title: "Quarterly report · Lab for Us" };
export const dynamic = "force-dynamic";

/** Same shape Analytics uses: newest metric capture per published post. */
async function loadRows(): Promise<Row[]> {
  const supabase = await getServerClient();
  if (!supabase) return [];

  const { data: posts } = await supabase
    .from("posts")
    .select(
      "id, title, channel, pillar, format, published_at, post_date, published_url, tracked_url, link_url",
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

export default async function ReportPage() {
  const rows = await loadRows();

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Engagement</span>
        <h1>Quarterly report</h1>
        <p>
          A board and funder ready summary of a quarter of social activity.
          Pick the quarter, then print it or save it as a PDF straight from the
          browser.
        </p>
      </div>

      <SetupBanner what="Quarterly figures" />

      <QuarterReport rows={rows} />
    </>
  );
}
