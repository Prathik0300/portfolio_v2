"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef } from "react";
import type { ProjectItem } from "@/lib/portfolioData";
import styles from "@/components/ProjectDetail/ProjectDetailPage.module.css";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useFixedWithinSection } from "@/hooks/useFixedWithinSection";
import { useImageModal } from "@/hooks/useImageModal";
import { scrollToId } from "@/utils/dom";
import { DesignStepIcon } from "@/components/ProjectDetail/DesignStepIcon";
import { DiagramModal } from "@/components/ProjectDetail/DiagramModal";

type Props = { project: ProjectItem };

export function ProjectDetailClient({ project }: Props) {
  const mediaItems = useMemo(() => {
    if (project.detailMedia && project.detailMedia.length > 0) {
      return project.detailMedia;
    }
    return [project.tileMedia];
  }, [project]);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const coverMedia = project.coverMedia ?? mediaItems[0];
  const designSteps = project.detailDesignProcessSteps ?? [];

  const reflectionOutcomes = project.detailReflectionOutcomes ?? "";
  const reflectionMoreTime = project.detailReflectionMoreTime ?? "";

  const processSectionRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const { mode, left, width } = useFixedWithinSection({
    enabled: !isMobile,
    fixedTopPx: 24,
    sectionEl: processSectionRef.current,
    navEl: navRef.current,
  });

  const modal = useImageModal();

  const solutionItems = [
    ...(project.detailSolutionPoints ?? []),
    ...(project.detailHighlights ?? []),
  ];

  const flowBlocks =
    designSteps.find((s) => s.id === "ideate")?.images?.length
      ? (designSteps.find((s) => s.id === "ideate")?.images ?? [])
      : [];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.cover} aria-label="Project cover">
          {coverMedia?.kind === "image" ? (
            <Image
              src={coverMedia.src}
              alt={coverMedia.alt ?? project.name}
              fill
              sizes="(min-width: 1024px) 100vw, 100vw"
              className={styles.coverMedia}
            />
          ) : coverMedia ? (
            <video
              src={coverMedia.src}
              className={styles.coverVideo}
              autoPlay
              loop
              muted
              playsInline
            />
          ) : null}
        </section>

        <header className={styles.titleBlock}>
          <h1 className={styles.title}>{project.name}</h1>
          {project.detailSubtitle && <p className={styles.subtitle}>{project.detailSubtitle}</p>}
        </header>

        {(project.detailDateRange ||
          project.detailTechStack ||
          project.detailAssociation ||
          project.detailOrganization) && (
          <section className={styles.metaRibbon}>
            <div>
              <div className={styles.metaLabel}>Duration</div>
              <div className={styles.metaValue}>{project.detailDateRange ?? "—"}</div>
            </div>
            <div>
              <div className={styles.metaLabel}>Tech Stack</div>
              <div className={styles.metaValue}>
                {project.detailTechStack ?? `Tech Stack: ${project.techStack.join(" · ")}`}
              </div>
            </div>
            <div>
              <div className={styles.metaLabel}>Association</div>
              <div className={styles.metaValue}>
                {project.detailOrganization?.name ?? "—"}
              </div>
              {project.detailAssociation && (
                <div className={styles.mutedText}>{project.detailAssociation}</div>
              )}
            </div>
          </section>
        )}

        <div className={styles.divider} />

        <section className={styles.contentStack}>
          <div>
            <h3 className={styles.sectionTitle}>Motivation</h3>
            <p className={styles.mutedText}>
              {project.detailMotivation ?? project.detailOverview ?? project.description}
            </p>
          </div>

          {(project.detailSolution || solutionItems.length > 0) && (
            <div>
              <h3 className={styles.sectionTitle}>Solution</h3>
              {project.detailSolution && <p className={styles.mutedText}>{project.detailSolution}</p>}
              {solutionItems.length > 0 && (
                <ul className={styles.bulletList}>
                  {solutionItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <div>
            <h3 className={styles.sectionTitle}>Design Process</h3>
            {project.detailDesignProcess && <p className={styles.mutedText}>{project.detailDesignProcess}</p>}
          </div>

          {designSteps.length > 0 && (
            <>
              <div className={styles.designIconGrid}>
                {designSteps.map((step) => (
                  <div key={step.id} className={styles.designIconItem}>
                    <div className={styles.designIconBox}>
                      <DesignStepIcon id={step.id} />
                    </div>
                    <div className={styles.designIconTitle}>{step.title}</div>
                    <div className={styles.designIconSubtitle}>{step.subtitle}</div>
                  </div>
                ))}
              </div>

              <div ref={processSectionRef} className={styles.processLayout}>
                {!isMobile && (
                  <div className={styles.processNavWrap}>
                    <aside
                      ref={navRef}
                      className={styles.processNav}
                      style={{
                        position: mode === "fixed" ? "fixed" : mode === "bottom" ? "absolute" : "static",
                        top: mode === "fixed" ? "1.5rem" : undefined,
                        bottom: mode === "bottom" ? 0 : undefined,
                        left: mode === "fixed" ? left : undefined,
                        width: mode === "fixed" ? width : undefined,
                      }}
                    >
                      {designSteps.map((step) => (
                        <button
                          key={`nav-${step.id}`}
                          type="button"
                          className={styles.processNavBtn}
                          onClick={() => scrollToId(`process-${step.id}`)}
                        >
                          {step.title}
                        </button>
                      ))}
                      {(reflectionOutcomes || reflectionMoreTime) && (
                        <button
                          type="button"
                          className={`${styles.processNavBtn} ${styles.processNavBtnStrong}`}
                          onClick={() => scrollToId("process-reflection")}
                        >
                          Reflection
                        </button>
                      )}
                    </aside>
                  </div>
                )}

                <div className={styles.processSteps}>
                  {designSteps.map((step) => (
                    <section key={step.id} id={`process-${step.id}`}>
                      <div className={styles.processStepTitleRow}>
                        <h4 className={styles.processStepTitle}>{step.title}</h4>
                        <span className={styles.processStepRule} />
                      </div>

                      <p className={styles.processStepSubtitle}>{step.subtitle}</p>

                      {step.paragraphs?.map((p) => (
                        <p key={p} className={styles.mutedText} style={{ marginBottom: "0.75rem" }}>
                          {p}
                        </p>
                      ))}

                      {step.summary && (
                        <p className={styles.mutedText} style={{ marginBottom: "0.75rem" }}>
                          {step.summary}
                        </p>
                      )}

                      {step.id === "ideate" && flowBlocks.length > 0 && (
                        <div className={styles.diagramGrid}>
                          {flowBlocks.map((img, idx) => {
                            const title =
                              idx === 0 ? "User Flow Diagram" : idx === 1 ? "Task Flow Diagram" : "Diagram";
                            return (
                              <div key={`${img.src}-${idx}`}>
                                <div className={styles.diagramTitle}>{title}</div>
                                <div
                                  className={styles.diagramFrame}
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => modal.open({ src: img.src, alt: img.alt, title })}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") modal.open({ src: img.src, alt: img.alt, title });
                                  }}
                                >
                                  <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    sizes="(min-width: 1024px) 70vw, 100vw"
                                    className={styles.diagramImage}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {step.id === "design" && project.designImages && project.designImages.length > 0 && (
                        <div className={styles.designImagesColumn}>
                          {project.designImages.map((img) => (
                            <div key={img.src} className={styles.designImageFrame}>
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                sizes="(min-width: 1024px) 70vw, 100vw"
                                className={styles.designImage}
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      <ul className={styles.processBulletList}>
                        {step.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </section>
                  ))}

                  {(reflectionOutcomes || reflectionMoreTime) && (
                    <section id="process-reflection">
                      <div className={styles.processStepTitleRow}>
                        <h4 className={styles.processStepTitle}>Reflection</h4>
                        <span className={styles.processStepRule} />
                      </div>
                      {reflectionOutcomes && (
                        <>
                          <h5 className={styles.sectionTitle} style={{ marginTop: "1rem" }}>
                            Outcomes
                          </h5>
                          <p className={styles.mutedText}>{reflectionOutcomes}</p>
                        </>
                      )}
                      {reflectionMoreTime && (
                        <>
                          <h5 className={styles.sectionTitle} style={{ marginTop: "1.5rem" }}>
                            If I had more time
                          </h5>
                          <p className={styles.mutedText}>{reflectionMoreTime}</p>
                        </>
                      )}
                    </section>
                  )}
                </div>
              </div>
            </>
          )}
        </section>

        <footer className={styles.projectFooter}>
          <div className={styles.footerBrand}>Prathik</div>
          <nav className={styles.footerNav} aria-label="Project page footer links">
            <Link href="/#home" className={styles.footerLink}>
              Home
            </Link>
            <Link href="/#about" className={styles.footerLink}>
              About
            </Link>
            <Link href="/#projects" className={styles.footerLink}>
              Works
            </Link>
            <Link href="/#contact" className={styles.footerLink}>
              Contact
            </Link>
          </nav>
        </footer>
      </div>

      {modal.active && (
        <DiagramModal
          active={modal.active}
          zoom={modal.zoom}
          pan={modal.pan}
          isPanning={modal.isPanning}
          onClose={modal.close}
          onZoomIn={modal.zoomIn}
          onZoomOut={modal.zoomOut}
          onReset={modal.reset}
          onMouseDown={modal.onMouseDown}
          onWheel={modal.onWheel}
        />
      )}
    </main>
  );
}

