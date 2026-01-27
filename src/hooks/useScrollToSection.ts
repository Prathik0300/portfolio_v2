import { useCallback } from "react";
import { useUIContext, type SectionId } from "@/context/UIContext";

export function useScrollToSection() {
  const { setActiveSection } = useUIContext();

  const scrollToSection = useCallback((sectionId: SectionId) => {
    if (typeof window === "undefined") return;

    const element = document.getElementById(sectionId);
    if (!element) return;

    // Set active section immediately to prevent wrong highlighting
    setActiveSection(sectionId);

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [setActiveSection]);

  return { scrollToSection };
}

