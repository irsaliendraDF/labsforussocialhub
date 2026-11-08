import CalendarBoard from "@/components/CalendarBoard";

export const metadata = { title: "Content calendar · InACTS" };

/**
 * The same board as Lab for Us, reading the InACTS side of the table. The
 * hub comes from the route, so nothing here has to be told which one it is.
 */
export default function InactsCalendarPage() {
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Content</span>
        <h1>Content calendar</h1>
        <p>
          What InACTS is publishing, week by week. This board holds only InACTS
          posts, and anything scheduled here goes out through InACTS accounts.
        </p>
      </div>
      <CalendarBoard />
    </>
  );
}
