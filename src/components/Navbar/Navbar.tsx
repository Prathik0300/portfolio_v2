'use client';

import { useCallback } from "react";
import { motion } from "framer-motion";
import { useUIContext } from "@/context/UIContext";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
] as const;

function Navbar() {
  const { activeSection } = useUIContext();
  const { scrollToSection } = useScrollToSection();

  const handleNavClick = useCallback(
    (id: (typeof NAV_LINKS)[number]["id"]) => {
      // Allow tap animation to play very briefly before scrolling
      window.setTimeout(() => {
        scrollToSection(id);
      }, 120);
    },
    [scrollToSection],
  );

  return (
    <header className={styles.navbar}>
      <nav className={styles.navInner} aria-label="Primary navigation">
        <motion.button
          type="button"
          className={styles.logo}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          onClick={() => handleNavClick("home")}
        >
          <span className={styles.logoBracket}>&lt;</span>
          Prathik
          <span className={styles.logoSlash}>/&gt;</span>
        </motion.button>

        <div className={styles.navRight}>
          <div className={styles.navLinks}>
            {NAV_LINKS.map((link) => (
              <motion.button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`${styles.navLinkButton} ${
                  activeSection === link.id ? styles.navLinkButtonActive : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          <motion.a
            href="/resume.pdf"
            download
            className={styles.resumeButton}
            aria-label="Download resume"
            whileHover={{ scale: 1.03, translateY: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <span>Download Resume</span>
            <span className={styles.resumeIcon}>↓</span>
          </motion.a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

