import { isSupabaseConfigured } from "@/lib/supabase/config";

/**
 * Shown on the pages that need a database until Supabase is wired up.
 * Strategy, Pillars, Brand kit, and Templates all work without it.
 */
export default function SetupBanner({ what }: { what: string }) {
  if (isSupabaseConfigured()) return null;
  return (
    <div className="setup-banner">
      <strong>Not connected yet.</strong> {what} lives in Supabase. Add{" "}
      <code>NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
      <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to <code>.env.local</code>, run{" "}
      <code>supabase/schema.sql</code> then <code>supabase/seed.sql</code>, and
      this page comes to life. See <code>SETUP.md</code>.
    </div>
  );
}
