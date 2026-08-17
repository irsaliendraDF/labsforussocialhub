import "server-only";

import { cookies } from "next/headers";

const COOKIE = "lfu_oauth_state";

/**
 * CSRF state for the connect flows.
 *
 * There's no login here, so the state can't be derived from a session. We mint
 * a random value, keep it in a short-lived httpOnly cookie, and require the
 * callback to echo it back, which is what the `state` parameter is actually
 * for.
 */
export async function mintOAuthState(): Promise<string> {
  const state = crypto.randomUUID();
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

/** True when the callback's `state` matches the one we issued. Single-use. */
export async function consumeOAuthState(state: string | null): Promise<boolean> {
  const jar = await cookies();
  const expected = jar.get(COOKIE)?.value;
  jar.delete(COOKIE);
  return Boolean(state && expected && state === expected);
}
