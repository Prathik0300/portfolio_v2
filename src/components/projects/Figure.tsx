import type { Figure as FigureData } from "@/content/types";
import styles from "./Figure.module.css";

/**
 * A numbered, captioned picture. The link opens the full-size image on its own; with JS, the Lightbox
 * intercepts the click and shows an overlay you can step through with the arrow keys.
 */
export function Figure({ fig, n }: { fig: FigureData; n: number }) {
  const wide = fig.width > 900;
  const dark = fig.src.endsWith(".svg");
  return (
    <figure className={styles.figure} id={`fig-${n}`} data-narrow={fig.width <= 500 || undefined}>
      <a
        href={fig.src}
        className={styles.zoom}
        data-figure
        data-caption={`Fig. ${n}. ${fig.caption}`}
        aria-label={`Enlarge figure ${n}: ${fig.caption}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP/SVG: a plain img avoids client JS and an optimizer hop */}
        <img
          src={fig.src}
          srcSet={wide && !dark ? `${fig.src.replace(".webp", "-800.webp")} 800w, ${fig.src} ${fig.width}w` : undefined}
          sizes="(min-width: 1000px) 780px, 100vw"
          alt={fig.alt}
          width={fig.width}
          height={fig.height}
          loading="lazy"
          decoding="async"
          data-dark={dark || undefined}
        />
      </a>
      <figcaption>
        <span className={styles.num}>Fig. {n}</span> {fig.caption}
      </figcaption>
    </figure>
  );
}
