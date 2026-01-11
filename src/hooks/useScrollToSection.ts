import { useCallback } from "react";
import type { SectionId } from "@/context/UIContext";

export function useScrollToSection() {
  const scrollToSection = useCallback((sectionId: SectionId) => {
    if (typeof window === "undefined") return;

    const element = document.getElementById(sectionId);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, []);

  return { scrollToSection };
}

