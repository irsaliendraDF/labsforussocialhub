import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedCron } from "@/lib/cronAuth";
import { runPublishQueue } from "@/lib/publish";
import { refreshExpiringInstagramTokens } from "@/lib/tokenRefresh";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * A scheduled ping hits this every 15 minutes (see .github/workflows) to
 * drain the scheduled queue, and renews any Instagram token near its end.
 */
export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runPublishQueue();
  const tokens = await refreshExpiringInstagramTokens();
  return NextResponse.json({ ranAt: new Date().toISOString(), ...result, tokens });
}
