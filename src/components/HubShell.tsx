"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { hubFromPath, readLastHub, writeLastHub } from "@/lib/hubs";

/**
 * The app shell, which also carries which hub you are in.
 *
 * `data-hub` on the shell is what the stylesheet hangs the InACTS treatment
 * off, so one attribute changes the sidebar and the page together and the Lab
 * for Us side is untouched.
 *
 * Landing where you left: the last hub is remembered, and acted on only when
 * someone arrives at the root cold, from outside the app. Clicking Strategy
 * inside the app is a deliberate move to Lab for Us, so it is never
 * second-guessed by a redirect.
 */
export default function HubShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const hub = hubFromPath(pathname);

  useEffect(() => {
    writeLastHub(hub);
  }, [hub]);

  useEffect(() => {
    if (pathname !== "/") return;
    const cameFromInsideTheApp =
      typeof document !== "undefined" &&
      document.referrer.startsWith(window.location.origin);
    if (cameFromInsideTheApp) return;
    if (readLastHub() === "inacts") router.replace("/inacts");
  }, [pathname, router]);

  return (
    <div className="shell" data-hub={hub}>
      {children}
    </div>
  );
}
