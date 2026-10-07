"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteLinks } from "@/content/profile";
import styles from "./SiteNav.module.css";

const LINKS = [
  { href: "/work", label: "work" },
  { href: "/experience", label: "experience" },
  { href: "/about", label: "about" },
] as const;

/** The only client piece of the chrome: active-link state and the mobile menu toggle. */
export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const close = () => setOpen(false);

  return (
    <header className={styles.nav}>
      <div className={`wrap ${styles.inner}`}>
        <Link href="/" className={`mono ${styles.logo}`} onClick={close}>
          <span className={styles.tilde}>~/</span>prathik<span className={styles.dim}>.dev</span>
        </Link>

        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`mono ${styles.link}`}
              aria-current={isActive(l.href) ? "page" : undefined}
              data-track={`nav|${l.label}`}
            >
              {l.label}
            </Link>
          ))}
          <button type="button" className={`mono ${styles.kbd}`} data-palette aria-label="Open command menu" title="Command menu (⌘K or Ctrl+K)">
            ⌘K
          </button>
          <a href={siteLinks.resume} download className={`btn ${styles.resume}`} data-track="file|resume">
            résumé ↓
          </a>
        </nav>

        <button
          type="button"
          className={styles.burger}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <nav id="mobile-menu" className={styles.mobileMenu} aria-label="Primary mobile">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`mono ${styles.mobileLink}`}
              aria-current={isActive(l.href) ? "page" : undefined}
              data-track={`nav|${l.label}`}
              onClick={close}
            >
              {l.label}
            </Link>
          ))}
          <button type="button" className={`mono ${styles.mobileLink} ${styles.mobileBtn}`} data-palette onClick={close}>
            $ commands
          </button>
          <a href={siteLinks.resume} download className={`mono ${styles.mobileLink}`} data-track="file|resume" onClick={close}>
            résumé ↓
          </a>
        </nav>
      )}
    </header>
  );
}
