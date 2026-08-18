"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string; icon: React.ReactNode };
type Group = { label: string; items: Item[] };

/* Simple stroked glyphs, soft and rounded, matching the brand's feel. */
const I = {
  overview: (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  pillars: (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="9" width="4" height="11" rx="1.5" />
      <rect x="10" y="5" width="4" height="15" rx="1.5" />
      <rect x="17" y="12" width="4" height="8" rx="1.5" />
    </svg>
  ),
  brand: (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 0 18c1.2 0 2-.8 2-1.8 0-1.4-1.2-1.7-1.2-2.7 0-.8.7-1.5 1.5-1.5H16a5 5 0 0 0 5-5c0-4-4-7-9-7Z" />
      <circle cx="7.5" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="11" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="8.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  templates: (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
      <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
    </svg>
  ),
  calendar: (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="3" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </svg>
  ),
  scheduler: (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 6h11M4 12h7M4 18h9" />
      <circle cx="18" cy="16" r="4" />
      <path d="M18 14.5V16l1 1" />
    </svg>
  ),
  engagement: (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.4-4.6A7.5 7.5 0 1 1 20 11.5Z" />
    </svg>
  ),
  analytics: (
    <svg className="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 16v-4M12.5 16V8M17 16v-6" />
    </svg>
  ),
};

const GROUPS: Group[] = [
  {
    label: "Strategy",
    items: [
      { href: "/", label: "Strategy", icon: I.overview },
      // Templates now live inside the pillar they serve, so there's no
      // separate Templates tab.
      { href: "/pillars", label: "Content Pillars", icon: I.templates },
      { href: "/brand-kit", label: "Brand kit", icon: I.brand },
    ],
  },
  {
    label: "Content",
    items: [
      { href: "/calendar", label: "Calendar", icon: I.calendar },
      { href: "/scheduler", label: "Scheduler", icon: I.scheduler },
    ],
  },
  {
    label: "Engagement",
    items: [
      { href: "/engagement", label: "Replies", icon: I.engagement },
      // The quarterly report lives inside Analytics, not as its own tab.
      { href: "/analytics", label: "Analytics", icon: I.analytics },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="sidebar" aria-label="Main">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="sidebar-logo" src="/brand/logo.webp" alt="Lab for Us" />

      {GROUPS.map((g) => (
        <div className="nav-group" key={g.label}>
          <div className="nav-group-label">{g.label}</div>
          {g.items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              className="nav-row"
              aria-current={pathname === it.href ? "page" : undefined}
            >
              {it.icon}
              {it.label}
            </Link>
          ))}
        </div>
      ))}

      <div className="nav-foot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="nav-mascot"
          src="/brand/mascot.webp"
          alt=""
          aria-hidden="true"
        />
        <div className="nav-user">
          Shared board, everyone sees the same live picture.
        </div>
      </div>
    </nav>
  );
}
