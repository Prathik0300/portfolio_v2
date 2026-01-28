"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { aboutCopy, aboutFacts, aboutHighlights } from "@/lib/portfolioData";
import { TextSkeleton, Skeleton } from "@/components/Skeleton";
import styles from "./AboutSection.module.css";

function AboutSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay for skeleton demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);

    return () => clearTimeout(timer);
  }, []);

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
            {isLoading ? (
              <Skeleton variant="text" width="150px" height="32px" />
            ) : (
              <h2 id="about-heading" className={`${styles.heading} sectionTitle`}>
                {aboutCopy.title}
              </h2>
            )}
          </div>
          {isLoading ? (
            <Skeleton variant="text" width="400px" height="18px" />
          ) : (
            <p className={styles.subtitle}>
              A developer who enjoys owning systems end-to-end — from product
              ideas to cloud infrastructure.
            </p>
          )}
        </div>

        <div className={styles.layout}>
          <div className={styles.left}>
            <div className={styles.body}>
              {isLoading ? (
                <TextSkeleton lines={3} />
              ) : (
                aboutCopy.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default AboutSection;
