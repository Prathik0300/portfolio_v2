"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { serviceItems } from "@/lib/portfolioData";
import styles from "./ServicesSection.module.css";

type ServiceHighlight = {
  label: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  summary: string;
  points: string[];
};

const SERVICE_HIGHLIGHTS: Record<string, ServiceHighlight> = {
  backend: {
    label: "Real-world backend impact",
    title: "Multi-tenant content & streaming platform for student radio",
    imageSrc: "/logos/rfx-logo.png",
    imageAlt: "RadioFX logo",
    summary:
      "Designed a NestJS + Cassandra backbone that keeps content, schedules, and real-time streams in sync across many college stations.",
    points: [
      "Modeled multi-tenant data in Cassandra with DTO validation and guards.",
      "Built token-based auth (JWT/opaque tokens) for secure partner integrations.",
      "Exposed modular APIs for embeddable streaming, chat, and polling widgets.",
    ],
  },
  cloudInfra: {
    label: "Cloud foundations",
    title: "GKE-based multi-tenant hosting for generated websites",
    imageSrc: "/logos/skills/gke.svg",
    imageAlt: "GKE icon",
    summary:
      "Moved legacy services into Kubernetes and shaped a GKE layout where hundreds of tenant sites can be deployed, isolated, and updated safely.",
    points: [
      "Isolated tenants via namespaces, network policies, and Helm-driven releases.",
      "Used NGINX ingress, autoscaling, and health checks for robust rollouts.",
      "Integrated internal Node modules through Google Artifact Registry.",
    ],
  },
  devops: {
    label: "Ship fast, stay stable",
    title: "Release pipelines that keep production boring",
    imageSrc: "/logos/skills/github-actions.svg",
    imageAlt: "GitHub Actions icon",
    summary:
      "Set up CI/CD flows so every commit is built, tested, and rolled out with guardrails instead of one-off manual deploys.",
    points: [
      "Built zero-downtime rollout pipelines for GKE-based services.",
      "Implemented selective redeployments based on diff detection.",
      "Improved feedback loops with automated checks and notifications.",
    ],
  },
  platform: {
    label: "Tools for people",
    title: "CanvasRx & portal tooling that doctors actually use",
    imageSrc: "/logos/bfhl-logo.png",
    imageAlt: "Bajaj Finserv Health logo",
    summary:
      "Built product-facing tools like CanvasRx that slot into daily clinical workflows instead of living as side projects in a backlog.",
    points: [
      "Built CanvasRx, an image-annotation tool used in doctor consultations.",
      "Owned modules within the doctor portal that streamlined daily operations.",
      "Helped reduce bugs and improve stability across B2C flows.",
    ],
  },
  ai: {
    label: "AI in production",
    title: "Multi-agent pipeline from prompt → running website",
    imageSrc: "/logos/skills/openai.svg",
    imageAlt: "AI icon",
    summary:
      "Orchestrated Gemini and Vercel v0 into a pipeline that plans, generates, and refines complete sites instead of just UI snippets.",
    points: [
      "Chained Gemini and Vercel v0 to generate, evaluate, and refine layouts.",
      "Automated code generation and deployment into a GKE-backed environment.",
      "Designed evaluation agents to keep UX and content on-spec.",
    ],
  },
  fullstack: {
    label: "End-to-end product work",
    title: "Owning high-traffic B2C flows front to back",
    imageSrc: "/logos/bfhl-logo.png",
    imageAlt: "Bajaj Finserv Health logo",
    summary:
      "Took responsibility for full slices of modules—from React UIs to APIs—so that the experience stayed coherent across the stack.",
    points: [
      "Improved stability across critical booking and discovery flows.",
      "Optimized frontend and backend pieces for performance and SEO.",
      "Collaborated closely with design and product to ship features safely.",
    ],
  },
  performance: {
    label: "Making things feel fast",
    title: "Page experience work that users (and Google) notice",
    imageSrc: "/logos/skills/elk.svg",
    imageAlt: "Observability icon",
    summary:
      "Focused on load time, Core Web Vitals, and search signals so critical pages feel instant instead of merely acceptable.",
    points: [
      "Boosted PageSpeed scores from 65 → 99 on high-traffic pages.",
      "Reduced poor URLs from 11,380 → 562 via targeted technical SEO fixes.",
      "Introduced ELK-based logging to uncover bottlenecks and errors.",
    ],
  },
  modernization: {
    label: "Gentle migrations",
    title: "Taking legacy services into containerized stacks",
    imageSrc: "/logos/skills/docker.svg",
    imageAlt: "Docker icon",
    summary:
      'Helped teams move from brittle VMs to containerized services with rollout plans that avoided risky "flag day" cutovers.',
    points: [
      "Containerized services and orchestrated them with Kubernetes.",
      "Planned zero-downtime migrations with blue/green and canary strategies.",
      "Improved build times and deployment reliability for legacy services.",
    ],
  },
};

