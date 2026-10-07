import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { siteLinks } from "@/content/profile";
import { SITE_NAME } from "@/lib/site";
import styles from "./shell.module.css";

type Current = "work" | "experience" | "about" | undefined;

function Nav({ current }: { current: Current }) {
  const link = (href: string, label: string, key: Current) => (
    <Link href={href} aria-current={current === key ? "page" : undefined} data-track={`nav|${label}`}>
      {label}
    </Link>
  );
  return (
    <header className={styles.navWrap}>
      <div className={styles.nav}>
        <Link href="/" className={styles.home} aria-label="Home">
          <span className={`ps1 ${styles.host}`}>prathik@chicago</span>
          <span className={`faint ${styles.host}`}>:</span>
          <span className="cwd">~</span>
          <span>$</span>
        </Link>
        <nav className={styles.links} aria-label="Primary">
          {link("/work", "work", "work")}
          {link("/experience", "experience", "experience")}
          {link("/about", "about", "about")}
          <a href={siteLinks.resume} download data-track="file|resume">résumé</a>
          <button type="button" className={styles.k} data-palette aria-label="Open command menu" title="Command menu (Ctrl or Cmd + K)">
            ⌘K
          </button>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
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

export function Shell({ current, children }: { current?: Current; children: ReactNode }) {
  return (
    <>
      <Nav current={current} />
      <main id="main" className="page">
        {children}
      </main>
      <Footer />
    </>
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
