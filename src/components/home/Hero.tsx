import Link from "next/link";
import { heroCopy, siteLinks } from "@/content/profile";
import styles from "./home.module.css";

export function Hero() {
  const kickerLen = heroCopy.kicker.length;
  return (
    <section className={`wrap ${styles.hero}`} aria-labelledby="hero-title">
      <div className={styles.heroGrid}>
        <div className={styles.heroCopy}>
          <p className="kicker">
            <span className="srOnly">{heroCopy.kicker}</span>
            <span className="typed" style={{ "--n": kickerLen } as React.CSSProperties} aria-hidden>
              {heroCopy.kicker}
            </span>
            <span className="caret" aria-hidden />
          </p>
          <h1 id="hero-title" className={styles.h1}>
            {heroCopy.headline}
          </h1>
          <p className={styles.lead}>{heroCopy.blurb}</p>
          <div className={styles.cta}>
            <Link href="/work" className="btn btn--primary" data-track="nav|view-work">
              View work
            </Link>
            <a href={siteLinks.resume} download className="btn" data-track="file|resume">
              Résumé ↓
            </a>
            <span className={styles.inline}>
              <a href={siteLinks.github} target="_blank" rel="noreferrer" data-track="social|github">GitHub</a>
              <a href={siteLinks.linkedin} target="_blank" rel="noreferrer" data-track="social|linkedin">LinkedIn</a>
            </span>
          </div>
          <p className={`mono ${styles.loc}`}>{heroCopy.location}</p>
        </div>

        <picture className={styles.photo}>
          {/* desktop only: on phones the placeholder pixel is all that loads */}
          <source media="(min-width: 900px)" srcSet="/prathik.webp" type="image/webp" />
          <img
            src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
            alt="Portrait of Prathik Pugazhenthi"
            width={640}
            height={877}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>
    </section>
  );
}
