import type { Post } from "@/lib/types";

export type PublishInput = {
  post: Post;
  /** Image or video the platform should post. Canva links are not media URLs. */
  mediaUrl?: string | null;
  caption: string;
  accessToken: string;
  externalAccountId: string;
};

export type PublishResult =
  | {
      ok: true;
      platformPostId: string;
      publishedUrl: string | null;
    }
  | {
      ok: false;
      error: string;
      /** False for permanent failures (bad media, revoked scope), don't retry. */
      retryable: boolean;
    };

export type MetricsResult =
  | {
      ok: true;
      impressions: number | null;
      reach: number | null;
      likes: number | null;
      comments: number | null;
      saves: number | null;
      shares: number | null;
      clicks: number | null;
      raw: unknown;
    }
  | { ok: false; error: string };

/**
 * The seam that lets the hub be useful before Meta and LinkedIn approve the
 * app. Every provider implements the same three calls; `manual` stands in
 * while official access is pending, and swapping it out later changes nothing
 * above this line.
 */
export interface SocialProvider {
  readonly id: string;
  readonly platform: "Instagram" | "LinkedIn";
  /** False when this provider can't actually reach the platform API. */
  readonly canPublish: boolean;

  publish(input: PublishInput): Promise<PublishResult>;

  getMetrics(args: {
    platformPostId: string;
    accessToken: string;
    externalAccountId: string;
  }): Promise<MetricsResult>;

  /** Human-readable note surfaced in the Scheduler UI. */
  readonly note: string;
}
