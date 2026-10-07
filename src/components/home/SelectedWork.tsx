import Link from "next/link";
import { projectItems } from "@/lib/portfolioData";
import { Reveal } from "@/components/ui";
import { ProjectCard } from "@/components/work/ProjectCard";
import styles from "./home.module.css";

export function SelectedWork() {
  const featured = projectItems.filter((p) => p.featured);
  const flagship = featured.find((p) => p.flagship) ?? featured[0];
  const rest = featured.filter((p) => p !== flagship).slice(0, 2);

  return (
    <section id="work" className="section">
      <div className="wrap">
        <Reveal className={styles.head} as="div">
          <div className={styles.headText}>
            <span className="kicker">Selected work</span>
            <p className={styles.headNote}>Case studies — the constraint, the build, and what changed.</p>
          </div>
          <Link href="/work" className={styles.moreLink}>all work →</Link>
        </Reveal>

        <div className={styles.workStack}>
          {flagship && (
            <Reveal>
              <ProjectCard project={flagship} variant="flagship" index={1} />
            </Reveal>
          )}
          <div className={styles.workDuo}>
            {rest.map((p, i) => (
              <Reveal key={p.slug} index={i} className={styles.workDuoCell}>
                <ProjectCard project={p} variant="compact" index={i + 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
