import { redirect } from "next/navigation";

/* Best practices now sit at the top of the Service Blueprint page, so an old
   bookmark or link lands there. The full view of each moment is unchanged at
   /best-practices/[moment]. */
export default function BestPracticesPage() {
  redirect("/blueprint#best-practices");
}
