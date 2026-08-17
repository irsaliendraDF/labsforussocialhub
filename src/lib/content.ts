/**
 * Static strategy content. These are the parts of the hub that describe what
 * Lab for Us is, rather than what the team is doing this week, they live in
 * code, not the database.
 *
 * Pillars and templates are ALSO seeded into Supabase (see supabase/seed.sql)
 * so the calendar and scheduler can join against them. These constants are the
 * source of truth for that seed and for rendering when the DB is unreachable.
 */

export const PILLARS = [
  {
    name: "For Us",
    color: "#db385a",
    description:
      "Mission and who the space is for. Belonging and access.",
  },
  {
    name: "The space and its tools",
    color: "#3d3bf5",
    description:
      "The place, the equipment, and the Digital Library catalog.",
  },
  {
    name: "Access and how it works",
    color: "#f46129",
    description:
      "Booking, tips, and lowering the barrier to using the space.",
  },
  {
    name: "People and community",
    color: "#2a6a12",
    description:
      "The artists, students, facilitators, groups, and collaborations.",
  },
  {
    name: "Made here",
    color: "#edb919",
    description: "The creative work and projects that come out of the space.",
  },
] as const;

export type PillarName = (typeof PILLARS)[number]["name"];

export const PILLAR_COLOR: Record<string, string> = Object.fromEntries(
  PILLARS.map((p) => [p.name, p.color]),
);

/** Falls back to the border tone so an unknown pillar never renders colourless. */
export function pillarColor(name: string | null | undefined): string {
  return (name && PILLAR_COLOR[name]) || "#ece4d2";
}

export const PALETTE: [string, string][] = [
  ["Orange", "#f46129"],
  ["Blue", "#3d3bf5"],
  ["Gold", "#edb919"],
  ["Green", "#2a6a12"],
  ["Periwinkle", "#9191ea"],
  ["Teal", "#5ce1e6"],
  ["Raspberry", "#db385a"],
  ["Ink", "#111111"],
  ["Paper", "#ffffff"],
];

export const FORMATS = [
  "Maker spotlight",
  "Day in the life reels",
  "Story takeovers",
  "Tips and how-to clips",
  "Community reshares",
  "Polls and trivia",
];

export const CHANNELS = ["Instagram", "LinkedIn"] as const;
export type Channel = (typeof CHANNELS)[number];

export const STATUSES = [
  "Idea",
  "Drafting",
  "Ready",
  "Scheduled",
  "Posted",
] as const;
export type Status = (typeof STATUSES)[number];

export const PUBLISH_STATUSES = [
  "draft",
  "scheduled",
  "publishing",
  "published",
  "failed",
] as const;
export type PublishStatus = (typeof PUBLISH_STATUSES)[number];

export const CTAS = [
  "Follow",
  "Sign up",
  "Visit the site",
  "Book the space",
  "Explore the library",
];

export const HASHTAGS = ["#MadeAtLabForUs", "#labforus"];

/**
 * The 18 templates, grouped by pillar in the UI.
 *
 * `canvaId` is the real Canva design ID for that template, matched to the
 * "Lab for Us: ..." designs in the team's Canva. Canva's short /d/ links are
 * regenerated on each API call, so we store the stable design ID and build the
 * URL from it, that link opens the exact template in the editor, not a folder.
 */
export type TemplateDef = {
  name: string;
  pillar: string;
  description: string;
  canvaId: string;
};

