"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { serviceItems } from "@/lib/portfolioData";
import { ServiceCardSkeleton } from "@/components/Skeleton";
import { analytics } from "@/utils/analytics";
import styles from "./ServicesSection.module.css";

type ServiceHighlight = {
  label: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  summary: string;
  points: string[];
};

// Service icons mapping
const SERVICE_ICONS: Record<string, string> = {
  backend: "/logos/skills/nodejs.svg",
  cloudInfra: "/logos/skills/gke.svg",
  devops: "/logos/skills/github-actions.svg",
  platform: "/logos/skills/kubernetes.svg",
  ai: "/logos/skills/openai.svg",
  fullstack: "/logos/skills/reactjs.svg",
  performance: "/logos/skills/elk.svg",
  modernization: "/logos/skills/docker.svg",
};

const SERVICE_HIGHLIGHTS: Record<string, ServiceHighlight> = {
  cloud: {
    label: "Cloud-native systems",
    title: "Designing resilient cloud platforms on GCP and AWS",
    imageSrc: "/logos/skills/gcp.svg",
    imageAlt: "Cloud platforms icon",
    summary:
      "Cloud-native architectures on GCP and AWS focused on resilience, cost, and observability.",
    points: [
      "Kubernetes (GKE) workloads with autoscaling and ingress.",
      "Containerized services with clear rollout strategies.",
      "Monitoring and logging wired into every environment.",
    ],
  },
  backend: {
    label: "Real-world backend impact",
    title: "Multi-tenant content & streaming platform for student radio",
    imageSrc: "/logos/rfx-logo.png",
    imageAlt: "RadioFX logo",
    summary: "NestJS + Cassandra backend for multi-tenant content and streaming.",
    points: [
      "Multi-tenant data modeling with validation.",
      "Token-based auth for secure integrations.",
      "Modular APIs for streaming widgets.",
    ],
  },
  cloudInfra: {
    label: "Cloud foundations",
    title: "GKE-based multi-tenant hosting for generated websites",
    imageSrc: "/logos/skills/gke.svg",
    imageAlt: "GKE icon",
    summary: "Kubernetes migration for scalable multi-tenant deployments.",
    points: [
      "Namespace isolation and Helm releases.",
      "NGINX ingress and autoscaling.",
      "Artifact Registry integration.",
    ],
  },
  devops: {
    label: "Ship fast, stay stable",
    title: "Release pipelines that keep production boring",
    imageSrc: "/logos/skills/github-actions.svg",
    imageAlt: "GitHub Actions icon",
    summary: "CI/CD pipelines for automated, safe deployments.",
    points: [
      "Zero-downtime rollouts.",
      "Selective redeployments.",
      "Automated checks and notifications.",
    ],
  },
  platform: {
    label: "Tools for people",
    title: "CanvasRx & portal tooling that doctors actually use",
    imageSrc: "/logos/bfhl-logo.png",
    imageAlt: "Bajaj Finserv Health logo",
    summary: "Product tools integrated into clinical workflows.",
    points: [
      "CanvasRx image-annotation tool.",
      "Doctor portal modules.",
      "Improved B2C stability.",
    ],
  },
  ai: {
    label: "AI in production",
    title: "Multi-agent pipeline from prompt → running website",
    imageSrc: "/logos/skills/openai.svg",
    imageAlt: "AI icon",
    summary: "AI pipeline for automated website generation.",
    points: [
      "Gemini + Vercel v0 integration.",
      "Automated code generation.",
      "Evaluation agents for quality.",
    ],
  },
  fullstack: {
    label: "End-to-end product work",
    title: "Owning high-traffic B2C flows front to back",
    imageSrc: "/logos/bfhl-logo.png",
    imageAlt: "Bajaj Finserv Health logo",
    summary: "Full-stack ownership of high-traffic modules.",
    points: [
      "Improved booking flows.",
      "Performance and SEO optimization.",
      "Cross-functional collaboration.",
    ],
  },
  performance: {
    label: "Making things feel fast",
    title: "Page experience work that users (and Google) notice",
    imageSrc: "/logos/skills/elk.svg",
    imageAlt: "Observability icon",
    summary: "Performance optimization and Core Web Vitals improvements.",
    points: [
      "PageSpeed 65 → 99.",
      "SEO fixes: 11,380 → 562 poor URLs.",
      "ELK logging for monitoring.",
    ],
  },
  security: {
    label: "Secure by default",
    title: "Production safeguards that keep systems trustworthy",
    imageSrc: "/logos/skills/sonarqube.svg",
    imageAlt: "Security and reliability icon",
    summary:
      "Security and reliability baked into gateways, auth, and runtime protections.",
    points: [
      "Robust auth and gateway-level protections.",
      "Fault-tolerant, observable system design.",
      "Guardrails in CI/CD to prevent bad deploys.",
    ],
  },
  modernization: {
    label: "Gentle migrations",
    title: "Taking legacy services into containerized stacks",
    imageSrc: "/logos/skills/docker.svg",
    imageAlt: "Docker icon",
    summary: "Containerized legacy services with zero-downtime migrations.",
    points: [
      "Kubernetes orchestration.",
      "Blue/green and canary strategies.",
      "Improved build reliability.",
    ],
  },
};

