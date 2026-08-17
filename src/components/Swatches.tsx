"use client";

import { PALETTE } from "@/lib/content";
import { ToastProvider, useToast } from "./Toast";

function copy(text: string, done: () => void) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(text).then(done).catch(() => fallback(text, done));
  } else {
    fallback(text, done);
  }
}

function fallback(text: string, done: () => void) {
  const ta = document.createElement("textarea");
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  try {
    document.execCommand("copy");
  } catch {
    /* clipboard unavailable — the hex is still on screen to read */
  }
  ta.remove();
  done();
}

function Grid() {
  const toast = useToast();
  return (
    <div className="swatches">
      {PALETTE.map(([name, hex]) => (
        <button
          className="sw"
          type="button"
          key={name}
          onClick={() => copy(hex, () => toast(`Copied ${hex}`))}
          aria-label={`Copy ${name} ${hex}`}
        >
          <div
            className="chip"
            style={{
              background: hex,
              boxShadow:
                hex.toLowerCase() === "#ffffff"
                  ? "inset 0 0 0 1px #ddd"
                  : undefined,
            }}
          />
          <div className="meta">
            <div className="nm">{name}</div>
            <div className="hx">{hex}</div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default function Swatches() {
  return (
    <ToastProvider>
      <Grid />
    </ToastProvider>
  );
}
