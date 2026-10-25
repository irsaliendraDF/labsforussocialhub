export const metadata = { title: "Content calendar · InACTS" };

export default function InactsCalendarPage() {
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Content</span>
        <h1>Content calendar</h1>
        <p>
          What InACTS is publishing, week by week, with a channel and an owner
          against each piece.
        </p>
      </div>

      <p className="hub-shell-note">
        A shell. The calendar this app already runs becomes hub aware in the
        next stage, and this page reads the InACTS side of it. Nothing here is
        scheduled.
      </p>
    </>
  );
}
