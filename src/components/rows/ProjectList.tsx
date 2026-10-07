import Link from "next/link";
import { projects } from "@/content/projects";
import styles from "./Rows.module.css";

const clean = (n: string) => n.replace(/\s+[–-]\s+.*/, "");

/** `ls -t projects/` : newest first. `detailed` adds the stack line. */
export function ProjectList({ limit, detailed = false }: { limit?: number; detailed?: boolean }) {
  const list = limit ? projects.slice(0, limit) : projects;
  return (
    <ul className={styles.list}>
      {list.map((p) => (
        <li key={p.slug} className={styles.row}>
          <span className={styles.when}>{p.dateLabel}</span>
          <div>
            <Link href={`/projects/${p.slug}`} className={styles.name}>{clean(p.name)}</Link>
            <p className={styles.blurb}>{p.blurb}</p>
            {detailed && <p className={styles.stack}>{p.stack.join(", ")}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
