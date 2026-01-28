"use client";

import { Skeleton } from "./Skeleton";
import styles from "./ExperienceCardSkeleton.module.css";

export function ExperienceCardSkeleton() {
  return (
    <article className={styles.card}>
      <div className={styles.collapsedHeader}>
        <div className={styles.logoWrap}>
          <Skeleton variant="rectangular" width={40} height={40} borderRadius="1rem" />
        </div>
        <div className={styles.roleOnly}>
          <Skeleton variant="text" width="60%" height="1rem" />
        </div>
        <div className={styles.chevron}>
          <Skeleton variant="rectangular" width={16} height={16} borderRadius="2px" />
        </div>
      </div>
    </article>
  );
}
