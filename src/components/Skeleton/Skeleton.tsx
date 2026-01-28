"use client";

import styles from "./Skeleton.module.css";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({
  width,
  height,
  borderRadius,
  className = "",
  variant = "rectangular",
}: SkeletonProps) {
  const style: React.CSSProperties = {
    width: width || "100%",
    height: height || "1em",
    borderRadius: borderRadius || (variant === "circular" ? "50%" : "4px"),
  };

  return (
    <div
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={style}
      aria-label="Loading..."
      aria-busy="true"
    />
  );
}
