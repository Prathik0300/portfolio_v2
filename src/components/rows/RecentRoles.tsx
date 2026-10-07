import { experienceItems } from "@/content/experience";
import { formatRange } from "@/lib/format";
import styles from "./Rows.module.css";

export function RecentRoles({ limit = 3 }: { limit?: number }) {
  return (
    <ul className={styles.list}>
      {experienceItems.slice(0, limit).map((r) => (
        <li key={r.id} className={styles.row}>
          <span className={styles.when}>{formatRange(r.start, r.end)}</span>
          <div>
            {r.role}, <span className="dim">{r.company}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
