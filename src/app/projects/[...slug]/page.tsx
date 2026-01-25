"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useMemo, useRef, useState } from "react";
import { projectItems, type ProjectItem } from "@/lib/portfolioData";
import styles from "./page.module.css";

type ProjectPageProps = {
  params: Promise<{ slug: string[] }>;
};

type ProjectDetailProps = {
  project: ProjectItem;
};

const normalizeSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/%20/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const cx = (...classes: Array<string | false | undefined | null>) =>
  classes.filter(Boolean).join(" ");

const getDiagramTitle = (index: number) => {
  if (index === 0) return "User Flow Diagram";
  if (index === 1) return "Task Flow Diagram";
  return "Diagram";
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const activeSlug = Array.isArray(slug) ? slug[0] : slug;

  const project =
    projectItems.find(
      (p) =>
        p.slug === activeSlug ||
        normalizeSlug(p.slug) === normalizeSlug(activeSlug) ||
        normalizeSlug(p.name) === normalizeSlug(activeSlug)
    ) ?? null;

  if (!project) {
    return (
      <main className={styles.notFound}>
        <p>Project not found.</p>
      </main>
    );
  }

  return <ProjectDetail project={project} />;
}

function ProjectDetail({ project }: ProjectDetailProps) {
  const mediaItems = useMemo(
    () =>
      project.detailMedia && project.detailMedia.length > 0
        ? project.detailMedia
        : [project.tileMedia],
    [project.detailMedia, project.tileMedia]
  );

  const coverMedia = project.coverMedia ?? mediaItems[0];
  const motivationText =
    project.detailMotivation ?? project.detailOverview ?? project.description;
  const solutionItems = [
    ...(project.detailSolutionPoints ?? []),
    ...(project.detailHighlights ?? []),
  ];
  const designProcessText =
    project.detailDesignProcess ?? project.detailProblem ?? "";
  const designSteps = project.detailDesignProcessSteps ?? [];
  const reflectionOutcomes = project.detailReflectionOutcomes ?? "";
  const reflectionMoreTime = project.detailReflectionMoreTime ?? "";
  const designProcessRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const [navMode, setNavMode] = useState<"static" | "fixed" | "bottom">(
    "static"
  );
  const [activeModalImage, setActiveModalImage] = useState<{
    src: string;
    alt: string;
    title?: string;
  } | null>(null);
  const [modalZoom, setModalZoom] = useState(1);
  const [modalPan, setModalPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef<{ x: number; y: number } | null>(null);
  const panOriginRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const modalTransformRef = useRef<HTMLDivElement | null>(null);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  const openModalImage = (src: string, alt: string, title?: string) => {
    setActiveModalImage({ src, alt, title });
    setModalZoom(1);
    setModalPan({ x: 0, y: 0 });
    setIsPanning(false);
    panStartRef.current = null;
  };

  const scrollToStep = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const renderStepIcon = (id: string) => {
    const baseProps = {
      width: 28,
      height: 28,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeLinecap: "round" as const,
      strokeLinejoin: "round" as const,
    };

    switch (id) {
      case "empathize":
        return (
          <svg {...baseProps}>
            <path d="M12 3a4 4 0 1 1-0.01 8.01A4 4 0 0 1 12 3Z" />
            <path d="M5 20a7 7 0 0 1 14 0" />
          </svg>
        );
      case "define":
        return (
          <svg {...baseProps}>
            <path d="M12 3a4 4 0 0 1 4 4c0 1.7-1.1 3.2-2.6 3.8L13 13h-2l-0.4-2.2A4 4 0 0 1 12 3Z" />
            <path d="M9 18h6" />
            <path d="M10.5 21h3" />
          </svg>
        );
      case "ideate":
        return (
          <svg {...baseProps}>
            <circle cx="6" cy="6" r="2.5" />
            <circle cx="18" cy="6" r="2.5" />
            <circle cx="12" cy="18" r="2.5" />
            <path d="M8.2 7.8 10.3 16" />
            <path d="M15.8 7.8 13.7 16" />
          </svg>
        );
      case "design":
        return (
          <svg {...baseProps}>
            <rect x="4" y="5" width="16" height="14" rx="2" />
            <path d="M8 9h8" />
            <path d="M8 13h5" />
          </svg>
        );
      case "test":
        return (
          <svg {...baseProps}>
            <path d="M7 12 10.5 15.5 17 9" />
            <path d="M4 6h16" />
            <path d="M4 18h16" />
          </svg>
        );
      default:
        return (
          <svg {...baseProps}>
            <circle cx="12" cy="12" r="8" />
          </svg>
        );
    }
  };

  useEffect(() => {
    const updateNav = () => {
      if (typeof window === "undefined") return;
      if (window.matchMedia("(max-width: 768px)").matches) {
        setNavMode("static");
        return;
      }

      const section = designProcessRef.current;
      const nav = navRef.current;
      if (!section || !nav) return;

      const sectionRect = section.getBoundingClientRect();
      const { scrollY } = window;
      const sectionTop = scrollY + sectionRect.top;
      const sectionBottom = sectionTop + sectionRect.height;
      const fixedTop = 24;
      const navHeight = nav.offsetHeight;
      const navRect = nav.getBoundingClientRect();
      const { left, width } = navRect;

      nav.style.setProperty("--nav-left", `${left}px`);
      nav.style.setProperty("--nav-width", `${width}px`);

      if (scrollY + fixedTop < sectionTop) {
        setNavMode("static");
        return;
      }

      if (scrollY + fixedTop + navHeight > sectionBottom) {
        setNavMode("bottom");
        return;
      }

      setNavMode("fixed");
    };

    const rafId = window.requestAnimationFrame(updateNav);
    window.addEventListener("scroll", updateNav);
    window.addEventListener("resize", updateNav);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, []);

  useEffect(() => {
    if (!isPanning) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!panStartRef.current) return;
      const dx = event.clientX - panStartRef.current.x;
      const dy = event.clientY - panStartRef.current.y;
      setModalPan({
        x: panOriginRef.current.x + dx,
        y: panOriginRef.current.y + dy,
      });
    };

    const handleMouseUp = () => {
      setIsPanning(false);
      panStartRef.current = null;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isPanning]);

  useEffect(() => {
    const el = modalTransformRef.current;
    if (!el || !activeModalImage) return;
    el.style.setProperty("--modal-pan-x", `${modalPan.x}`);
    el.style.setProperty("--modal-pan-y", `${modalPan.y}`);
    el.style.setProperty("--modal-zoom", `${modalZoom}`);
  }, [activeModalImage, modalPan.x, modalPan.y, modalZoom]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section aria-label="Project cover" className={styles.cover}>
          {coverMedia?.kind === "image" ? (
            <Image
              src={coverMedia.src}
              alt={coverMedia.alt ?? project.name}
              fill
              sizes="(min-width: 1024px) 100vw, 100vw"
              className={styles.coverImage}
              priority
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

        <header className={styles.header}>
          <h1 className={styles.title}>
            {project.name}
          </h1>
          {project.detailSubtitle && (
            <p className={styles.subtitle}>
              {project.detailSubtitle}
            </p>
          )}
        </header>

        {(project.detailDateRange ||
          project.detailTechStack ||
          project.detailAssociation ||
          project.detailOrganization) && (
          <section className={styles.metaCard}>
            <div>
              <div className={styles.metaLabel}>
                Duration
              </div>
              <div className={styles.metaValue}>
                {project.detailDateRange ?? "—"}
              </div>
            </div>
            <div>
              <div className={styles.metaLabel}>
                Tech Stack
              </div>
              <div className={styles.metaValue}>
                {project.detailTechStack ??
                  `Tech Stack: ${project.techStack.join(" · ")}`}
              </div>
            </div>
            <div>
              <div className={styles.metaLabel}>
                Association
              </div>
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
                  <div className={styles.associationText}>
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
            <h3 className={styles.sectionTitle}>
              Motivation
            </h3>
            <p className={styles.mutedText}>
              {motivationText}
            </p>
          </div>

          {(project.detailSolution || solutionItems.length > 0) && (
            <div>
              <h3 className={styles.sectionTitle}>
                Solution
              </h3>
              {project.detailSolution && (
                <p
                  className={cx(
                    styles.mutedText,
                    solutionItems.length > 0 && styles.mutedTextSpacing
                  )}
                >
                  {project.detailSolution}
                </p>
              )}
              {solutionItems.length > 0 && (
                <ul className={styles.bullets}>
                  {solutionItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {(designSteps.length > 0 || designProcessText) && (
            <div>
              <h3 className={styles.sectionTitle}>
                Design Process
              </h3>
              {designProcessText && (
                <p
                  className={cx(
                    styles.mutedText,
                    designSteps.length > 0 && styles.mutedTextSpacingLg
                  )}
                >
                  {designProcessText}
                </p>
              )}

              {designSteps.length > 0 && (
                <div className={styles.designStepsGrid}>
                  {designSteps.map((step) => (
                    <div key={`icon-${step.id}`} className={styles.designStep}>
                      <div className={styles.designStepIcon}>
                        {renderStepIcon(step.id)}
                      </div>
                      <div className={styles.designStepTitle}>
                        {step.title}
                      </div>
                      <div className={styles.designStepSubtitle}>
                        {step.subtitle}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {designSteps.length > 0 && (
                <div ref={designProcessRef} className={styles.designProcessLayout}>
                  <div className={styles.navColumn}>
                    <aside
                      ref={navRef}
                      className={cx(
                        styles.processNav,
                        navMode === "fixed" && styles.processNavFixed,
                        navMode === "bottom" && styles.processNavBottom
                      )}
                    >
                      {designSteps.map((step) => (
                        <button
                          key={`nav-${step.id}`}
                          type="button"
                          onClick={() => scrollToStep(`process-${step.id}`)}
                          className={styles.navButton}
                        >
                          {step.title}
                        </button>
                      ))}
                      {(reflectionOutcomes || reflectionMoreTime) && (
                        <button
                          type="button"
                          onClick={() => scrollToStep("process-reflection")}
                          className={cx(styles.navButton, styles.navButtonStrong)}
                        >
                          Reflection
                        </button>
                      )}
                    </aside>
                  </div>

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
                        {step.paragraphs?.map((paragraph) => (
                          <p key={paragraph} className={styles.stepParagraph}>
                            {paragraph}
                          </p>
                        ))}
                        {step.images && step.images.length > 0 ? (
                          <div className={styles.stepImagesGrid}>
                            {step.images.map((image, index) => (
                              <div key={`${image.src}-${index}`}>
                                <div className={styles.diagramTitle}>
                                  {getDiagramTitle(index)}
                                </div>
                                <div
                                  className={styles.diagramFrame}
                                  role="button"
                                  tabIndex={0}
                                  onClick={() =>
                                    openModalImage(
                                      image.src,
                                      image.alt,
                                      getDiagramTitle(index)
                                    )
                                  }
                                  onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                      openModalImage(
                                        image.src,
                                        image.alt,
                                        getDiagramTitle(index)
                                      );
                                    }
                                  }}
                                >
                                  <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    // Ask Next/Image for a larger source so CSS scaling stays crisp.
                                    sizes="(min-width: 1024px) 90vw, 100vw"
                                    quality={100}
                                    className={styles.diagramImage}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : null}

                        {step.id === "design" &&
                          project.designImages &&
                          project.designImages.length > 0 && (
                            <div className={styles.designImagesColumn}>
                              {project.designImages.map((image) => (
                                <div
                                  key={image.src}
                                  className={styles.designImageFrame}
                                >
                                  <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(min-width: 1024px) 90vw, 100vw"
                                    quality={100}
                                    className={styles.designImage}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        <p className={styles.stepParagraph}>{step.summary}</p>
                        <ul className={styles.stepBullets}>
                          {step.bullets.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}

                    {(reflectionOutcomes || reflectionMoreTime) && (
                      <section
                        id="process-reflection"
                        className={styles.reflectionSection}
                      >
                        <h3 className={styles.reflectionTitle}>Reflection</h3>

                        <div className={styles.reflectionSpacer} />

                        {reflectionOutcomes && (
                          <div className={styles.reflectionBlock}>
                            <h4 className={styles.reflectionHeading}>Outcomes</h4>
                            <p className={styles.reflectionText}>
                              {reflectionOutcomes}
                            </p>
                          </div>
                        )}

                        {reflectionMoreTime && (
                          <div
                            className={cx(
                              styles.reflectionBlock,
                              styles.reflectionBlockSpacing
                            )}
                          >
                            <h4 className={styles.reflectionHeading}>
                              If I had more time
                            </h4>
                            <p className={styles.reflectionText}>
                              {reflectionMoreTime}
                            </p>
                          </div>
                        )}
                      </section>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerBrand}>
            Prathik
          </div>

          <nav aria-label="Project page footer links" className={styles.footerNav}>
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

      {activeModalImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveModalImage(null)}
          className={styles.modalOverlay}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className={styles.modalDialog}
          >
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle}>
                {activeModalImage.title ?? "Diagram"}
              </div>
              <div className={styles.modalControls}>
                <button
                  type="button"
                  onClick={() => setModalZoom((z) => clamp(z - 0.1, 1, 3))}
                  className={styles.modalIconButton}
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => setModalZoom((z) => clamp(z + 0.1, 1, 3))}
                  className={styles.modalIconButton}
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setModalZoom(1);
                    setModalPan({ x: 0, y: 0 });
                  }}
                  className={styles.modalTextButton}
                >
                  Reset
                </button>
              </div>
            </div>

            <div
              className={styles.modalViewport}
              onMouseDown={(event) => {
                event.preventDefault();
                setIsPanning(true);
                panStartRef.current = { x: event.clientX, y: event.clientY };
                panOriginRef.current = { ...modalPan };
              }}
              onWheel={(event) => {
                event.preventDefault();
                const delta = event.deltaY < 0 ? 0.1 : -0.1;
                setModalZoom((z) => clamp(z + delta, 1, 3));
              }}
            >
              <div
                ref={modalTransformRef}
                className={cx(
                  styles.modalTransform,
                  isPanning && styles.modalTransformGrabbing
                )}
              >
                <Image
                  src={activeModalImage.src}
                  alt={activeModalImage.alt}
                  fill
                  sizes="(min-width: 1024px) 90vw, 100vw"
                  quality={100}
                  unoptimized
                  className={styles.modalImage}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
