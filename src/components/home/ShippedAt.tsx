import { shippedAt } from "@/lib/portfolioData";
import { Reveal } from "@/components/ui";
import styles from "./home.module.css";

export function ShippedAt() {
  return (
    <Reveal className={`wrap ${styles.shipped}`} as="div">
      <span className={styles.shippedLabel}>Shipped at</span>
      <ul className={styles.shippedList}>
        {shippedAt.map((name) => (
          <li key={name} className={styles.shippedName}>
            {name}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
