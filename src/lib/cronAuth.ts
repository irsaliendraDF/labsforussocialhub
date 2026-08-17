import type { NextRequest } from "next/server";

/**
 * Cron endpoints run without a user session, so they authenticate with a
 * shared secret. Vercel Cron sends `Authorization: Bearer $CRON_SECRET`.
 *
 * If CRON_SECRET isn't set the endpoints stay closed rather than open — a
 * missing secret should never mean "anyone can trigger a publish".
 */
export function isAuthorizedCron(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;

  const header = request.headers.get("authorization");
  return header === `Bearer ${secret}`;
}
