'use client';

import { motion } from "framer-motion";
import { serviceItems } from "@/lib/portfolioData";
import styles from "./ServicesSection.module.css";

const ICON_GLYPHS: Record<string, string> = {
  fullstack: "</>",
  cloudDevops: "☁",
  modernization: "🛠",
  performance: "⚡",
  ai: "✨",
};

function ServicesSection() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className={styles.section}
    >
      <div className={styles.headerRow}>
        <h2 id="services-heading" className={styles.heading}>
          What I Offer
        </h2>
        <p className={styles.hint}>How I can help you design, build, and scale products.</p>
      </div>
      <div className={styles.grid}>
        {serviceItems.map((service) => (
          <motion.article
            key={service.id}
            className={styles.card}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            whileHover={{ y: -6, rotateX: 3, rotateY: -3, scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className={styles.icon} aria-hidden="true">
              {ICON_GLYPHS[service.id] ?? "•"}
            </div>
            <h3 className={styles.title}>{service.title}</h3>
            <p className={styles.description}>{service.description}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default ServicesSection;

