"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { TypeLine } from "@/components/ui";
import styles from "./HeroTerminal.module.css";

type Line = { cmd: string; out: string[] };

export function HeroTerminal({ lines }: { lines: Line[] }) {
  const reduce = useReducedMotion();
  // how many command blocks are "active" (typing or done)
  const [active, setActive] = useState(reduce ? lines.length : 1);
  // which of the active commands have finished typing (=> show output)
  const [typed, setTyped] = useState<number>(reduce ? lines.length : 0);

  const handleDone = (i: number) => {
    setTyped((t) => Math.max(t, i + 1));
    if (i + 1 < lines.length) {
      window.setTimeout(() => setActive((a) => Math.max(a, i + 2)), 240);
    }
  };

  return (
    <div className={`term ${styles.term}`}>
      <div className="term__bar">
        <span className="term__dot" aria-hidden />
        <span className="term__dot" aria-hidden />
        <span className="term__dot" aria-hidden />
        <span style={{ marginLeft: 6 }}>prathik@platform: ~</span>
      </div>
      <div className={`mono ${styles.body}`}>
        <span className={styles.scanline} aria-hidden />
        {lines.slice(0, active).map((line, i) => {
          const isTyped = typed > i;
          const isLast = i === lines.length - 1;
          return (
            <div key={line.cmd} className={styles.block}>
              <div className={styles.cmd}>
                <span className={styles.prompt}>$</span>{" "}
                {reduce || isTyped ? (
                  <span>
                    {line.cmd}
                    {isLast && <span className="caret" aria-hidden />}
                  </span>
                ) : (
                  <TypeLine
                    text={line.cmd}
                    speed={38}
                    startDelay={i === 0 ? 350 : 0}
                    showCaret={!isLast ? true : true}
                    onDone={() => handleDone(i)}
                  />
                )}
              </div>
              {(reduce || isTyped) &&
                line.out.map((o) => (
                  <div key={o} className={styles.out} data-status={o.startsWith("●")}>
                    {o}
                  </div>
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
