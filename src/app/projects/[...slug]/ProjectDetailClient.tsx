"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { ProjectItem } from "@/lib/portfolioData";
import styles from "./page.module.css";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useFixedWithinSection } from "@/hooks/useFixedWithinSection";
import { useImageModal } from "@/hooks/useImageModal";
import { scrollToId } from "@/utils/dom";
import { DesignStepIcon } from "@/components/ProjectDetail/DesignStepIcon";
import { DiagramModal } from "@/components/ProjectDetail/DiagramModal";

type Props = { project: ProjectItem };

export function ProjectDetailClient({ project }: Props) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const coverMedia = project?.coverMedia ?? null;
  const designSteps = project.detailDesignProcessSteps ?? [];

  const reflectionOutcomes = project.detailReflectionOutcomes ?? "";
  const reflectionMoreTime = project.detailReflectionMoreTime ?? "";

  const processSectionRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  const { mode, left, width } = useFixedWithinSection({
    enabled: !isMobile,
    fixedTopPx: 24,
    sectionEl: processSectionRef,
    navEl: navRef,
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

  const dataPipelineBlocks =
    designSteps.find((s) => s.id === "data-pipeline")?.images?.length
      ? (designSteps.find((s) => s.id === "data-pipeline")?.images ?? [])
      : [];

  const implementationBlocks =
    designSteps.find((s) => s.id === "implementation")?.images?.length
      ? (designSteps.find((s) => s.id === "implementation")?.images ?? [])
      : [];

  const systemArchitectureBlocks =
    designSteps.find((s) => s.id === "system-architecture")?.images?.length
      ? (designSteps.find((s) => s.id === "system-architecture")?.images ?? [])
      : [];

  const emotionPipelineBlocks =
    designSteps.find((s) => s.id === "emotion-pipeline")?.images?.length
      ? (designSteps.find((s) => s.id === "emotion-pipeline")?.images ?? [])
      : [];

  const recommendationEngineBlocks =
    designSteps.find((s) => s.id === "recommendation-engine")?.images?.length
      ? (designSteps.find((s) => s.id === "recommendation-engine")?.images ?? [])
      : [];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {coverMedia ? (
          <section className={styles.cover} aria-label="Project cover">
            {coverMedia.kind === "image" ? (
              <Image
                src={coverMedia.src}
                alt={coverMedia.alt ?? project.name}
                fill
                sizes="(min-width: 1024px) 100vw, 100vw"
                className={styles.coverImage}
              />
            ) : (
              <video
                src={coverMedia.src}
                className={styles.coverVideo}
                autoPlay
                loop
                muted
                playsInline
              />
            )}
          </section>
        ) : null}

        <header className={styles.header}>
          <h1 className={styles.title}>{project.name}</h1>
          {project.detailSubtitle && <p className={styles.subtitle}>{project.detailSubtitle}</p>}
        </header>

        {project.detailLinks && project.detailLinks.length > 0 && (
          <div className={styles.projectLinks}>
            {project.detailLinks.map((link) => {
              const getIcon = () => {
                switch (link.icon) {
                  case "paper":
                    return (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <path d="M14 2v6h6" />
                        <path d="M16 13H8" />
                        <path d="M16 17H8" />
                        <path d="M10 9H8" />
                      </svg>
                    );
                  case "github":
                    return (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                      </svg>
                    );
                  case "chrome":
                    return (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <circle cx="12" cy="12" r="4" />
                        <path d="M21.17 8H12" />
                        <path d="M3.95 6.06L8.54 14" />
                        <path d="M10.88 21.94L15.46 14" />
                      </svg>
                    );
                  case "website":
                    return (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    );
                  default:
                    return null;
                }
              };

              return (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLinkButton}
                >
                  <span className={styles.projectLinkIcon}>{getIcon()}</span>
                  <span className={styles.projectLinkText}>{link.label}</span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.projectLinkArrow}
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              );
            })}
          </div>
        )}

        {(project.detailDateRange ||
          project.detailTechStack ||
          project.detailAssociation ||
          project.detailOrganization) && (
          <section className={styles.metaCard}>
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
              <div className={styles.metaStack}>
                {project.detailOrganization && (
                  <div className={styles.orgRow}>
                    {project.detailOrganization.logoSrc && (
                      <Image
                        src={project.detailOrganization.logoSrc}
                        alt={project.detailOrganization.name}
                        width={24}
                        height={24}
                        className={styles.orgLogo}
                      />
                    )}
                    <span>{project.detailOrganization.name}</span>
                  </div>
                )}
                {project.detailAssociation && (
                  <div
                    className={
                      project.detailAssociation === "Solo Project"
                        ? styles.associationText
                        : styles.associationTextDefault
                    }
                  >
                    {project.detailAssociation}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        <div className={styles.divider} />

        <section className={styles.contentSections}>
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
                <ul className={styles.bullets}>
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
              <div className={styles.designStepsGrid}>
                {designSteps.map((step, index) => (
                  <div key={step.id} className={styles.designStep}>
                    <div className={styles.designStepIcon}>
                      <DesignStepIcon stepIndex={index} />
                    </div>
                    <div className={styles.designStepTitle}>{step.title}</div>
                    <div className={styles.designStepSubtitle}>{step.subtitle}</div>
                  </div>
                ))}
              </div>

              <div ref={processSectionRef} className={styles.designProcessLayout}>
                {!isMobile && (
                  <div className={styles.navColumn}>
                    <aside
                      ref={navRef}
                      className={`${styles.processNav} ${
                        mode === "fixed" ? styles.processNavFixed : mode === "bottom" ? styles.processNavBottom : ""
                      }`}
                      style={
                        mode === "fixed"
                          ? {
                              ["--nav-left" as string]: `${left}px`,
                              ["--nav-width" as string]: `${width}px`,
                            }
                          : undefined
                      }
                    >
                      {designSteps.map((step) => (
                        <button
                          key={`nav-${step.id}`}
                          type="button"
                          className={styles.navButton}
                          onClick={() => scrollToId(`process-${step.id}`)}
                        >
                          {step.title}
                        </button>
                      ))}
                      {(reflectionOutcomes || reflectionMoreTime) && (
                        <button
                          type="button"
                          className={`${styles.navButton} ${styles.navButtonStrong}`}
                          onClick={() => scrollToId("process-reflection")}
                        >
                          Reflection
                        </button>
                      )}
                    </aside>
                  </div>
                )}

                <div className={styles.stepsContent}>
                  {designSteps.map((step) => (
                    <div key={step.id} id={`process-${step.id}`}>
                      <div className={styles.stepHeaderRow}>
                        <h4 className={styles.stepHeading}>{step.title}</h4>
                        <span className={styles.stepDividerLine} />
                      </div>

                      {step.subtitle && (
                        <div className={styles.stepSubtitle}>{step.subtitle}</div>
                      )}

                      {step.paragraphs?.map((p) => (
                        <p key={p} className={styles.stepParagraph}>
                          {p}
                        </p>
                      ))}

                      {step.summary && (
                        <p className={styles.stepParagraph}>{step.summary}</p>
                      )}

                      {step.id === "ideate" && flowBlocks.length > 0 && (
                        <div className={styles.stepImagesGrid}>
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

                      {step.id === "system-architecture" && systemArchitectureBlocks.length > 0 && (
                        <div className={styles.stepImagesGrid}>
                          {systemArchitectureBlocks.map((img, idx) => {
                            return (
                              <div key={`${img.src}-${idx}`}>
                                <div
                                  className={styles.diagramFrame}
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => modal.open({ src: img.src, alt: img.alt, title: "" })}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") modal.open({ src: img.src, alt: img.alt, title: "" });
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

                      {step.id === "data-pipeline" && dataPipelineBlocks.length > 0 && (
                        <div className={styles.stepImagesGrid}>
                          {dataPipelineBlocks.map((img, idx) => {
                            return (
                              <div key={`${img.src}-${idx}`}>
                                <div
                                  className={styles.diagramFrame}
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => modal.open({ src: img.src, alt: img.alt, title: "" })}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") modal.open({ src: img.src, alt: img.alt, title: "" });
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

                      {step.id === "emotion-pipeline" && emotionPipelineBlocks.length > 0 && (
                        <div className={styles.stepImagesGrid}>
                          {emotionPipelineBlocks.map((img, idx) => {
                            return (
                              <div key={`${img.src}-${idx}`}>
                                <div
                                  className={styles.diagramFrame}
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => modal.open({ src: img.src, alt: img.alt, title: "" })}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") modal.open({ src: img.src, alt: img.alt, title: "" });
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

                      {step.id === "recommendation-engine" && recommendationEngineBlocks.length > 0 && (
                        <div className={styles.stepImagesGrid}>
                          {recommendationEngineBlocks.map((img, idx) => {
                            const isSequenceDiagram = img.src.includes("sequence_diagram");
                            return (
                              <div key={`${img.src}-${idx}`}>
                                <div
                                  className={`${styles.diagramFrame} ${isSequenceDiagram ? styles.diagramFrameTall : ""}`}
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => modal.open({ src: img.src, alt: img.alt, title: "" })}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") modal.open({ src: img.src, alt: img.alt, title: "" });
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

                      {step.id === "implementation" && implementationBlocks.length > 0 && (
                        <div className={styles.stepImagesGrid}>
                          {implementationBlocks.map((img, idx) => {
                            return (
                              <div key={`${img.src}-${idx}`}>
                                <div
                                  className={styles.diagramFrame}
                                  role="button"
                                  tabIndex={0}
                                  onClick={() => modal.open({ src: img.src, alt: img.alt, title: "" })}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") modal.open({ src: img.src, alt: img.alt, title: "" });
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

                      <ul className={styles.stepBullets}>
                        {step.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {(reflectionOutcomes || reflectionMoreTime) && (
                    <section id="process-reflection" className={styles.reflectionSection}>
                      <h3 className={styles.reflectionTitle}>Reflection</h3>

                      <div className={styles.reflectionSpacer} />

                      {reflectionOutcomes && (
                        <div className={styles.reflectionBlock}>
                          <h4 className={styles.reflectionHeading}>Outcomes</h4>
                          <p className={styles.reflectionText}>{reflectionOutcomes}</p>
                        </div>
                      )}

                      {reflectionMoreTime && (
                        <div className={`${styles.reflectionBlock} ${styles.reflectionBlockSpacing}`}>
                          <h4 className={styles.reflectionHeading}>If I had more time</h4>
                          <p className={styles.reflectionText}>{reflectionMoreTime}</p>
                        </div>
                      )}
                    </section>
                  )}
                </div>
              </div>
            </>
          )}
        </section>

        <footer className={styles.footer}>
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