function ServicesSection() {
  const [isLoading, setIsLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const isScrollingRef = useRef(false);
  const scrollPositions = serviceItems.length; // Dynamic based on number of service cards
  const viewedCardsRef = useRef<Set<string>>(new Set());
  const hasCompletedCarouselRef = useRef(false);

  useEffect(() => {
    // Simulate network delay for skeleton demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll functionality
  const startAutoScroll = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer || isHovered) return;

    // Clear existing auto-scroll
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }

    autoScrollRef.current = setInterval(() => {
      if (isHovered || isScrollingRef.current) return;

      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const firstCard = scrollContainer.querySelector(`.${styles.card}`) as HTMLElement;
      const cardWidth = firstCard ? firstCard.offsetWidth : 450;
      const gap = 20;
      const scrollWidth = cardWidth + gap;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      const currentScroll = scrollContainer.scrollLeft;

      // If at the end, reset to beginning
      if (currentScroll >= maxScroll - 10) {
        scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll one card at a time
        const nextScroll = Math.min(
          currentScroll + scrollWidth,
          maxScroll
        );
        scrollContainer.scrollTo({ left: nextScroll, behavior: "smooth" });
      }
    }, 3000); // Auto-scroll every 3 seconds
  }, [isHovered]);

  // Helper function to update active index
  const updateActiveIndex = useCallback(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
    const maxScroll = scrollWidth - clientWidth;
    
    // If there's no scrollable content, set to first dot
    if (maxScroll <= 0) {
      setActiveIndex(0);
      return;
    }
    
    // Calculate scroll percentage (0 to 1)
    const scrollPercentage = Math.min(scrollLeft / maxScroll, 1);
    
    // Map percentage to dot index (0 to scrollPositions - 1)
    // When at the end (scrollPercentage = 1), we want the last dot (scrollPositions - 1)
    // When at the start (scrollPercentage = 0), we want the first dot (0)
    const dotIndex = Math.min(
      Math.round(scrollPercentage * (scrollPositions - 1)),
      scrollPositions - 1
    );
    
    setActiveIndex(dotIndex);
  }, [scrollPositions]);

  // Calculate active card and scroll positions based on scroll position
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      if (!isScrollingRef.current) {
        isScrollingRef.current = true;
        updateActiveIndex();
        
        // Clear auto-scroll when user manually scrolls
        const currentAutoScroll = autoScrollRef.current;
        if (currentAutoScroll) {
          clearInterval(currentAutoScroll);
          autoScrollRef.current = null;
        }

        // Restart auto-scroll after user stops scrolling
        setTimeout(() => {
          isScrollingRef.current = false;
          startAutoScroll();
        }, 3000);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    updateActiveIndex();

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [startAutoScroll, updateActiveIndex]);

  // Track carousel card views using IntersectionObserver
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>(`.${styles.card}`),
    );
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.5) return;

          const cardEl = entry.target as HTMLElement;
          const cardId = cardEl.dataset.serviceId;
          if (!cardId) return;

          const viewedSet = viewedCardsRef.current;
          if (!viewedSet.has(cardId)) {
            viewedSet.add(cardId);
            const index = serviceItems.findIndex((s) => s.id === cardId);
            analytics.trackCarouselCardView(
              "services-carousel",
              cardId,
              index === -1 ? 0 : index,
              serviceItems.length,
            );

            if (
              !hasCompletedCarouselRef.current &&
              viewedSet.size === serviceItems.length
            ) {
              hasCompletedCarouselRef.current = true;
              analytics.trackCarouselCompletion(
                "services-carousel",
                serviceItems.length,
              );
            }
          }
        });
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.5,
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  // Start auto-scroll on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      startAutoScroll();
    }, 2000); // Start after 2 seconds

    return () => {
      clearTimeout(timer);
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [startAutoScroll]);

  // Pause auto-scroll on hover
  useEffect(() => {
    if (isHovered && autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    } else if (!isHovered && !isScrollingRef.current) {
      startAutoScroll();
    }
  }, [isHovered]);

  // Navigation functions - scroll one card at a time with circular scrolling
  const scrollLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const firstCard = scrollContainer.querySelector(`.${styles.card}`) as HTMLElement;
    const cardWidth = firstCard ? firstCard.offsetWidth : 450;
    const gap = 20;
    const scrollWidth = cardWidth + gap;
    const currentScroll = scrollContainer.scrollLeft;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    
    // If at the beginning (scrollLeft is 0 or very close), scroll to the end (circular)
    if (currentScroll <= 10) {
      scrollContainer.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      const newScroll = currentScroll - scrollWidth;
      scrollContainer.scrollTo({ left: Math.max(0, newScroll), behavior: "smooth" });
    }
    
    isScrollingRef.current = true;
    // Update active index after scroll animation completes
    setTimeout(() => {
      updateActiveIndex();
      isScrollingRef.current = false;
      if (!isHovered) {
        startAutoScroll();
      }
    }, 1000);
  };

  const scrollRight = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const firstCard = scrollContainer.querySelector(`.${styles.card}`) as HTMLElement;
    const cardWidth = firstCard ? firstCard.offsetWidth : 450;
    const gap = 20;
    const scrollWidth = cardWidth + gap;
    const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
    const currentScroll = scrollContainer.scrollLeft;
    
    // If at the end (or very close), scroll to the beginning (circular)
    if (currentScroll >= maxScroll - 10) {
      scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      const newScroll = currentScroll + scrollWidth;
      scrollContainer.scrollTo({ left: Math.min(maxScroll, newScroll), behavior: "smooth" });
    }
    
    isScrollingRef.current = true;
    // Update active index after scroll animation completes
    setTimeout(() => {
      updateActiveIndex();
      isScrollingRef.current = false;
      if (!isHovered) {
        startAutoScroll();
      }
    }, 1000);
  };

  return (
    <article id="services" className={styles.article}>
      <header className={styles.header}>
        <h2 id="services-heading" className={`${styles.heading} sectionTitle`}>
          What I Offer
        </h2>
        <p className={styles.subtitle}>
          Services I provide to design, build, and run reliable, scalable systems.
        </p>
      </header>

      <div className={styles.container}>
        <div
          className={styles.scrollWrapper}
          ref={scrollWrapperRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Navigation Arrow */}
          <button
            className={styles.navArrow}
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div
            className={styles.scrollContainer}
            ref={scrollContainerRef}
          >
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <ServiceCardSkeleton key={`skeleton-${index}`} />
              ))
            ) : (
              serviceItems.map((service, index) => {
              const highlight = SERVICE_HIGHLIGHTS[service.id];
              const iconSrc = SERVICE_ICONS[service.id] || "/logos/skills/nodejs.svg";

              return (
                <div
                  key={service.id}
                  className={styles.card}
                  data-service-id={service.id}
                >
                  <div className={styles.face1}>
                    <div className={styles.content}>
                      {highlight ? (
                        <>
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
                        </>
                      ) : (
                        <>
                          <p className={styles.cardTitle}>{service.title}</p>
                          <p>{service.description}</p>
                        </>
                      )}
                    </div>
                  </div>
                  <div className={styles.face2}>
                    <div className={styles.face2Content}>
                      <div className={styles.serviceIcon}>
                        <Image
                          src={iconSrc}
                          alt={`${service.title} icon`}
                          width={64}
                          height={64}
                        />
                      </div>
                      <h2>{service.title}</h2>
                      <p>{service.description}</p>
                    </div>
                  </div>
                </div>
              );
            })
            )}
          </div>

          {/* Right Navigation Arrow */}
          <button
            className={`${styles.navArrow} ${styles.navArrowRight}`}
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Scroll dots */}
        <div className={styles.dotsContainer}>
          {Array.from({ length: scrollPositions }).map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${
                index === activeIndex ? styles.dotActive : ""
              }`}
            />
          ))}
        </div>
      </div>
    </article>
  );
}

export default ServicesSection;
