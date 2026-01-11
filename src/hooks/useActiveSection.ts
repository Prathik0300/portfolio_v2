'use client';

import { useEffect } from "react";
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => !!el);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const topEntry = visibleEntries[0];
        if (!topEntry) return;

        const id = topEntry.target.id as SectionId;
        setActiveSection(id);
      },
      {
        root: null,
        threshold: [0.25, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setActiveSection]);
}

