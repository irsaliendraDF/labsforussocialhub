import HowToSchedule from "@/components/HowToSchedule";
import SchedulerBoard from "@/components/SchedulerBoard";
import SetupBanner from "@/components/SetupBanner";
import { getAdminClient } from "@/lib/supabase/server";
import type { SocialAccount } from "@/lib/types";

export const metadata = { title: "Scheduler · Lab for Us" };
export const dynamic = "force-dynamic";

/**
 * Accounts are read with the service-role client and deliberately projected:
 * the token columns never leave the server.
 */
async function loadAccounts(): Promise<SocialAccount[]> {
  const admin = getAdminClient();
  if (!admin) return [];
  const { data } = await admin
    .from("social_accounts")
    .select(
      "id, platform, display_name, external_account_id, token_expires_at, connected_by, created_at",
    )
    .order("created_at", { ascending: false });
  return (data ?? []) as SocialAccount[];
}

export default async function SchedulerPage() {
  const accounts = await loadAccounts();

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Content</span>
        <h1>Scheduler</h1>
        <p>
          Connect Instagram and LinkedIn, put Ready posts on a time, and watch
          the queue. The queue is swept once a day, so a scheduled post goes
          out on the next sweep after the time you pick.
        </p>
      </div>

      <SetupBanner what="The scheduling queue" />

      <SchedulerBoard
        accounts={accounts}
        igLive={process.env.INSTAGRAM_PUBLISHING_ENABLED === "true"}
        liLive={process.env.LINKEDIN_PUBLISHING_ENABLED === "true"}
      />

      <HowToSchedule />

      <p className="note" style={{ marginTop: 26 }}>
        Instagram publishing needs a Business or Creator account on a Facebook
        Page, a Meta app, and App Review. LinkedIn needs the Page, a LinkedIn
        app, and Community Management API access. Those approvals, not the code,
        are the long pole. Start them early and the switch flips with an
        environment variable.
      </p>
    </>
  );
}
