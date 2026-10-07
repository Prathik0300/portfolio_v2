"use client";

import { useEffect } from "react";

/**
 * 2px accent bar under the nav.
 * Uses the CSS scroll-timeline in globals.css where the browser supports it;
 * otherwise this effect drives a --_p custom property as a fallback.
 */
export function ScrollProgress() {
  useEffect(() => {
    const native =
      typeof CSS !== "undefined" &&
      Boolean(CSS.supports?.("animation-timeline: scroll()"));
    if (native) return;

    const root = document.documentElement;
    const onScroll = () => {
      const max = root.scrollHeight - root.clientHeight;
      root.style.setProperty("--_p", String(max > 0 ? root.scrollTop / max : 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return <div className="scrollProgress" aria-hidden />;
}
