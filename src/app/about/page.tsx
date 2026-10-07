import type { Metadata } from "next";
import Image from "next/image";
import { SiteNav } from "@/components/chrome/SiteNav";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { ScrollProgress, Reveal } from "@/components/ui";
import { aboutPage, educationItems, languageSkills, siteLinks } from "@/lib/portfolioData";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineer finishing an MS at UIC. Frontend performance → backend ownership → cloud infra → AI platforms. How I work, education, and how to reach me.",
  alternates: { canonical: "https://prathikpugazhenthi.dev/about" },
};

export default function AboutPage() {
  return (
    <>
      <SiteNav />
      <ScrollProgress />
      <main className="wrap" style={{ paddingBlock: "clamp(48px, 7vw, 72px)" }}>
        <Reveal className={styles.hero} as="div">
          <div>
            <span className="kicker">{aboutPage.kicker}</span>
            <h1 className={styles.h1}>{aboutPage.heading}</h1>
          </div>
          <div className={styles.photo}>
            <Image
              src="/prathik-hero.png"
              alt="Portrait of Prathik Pugazhenthi"
              width={430}
              height={560}
              priority
            />
          </div>
        </Reveal>

        <Reveal className={styles.section} as="div">
          {aboutPage.body.map((p, i) => (
            <p key={i} className={i === 0 ? styles.leadP : styles.p}>
              {p}
            </p>
          ))}
        </Reveal>

        <section className={styles.section}>
          <Reveal>
            <h2 className={styles.h2}>How I work</h2>
          </Reveal>
          <div className={styles.principleGrid}>
            {aboutPage.principles.map((pr, i) => (
              <Reveal key={pr.k} index={i} className={styles.card}>
                <div className={`mono ${styles.cardK}`}>{pr.k}</div>
                <p className={styles.cardV}>{pr.v}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <Reveal>
            <h2 className={styles.h2}>Education</h2>
          </Reveal>
          <div className={styles.eduGrid}>
            {educationItems.map((e, i) => (
              <Reveal key={e.school} index={i} className={styles.card}>
                <div className={styles.eduDegree}>{e.degree}</div>
                <div className={styles.eduSchool}>
                  {e.school}
                  {e.note ? ` · ${e.note}` : ""}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <Reveal>
            <h2 className={styles.h2}>Beyond code</h2>
            <p className={styles.p}>{aboutPage.beyond}</p>
            <div className={styles.langs}>
              {languageSkills.map((l) => (
                <span key={l.id} className="tag">
                  {l.englishName} · {l.level}
                </span>
              ))}
            </div>
          </Reveal>
        </section>

        <section className={styles.section} style={{ borderBottom: "1px solid var(--line)" }}>
          <Reveal>
            <h2 className={styles.h2}>Reach me</h2>
            <div className={styles.ctaRow}>
              <a href={`mailto:${siteLinks.email}`} className="btn btn--primary">
                {siteLinks.email}
              </a>
              <a href={siteLinks.linkedin} target="_blank" rel="noreferrer" className="btn">
                LinkedIn
              </a>
              <a href={siteLinks.github} target="_blank" rel="noreferrer" className="btn">
                GitHub
              </a>
              <a href={siteLinks.resume} download className="btn">
                Resume ↓
              </a>
            </div>
            <p className={`mono ${styles.fine}`}>
              {siteLinks.location} · open to relocate · replies within a day
            </p>
          </Reveal>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
