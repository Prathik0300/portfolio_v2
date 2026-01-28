"use client";

import { Skeleton } from "./Skeleton";
import styles from "./IconSkeleton.module.css";

interface IconSkeletonProps {
  size?: number;
}

export function IconSkeleton({ size = 60 }: IconSkeletonProps) {
  return (
    <div className={styles.iconCard}>
      <div className={styles.iconBadge}>
        <Skeleton variant="rectangular" width={size} height={size} borderRadius="8px" />
      </div>
    </div>
  );
}
