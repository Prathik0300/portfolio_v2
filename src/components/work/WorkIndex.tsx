"use client";

import { useMemo, useState } from "react";
import { projectItems } from "@/lib/portfolioData";
import { Reveal } from "@/components/ui";
import { ProjectCard } from "./ProjectCard";
import styles from "./WorkIndex.module.css";

const FILTERS = ["all", "AI / LLM", "platform & infra", "security", "research", "shipped"] as const;

export function WorkIndex() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("all");

  const list = useMemo(() => {
    if (active === "all") return projectItems;
    return projectItems.filter((p) => (p.domains ?? []).includes(active));
  }, [active]);

  return (
    <section className="wrap" style={{ paddingBlock: "clamp(56px, 8vw, 88px)" }}>
      <Reveal>
        <span className="kicker">work — {projectItems.length} case studies</span>
        <h1 className={styles.h1}>
          Every project as a case study:
          <br />
          problem, approach, what changed.
        </h1>
        <p className={styles.lead}>
          Not a gallery of repos. Each entry states the constraint I was designing against, the system I
          built, and the measured outcome — with links to the code, the live thing, and the write-up.
        </p>
      </Reveal>

      <Reveal className={styles.filters} as="div">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setActive(f)}
            className={`${styles.filter} ${active === f ? styles.filterOn : ""}`}
          >
            {f}
          </button>
        ))}
      </Reveal>

      <div className={styles.list}>
        {list.map((p, i) => (
          <Reveal key={p.slug} index={i}>
            <ProjectCard project={p} variant="row" index={i + 1} />
          </Reveal>
        ))}
        {list.length === 0 && (
          <p className="mono" style={{ color: "var(--faint)" }}>
            no projects tagged “{active}” yet.
          </p>
        )}
      </div>
    </section>
  );
}
