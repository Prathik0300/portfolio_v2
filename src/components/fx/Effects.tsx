"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { PaletteCommand } from "./CommandPalette";

// Loaded only when the palette is first opened, so it costs nothing at page load.
const CommandPalette = lazy(() => import("./CommandPalette"));

const GLYPHS = "!<>-_\\/[]{}=+*^?#";

/** Decode-style text scramble that always resolves to the original string. */
function scramble(el: HTMLElement, duration = 650) {
  const final = el.textContent ?? "";
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const settled = Math.floor(final.length * p);
    el.textContent = final
      .split("")
      .map((c, i) => (c === " " || i < settled ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
      .join("");
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = final;
  };
  requestAnimationFrame(tick);
}

/** Tween every number inside the text from 0 to its value; ends on the exact original string. */
function countUp(el: HTMLElement, duration = 900) {
  const final = el.textContent ?? "";
  const start = performance.now();
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = final.replace(/\d+(?:\.\d+)?/g, (n) => {
      const decimals = n.includes(".") ? n.split(".")[1].length : 0;
      return (parseFloat(n) * eased).toFixed(decimals);
    });
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = final;
  };
  requestAnimationFrame(tick);
}

/**
 * The site's only global client behaviour: scroll-triggered text effects and the ⌘K palette.
 * One shared IntersectionObserver; everything is skipped under prefers-reduced-motion.
 */
export function Effects({ commands }: { commands: PaletteCommand[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          const el = e.target as HTMLElement;
          if (el.hasAttribute("data-scramble")) scramble(el);
          else if (el.hasAttribute("data-count")) countUp(el);
        }
      },
      { threshold: 0.6 },
    );
    document.querySelectorAll("[data-scramble],[data-count]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest("[data-palette]")) setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  if (!open) return null;
  return (
    <Suspense fallback={null}>
      <CommandPalette commands={commands} onClose={() => setOpen(false)} />
    </Suspense>
  );
}
