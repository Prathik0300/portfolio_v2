import Link from "next/link";
import type { ProjectItem } from "@/content/types";
import styles from "./ProjectCard.module.css";

type Variant = "flagship" | "compact" | "row";

const toneClass: Record<string, string> = {
  amber: styles.badgeAmber,
  green: styles.badgeGreen,
  faint: styles.badgeFaint,
};

const path = (p: ProjectItem) => `/work/${p.slug}`;
const cleanName = (name: string) => name.replace(/\s+[–-]\s+.*/, "");

export function ProjectCard({
  project,
  variant = "compact",
  index = 1,
  as: Heading = "h3",
}: {
  project: ProjectItem;
  variant?: Variant;
  index?: number;
  /** heading level, so the page outline stays sequential */
  as?: "h2" | "h3";
}) {
  const badge = project.badge ? (
    <span className={`${styles.badge} ${toneClass[project.badgeTone ?? "faint"]}`}>
      {project.badge}
    </span>
  ) : null;

  const outcomes = project.outcomes ?? [];
  const desc = project.blurb ?? project.description;

  const tagCount = variant === "flagship" ? 5 : variant === "row" ? 6 : 3;
  const tags = (project.techStack ?? []).slice(0, tagCount);

  return (
    <Link href={path(project)} className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.head}>
        <span className={`mono ${styles.index}`}>
          {String(index).padStart(2, "0")}
        </span>
        {badge}
      </div>

      <Heading className={variant === "compact" ? styles.titleSm : styles.title}>
        {cleanName(project.name)}
      </Heading>
      <p className={styles.desc}>{desc}</p>

      {outcomes.length > 0 && (
        <div className={styles.outcomes}>
          {outcomes.map((o) => (
            <div key={o.label} className={styles.outcome}>
              <span className={styles.outcomeValue}>{o.value}</span>
              <span className={styles.outcomeLabel}>{o.label}</span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.tags}>
        {tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>

      <span className={`mono ${styles.cta}`}>Read case study →</span>
    </Link>
  );
}
