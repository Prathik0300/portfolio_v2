import Link from "next/link";
import type { Block, Project } from "@/content/types";
import { numberFigures, slugify } from "@/lib/media";
import { Figure } from "./Figure";
import { Lightbox } from "./Lightbox";
import { SectionSpy } from "./SectionSpy";
import styles from "./Article.module.css";

type Numbers = ReturnType<typeof numberFigures>;

function Blocks({ blocks, nums }: { blocks: Block[]; nums: Numbers }) {
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
            return <Figure key={i} fig={b} n={nums.get(b) ?? 0} />;
          case "gallery":
            return (
              <div key={i} className={styles.gallery}>
                {b.items.map((f) => (
                  <Figure key={f.src} fig={f} n={nums.get(f) ?? 0} />
                ))}
              </div>
            );
          case "video":
            return (
              <figure key={i} className={styles.video}>
                <video controls preload="none" poster={b.poster} width={b.width} height={b.height} playsInline>
                  <source src={b.src} type="video/mp4" />
                  <a href={b.src}>Download the demo video</a>
                </video>
                <figcaption>{b.caption}</figcaption>
              </figure>
            );
          case "facts":
            return (
              <dl key={i} className={styles.facts}>
                {b.items.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            );
          case "callout":
            return (
              <p key={i} className={styles.callout}>
                {b.text}
              </p>
            );
        }
      })}
    </>
  );
}

function ContentsList({ project: p }: { project: Project }) {
  return (
    <div className={styles.tocList}>
      {p.sections.map((s) => (
        <div key={s.title} className={styles.tocItem} data-toc-item>
          <a href={`#${slugify(s.title)}`}>{s.title}</a>
        </div>
      ))}
    </div>
  );
}

export function Article({ project: p }: { project: Project }) {
  const nums = numberFigures(p);
  return (
    <article className="md">
      <h1>{p.name}</h1>
      <p className={styles.blurb}>{p.blurb}</p>
      <dl className={styles.meta}>
        <dt>when</dt>
        <dd>{p.dateLabel}</dd>
        <dt>where</dt>
        <dd>{p.where}</dd>
        <dt>role</dt>
        <dd>{p.role}</dd>
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

      <dl className={`${styles.meta} ${styles.glance}`} aria-label="At a glance">
        <dt>problem</dt>
        <dd>{p.glance.problem}</dd>
        <dt>built</dt>
        <dd>{p.glance.built}</dd>
        <dt>result</dt>
        <dd>{p.glance.result}</dd>
      </dl>

      <details className={styles.tocMobile}>
        <summary>Contents</summary>
        <ContentsList project={p} />
      </details>

      <div className={styles.layout}>
        <div className={styles.body}>
          {p.sections.map((s) => (
            <section key={s.title} aria-labelledby={slugify(s.title)}>
              <h2 id={slugify(s.title)} data-section>{s.title}</h2>
              {s.subtitle && <p className={styles.subtitle}>{s.subtitle}</p>}
              <Blocks blocks={s.blocks} nums={nums} />
            </section>
          ))}
        </div>
        <nav className={styles.rail} aria-label="Contents" data-toc>
          <p className={styles.railTitle}>contents</p>
          <ContentsList project={p} />
        </nav>
      </div>

      <p className={styles.back} data-end>
        <Link href="/projects">&lt; back to projects/</Link>
      </p>
      <SectionSpy />
      <Lightbox />
    </article>
  );
}
