import HubShell from "@/components/HubShell";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HubShell>
      <Sidebar />
      <main className="main">{children}</main>
    </HubShell>
  );
}
