"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteLinks } from "@/lib/portfolioData";
import { analytics } from "@/utils/analytics";
import styles from "./SiteNav.module.css";

const LINKS = [
  { href: "/work", label: "work" },
  { href: "/experience", label: "experience" },
  { href: "/about", label: "about" },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className={styles.nav} data-open={open}>
      <div className={`wrap ${styles.inner}`}>
        <Link
          href="/"
          className={`mono ${styles.logo}`}
          aria-label="Home"
          onClick={() => setOpen(false)}
        >
          <span className={styles.tilde}>~/</span>prathik
          <span className={styles.dim}>.dev</span>
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`mono ${styles.link} ${isActive(l.href) ? styles.active : ""}`}
              onClick={() => analytics.trackNavClick(l.label)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={siteLinks.resume}
            download
            className={`btn ${styles.resume}`}
            onClick={() => analytics.trackResumeDownload()}
          >
            résumé ↓
          </a>
        </nav>

        <button
          type="button"
          className={styles.burger}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav className={styles.mobileMenu} aria-label="Primary mobile">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`mono ${styles.mobileLink} ${isActive(l.href) ? styles.active : ""}`}
              onClick={() => {
                analytics.trackNavClick(l.label);
                setOpen(false);
              }}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={siteLinks.resume}
            download
            className={`mono ${styles.mobileLink}`}
            onClick={() => setOpen(false)}
          >
            résumé ↓
          </a>
        </nav>
      )}
    </header>
  );
}
