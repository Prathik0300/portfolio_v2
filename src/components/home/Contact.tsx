import { contactCopy, siteLinks } from "@/content/profile";
import styles from "./home.module.css";

export function Contact() {
  return (
    <section className="section" aria-labelledby="contact-title">
      <div className={`wrap ${styles.contact}`}>
        <p className="kicker">{contactCopy.kicker}</p>
        <h2 id="contact-title" className={styles.contactH}>{contactCopy.heading}</h2>
        <p className={styles.lead}>{contactCopy.sub}</p>
        <div className={styles.cta}>
          <a href={`mailto:${siteLinks.email}`} className="btn btn--primary" data-track="contact|email">{siteLinks.email}</a>
          <a href={siteLinks.linkedin} target="_blank" rel="noreferrer" className="btn" data-track="social|linkedin">LinkedIn</a>
          <a href={siteLinks.github} target="_blank" rel="noreferrer" className="btn" data-track="social|github">GitHub</a>
        </div>
      </div>
    </section>
  );
}
