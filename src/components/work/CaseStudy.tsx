import Link from "next/link";
import type { ProjectItem } from "@/content/types";
import styles from "./CaseStudy.module.css";

function sectionsOf(p: ProjectItem) {
  const s: Array<{ id: string; label: string }> = [];
  if (p.detailOverview) s.push({ id: "overview", label: "overview" });
  if (p.detailProblem) s.push({ id: "problem", label: "problem" });
  if (p.detailSolution || (p.detailSolutionPoints?.length ?? 0) > 0)
    s.push({ id: "approach", label: "approach" });
  if ((p.detailDesignProcessSteps?.length ?? 0) > 0)
    s.push({ id: "process", label: "process" });
  if ((p.detailHighlights?.length ?? 0) > 0) s.push({ id: "highlights", label: "highlights" });
  if (p.detailReflectionOutcomes || p.detailReflectionMoreTime)
    s.push({ id: "reflection", label: "reflection" });
  return s;
}

export function CaseStudy({ project: p }: { project: ProjectItem }) {
  const sections = sectionsOf(p);
  const links = p.detailLinks ?? [];

  return (
    <article className="wrap" style={{ paddingBottom: "clamp(48px,7vw,80px)" }}>
      <div className={styles.crumb}>
        <Link href="/work" className="mono">← back to work</Link>
      </div>

      <header className={styles.hero}>
        <div className={`mono ${styles.path}`}>work / {p.slug}</div>
        <span className="kicker" style={{ marginTop: 16 }}>
          {p.detailProjectType ?? p.detailAssociation ?? "Project"}
          {p.detailDateRange ? ` · ${p.detailDateRange}` : ""}
        </span>
        <h1 className={styles.h1}>{p.name}</h1>
        {p.detailSubtitle && <p className={styles.sub}>{p.detailSubtitle}</p>}
        {links.length > 0 && (
          <div className={styles.heroLinks}>
            {links.map((l, i) => (
              <a
                key={l.url}
                href={l.url}
                target="_blank"
                rel="noreferrer"
                className={`btn ${i === 0 ? "btn--primary" : ""}`}
              >
                {l.label} →
              </a>
            ))}
          </div>
        )}
      </header>

      {(p.outcomes?.length ?? 0) > 0 && (
        <div className={styles.metrics}>
          {p.outcomes!.map((o) => (
            <div key={o.label} className={styles.metric}>
              <div className={`mono ${styles.metricValue}`} data-count>{o.value}</div>
              <div className={styles.metricLabel}>{o.label}</div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.body}>
        <div className={styles.main}>
          {p.detailOverview && (
            <Section id="overview" title="Overview">
              <p>{p.detailOverview}</p>
            </Section>
          )}

          {p.detailProblem && (
            <Section id="problem" title="The problem">
              <p>{p.detailProblem}</p>
              {p.detailMotivation && <p>{p.detailMotivation}</p>}
            </Section>
          )}

          {(p.detailSolution || (p.detailSolutionPoints?.length ?? 0) > 0) && (
            <Section id="approach" title="Approach">
              {p.detailSolution && <p>{p.detailSolution}</p>}
              {(p.detailSolutionPoints?.length ?? 0) > 0 && (
                <div className={styles.steps}>
                  {p.detailSolutionPoints!.map((pt, i) => {
                    const [head, ...rest] = pt.split(" – ");
                    const hasHead = rest.length > 0;
                    return (
                      <div key={i} className={styles.step}>
                        <div className={`mono ${styles.stepNo}`}>
                          {String(i + 1).padStart(2, "0")}
                        </div>
                        <div>
                          {hasHead && <strong className={styles.stepHead}>{head}</strong>}
                          <span>{hasHead ? rest.join(" – ") : pt}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Section>
          )}

          {(p.detailDesignProcessSteps?.length ?? 0) > 0 && (
            <Section id="process" title="Process">
              <div className={styles.procList}>
                {p.detailDesignProcessSteps!.map((st) => (
                  <div key={st.id} className={styles.procStep}>
                    <div className={styles.procStepHead}>
                      <h3>{st.title}</h3>
                      <span className={`mono ${styles.procSub}`}>{st.subtitle}</span>
                    </div>
                    {st.paragraphs?.map((para, i) => (
                      <p key={i} className={styles.procPara}>{para}</p>
                    ))}
                    {st.images?.map((img) => (
                      <div key={img.src} className={styles.figure}>
                        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP: plain img avoids client JS and an optimizer hop */}
                        <img
                          src={img.src}
                          srcSet={img.width > 900 ? `${img.src.replace(".webp", "-800.webp")} 800w, ${img.src} ${img.width}w` : undefined}
                          sizes="(min-width: 940px) 680px, 100vw"
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          loading="lazy"
                          decoding="async"
                          className={styles.figImg}
                        />
                      </div>
                    ))}
                    {st.bullets?.length > 0 && (
                      <ul className={styles.bullets}>
                        {st.bullets.map((b, i) => <li key={i}>{b}</li>)}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </Section>
          )}

          {(p.detailHighlights?.length ?? 0) > 0 && (
            <Section id="highlights" title="Highlights">
              <ul className={styles.bullets}>
                {p.detailHighlights!.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </Section>
          )}

          {(p.detailReflectionOutcomes || p.detailReflectionMoreTime) && (
            <Section id="reflection" title="Reflection" last>
              {p.detailReflectionOutcomes && (
                <p><strong className={styles.stepHead}>What worked: </strong>{p.detailReflectionOutcomes}</p>
              )}
              {p.detailReflectionMoreTime && (
                <p><strong className={styles.stepHead}>With more time: </strong>{p.detailReflectionMoreTime}</p>
              )}
            </Section>
          )}
        </div>

        <aside className={styles.side}>
          <div className={styles.sideSticky}>
            {sections.length > 1 && (
              <div className={styles.sideBlock}>
                <div className={`mono ${styles.sideLabel}`}>On this page</div>
                <div className={styles.toc}>
                  {sections.map((s) => (
                    <a key={s.id} href={`#${s.id}`} className="mono">{s.label}</a>
                  ))}
                </div>
              </div>
            )}
            <div className={styles.sideBlock}>
              <div className={`mono ${styles.sideLabel}`}>Stack</div>
              <div className={styles.chips}>
                {(p.detailTechStack
                  ? p.detailTechStack.split(/[·•]/).map((x) => x.trim()).filter(Boolean)
                  : p.techStack
                ).map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
            <div className={styles.sideBlock}>
              <div className={`mono ${styles.sideLabel}`}>Meta</div>
              <div className={`mono ${styles.meta}`}>
                {p.detailAssociation && <div>{p.detailAssociation}</div>}
                {p.detailDateRange && <div>{p.detailDateRange}</div>}
                {p.detailOrganization?.name && <div>{p.detailOrganization.name}</div>}
              </div>
            </div>
            <div className={styles.sideBlock}>
              <Link href="/work" className="btn" style={{ width: "100%", justifyContent: "center" }}>
                ← all work
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </article>
  );
}

function Section({
  id,
  title,
  children,
  last,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section id={id} className={`reveal ${styles.section} ${last ? styles.sectionLast : ""}`}>
      <h2 className={styles.h2}>{title}</h2>
      {children}
    </section>
  );
}
