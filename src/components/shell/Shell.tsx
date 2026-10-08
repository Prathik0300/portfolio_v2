import Link from "next/link";
import type { CSSProperties } from "react";
import { siteLinks } from "@/content/profile";
import { SITE_NAME } from "@/lib/site";
import { NavLinks } from "./NavLinks";
import styles from "./shell.module.css";

/** Lives in the root layout, so it stays mounted (and sticky) while pages change underneath it. */
export function SiteHeader() {
  return (
    <header className={styles.navWrap}>
      <div className={styles.nav}>
        <Link href="/" className={styles.home} aria-label="Home">
          <span className={styles.hostWrap}>
            <span className="ps1">prathik@chicago</span>
            <span className="faint">:</span>
          </span>
          <span className="cwd">~</span>
          <span>$</span>
        </Link>
        <nav className={styles.links} aria-label="Primary">
          <NavLinks />
          <a href={siteLinks.resume} download data-track="file|resume">résumé</a>
          <button type="button" className={styles.k} data-palette aria-label="Open command menu" title="Command menu (Ctrl or Cmd + K)">
            ⌘K
          </button>
          {/* scroll progress: decorative, driven by CSS only, hidden where scroll timelines aren't supported */}
          <span className={styles.meter} aria-hidden="true">
            <span>[··········]</span>
            <span className={styles.fill}>[##########]</span>
          </span>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <span>© {new Date().getFullYear()} {SITE_NAME}</span>
        <span className={styles.footerLinks}>
          <a href={siteLinks.github} target="_blank" rel="noreferrer" data-track="social|github">github</a>
          <a href={siteLinks.linkedin} target="_blank" rel="noreferrer" data-track="social|linkedin">linkedin</a>
          <a href={`mailto:${siteLinks.email}`} data-track="contact|email">email</a>
        </span>
      </div>
    </footer>
  );
}

/** A shell prompt line. Only the first one on a page types itself. */
export function Prompt({ cmd, path = "~", typed = false }: { cmd: string; path?: string; typed?: boolean }) {
  return (
    <p className={styles.prompt} aria-hidden="true">
      <span className={`ps1 ${styles.host}`}>prathik@chicago</span>
      <span className={`faint ${styles.host}`}>:</span>
      <span className="cwd">{path}</span>
      <span>$ </span>
      {typed ? (
        <>
          <span className="typed" style={{ "--n": cmd.length } as CSSProperties}>{cmd}</span>
          <span className="caret" />
        </>
      ) : (
        <span>{cmd}</span>
      )}
    </p>
  );
}
