import "server-only";

import { cookies } from "next/headers";
import type { Hub } from "./hubs";

const COOKIE = "lfu_oauth_state";

/**
 * CSRF state for the connect flows.
 *
 * There's no login here, so the state can't be derived from a session. We mint
 * a random value, keep it in a short-lived httpOnly cookie, and require the
 * callback to echo it back, which is what the `state` parameter is actually
 * for.
 */
export async function mintOAuthState(hub: Hub): Promise<string> {
  // The hub rides inside the state, because which hub is connecting an
  // account has to survive a round trip through the platform's consent screen
  // and come back trustworthy. It is in the httpOnly cookie too, so a tampered
  // `state` fails the comparison and never reaches the insert.
  const state = `${crypto.randomUUID()}.${hub}`;
  const jar = await cookies();
  jar.set(COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 600, // 10 minutes is plenty to finish a consent screen
  });
  return state;
}

/**
 * The hub this handshake started in, or null when the state does not match
 * the one we issued. Single-use.
 */
export async function consumeOAuthState(
  state: string | null,
): Promise<Hub | null> {
  const jar = await cookies();
  const expected = jar.get(COOKIE)?.value;
  jar.delete(COOKIE);
  if (!state || !expected || state !== expected) return null;
  const hub = state.split(".")[1];
  return hub === "inacts" || hub === "labforus" ? hub : null;
}
