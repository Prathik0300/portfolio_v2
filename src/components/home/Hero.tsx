import Image from "next/image";
import Link from "next/link";
import { heroCopy, siteLinks } from "@/lib/portfolioData";
import { Reveal } from "@/components/ui";
import styles from "./home.module.css";

export function Hero() {
  return (
    <section id="home" className={`wrap ${styles.heroSection}`} aria-labelledby="hero-h1">
      <div className={styles.heroGrid}>
        <Reveal className={styles.heroCopy}>
          <span className="kicker">{heroCopy.kicker}</span>
          <h1 id="hero-h1" className={styles.h1}>
            {heroCopy.headline}
          </h1>
          <p className={styles.lead}>{heroCopy.blurb}</p>
          <div className={styles.ctaRow}>
            <Link href="/work" className="btn btn--primary">
              View work
            </Link>
            <a href={siteLinks.resume} download className="btn">
              Résumé ↓
            </a>
            <span className={styles.inlineLinks}>
              <a href={siteLinks.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={siteLinks.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </span>
          </div>
          <p className={`mono ${styles.locLine}`}>{heroCopy.location}</p>
        </Reveal>

        <Reveal className={styles.heroPhoto} delay={0.08}>
          <Image
            src="/prathik-hero.png"
            alt="Prathik Pugazhenthi"
            width={430}
            height={560}
            priority
          />
        </Reveal>
      </div>
    </section>
  );
}
