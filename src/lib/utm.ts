import { CTAS } from "./content";

/**
 * Link tracking.
 *
 * The stated goal of this content is getting people onto the platform, but an
 * untagged link makes that invisible: every social visit lands in analytics as
 * anonymous traffic. Tagging every link is what lets Lab for Us say
 * "Instagram drove N Digital Library signups" rather than "we posted a lot".
 *
 * The built URL is stored on the post (`tracked_url`) rather than recomputed
 * on read, so a link that has already gone out never silently changes when
 * these rules are edited.
 */

export const SITE = "https://labforus.ca";

/** Where each call to action sends people. Edit as the real pages land. */
export const CTA_DESTINATIONS: Record<string, string> = {
  Follow: SITE,
  "Sign up": `${SITE}/signup`,
  "Visit the site": SITE,
  "Book the space": `${SITE}/book`,
  "Explore the library": `${SITE}/library`,
};

export function destinationForCta(cta: string | null | undefined): string {
  return (cta && CTA_DESTINATIONS[cta]) || SITE;
}

/** "People and community" -> "people-and-community" */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type UtmInput = {
  linkUrl?: string | null;
  cta?: string | null;
  channel: string;
  pillar: string;
  postDate: string;
  title: string;
};

/**
 * Builds the tagged URL. Existing query parameters on the destination are
 * preserved, and any utm_* already present is overwritten rather than
 * duplicated.
 */
export function buildTrackedUrl(input: UtmInput): string | null {
  const base = input.linkUrl?.trim() || destinationForCta(input.cta);
  if (!base) return null;

  let url: URL;
  try {
    url = new URL(base);
  } catch {
    // Not a valid URL yet (someone is mid-typing); nothing to tag.
    return null;
  }

  url.searchParams.set("utm_source", slugify(input.channel));
  url.searchParams.set("utm_medium", "social");
  url.searchParams.set("utm_campaign", slugify(input.pillar));
  url.searchParams.set(
    "utm_content",
    `${input.postDate}-${slugify(input.title).slice(0, 40) || "post"}`,
  );

  return url.toString();
}

export const CTA_LIST = CTAS;
