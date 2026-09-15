import { Fragment } from "react";
import type { StepStatus, Where } from "@/lib/blueprint";

/*
 * Small pieces shared by the Best practices page and the role overviews, so
 * a pill or a status reads the same wherever it appears.
 */

/** One colour per moment, in order from Reach to Return and share. */
export const MOMENT_COLOR = ["#f46129", "#edb919", "#2a6a12", "#5ce1e6", "#9191ea", "#db385a"];

const PILL: Partial<Record<Where, { label: string; color: string }>> = {
  in_person: { label: "In person", color: "#2a6a12" },
  digital_library: { label: "Digital Library", color: "#2b29e6" },
  social_hub: { label: "Social Hub", color: "#0f8f97" },
};

export function WherePill({ where }: { where?: Where }) {
  const pill = where ? PILL[where] : undefined;
  if (!pill) return null;
  return (
    <span className="bp-pill" style={{ color: pill.color }}>
      {pill.label}
    </span>
  );
}

/** Renders the `**bold**` runs the data file uses inside a sentence. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) =>
        i % 2 ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

export const STATUS: Record<StepStatus, { label: string; badge: string }> = {
  built: { label: "Built", badge: "badge ok" },
  written: { label: "Written", badge: "badge ok" },
  in_build: { label: "In build", badge: "badge info" },
  to_write: { label: "To write", badge: "badge info" },
  to_scope: { label: "To scope", badge: "badge warn" },
  open: { label: "Needs a decision", badge: "badge warn" },
};

export function DecisionStar() {
  return (
    <svg className="bp-star" viewBox="-9 -9 18 18" aria-label="Needs a decision" role="img">
      <polygon
        points="0,-7 1.7,-2.35 6.66,-2.16 2.76,0.9 4.12,5.66 0,2.9 -4.12,5.66 -2.76,0.9 -6.66,-2.16 -1.7,-2.35"
        fill="#e04e10"
      />
    </svg>
  );
}
