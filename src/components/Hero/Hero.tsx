"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { heroCopy } from "@/lib/portfolioData";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import styles from "./Hero.module.css";

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Hero() {
  const { scrollToSection } = useScrollToSection();

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  const shimmer = useSpring(50, {
    stiffness: 220,
    damping: 26,
  });

  const rotateX = useSpring(useTransform(tiltY, [-40, 40], [6, -6]), {
    stiffness: 180,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(tiltX, [-40, 40], [-8, 8]), {
    stiffness: 180,
    damping: 20,
  });

  const handlePointerMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const ratioX = (x / (rect.width / 2)) * 40;
    const ratioY = (y / (rect.height / 2)) * 40;
    tiltX.set(ratioX);
    tiltY.set(ratioY);

    const percent = ((x + rect.width / 2) / rect.width) * 100;
    shimmer.set(Math.min(100, Math.max(0, percent)));
  };

  const handlePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    shimmer.set(50);
  };

  const subtitleParts = heroCopy.subtitle.split("·");

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className={styles.heroSection}
    >
      <motion.div
        className={styles.heroInner}
        initial="hidden"
        animate="visible"
        variants={heroVariants}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ rotateX, rotateY }}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
      >
        <div className={styles.heroCopy}>
          <p className={styles.heroEyebrow}>Hi, I&apos;m</p>
          <div className={styles.heroTitle}>
            <h1 id="hero-heading" className={styles.heroName}>
              <span>Prathik Pugazhenthi</span>
            </h1>
            <p className={styles.heroSubtitle}>
              {subtitleParts.map((segment, index) => (
                <span key={segment + index}>
                  {index > 0 && (
                    <span className={styles.subtitleDelimiter}> · </span>
                  )}
                  <span className={styles.subtitleSegment}>
                    {segment.trim()}
                  </span>
                </span>
              ))}
            </p>
          </div>

          <div className={styles.heroBlurb}>
            {heroCopy.blurbLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className={styles.heroCtas}>
            <motion.button
              type="button"
              className={styles.primaryCta}
              whileHover={{ scale: 1.04, translateY: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => scrollToSection("projects")}
            >
              View Projects
            </motion.button>
            <motion.button
              type="button"
              className={styles.secondaryCta}
              whileHover={{ scale: 1.03, translateY: -1 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              onClick={() => scrollToSection("services")}
            >
              What I Offer
            </motion.button>
          </div>
        </div>

        <div className={styles.heroImageWrap}>
          <span className={styles.orbitNode} aria-hidden="true" />
          <span className={styles.orbitDiamond} aria-hidden="true" />
          {/* <span className={styles.orbitStar} aria-hidden="true" /> */}
          <div className={styles.heroGlow} aria-hidden="true" />
          <motion.div
            className={styles.heroPortraitFrame}
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            <div className={styles.heroPortraitInner}>
              <Image
                src="/prathik-hero.png"
                alt="Portrait of Prathik Pugazhenthi"
                width={430}
                height={560}
                priority
              />
            </div>
          </motion.div>

          <div className={styles.heroTagRow} aria-hidden="true">
            <motion.div
              className={styles.heroTag}
              whileHover={{ y: -3, rotateX: -4, rotateY: 4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              Full-Stack &amp; Cloud Developer
            </motion.div>
            <motion.div
              className={styles.heroTag}
              whileHover={{ y: -3, rotateX: -4, rotateY: 4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              AI-Enabled Systems &amp; Infrastructure
            </motion.div>
            <motion.div
              className={styles.heroTag}
              whileHover={{ y: -3, rotateX: -4, rotateY: 4 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              DevOps, Distributed Systems &amp; Modernization
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
