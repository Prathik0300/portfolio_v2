'use client';

import { useEffect, useRef } from "react";
import { useUIContext, type SectionId } from "@/context/UIContext";

const SECTION_IDS: SectionId[] = [
  "home",
  "about",
  "skills",
  "experience",
  "services",
  "projects",
];

export function useActiveSection() {
  const { setActiveSection } = useUIContext();
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => !!el);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Don't update during programmatic scrolls
        if (isProgrammaticScrollRef.current) return;

        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            // Sort by intersection ratio first
            if (Math.abs(b.intersectionRatio - a.intersectionRatio) > 0.15) {
              return b.intersectionRatio - a.intersectionRatio;
            }
            // If ratios are close, prefer the one higher on the page (smaller top value)
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });

        const topEntry = visibleEntries[0];
        if (!topEntry) return;

        const id = topEntry.target.id as SectionId;
        setActiveSection(id);
      },
      {
        root: null,
        rootMargin: "-10% 0px -70% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    // Detect programmatic scrolls
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-scroll-to-section]')) {
        isProgrammaticScrollRef.current = true;
        // Reset after scroll animation completes
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        scrollTimeoutRef.current = setTimeout(() => {
          isProgrammaticScrollRef.current = false;
        }, 1000);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      observer.disconnect();
      document.removeEventListener("click", handleClick, true);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [setActiveSection]);
}

