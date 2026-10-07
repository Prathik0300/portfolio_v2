import { nowItems } from "@/lib/portfolioData";
import { Reveal } from "@/components/ui";
import styles from "./home.module.css";

export function Now() {
  return (
    <section className="section">
      <div className={`wrap ${styles.nowGrid}`}>
        <Reveal>
          <span className="kicker">/ now</span>
        </Reveal>
        <div className={styles.nowList}>
          {nowItems.map((n, i) => (
            <Reveal key={n.text} index={i} className={styles.nowItem} as="div">
              <span aria-hidden>›</span>
              {n.text}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
