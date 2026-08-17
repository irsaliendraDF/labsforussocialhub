import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedCron } from "@/lib/cronAuth";
import { runPublishQueue } from "@/lib/publish";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Vercel Cron hits this every 5 minutes to drain the scheduled queue. */
export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runPublishQueue();
  return NextResponse.json({ ranAt: new Date().toISOString(), ...result });
}
