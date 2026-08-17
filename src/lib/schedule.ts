/**
 * When the publish queue actually drains.
 *
 * Vercel's Hobby plan allows daily crons only, so the queue is swept once a
 * day rather than every few minutes. That is a real constraint on how
 * scheduling behaves — a post timed for 2pm goes out on the *next* sweep, not
 * at 2pm — so the numbers live here and the UI reads from them instead of
 * describing a cadence the deployment doesn't have.
 *
 * Keep in step with the `publish` cron in vercel.json.
 */
export const PUBLISH_RUN_UTC_HOUR = 13;
export const PUBLISH_RUN_UTC_MINUTE = 9;

/** The next daily sweep, in the viewer's local time. */
export function nextPublishRun(from: Date = new Date()): Date {
  const next = new Date(from);
  next.setUTCHours(PUBLISH_RUN_UTC_HOUR, PUBLISH_RUN_UTC_MINUTE, 0, 0);
  if (next <= from) next.setUTCDate(next.getUTCDate() + 1);
  return next;
}

/** e.g. "10:09 AM" — the sweep time as the team experiences it. */
export function publishRunLocalTime(): string {
  return nextPublishRun().toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

/**
 * True when a chosen datetime would sit waiting past the next sweep — i.e. the
 * post won't go out anywhere near the time the person picked.
 */
export function goesOutOnRun(scheduledAt: Date, from: Date = new Date()): Date {
  const run = nextPublishRun(from);
  if (scheduledAt <= run) return run;
  return nextPublishRun(scheduledAt);
}
