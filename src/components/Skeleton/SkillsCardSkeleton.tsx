"use client";

import { Skeleton } from "./Skeleton";
import { IconSkeleton } from "./IconSkeleton";
import styles from "./SkillsCardSkeleton.module.css";

interface SkillsCardSkeletonProps {
  iconCount?: number;
  showLanguages?: boolean;
}

export function SkillsCardSkeleton({ iconCount = 12, showLanguages = false }: SkillsCardSkeletonProps) {
  return (
    <article className={styles.card}>
      <div className={styles.subHeader}>
        <Skeleton variant="text" width="200px" height="1rem" className={styles.subHeading} />
        <Skeleton variant="text" width="180px" height="0.8rem" className={styles.subHint} />
      </div>
      {showLanguages ? (
        <div className={styles.languageGrid}>
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className={styles.languageCard}>
              <Skeleton variant="text" width="60px" height="1.3rem" className={styles.languageNative} />
              <Skeleton variant="text" width="100px" height="0.85rem" className={styles.languageLevel} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.iconGrid}>
          {Array.from({ length: iconCount }).map((_, index) => (
            <IconSkeleton key={index} size={60} />
          ))}
        </div>
      )}
    </article>
  );
}
