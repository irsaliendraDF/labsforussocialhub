import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Meta sends deauthorize and data deletion calls as a form field called
 * signed_request: a signature and a payload, each base64url, joined by a dot.
 * The signature is an HMAC-SHA256 of the payload made with the app secret.
 * A request that does not verify is ignored, so nobody can delete an account
 * by posting to these addresses.
 */
export function parseSignedRequest(
  signedRequest: string | null,
  appSecret: string | undefined,
): { user_id?: string } | null {
  if (!signedRequest || !appSecret) return null;
  const [sig, payload] = signedRequest.split(".");
  if (!sig || !payload) return null;

  const expected = createHmac("sha256", appSecret).update(payload).digest();
  const given = Buffer.from(sig, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return null;
  }

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof data === "object" && data ? data : null;
  } catch {
    return null;
  }
}
