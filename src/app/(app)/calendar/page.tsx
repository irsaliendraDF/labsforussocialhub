import CalendarBoard from "@/components/CalendarBoard";

export const metadata = { title: "Calendar · Lab for Us" };

export default function CalendarPage() {
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">Content</span>
        <h1>Content calendar</h1>
        <p>
          The shared plan. Switch between calendar, list, and kanban, filter to
          what&apos;s yours, then build it. Everyone on the team sees the same
          board update live.
        </p>
      </div>
      <CalendarBoard />
    </>
  );
}
