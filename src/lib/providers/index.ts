import { instagramProvider } from "./instagram";
import { linkedinProvider } from "./linkedin";
import { manualProvider } from "./manual";
import type { SocialProvider } from "./types";

export * from "./types";

/**
 * Picks the provider for a platform.
 *
 * Direct posting only switches on once the account is connected AND the
 * relevant env flag is set — that flag is what Irene flips the day Meta and
 * LinkedIn approve the app, with no code change. Until then every platform
 * resolves to `manual`, which is honest about not having published.
 */
export function getProvider(
  platform: "Instagram" | "LinkedIn",
  opts: { connected: boolean },
): SocialProvider {
  if (!opts.connected) return manualProvider(platform);

  if (platform === "Instagram") {
    return process.env.INSTAGRAM_PUBLISHING_ENABLED === "true"
      ? instagramProvider
      : manualProvider("Instagram");
  }

  return process.env.LINKEDIN_PUBLISHING_ENABLED === "true"
    ? linkedinProvider
    : manualProvider("LinkedIn");
}
