'use client';

import { motion } from "framer-motion";
import { projectItems } from "@/lib/portfolioData";
import styles from "./ProjectsSection.module.css";

function ProjectsSection() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className={styles.section}
    >
      <div className={styles.headerRow}>
        <h2 id="projects-heading" className={styles.heading}>
          Projects
        </h2>
        <p className={styles.hint}>
          Selected work that highlights my focus on performance, UX, and reliability.
        </p>
      </div>
      <div className={styles.grid}>
        {projectItems.map((project) => (
          <motion.article
            key={project.name}
            className={styles.card}
            initial={{ opacity: 0, y: 14 }}
            whileHover={{ y: -6, rotateX: 3, rotateY: -3 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className={styles.titleRow}>
              <h3 className={styles.title}>{project.name}</h3>
              <span className={styles.badge}>Case Study</span>
            </div>
            <p className={styles.description}>{project.description}</p>
            <div className={styles.techRow}>
              {project.techStack.map((tech) => (
                <span key={tech} className={styles.techChip}>
                  {tech}
                </span>
              ))}
            </div>
            <div className={styles.linksRow}>
              {project.liveUrl && project.liveUrl !== "#" && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${styles.linkButton} ${styles.linkButtonPrimary}`}
                >
                  Live
                </a>
              )}
              {project.githubUrl && project.githubUrl !== "#" && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.linkButton}
                >
                  GitHub
                </a>
              )}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;

