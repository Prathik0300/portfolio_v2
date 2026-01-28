"use client";

import { Skeleton } from "./Skeleton";
import styles from "./ProjectTileSkeleton.module.css";

export function ProjectTileSkeleton() {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Skeleton variant="rectangular" height="100%" borderRadius="8px" />
      </div>
      <div className={styles.overlay}>
        <div className={styles.overlayInner}>
          <Skeleton variant="text" width="80%" height="24px" className={styles.title} />
          <Skeleton variant="text" width="60%" height="16px" className={styles.techStack} />
        </div>
      </div>
    </article>
  );
}
