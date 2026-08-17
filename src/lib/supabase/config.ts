/**
 * Env plumbing. The app is built to boot and render its static strategy
 * content even before Supabase is wired up, so every entry point checks
 * `isSupabaseConfigured()` rather than assuming the vars exist.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

/** Service-role key. Server-only — never import this from a client component. */
export function serviceRoleKey(): string {
  return process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
}
