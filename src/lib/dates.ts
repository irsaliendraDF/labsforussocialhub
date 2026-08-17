export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MON_ABBR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** "2026-08-19" -> "Aug 19". Parsed as parts, never as a Date, so the
 *  rendered day can't drift by one in a negative-offset timezone. */
export function fmtDate(iso: string): string {
  const [, m, d] = iso.split("-");
  return `${MON_ABBR[Number(m) - 1]} ${Number(d)}`;
}

/** "2026-08-19" -> "Wed, Aug 19, 2026" */
export function fmtLongDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const dow = DOW[new Date(y, m - 1, d).getDay()];
  return `${dow}, ${MON_ABBR[m - 1]} ${d}, ${y}`;
}

export function toIso(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

export function todayIso(): string {
  const n = new Date();
  return toIso(n.getFullYear(), n.getMonth(), n.getDate());
}

/** Local-time datetime string for a timestamptz, e.g. "Aug 19, 2:30 PM". */
export function fmtDateTime(ts: string | null): string {
  if (!ts) return "Not set";
  const d = new Date(ts);
  if (Number.isNaN(d.getTime())) return "Not set";
  return `${MON_ABBR[d.getMonth()]} ${d.getDate()}, ${d.toLocaleTimeString(
    undefined,
    { hour: "numeric", minute: "2-digit" },
  )}`;
}

/** Value for <input type="datetime-local"> from a timestamptz, in local time. */
export function toDatetimeLocal(ts: string | null): string {
  const d = ts ? new Date(ts) : new Date();
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate(),
  )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Inclusive list of [year, monthIndex] pairs spanning the given ISO dates. */
export function monthRange(isos: string[]): [number, number][] {
  if (!isos.length) return [];
  let min = isos[0];
  let max = isos[0];
  for (const iso of isos) {
    if (iso < min) min = iso;
    if (iso > max) max = iso;
  }
  const [y0, m0] = [Number(min.slice(0, 4)), Number(min.slice(5, 7)) - 1];
  const [y1, m1] = [Number(max.slice(0, 4)), Number(max.slice(5, 7)) - 1];
  const out: [number, number][] = [];
  let y = y0;
  let m = m0;
  // Guard against a runaway loop if the data ever spans an absurd range.
  while ((y < y1 || (y === y1 && m <= m1)) && out.length < 240) {
    out.push([y, m]);
    m++;
    if (m > 11) {
      m = 0;
      y++;
    }
  }
  return out;
}
