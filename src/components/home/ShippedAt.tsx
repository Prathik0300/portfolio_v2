import { shippedAt } from "@/content/profile";
import styles from "./home.module.css";

export function ShippedAt() {
  return (
    <div className={`wrap ${styles.shipped}`}>
      <p className={styles.shippedLabel}>Shipped at</p>
      <ul className={styles.shippedList}>
        {shippedAt.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
