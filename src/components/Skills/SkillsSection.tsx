'use client';

import { motion } from "framer-motion";
import { skillCategories } from "@/lib/portfolioData";
import styles from "./SkillsSection.module.css";

function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className={styles.section}>
      <div className={styles.headerRow}>
        <h2 id="skills-heading" className={styles.heading}>
          Skills
        </h2>
        <p className={styles.hint}>A snapshot of tools and technologies I work with.</p>
      </div>
      <div className={styles.grid}>
        {skillCategories.map((category) => (
          <motion.div
            key={category.id}
            className={styles.card}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -6, rotateX: 3, rotateY: -3 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <h3 className={styles.categoryLabel}>{category.label}</h3>
            <div className={styles.chips}>
              {category.skills.map((skill) => (
                <span key={skill} className={styles.chip}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;

