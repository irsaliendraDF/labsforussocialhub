const SMALL = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "in", "of", "on", "or", "the", "to"]);

/** Title Case for headings and nav labels. Small words stay lower case except at the start. */
export function titleCase(s: string): string {
  return s
    .split(" ")
    .map((w, i) =>
      i > 0 && SMALL.has(w.toLowerCase())
        ? w.toLowerCase()
        : w.charAt(0).toUpperCase() + w.slice(1),
    )
    .join(" ");
}
