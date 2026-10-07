import Link from "next/link";
import { featuredProjects } from "@/content/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import styles from "./home.module.css";

export function SelectedWork() {
  const flagship = featuredProjects.find((p) => p.flagship) ?? featuredProjects[0];
  const rest = featuredProjects.filter((p) => p !== flagship).slice(0, 2);

  return (
    <section className="section" aria-labelledby="work-title">
      <div className="wrap">
        <div className={styles.head}>
          <div className={styles.headText}>
            <h2 id="work-title" className="kicker">Selected work</h2>
            <p className={styles.note}>Case studies: the constraint, the build, and what changed.</p>
          </div>
          <Link href="/work" className={styles.more}>all work →</Link>
        </div>

        <div className={styles.workStack}>
          {flagship && (
            <div className="reveal">
              <ProjectCard project={flagship} variant="flagship" index={1} />
            </div>
          )}
          <div className={styles.workDuo}>
            {rest.map((p, i) => (
              <div key={p.slug} className="reveal">
                <ProjectCard project={p} variant="compact" index={i + 2} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
