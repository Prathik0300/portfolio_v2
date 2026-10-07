import type { Metadata } from "next";
import { Prompt } from "@/components/shell/Shell";
import { JsonLd } from "@/components/seo/JsonLd";
import { aboutPage, certifications, languages, siteLinks } from "@/content/profile";
import { educationItems } from "@/content/experience";
import { breadcrumb, graph } from "@/lib/seo";
import { absoluteUrl, SITE_URL } from "@/lib/site";
import styles from "../page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software engineer who finished an MS in Computer Science at UIC in May 2026. Previously RadioFX and Bajaj Finserv Health. Infrastructure, backend and AI systems.",
  openGraph: { type: "profile" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          breadcrumb([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
          { "@type": "ProfilePage", url: absoluteUrl("/about"), mainEntity: { "@id": `${SITE_URL}/#person` } },
        )}
      />
      <Prompt typed cmd="cat about.md" />
      <article className={`md ${styles.readme}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.photo} src="/prathik.webp" alt="Portrait of Prathik Pugazhenthi" width={640} height={877} fetchPriority="high" decoding="async" />
        <h1>About</h1>
        {aboutPage.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </article>

      <section className="md" style={{ marginTop: 36 }}>
        <h2>Education</h2>
        <ul>
          {educationItems.map((e) => (
            <li key={e.school}>
              {e.degree}, {e.school}
              {e.note ? <span className="faint"> ({e.note})</span> : null}
            </li>
          ))}
        </ul>
        <h2>Certifications</h2>
        <ul>
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <h2>Languages</h2>
        <p>{languages.join(", ")}</p>
      </section>

      <p className={styles.mail}>
        <span className="ps1">$ </span>mail{" "}
        <a href={`mailto:${siteLinks.email}`} data-track="contact|email">{siteLinks.email}</a>
      </p>
    </>
  );
}
