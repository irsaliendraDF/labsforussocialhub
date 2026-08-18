import EngagementBoard from "@/components/EngagementBoard";
import SetupBanner from "@/components/SetupBanner";

export const metadata = { title: "Engagement · Lab for Us" };

export default function EngagementPage() {
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Engagement</span>
        <h1>Replies and community</h1>
        <p>
          Posting is half the job. This is the other half: who reached out, what
          they asked, and whether anyone got back to them. Log it here so the
          next person on shift knows what has already been handled.
        </p>
      </div>

      <SetupBanner what="The engagement log" />

      <EngagementBoard />

      <p className="note" style={{ marginTop: 26 }}>
        This is filled in by hand on purpose. Reading comments and DMs through
        the platform APIs needs the same approvals that publishing does, and
        replying to people should not have to wait for that.
      </p>
    </>
  );
}
