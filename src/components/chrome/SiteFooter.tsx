import { siteLinks } from "@/content/profile";
import { SITE_NAME } from "@/lib/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.inner}`}>
        <span className="mono">© {new Date().getFullYear()} {SITE_NAME}</span>
        <nav className={styles.links} aria-label="Elsewhere">
          <a className="mono" href={siteLinks.github} target="_blank" rel="noreferrer" data-track="social|github">GitHub</a>
          <a className="mono" href={siteLinks.linkedin} target="_blank" rel="noreferrer" data-track="social|linkedin">LinkedIn</a>
          <a className="mono" href={`mailto:${siteLinks.email}`} data-track="contact|email">Email</a>
        </nav>
      </div>
    </footer>
  );
}
