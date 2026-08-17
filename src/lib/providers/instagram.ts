import type {
  MetricsResult,
  PublishInput,
  PublishResult,
  SocialProvider,
} from "./types";

const GRAPH = "https://graph.facebook.com/v21.0";

/**
 * Instagram publishing is two calls: create a media container, then publish it.
 *
 * Requires an Instagram Business or Creator account linked to a Facebook Page,
 * a Meta app, and App Review for instagram_content_publish. Until that lands,
 * the manual provider stands in.
 */
export const instagramProvider: SocialProvider = {
  id: "instagram-graph",
  platform: "Instagram",
  canPublish: true,
  note: "Instagram Graph API. Needs a Business or Creator account on a Facebook Page, plus the content-publishing permission.",

  async publish({
    mediaUrl,
    caption,
    accessToken,
    externalAccountId,
  }: PublishInput): Promise<PublishResult> {
    if (!mediaUrl) {
      return {
        ok: false,
        retryable: false,
        error:
          "Instagram needs an image or video URL. Export the design from Canva and add its public link to the post before scheduling.",
      };
    }

    try {
      // 1. Container
      const createRes = await fetch(
        `${GRAPH}/${externalAccountId}/media`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            image_url: mediaUrl,
            caption,
            access_token: accessToken,
          }),
        },
      );
      const created = await createRes.json();
      if (!createRes.ok || !created.id) {
        return {
          ok: false,
          retryable: createRes.status >= 500 || createRes.status === 429,
          error: created?.error?.message ?? "Could not create the media container.",
        };
      }

      // 2. Publish
      const pubRes = await fetch(
        `${GRAPH}/${externalAccountId}/media_publish`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            creation_id: created.id,
            access_token: accessToken,
          }),
        },
      );
      const published = await pubRes.json();
      if (!pubRes.ok || !published.id) {
        return {
          ok: false,
          retryable: pubRes.status >= 500 || pubRes.status === 429,
          error: published?.error?.message ?? "Could not publish the container.",
        };
      }

      // Permalink is a separate read; a failure here shouldn't fail the publish.
      let publishedUrl: string | null = null;
      try {
        const permRes = await fetch(
          `${GRAPH}/${published.id}?fields=permalink&access_token=${encodeURIComponent(accessToken)}`,
        );
        if (permRes.ok) publishedUrl = (await permRes.json()).permalink ?? null;
      } catch {
        /* non-fatal */
      }

      return { ok: true, platformPostId: published.id, publishedUrl };
    } catch (e) {
      return {
        ok: false,
        retryable: true,
        error: e instanceof Error ? e.message : "Network error talking to Instagram.",
      };
    }
  },

  async getMetrics({ platformPostId, accessToken }): Promise<MetricsResult> {
    try {
      const metrics = "impressions,reach,likes,comments,saved,shares";
      const res = await fetch(
        `${GRAPH}/${platformPostId}/insights?metric=${metrics}&access_token=${encodeURIComponent(accessToken)}`,
      );
      const json = await res.json();
      if (!res.ok) {
        return { ok: false, error: json?.error?.message ?? "Insights request failed." };
      }

      const byName: Record<string, number> = {};
      for (const row of json.data ?? []) {
        byName[row.name] = row.values?.[0]?.value ?? 0;
      }

      return {
        ok: true,
        impressions: byName.impressions ?? null,
        reach: byName.reach ?? null,
        likes: byName.likes ?? null,
        comments: byName.comments ?? null,
        saves: byName.saved ?? null,
        shares: byName.shares ?? null,
        clicks: null, // Instagram doesn't report link clicks for feed posts.
        raw: json,
      };
    } catch (e) {
      return {
        ok: false,
        error: e instanceof Error ? e.message : "Network error fetching insights.",
      };
    }
  },
};
