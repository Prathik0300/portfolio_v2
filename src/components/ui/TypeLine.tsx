"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type TypeLineProps = {
  text: string;
  /** ms per character */
  speed?: number;
  /** ms before typing starts */
  startDelay?: number;
  showCaret?: boolean;
  className?: string;
  onDone?: () => void;
};

/** Types a string once. Shows the full string immediately under reduced motion. */
export function TypeLine({
  text,
  speed = 42,
  startDelay = 250,
  showCaret = true,
  className,
  onDone,
}: TypeLineProps) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? text.length : 0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (reduce) {
      onDone?.();
      return;
    }
    let raf = 0;
    let i = 0;
    const startAt = performance.now() + startDelay;
    const tick = (now: number) => {
      if (now >= startAt) {
        const target = Math.min(text.length, Math.floor((now - startAt) / speed));
        if (target !== i) {
          i = target;
          setCount(i);
        }
        if (i >= text.length) {
          if (!doneRef.current) {
            doneRef.current = true;
            onDone?.();
          }
          return;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, speed, startDelay, reduce, onDone]);

  return (
    <span className={className}>
      {text.slice(0, count)}
      {showCaret ? <span className="caret" aria-hidden /> : null}
    </span>
  );
}
