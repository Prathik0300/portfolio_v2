import { experienceItems } from "@/content/experience";
import { formatRange } from "@/lib/format";
import styles from "./Ledger.module.css";

/** Interim /experience layout (concept A): grouped by company, native <details>, zero JS. */
export function Ledger() {
  const groups: Array<{ company: string; location?: string; roles: typeof experienceItems }> = [];
  for (const r of experienceItems) {
    const g = groups.find((x) => x.company === r.company);
    if (g) g.roles.push(r);
    else groups.push({ company: r.company, location: r.location, roles: [r] });
  }

  return (
    <div className={styles.ledger}>
      {groups.map((g, gi) => (
        <section key={g.company} className={styles.company} aria-label={g.company}>
          <h2 className={`mono ${styles.coHead}`}>
            <span>{g.company}</span>
            {g.location && <span>{g.location}</span>}
          </h2>
          {g.roles.map((r, ri) => (
            <details key={r.id} className={styles.role} open={gi === 0 && ri === 0}>
              <summary>
                <span className={styles.node} aria-hidden />
                <h3 className={styles.title}>{r.role}</h3>
                <span className={`mono ${styles.date}`}>{formatRange(r.start, r.end)}</span>
                <span className={styles.hl}>{r.points[0]}</span>
              </summary>
              <ul>
                {r.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </details>
          ))}
        </section>
      ))}
    </div>
  );
}
