const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function parts(v: string) {
  const [y, m] = v.split("-");
  return { year: y, month: MONTHS[Number(m) - 1] };
}

/** "2025-09","2025-12" -> "Sep – Dec 2025"; across years -> "Sep 2023 – Jul 2024". */
export function formatRange(start: string, end: string): string {
  const s = parts(start);
  if (end === "present") return `${s.month} ${s.year} – present`;
  const e = parts(end);
  return s.year === e.year
    ? `${s.month} – ${e.month} ${e.year}`
    : `${s.month} ${s.year} – ${e.month} ${e.year}`;
}
