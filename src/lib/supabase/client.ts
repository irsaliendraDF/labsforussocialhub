"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./config";

let cached: ReturnType<typeof createBrowserClient> | null = null;

/**
 * Browser client. Returns null when Supabase isn't configured yet so the UI
 * can show its setup banner instead of throwing on first render.
 */
export function getBrowserClient() {
  if (!isSupabaseConfigured()) return null;
  if (!cached) cached = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return cached;
}
