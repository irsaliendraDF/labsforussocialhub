import { Suspense } from "react";
import SignInForm from "@/components/SignInForm";

export const metadata = { title: "Sign in — Lab for Us" };

export default function SignInPage() {
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="logo" src="/brand/logo.webp" alt="Lab for Us" />
        <h1>The Content Hub</h1>
        <p className="sub">
          Plan, make, schedule, and measure everything Lab for Us posts. Sign in
          once on this laptop and stay signed in.
        </p>
        <Suspense fallback={null}>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}
