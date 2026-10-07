import { stackItems, stackLabel } from "@/content/profile";
import styles from "./home.module.css";

export function Stack() {
  return (
    <section className="section" aria-label={stackLabel}>
      <div className={`wrap ${styles.stack}`}>
        <p className={styles.stackLabel}>{stackLabel}</p>
        <ul className={styles.stackList}>
          {stackItems.map((s) => (
            <li key={s} data-scramble>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
