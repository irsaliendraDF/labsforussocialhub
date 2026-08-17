import Sidebar from "@/components/Sidebar";
import { getUser } from "@/lib/supabase/server";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <div className="shell">
      <Sidebar email={user?.email} />
      <main className="main">{children}</main>
    </div>
  );
}
