/**
 * Two hubs in one app.
 *
 * Lab for Us and InACTS are run by the same people, so they share a sign-in,
 * a shell and a switch rather than being two sites. Lab for Us keeps every
 * route it already has, because links to them have been shared; InACTS lives
 * under /inacts. The hub is derived from the path, never stored as app state,
 * so a deep link always lands in the right hub.
 */

export const HUBS = ["labforus", "inacts"] as const;
export type Hub = (typeof HUBS)[number];

export const HUB_LABELS: Record<Hub, string> = {
  labforus: "Lab for Us",
  inacts: "InACTS",
};

/** Where the switch sends you when you change hub. */
export const HUB_HOME: Record<Hub, string> = {
  labforus: "/",
  inacts: "/inacts",
};

export const INACTS_PREFIX = "/inacts";

export function hubFromPath(pathname: string): Hub {
  return pathname === INACTS_PREFIX || pathname.startsWith(`${INACTS_PREFIX}/`)
    ? "inacts"
    : "labforus";
}

/**
 * The last hub a person used, so a cold arrival at the root can land where
 * they left. Browser storage is per device and may be unavailable, so every
 * read and write is guarded and the app works the same when it fails.
 */
export const HUB_STORAGE_KEY = "lfu.hub";

export function readLastHub(): Hub | null {
  try {
    const v = window.localStorage.getItem(HUB_STORAGE_KEY);
    return v === "inacts" || v === "labforus" ? v : null;
  } catch {
    return null;
  }
}

export function writeLastHub(hub: Hub): void {
  try {
    window.localStorage.setItem(HUB_STORAGE_KEY, hub);
  } catch {
    /* private window, blocked storage: remembering is a convenience only */
  }
}
