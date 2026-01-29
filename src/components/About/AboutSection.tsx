"use client";

import { motion } from "framer-motion";
import { aboutCopy } from "@/lib/portfolioData";
import styles from "./AboutSection.module.css";

function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className={styles.section}
    >
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className={styles.headerRow}>
          <div>
            <h2 id="about-heading" className={`${styles.heading} sectionTitle`}>
              {aboutCopy.title}
            </h2>
          </div>
          <p className={styles.subtitle}>
            A developer who enjoys owning systems end-to-end — from product
            ideas to cloud infrastructure.
          </p>
        </div>

        <div className={styles.layout}>
          <div className={styles.left}>
            <div className={styles.body}>
              {aboutCopy.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutSection;
