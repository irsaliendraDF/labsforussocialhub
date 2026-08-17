"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { getBrowserClient } from "@/lib/supabase/client";

type Mode = "link" | "password";

export default function SignInForm() {
  const supabase = getBrowserClient();
  const params = useSearchParams();
  const next = params.get("next") || "/";

  const [mode, setMode] = useState<Mode>("link");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(
    null,
  );

  if (!supabase) {
    return (
      <div className="msg err">
        Supabase isn&apos;t connected yet, so there&apos;s nothing to sign in
        to. Add the environment variables from <code>SETUP.md</code> and reload.
      </div>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setMsg(null);

    if (mode === "link") {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });
      setMsg(
        error
          ? { kind: "err", text: error.message }
          : {
              kind: "ok",
              text: "Check your email for the sign-in link. It opens the hub straight away.",
            },
      );
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) setMsg({ kind: "err", text: error.message });
      else window.location.assign(next);
    }
    setBusy(false);
  }

  return (
    <>
      <div className="auth-tabs" role="group" aria-label="Sign-in method">
        <button
          type="button"
          aria-pressed={mode === "link"}
          onClick={() => {
            setMode("link");
            setMsg(null);
          }}
        >
          Magic link
        </button>
        <button
          type="button"
          aria-pressed={mode === "password"}
          onClick={() => {
            setMode("password");
            setMsg(null);
          }}
        >
          Password
        </button>
      </div>

      <form className="auth-form" onSubmit={submit}>
        <input
          type="email"
          required
          placeholder="you@labforus.ca"
          value={email}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {mode === "password" && (
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <button className="composer-add" type="submit" disabled={busy}>
          {busy
            ? "Working…"
            : mode === "link"
              ? "Email me a link"
              : "Sign in"}
        </button>
      </form>

      {msg && (
        <div className={`msg ${msg.kind}`} style={{ marginTop: 14 }}>
          {msg.text}
        </div>
      )}
    </>
  );
}
