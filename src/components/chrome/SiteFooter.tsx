"use client";

import { siteLinks } from "@/lib/portfolioData";
import { analytics } from "@/utils/analytics";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <span className="mono">© {year} Prathik Pugazhenthi</span>
        <span className={`mono ${styles.mid}`}>Next.js · deployed on Vercel</span>
        <div className={styles.links}>
          <a
            className="mono"
            href={siteLinks.github}
            target="_blank"
            rel="noreferrer"
            onClick={() => analytics.trackSocialClick("GitHub", siteLinks.github)}
          >
            GitHub
          </a>
          <a
            className="mono"
            href={siteLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            onClick={() => analytics.trackSocialClick("LinkedIn", siteLinks.linkedin)}
          >
            LinkedIn
          </a>
          <a
            className="mono"
            href={`mailto:${siteLinks.email}`}
            onClick={() => analytics.trackEmailClick()}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}