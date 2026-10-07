import { stackGroups } from "@/lib/portfolioData";
import { Reveal } from "@/components/ui";
import styles from "./home.module.css";

export function Stack() {
  const group = stackGroups[0];
  if (!group) return null;
  return (
    <section id="stack" className="section">
      <div className="wrap">
        <Reveal className={styles.stackRow} as="div">
          <span className={styles.stackLabel}>{group.label}</span>
          <p className={styles.stackList}>
            {group.items.join("  ·  ")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
