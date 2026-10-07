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

type Commit = { id: string; lane: number; start: string; when: string; title: string; org: string; body: string[] };

const mastersDegree = educationItems[0];

function buildCommits(): Commit[] {
  const roles: Commit[] = experienceItems.map((r) => ({
    id: r.id,
    lane: LANES.findIndex((l) => l.key === r.companyId),
    start: r.start,
    when: formatRange(r.start, r.end),
    title: r.role,
    org: r.company,
    body: r.points,
  }));
  const ms: Commit = {
    id: "uic-ms",
    lane: 0,
    start: mastersDegree.start,
    when: formatRange(mastersDegree.start, mastersDegree.end),
    title: "Started MS in Computer Science",
    org: "University of Illinois Chicago",
    body: [mastersDegree.note ?? ""].filter(Boolean),
  };
  return [...roles, ms].sort((a, b) => b.start.localeCompare(a.start));
}

export function GitLog() {
  const commits = buildCommits();
  // Each lane is drawn from its first to its last commit. The MS lane runs up to the top: I'm still enrolled.
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
            <details open={i === 0}>
              <summary>
                <span className={styles.when}>{c.when}</span>
                <span className={styles.title}>{c.title}</span>
                <span className={styles.org} style={{ color: LANES[c.lane].color }}> {c.org}</span>
              </summary>
              <div className={`md ${styles.body}`}>
                <ul>
                  {c.body.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </>
  );
}