export const TEMPLATES: TemplateDef[] = [
  {
    name: "Launch announcement",
    pillar: "For Us",
    description: "Logo front and center with a clear sign-up call to action.",
    canvaId: "DAHR4gdBk_U",
  },
  {
    name: "Mission / quote",
    pillar: "For Us",
    description: "Type-led, using the palette and squiggles.",
    canvaId: "DAHR4luYxiQ",
  },
  {
    name: "LinkedIn post",
    pillar: "For Us",
    description: "A cleaner layout tuned for the LinkedIn feed.",
    canvaId: "DAHR44lUYDE",
  },
  {
    name: "Thank a partner",
    pillar: "For Us",
    description: "A warm shout-out to a partner or funder.",
    canvaId: "DAHR43pzOM8",
  },
  {
    name: "Behind the scenes",
    pillar: "The space and its tools",
    description: "A peek at the space, the gear, and the making in progress.",
    canvaId: "DAHR43jq__M",
  },
  {
    name: "Day in the life cover",
    pillar: "The space and its tools",
    description: "A bold title card for a day-in-the-life Reel.",
    canvaId: "DAHR4tsQ6Fk",
  },
  {
    name: "Event announcement",
    pillar: "The space and its tools",
    description: "Date, time, and location for what's happening.",
    canvaId: "DAHR4ve8DNo",
  },
  {
    name: "Tip / how-to",
    pillar: "Access and how it works",
    description: "A single quick tip on booking or using the space.",
    canvaId: "DAHR4p0hh4I",
  },
  {
    name: "Carousel: how-to",
    pillar: "Access and how it works",
    description: "A swipeable, step-by-step how-to for using the space.",
    canvaId: "DAHR4_jBEpU",
  },
  {
    name: "Carousel: common questions",
    pillar: "Access and how it works",
    description: "A multi-slide answer to the questions people ask most.",
    canvaId: "DAHR44OLuv4",
  },
  {
    name: "Hours or closure notice",
    pillar: "Access and how it works",
    description: "A quick notice for opening hours or a closure.",
    canvaId: "DAHR477i1kc",
  },
  {
    name: "Maker spotlight",
    pillar: "People and community",
    description: "Photo area plus a name and a short quote.",
    canvaId: "DAHR4piLudw",
  },
  {
    name: "Carousel: member story",
    pillar: "People and community",
    description: "A member's story told across a few slides.",
    canvaId: "DAHR47BR9Gw",
  },
  {
    name: "Testimonial",
    pillar: "People and community",
    description: "A member or partner quote, front and center.",
    canvaId: "DAHR4_GGGdw",
  },
  {
    name: "Call for submissions",
    pillar: "People and community",
    description: "Invite the community to submit their work or ideas.",
    canvaId: "DAHR45P5nNA",
  },
  {
    name: "Workshop or class",
    pillar: "People and community",
    description: "Announce a workshop or class and how to join.",
    canvaId: "DAHR4wZHdFg",
  },
  {
    name: "Community reshare frame",
    pillar: "Made here",
    description: "A branded frame for reposting member work.",
    canvaId: "DAHR41doXrY",
  },
  {
    name: "Hashtag lockup",
    pillar: "Made here",
    description: "A sticker-style #MadeAtLabForUs for any post or Story.",
    canvaId: "DAHR451tRDs",
  },
];

/** Opens the exact design in the Canva editor. */
export function canvaEditUrl(canvaId: string): string {
  return `https://www.canva.com/design/${canvaId}/edit`;
}

/** Look up a template's Canva link by name, for the calendar and drawer. */
export function canvaUrlForTemplate(name: string | null | undefined) {
  const t = TEMPLATES.find((x) => x.name === name);
  return t ? canvaEditUrl(t.canvaId) : null;
}

/** Brand element files under /public/brand. */
export const SQUIGGLES = Array.from(
  { length: 9 },
  (_, i) => `/brand/squiggle-${i + 1}.webp`,
);
export const DIVIDERS = Array.from(
  { length: 6 },
  (_, i) => `/brand/divider-${i + 1}.webp`,
);

/**
 * Holidays and awareness days.
 * `off` = public holiday or a day the team is generally off (tan).
 * `aw`  = awareness or celebration day worth posting for (teal).
 * Canadian and Nova Scotia dates plus a curated arts-and-community set.
 */
export type Holiday = { t: "off" | "aw"; n: string };

export const HOLIDAYS: Record<string, Holiday> = {
  "2026-01-01": { t: "off", n: "New Year's Day" },
  "2026-02-16": { t: "off", n: "Heritage Day" },
  "2026-04-03": { t: "off", n: "Good Friday" },
  "2026-05-18": { t: "off", n: "Victoria Day" },
  "2026-07-01": { t: "off", n: "Canada Day" },
  "2026-08-03": { t: "off", n: "Natal Day" },
  "2026-09-07": { t: "off", n: "Labour Day" },
  "2026-10-12": { t: "off", n: "Thanksgiving" },
  "2026-11-11": { t: "off", n: "Remembrance Day" },
  "2026-12-25": { t: "off", n: "Christmas Day" },
  "2026-12-26": { t: "off", n: "Boxing Day" },
  "2026-03-08": { t: "aw", n: "Intl Women's Day" },
  "2026-04-15": { t: "aw", n: "World Art Day" },
  "2026-06-21": { t: "aw", n: "Natl Indigenous Peoples Day" },
  "2026-08-12": { t: "aw", n: "Intl Youth Day" },
  "2026-08-19": { t: "aw", n: "World Photography Day" },
  "2026-09-08": { t: "aw", n: "Intl Literacy Day" },
  "2026-09-21": { t: "aw", n: "Intl Day of Peace" },
  "2026-09-30": { t: "aw", n: "Truth & Reconciliation" },
  "2026-10-01": { t: "aw", n: "Treaty Day (NS)" },
  "2026-10-25": { t: "aw", n: "Intl Artists Day" },
  "2026-12-10": { t: "aw", n: "Human Rights Day" },
};

/**
 * Launch-run week labels, anchored to the activation plan.
 * The calendar itself ships empty, the team plans their own posts.
 */
export function weekOf(iso: string): string {
  if (iso <= "2026-08-23") return "Week -1";
  if (iso <= "2026-08-30") return "Week 0";
  if (iso <= "2026-09-06") return "Week 1";
  if (iso <= "2026-09-13") return "Week 2";
  if (iso <= "2026-09-20") return "Week 3";
  if (iso <= "2026-09-27") return "Week 4";
  return "Ongoing";
}
