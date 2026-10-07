import Link from "next/link";
import type { Block, Project } from "@/content/types";
import styles from "./Article.module.css";

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{b.text}</p>;
          case "list":
            return (
              <ul key={i}>
                {b.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            );
          case "steps":
            return (
              <ol key={i}>
                {b.items.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            );
          case "figure":
            return (
              <figure key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP: a plain img avoids client JS and an optimizer hop */}
                <img
                  src={b.src}
                  srcSet={b.width > 900 ? `${b.src.replace(".webp", "-800.webp")} 800w, ${b.src} ${b.width}w` : undefined}
                  sizes="(min-width: 800px) 76ch, 100vw"
                  alt={b.alt}
                  width={b.width}
                  height={b.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{b.caption}</figcaption>
              </figure>
            );
        }
      })}
    </>
  );
}

export function Article({ project: p }: { project: Project }) {
  return (
    <article className="md">
      <h1>{p.name}</h1>
      <dl className={styles.meta}>
        <dt>when</dt>
        <dd>{p.dateLabel}</dd>
        <dt>where</dt>
        <dd>{p.where}</dd>
        <dt>stack</dt>
        <dd>{p.stack.join(", ")}</dd>
        {p.links.length > 0 && (
          <>
            <dt>links</dt>
            <dd>
              {p.links.map((l, i) => (
                <span key={l.url}>
                  {i > 0 && <span className="faint"> · </span>}
                  <a href={l.url} target="_blank" rel="noreferrer" data-track={`project|${p.slug}-${l.label}`}>
                    {l.label}
                  </a>
                </span>
              ))}
            </dd>
          </>
        )}
      </dl>
      {p.sections.map((s) => (
        <section key={s.title}>
          <h2>{s.title}</h2>
          <Blocks blocks={s.blocks} />
        </section>
      ))}
      <p className={styles.back}>
        <Link href="/projects">&lt; back to projects/</Link>
      </p>
    </article>
  );
}
