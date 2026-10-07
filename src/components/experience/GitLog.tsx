import type { ReactNode } from "react";
import { educationItems, experienceItems } from "@/content/experience";
import { formatRange } from "@/lib/format";
import styles from "./GitLog.module.css";

/** One lane per place I've been, like branches. Order and colors are fixed so the graph reads left to right. */
const LANES = [
  { key: "uic", label: "uic-ms", color: "var(--blue)" },
  { key: "radiofx", label: "radiofx", color: "var(--green)" },
  { key: "bfhl", label: "bajaj-finserv-health", color: "var(--orange)" },
  { key: "ubs", label: "ubs", color: "var(--purple)" },
] as const;

type Point = { lead: string; detail?: string };
type Commit = { id: string; lane: number; start: string; when: string; title: string; org: string; where?: string; body: Point[] };

const [masters] = educationItems;

function buildCommits(): Commit[] {
  const roles: Commit[] = experienceItems.map((r) => ({
    id: r.id,
    lane: LANES.findIndex((l) => l.key === r.companyId),
    start: r.start,
    when: formatRange(r.start, r.end),
    title: r.role,
    org: r.company,
    where: r.location,
    body: r.points,
  }));
  const ms: Commit = {
    id: "uic-ms",
    lane: 0,
    start: masters.start,
    when: formatRange(masters.start, masters.end),
    title: "MS in Computer Science",
    org: masters.school,
    where: "Chicago, IL",
    body: masters.note ? [{ lead: masters.note }] : [],
  };
  return [...roles, ms].sort((a, b) => b.start.localeCompare(a.start));
}

/** Numbers and metrics stand out in yellow, so the results are what the eye lands on. */
function Highlight({ text }: { text: string }): ReactNode {
  return text.split(/(\d[\d,.]*\+?%?(?: ms| minutes| KB)?)/).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className={styles.num}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}

export function GitLog() {
  const commits = buildCommits();
  // Each lane is drawn from its newest to its oldest commit. The MS lane ran until May 2026, past every other row, so it starts at the top.
  const span = LANES.map((_, lane) => {
    const rows = commits.map((c, i) => (c.lane === lane ? i : -1)).filter((i) => i >= 0);
    return { first: lane === 0 ? 0 : rows[0], last: rows[rows.length - 1] };
  });

  return (
    <>
      <ul className={styles.legend} aria-label="Branches">
        {LANES.map((l) => (
          <li key={l.key}>
            <span style={{ color: l.color }}>*</span> {l.label}
          </li>
        ))}
      </ul>
      <ol className={styles.log}>
        {commits.map((c, i) => (
          <li key={c.id} className={styles.commit}>
            <div className={styles.graph} aria-hidden="true">
              {LANES.map((l, lane) => {
                const on = i >= span[lane].first && i <= span[lane].last;
                const cls = [styles.lane, on ? styles.on : "", on && i === span[lane].first ? styles.top : "", on && i === span[lane].last ? styles.end : ""].join(" ");
                return (
                  <span key={l.key} className={cls} style={{ color: l.color }}>
                    {c.lane === lane && <b>*</b>}
                  </span>
                );
              })}
            </div>
            <details open={c.body.length > 0} data-empty={c.body.length === 0 || undefined}>
              <summary>
                <span className={styles.head}>
                  <span className={styles.title}>{c.title}</span>
                  <span className={styles.org} style={{ color: LANES[c.lane].color }}>{c.org}</span>
                </span>
                <span className={styles.when}>
                  {c.when}
                  {c.where ? ` · ${c.where}` : ""}
                </span>
              </summary>
              {c.body.length > 0 && (
                <ul className={styles.points}>
                  {c.body.map((p) => (
                    <li key={p.lead}>
                      <strong className={styles.lead}>
                        <Highlight text={p.lead} />
                      </strong>
                      {p.detail && (
                        <span className={styles.detail}>
                          <Highlight text={p.detail} />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </details>
          </li>
        ))}
      </ol>
    </>
  );
}
