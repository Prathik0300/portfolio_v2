import { useEffect, useState, RefObject } from "react";

type Mode = "static" | "fixed" | "bottom";

interface UseFixedWithinSectionOptions {
  enabled: boolean;
  fixedTopPx: number;
  sectionEl: RefObject<HTMLElement | null>;
  navEl: RefObject<HTMLElement | null>;
}

interface UseFixedWithinSectionReturn {
  mode: Mode;
  left: number;
  width: number;
}

export function useFixedWithinSection({
  enabled,
  fixedTopPx,
  sectionEl,
  navEl,
}: UseFixedWithinSectionOptions): UseFixedWithinSectionReturn {
  const [mode, setMode] = useState<Mode>("static");
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      setMode("static");
      return;
    }

    const updateNav = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setMode("static");
        return;
      }

      const section = sectionEl.current;
      const nav = navEl.current;
      if (!section || !nav) return;

      const sectionRect = section.getBoundingClientRect();
      const { scrollY } = window;
      const sectionTop = scrollY + sectionRect.top;
      const sectionBottom = sectionTop + sectionRect.height;
      const navHeight = nav.offsetHeight;
      const navRect = nav.getBoundingClientRect();

      setLeft(navRect.left);
      setWidth(navRect.width);

      if (scrollY + fixedTopPx < sectionTop) {
        setMode("static");
        return;
      }

      if (scrollY + fixedTopPx + navHeight > sectionBottom) {
        setMode("bottom");
        return;
      }

      setMode("fixed");
    };

    const rafId = window.requestAnimationFrame(updateNav);
    window.addEventListener("scroll", updateNav);
    window.addEventListener("resize", updateNav);
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", updateNav);
      window.removeEventListener("resize", updateNav);
    };
  }, [enabled, fixedTopPx, sectionEl, navEl]);

  return { mode, left, width };
}