function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const totalCards = serviceItems.length;
  const CARD_WIDTH_VW = 94; // match CSS slide width so alignment stays correct
  const totalHorizontalShift = (totalCards - 1) * CARD_WIDTH_VW; // in vw

  // Track which card is "active" to drive the vertical progress dots on the left.
  const [activeIndex, setActiveIndex] = useState(0);

  const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

  // Height of the section: enough vertical space for the whole horizontal journey,
  // tightly (no dead scroll after the last card).
  const sectionHeightExpression = `calc(${totalCards * 100}vh - 4.5rem)`;

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;
    sectionEl.style.setProperty("--services-height", sectionHeightExpression);
  }, [sectionHeightExpression]);

  useEffect(() => {
    const listEl = listRef.current;
    const sectionEl = sectionRef.current;
    if (!listEl) return;
    if (!sectionEl) return;

    // Center the first and last slides without adding leading/trailing blank space.
    listEl.style.setProperty(
      "--start-offset",
      `${(100 - CARD_WIDTH_VW) / 2}vw`
    );

    let rafId = 0;

    const update = () => {
      rafId = 0;

      const remPx = Number.parseFloat(
        window.getComputedStyle(document.documentElement).fontSize || "16"
      );

      // Must match CSS: .scrollTrack height is calc(100vh - 4.5rem)
      const stickyHeightPx = window.innerHeight - remPx * 4.5;
      // Must match CSS: .scrollTrack top is 2.25rem (so pinned viewport is centered)
      const stickyTopPx = remPx * 2.25;

      const rect = sectionEl.getBoundingClientRect();
      const totalScrollable = rect.height - stickyHeightPx;
      const rawProgress =
        totalScrollable > 0 ? (stickyTopPx - rect.top) / totalScrollable : 0;
      const progress = clamp(rawProgress, 0, 1);

      const translateVw = -totalHorizontalShift * progress;
      listEl.style.setProperty("--x", `${translateVw}vw`);

      if (totalCards > 1) {
        const idx = Math.round(progress * (totalCards - 1));
        setActiveIndex(clamp(idx, 0, totalCards - 1));
      } else {
        setActiveIndex(0);
      }
    };

    const requestUpdate = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [CARD_WIDTH_VW, totalCards, totalHorizontalShift]);

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h2 id="services-heading" className={styles.heading}>
          What I Offer
        </h2>
      </header>

      <section
        ref={sectionRef}
        key={`services-section-${serviceItems.length}`}
        className={styles.groupContainer}
      >
        <div className={styles.scrollTrack}>
          <div className={styles.progressDots} aria-hidden="true">
            {serviceItems.map((service, index) => (
              <span
                key={service.id}
                className={`${styles.progressDot} ${
                  index <= activeIndex ? styles.progressDotActive : ""
                }`}
              />
            ))}
          </div>

          <motion.ul ref={listRef} className={styles.itemGroup}>
            {serviceItems.map((service) => {
              const highlight = SERVICE_HIGHLIGHTS[service.id];

              return (
                <li
                  key={service.id}
                  className={styles.itemList}
                  aria-labelledby={`${service.id}-title`}
                >
                  <div className={styles.itemContent}>
                    <div className={styles.itemCopy}>
                      <h3 id={`${service.id}-title`} className={styles.title}>
                        {service.title}
                      </h3>
                      <p className={styles.description}>
                        {service.description}
                      </p>
                    </div>

                    {highlight && (
                      <aside
                        className={styles.itemHighlight}
                        aria-label="Example work"
                      >
                        <div className={styles.highlightHeader}>
                          <div className={styles.highlightAvatar}>
                            <Image
                              src={highlight.imageSrc}
                              alt={highlight.imageAlt}
                              className={styles.highlightImage}
                              width={48}
                              height={48}
                            />
                          </div>
                          <div className={styles.highlightMeta}>
                            <p className={styles.highlightLabel}>
                              {highlight.label}
                            </p>
                            <p className={styles.highlightTitle}>
                              {highlight.title}
                            </p>
                            {/* <p className={styles.highlightServiceTag}>
                              For: {service.title}
                            </p> */}
                          </div>
                        </div>
                        <p className={styles.highlightSummary}>
                          {highlight.summary}
                        </p>
                        <ul className={styles.highlightList}>
                          {highlight.points.map((point) => (
                            <li key={point} className={styles.highlightPoint}>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </aside>
                    )}
                  </div>
                </li>
              );
            })}
          </motion.ul>
        </div>
      </section>
    </article>
  );
}

export default ServicesSection;
