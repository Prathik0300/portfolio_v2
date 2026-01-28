"use client";

import { Skeleton } from "./Skeleton";
import styles from "./ServiceCardSkeleton.module.css";

export function ServiceCardSkeleton() {
  return (
    <div className={styles.card}>
      <div className={styles.face1}>
        <div className={styles.content}>
          <Skeleton variant="text" width="90%" height="1.1rem" className={styles.title} />
          <Skeleton variant="text" width="100%" height="0.9375rem" className={styles.text} />
          <Skeleton variant="text" width="95%" height="0.9375rem" className={styles.text} />
          <Skeleton variant="text" width="85%" height="0.9375rem" className={styles.text} />
        </div>
      </div>
      <div className={styles.face2}>
        <div className={styles.face2Content}>
          <div className={styles.serviceIcon}>
            <Skeleton variant="rectangular" width={64} height={64} borderRadius="8px" />
          </div>
          <Skeleton variant="text" width="80%" height="1.1rem" className={styles.title} />
          <Skeleton variant="text" width="100%" height="0.9375rem" className={styles.text} />
          <Skeleton variant="text" width="90%" height="0.9375rem" className={styles.text} />
        </div>
      </div>
    </div>
  );
}
