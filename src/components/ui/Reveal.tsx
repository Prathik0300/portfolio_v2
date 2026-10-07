"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type Tag = "div" | "li" | "section" | "span" | "ul" | "header" | "article";

type RevealProps = {
  children: ReactNode;
  index?: number;
  delay?: number;
  y?: number;
  as?: Tag;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

/**
 * Fade + rise once when scrolled into view — plain IntersectionObserver + CSS.
 * Fails OPEN: renders fully visible on the server and if IO is unavailable,
 * and honours prefers-reduced-motion. No layout dependence, never traps content.
 */
export function Reveal({
  children,
  index = 0,
  delay = 0,
  y = 12,
  as = "div",
  className,
  style,
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  // start hidden only once we KNOW JS + IO are available and motion is allowed
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;

    const el = ref.current;
    if (!el) return;

    setArmed(true);
    setShown(false);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);

    // safety: reveal no matter what after 1.2s
    const t = setTimeout(() => {
      setShown(true);
      io.disconnect();
    }, 1200);

    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  const Tag = as as "div";
  const transition = `opacity 320ms cubic-bezier(0.2,0.8,0.2,1) ${delay + index * 0.06}s, transform 320ms cubic-bezier(0.2,0.8,0.2,1) ${delay + index * 0.06}s`;

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={className}
      style={{
        ...style,
        ...(armed
          ? {
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : `translateY(${y}px)`,
              transition,
              willChange: "opacity, transform",
            }
          : null),
      }}
    >
      {children}
    </Tag>
  );
}
