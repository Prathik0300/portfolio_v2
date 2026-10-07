import type { Metadata } from "next";
import { aboutPage, languages, siteLinks } from "@/content/profile";
import { educationItems } from "@/content/experience";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumb, graph, personSchema } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineer finishing an MS in Computer Science at UIC. Previously an SDE at Bajaj Finserv Health. Cloud, backend, distributed systems and AI platforms.",
  openGraph: { type: "profile" },
};

export default function AboutPage() {
  return (
    <div className="wrap">
      <JsonLd
        data={graph(
          breadcrumb([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
          {
            "@type": "ProfilePage",
            url: absoluteUrl("/about"),
            mainEntity: { "@id": `${SITE_URL}/#person` },
          },
          personSchema,
        )}
      />
      <header className={styles.hero}>
        <div>
          <p className="kicker">About</p>
          <h1 className={styles.h1}>{aboutPage.heading}</h1>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.photo}
          src="/prathik.webp"
          alt="Portrait of Prathik Pugazhenthi"
          width={640}
          height={877}
          fetchPriority="high"
          decoding="async"
        />
      </header>

      <section className={styles.block} aria-label="Bio">
        {aboutPage.body.map((p, i) => (
          <p key={i} className={i === 0 ? styles.lead : styles.p}>
            {p}
          </p>
        ))}
      </section>

      <section className={styles.block} aria-labelledby="edu">
        <h2 id="edu" className={styles.h2}>Education</h2>
        <ul className={styles.eduList}>
          {educationItems.map((e) => (
            <li key={e.school}>
              <h3 className={styles.eduDegree}>{e.degree}</h3>
              <p className={styles.eduMeta}>
                {e.school}
                {e.note ? `, ${e.note}` : ""}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.block} aria-labelledby="lang">
        <h2 id="lang" className={styles.h2}>Languages</h2>
        <ul className={styles.langs}>
          {languages.map((l) => (
            <li key={l.name} className="tag">
              {l.name} · {l.level}
            </li>
          ))}
        </ul>
      </section>

      <section className={`${styles.block} ${styles.last}`} aria-labelledby="contact">
        <h2 id="contact" className={styles.h2}>Contact</h2>
        <div className={styles.cta}>
          <a href={`mailto:${siteLinks.email}`} className="btn btn--primary" data-track="contact|email">{siteLinks.email}</a>
          <a href={siteLinks.linkedin} target="_blank" rel="noreferrer" className="btn" data-track="social|linkedin">LinkedIn</a>
          <a href={siteLinks.github} target="_blank" rel="noreferrer" className="btn" data-track="social|github">GitHub</a>
          <a href={siteLinks.resume} download className="btn" data-track="file|resume">Résumé ↓</a>
        </div>
        <p className={`mono ${styles.fine}`}>{siteLinks.location}</p>
      </section>
    </div>
  );
}
