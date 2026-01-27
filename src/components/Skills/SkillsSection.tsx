"use client";

import { useEffect, useRef, useState, MouseEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { languageSkills, programmingSkills } from "@/lib/portfolioData";
import styles from "./SkillsSection.module.css";

function SkillsSection() {
  const [tooltip, setTooltip] = useState<{
    label: string;
    x: number;
    y: number;
  } | null>(null);

  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const handleShowTooltip = (
    event: MouseEvent<HTMLDivElement>,
    label: string
  ) => {
    setTooltip({ label, x: event.clientX, y: event.clientY });
  };

  const handleMoveTooltip = (event: MouseEvent<HTMLDivElement>) => {
    setTooltip((prev) =>
      prev ? { ...prev, x: event.clientX, y: event.clientY } : prev
    );
  };

  const handleHideTooltip = () => {
    setTooltip(null);
  };

  useEffect(() => {
    const el = tooltipRef.current;
    if (!el || !tooltip) return;
    el.style.setProperty("--tooltip-x", `${tooltip.x + 10}`);
    el.style.setProperty("--tooltip-y", `${tooltip.y + 12}`);
  }, [tooltip]);

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className={styles.section}
    >
      <div className={styles.headerRow}>
        <h2 id="skills-heading" className={`${styles.heading} sectionTitle`}>
          Skills
        </h2>
        <p className={styles.hint}>
          The languages, tools, and platforms I use to design, build, and ship
          products.
        </p>
      </div>

      <div className={styles.cardsRow}>
        <motion.article
          className={styles.card}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          whileHover={{ y: -6, rotateX: 3, rotateY: -3 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className={styles.subHeader}>
            <h3 className={styles.subHeading}>
              Programming Languages &amp; Tools
            </h3>
            <p className={styles.subHint}>
              Tech stack I reach for on a daily basis.
            </p>
          </div>
          <div className={styles.iconGrid}>
            {programmingSkills.map((skill) => (
              <div
                key={skill.id}
                className={styles.iconCard}
                onMouseEnter={(event) => handleShowTooltip(event, skill.label)}
                onMouseMove={handleMoveTooltip}
                onMouseLeave={handleHideTooltip}
              >
                <div className={styles.iconBadge}>
                  <Image
                    src={skill.iconSrc}
                    alt={skill.label}
                    fill
                    className={styles.iconImage}
                    sizes="44px"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.article>

        <motion.article
          className={styles.card}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          whileHover={{ y: -6, rotateX: 3, rotateY: -3 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <div className={styles.subHeader}>
            <h3 className={styles.subHeading}>Languages Spoken</h3>
            <p className={styles.subHint}>
              How I collaborate with teams across cultures.
            </p>
          </div>
          <div className={styles.languageGrid}>
            {languageSkills.map((lang) => (
              <div
                key={lang.id}
                className={styles.languageCard}
                onMouseEnter={(event) =>
                  handleShowTooltip(event, lang.englishName)
                }
                onMouseMove={handleMoveTooltip}
                onMouseLeave={handleHideTooltip}
              >
                <div className={styles.languageNative}>{lang.nativeLabel}</div>
                <div className={styles.languageLevel}>{lang.level}</div>
              </div>
            ))}
          </div>
        </motion.article>
      </div>
      {tooltip && (
        <div ref={tooltipRef} className={styles.languageTooltip}>
          {tooltip.label}
        </div>
      )}
    </section>
  );
}

export default SkillsSection;
