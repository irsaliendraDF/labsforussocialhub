import type { GlyphKind } from "@/lib/blueprint";

/**
 * Line glyphs for the six blueprint layers, drawn on a 20 by 20 grid. The
 * caller sets stroke and size, so the same glyph serves the diagram gutter and
 * the layer cards above it.
 */
export function LayerGlyph({ kind }: { kind: GlyphKind }) {
  switch (kind) {
    case "house":
      return (
        <>
          <path d="M2.5 9 L10 3 L17.5 9 L17.5 17 L2.5 17 Z" />
          <path d="M7.6 17 L7.6 11.6 L12.4 11.6 L12.4 17" />
        </>
      );
    case "person":
      return (
        <>
          <circle cx="10" cy="6.4" r="3.4" />
          <path d="M3.4 17.2 C3.4 12.9 6.3 11 10 11 C13.7 11 16.6 12.9 16.6 17.2" />
        </>
      );
    case "laptop":
      return (
        <>
          <rect x="4.2" y="3.6" width="11.6" height="8.4" rx="1.3" />
          <path d="M2 15.9 L18 15.9 M4.2 12 L2 15.9 M15.8 12 L18 15.9" />
        </>
      );
    case "team":
      return (
        <>
          <circle cx="6.6" cy="6.2" r="2.6" />
          <path d="M1.8 16.4 C1.8 12.8 3.9 11.2 6.6 11.2 C7.6 11.2 8.5 11.4 9.3 11.9" />
          <circle cx="13.6" cy="7.2" r="3" />
          <path d="M8.2 17.4 C8.2 13.5 10.6 11.9 13.6 11.9 C16.6 11.9 19 13.5 19 17.4" />
        </>
      );
    case "backstage":
      return (
        <>
          <rect x="2.8" y="7.6" width="14.4" height="8.4" rx="1.2" />
          <path d="M10 16 L10 18.4 M6.8 18.4 L13.2 18.4" />
          <path d="M1.2 3.6 L18.8 3.6" />
          <path d="M2.4 3.6 Q4 7.3 5.6 3.6 Q7.2 7.3 8.8 3.6 Q10.4 7.3 12 3.6 Q13.6 7.3 15.2 3.6 Q16.8 7.3 18.1 4.4" />
        </>
      );
    case "gear":
      return (
        <>
          <circle cx="10" cy="10" r="5.4" />
          <circle cx="10" cy="10" r="2.4" />
          <path d="M10 4.6 L10 2.3 M10 15.4 L10 17.7 M15.4 10 L17.7 10 M4.6 10 L2.3 10 M13.82 6.18 L15.45 4.55 M6.18 13.82 L4.55 15.45 M13.82 13.82 L15.45 15.45 M6.18 6.18 L4.55 4.55" />
        </>
      );
    default:
      return null;
  }
}
