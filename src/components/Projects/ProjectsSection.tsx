"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { projectItems } from "@/lib/portfolioData";
import { ProjectTileSkeleton } from "@/components/Skeleton";
import styles from "./ProjectsSection.module.css";

function ProjectsSection() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay for skeleton demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className={styles.section}
    >
      <div className={styles.headerRow}>
        <h2 id="projects-heading" className={`${styles.heading} sectionTitle`}>
          Projects
        </h2>
        <p className={styles.hint}>
          Selected work that highlights my focus on performance, UX, and
          reliability.
        </p>
      </div>
      <div className={styles.grid}>
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <ProjectTileSkeleton key={`skeleton-${index}`} />
          ))
        ) : (
          projectItems.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className={styles.cardLink}
          >
            <motion.article
              className={styles.card}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className={styles.imageWrapper}>
                {project.tileMedia.kind === "image" ? (
                  <Image
                    src={project.tileMedia.src}
                    alt={project.tileMedia.alt ?? project.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className={styles.image}
                  />
                ) : (
                  <video
                    key={project.tileMedia.src}
                    src={project.tileMedia.src}
                    className={styles.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}
              </div>

              <div className={styles.overlay}>
                <div className={styles.overlayInner}>
                  <h3 className={styles.title}>{project.name}</h3>
                  <p className={styles.techStack}>
                    {project.techStack.join(" • ")}
                  </p>
                </div>
              </div>
            </motion.article>
          </Link>
        ))
        )}
      </div>
    </section>
  );
}

export default ProjectsSection;
