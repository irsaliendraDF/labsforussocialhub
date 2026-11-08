import HowToSchedule from "@/components/HowToSchedule";
import SchedulerBoard from "@/components/SchedulerBoard";
import SetupBanner from "@/components/SetupBanner";
import { getAdminClient } from "@/lib/supabase/server";
import type { Hub } from "@/lib/hubs";
import type { SocialAccount } from "@/lib/types";

export const metadata = { title: "Scheduler · InACTS" };
export const dynamic = "force-dynamic";

/** Accounts for this hub only; the token columns never leave the server. */
async function loadAccounts(hub: Hub): Promise<SocialAccount[]> {
  const admin = getAdminClient();
  if (!admin) return [];
  const { data } = await admin
    .from("social_accounts")
    .select(
      "id, hub, platform, display_name, external_account_id, token_expires_at, connected_by, created_at",
    )
    .eq("hub", hub)
    .order("created_at", { ascending: false });
  return (data ?? []) as SocialAccount[];
}

export default async function InactsSchedulerPage() {
  const accounts = await loadAccounts("inacts");

  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Content</span>
        <h1>Scheduler</h1>
        <p>
          Put Ready InACTS posts on a time and watch the queue. Accounts
          connected here belong to InACTS, and an InACTS post only ever goes
          out through them.
        </p>
      </div>

      <SetupBanner what="The scheduling queue" />

      <SchedulerBoard
        accounts={accounts}
        igLive={process.env.INSTAGRAM_PUBLISHING_ENABLED === "true"}
        liLive={process.env.LINKEDIN_PUBLISHING_ENABLED === "true"}
      />

      <HowToSchedule />
    </>
  );
}
