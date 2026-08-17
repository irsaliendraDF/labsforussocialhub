import { NextResponse, type NextRequest } from "next/server";
import { getServerClient } from "@/lib/supabase/server";

/** Exchanges the magic-link code for a session, then lands the user in the hub. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const errorDescription = searchParams.get("error_description");

  if (errorDescription) {
    return NextResponse.redirect(
      `${origin}/sign-in?error=${encodeURIComponent(errorDescription)}`,
    );
  }

  if (code) {
    const supabase = await getServerClient();
    if (supabase) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error) {
        // Only allow relative paths, so a crafted link can't bounce the user
        // off to another origin after signing in.
        const dest = next.startsWith("/") && !next.startsWith("//") ? next : "/";
        return NextResponse.redirect(`${origin}${dest}`);
      }
      return NextResponse.redirect(
        `${origin}/sign-in?error=${encodeURIComponent(error.message)}`,
      );
    }
  }

  return NextResponse.redirect(`${origin}/sign-in`);
}
