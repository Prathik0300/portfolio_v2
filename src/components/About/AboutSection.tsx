'use client';

import { motion } from "framer-motion";
import { aboutCopy } from "@/lib/portfolioData";
import styles from "./AboutSection.module.css";

function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-heading" className={styles.section}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className={styles.pill}>
          <span className={styles.accentDot} />
          About
        </div>
        <h2 id="about-heading" className={styles.heading}>
          {aboutCopy.title}
        </h2>
        <div className={styles.body}>
          {aboutCopy.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default AboutSection;

