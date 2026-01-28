"use client";

import { Skeleton } from "./Skeleton";
import styles from "./TextSkeleton.module.css";

interface TextSkeletonProps {
  lines?: number;
  width?: string | number;
  className?: string;
}

export function TextSkeleton({ lines = 3, width = "100%", className = "" }: TextSkeletonProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width={index === lines - 1 ? "80%" : width}
          height="0.96rem"
          className={styles.line}
        />
      ))}
    </div>
  );
}
