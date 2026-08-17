import { NextResponse, type NextRequest } from "next/server";
import { isAuthorizedCron } from "@/lib/cronAuth";
import { runMetricsJob } from "@/lib/metrics";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

/** Vercel Cron hits this daily to snapshot performance for published posts. */
export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await runMetricsJob();
  return NextResponse.json({ ranAt: new Date().toISOString(), ...result });
}
