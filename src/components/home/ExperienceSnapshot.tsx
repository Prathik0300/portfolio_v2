import Link from "next/link";
import { experienceSnapshot } from "@/content/experience";
import { formatRange } from "@/lib/format";
import styles from "./home.module.css";

export function ExperienceSnapshot() {
  return (
    <section className="section" aria-labelledby="exp-title">
      <div className="wrap">
        <div className={styles.head}>
          <div className={styles.headText}>
            <h2 id="exp-title" className="kicker">Experience</h2>
            <p className={styles.note}>Six roles across three companies since 2021.</p>
          </div>
          <Link href="/experience" className={styles.more}>full history →</Link>
        </div>

        <ol className={styles.rows}>
          {experienceSnapshot.map((r) => (
            <li key={`${r.company}-${r.start}`} className={`reveal ${styles.row}`}>
              <div className={`mono ${styles.when}`}>
                {formatRange(r.start, r.end)}
                <span>{r.company}</span>
              </div>
              <div>
                <h3 className={styles.role}>{r.role}</h3>
                <p className={styles.line}>{r.line}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
