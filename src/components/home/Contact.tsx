"use client";

import { contactCopy, siteLinks } from "@/lib/portfolioData";
import { Reveal } from "@/components/ui";
import { analytics } from "@/utils/analytics";
import styles from "./home.module.css";

export function Contact() {
  return (
    <section className="section">
      <Reveal className={`wrap ${styles.contact}`} as="div">
        <span className="kicker">{contactCopy.kicker}</span>
        <h2 className={styles.contactH}>{contactCopy.heading}</h2>
        <p className={styles.lead}>{contactCopy.sub}</p>
        <div className={styles.ctaRow}>
          <a
            href={`mailto:${siteLinks.email}`}
            className="btn btn--primary"
            onClick={() => analytics.trackEmailClick()}
          >
            {siteLinks.email}
          </a>
          <a href={siteLinks.linkedin} target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
          <a href={siteLinks.github} target="_blank" rel="noreferrer" className="btn">GitHub</a>
          <a href={siteLinks.resume} download className="btn" onClick={() => analytics.trackResumeDownload()}>Resume ↓</a>
        </div>
      </Reveal>
    </section>
  );
}