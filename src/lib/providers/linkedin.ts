import type {
  MetricsResult,
  PublishInput,
  PublishResult,
  SocialProvider,
} from "./types";

const API = "https://api.linkedin.com";
const VERSION = "202409";

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "X-Restli-Protocol-Version": "2.0.0",
    "LinkedIn-Version": VERSION,
  };
}

/**
 * Posts to the Lab for Us LinkedIn Page via the Posts API.
 *
 * Requires a LinkedIn Page, a LinkedIn app, and approval into the Community
 * Management API (w_organization_social for posting, r_organization_social
 * plus the analytics endpoints for metrics).
 */
export const linkedinProvider: SocialProvider = {
  id: "linkedin-posts",
  platform: "LinkedIn",
  canPublish: true,
  note: "LinkedIn Posts API for the organization Page. Needs a LinkedIn app with Community Management API access.",

  async publish({
    caption,
    accessToken,
    externalAccountId,
  }: PublishInput): Promise<PublishResult> {
    // externalAccountId is the organization URN id, e.g. "12345678".
    const author = `urn:li:organization:${externalAccountId}`;

    try {
      const res = await fetch(`${API}/rest/posts`, {
        method: "POST",
        headers: headers(accessToken),
        body: JSON.stringify({
          author,
          commentary: caption,
          visibility: "PUBLIC",
          distribution: {
            feedDistribution: "MAIN_FEED",
            targetEntities: [],
            thirdPartyDistributionChannels: [],
          },
          lifecycleState: "PUBLISHED",
          isReshareDisabledByAuthor: false,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        return {
          ok: false,
          retryable: res.status >= 500 || res.status === 429,
          error: `LinkedIn responded ${res.status}: ${body.slice(0, 300)}`,
        };
      }

      // The new post's URN comes back in a header, not the body.
      const urn =
        res.headers.get("x-restli-id") ?? res.headers.get("x-linkedin-id");
      if (!urn) {
        return {
          ok: false,
          retryable: true,
          error: "LinkedIn accepted the post but returned no post id.",
        };
      }

      return {
        ok: true,
        platformPostId: urn,
        publishedUrl: `https://www.linkedin.com/feed/update/${urn}/`,
      };
    } catch (e) {
      return {
        ok: false,
        retryable: true,
        error: e instanceof Error ? e.message : "Network error talking to LinkedIn.",
      };
    }
  },

  async getMetrics({
    platformPostId,
    accessToken,
    externalAccountId,
  }): Promise<MetricsResult> {
    try {
      const org = `urn:li:organization:${externalAccountId}`;
      const url =
        `${API}/rest/organizationalEntityShareStatistics` +
        `?q=organizationalEntity&organizationalEntity=${encodeURIComponent(org)}` +
        `&shares=List(${encodeURIComponent(platformPostId)})`;

      const res = await fetch(url, { headers: headers(accessToken) });
      const json = await res.json();
      if (!res.ok) {
        return {
          ok: false,
          error: `LinkedIn analytics responded ${res.status}.`,
        };
      }

      const s = json?.elements?.[0]?.totalShareStatistics ?? {};
      return {
        ok: true,
        impressions: s.impressionCount ?? null,
        reach: s.uniqueImpressionsCount ?? null,
        likes: s.likeCount ?? null,
        comments: s.commentCount ?? null,
        saves: null, // LinkedIn doesn't expose saves.
        shares: s.shareCount ?? null,
        clicks: s.clickCount ?? null,
        raw: json,
      };
    } catch (e) {
      return {
        ok: false,
        error: e instanceof Error ? e.message : "Network error fetching analytics.",
      };
    }
  },
};
