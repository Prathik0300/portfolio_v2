import Link from "next/link";
import { Shell, Prompt } from "@/components/shell/Shell";
import { WorkList } from "@/components/rows/WorkList";
import { RecentRoles } from "@/components/rows/RecentRoles";
import { readme, siteLinks, stackItems } from "@/content/profile";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <Shell>
      <Prompt typed cmd="cat README.md" />
      <section className={`md ${styles.readme}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className={styles.photo} src="/prathik.webp" alt="Portrait of Prathik Pugazhenthi" width={640} height={877} fetchPriority="high" decoding="async" />
        <h1>{readme.title}</h1>
        {readme.intro.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </section>
      <nav className={styles.links} aria-label="Links">
        <a href={siteLinks.github} target="_blank" rel="noreferrer" data-track="social|github">github</a>
        <a href={siteLinks.linkedin} target="_blank" rel="noreferrer" data-track="social|linkedin">linkedin</a>
        <a href={`mailto:${siteLinks.email}`} data-track="contact|email">email</a>
        <a href={siteLinks.resume} download data-track="file|resume">résumé</a>
      </nav>

      <section className={styles.block} aria-label="Projects">
        <Prompt cmd="ls -t work/ | head -3" path="~" />
        <WorkList limit={3} />
        <p className="faint" style={{ marginTop: 16 }}>
          <Link href="/work">more in work/</Link>
        </p>
      </section>

      <section className={styles.block} aria-label="Recent roles">
        <Prompt cmd="git log --oneline -3" path="~/career" />
        <RecentRoles limit={3} />
        <p className="faint" style={{ marginTop: 16 }}>
          <Link href="/experience">full history (git log --graph)</Link>
        </p>
      </section>

      <section className={styles.block} aria-label="Stack">
        <Prompt cmd="cat stack.txt" />
        <p className={styles.stackText}>{stackItems.join(", ")}</p>
      </section>

      <p className={styles.mail}>
        <span className="ps1">$ </span>mail{" "}
        <a href={`mailto:${siteLinks.email}`} data-track="contact|email">{siteLinks.email}</a>
      </p>
    </Shell>
  );
}
