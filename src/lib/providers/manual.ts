import type {
  MetricsResult,
  PublishInput,
  PublishResult,
  SocialProvider,
} from "./types";

/**
 * The fallback that keeps the hub useful while Meta and LinkedIn app review is
 * pending, and whenever an account simply isn't connected.
 *
 * It never calls a platform API. Instead the queue surfaces the post as "due
 * now" with its caption and design ready to copy, someone posts it by hand or
 * through Canva's Content Planner, and marks it Posted. Same workflow, same
 * board, no silent failures and nothing pretending to have published.
 */
export function manualProvider(
  platform: "Instagram" | "LinkedIn",
): SocialProvider {
  return {
    id: "manual",
    platform,
    canPublish: false,
    note: `${platform} isn't connected for direct posting yet. Posts still schedule here and appear in the queue when they're due, ready to post by hand or hand off to Canva's Content Planner.`,

    async publish({ post }: PublishInput): Promise<PublishResult> {
      return {
        ok: false,
        retryable: false,
        error:
          `${platform} isn't connected for direct posting, so "${post.title}" was not sent. ` +
          `It's waiting in the queue to be posted by hand.`,
      };
    },

    async getMetrics(): Promise<MetricsResult> {
      return {
        ok: false,
        error: `${platform} isn't connected, so metrics can't be pulled automatically.`,
      };
    },
  };
}
