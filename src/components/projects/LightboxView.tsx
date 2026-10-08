"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Lightbox.module.css";

export type LightboxItem = { src: string; alt: string; caption: string; width: number };

export default function LightboxView({ items, start, returnTo, onClose }: { items: LightboxItem[]; start: number; returnTo: HTMLElement; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [i, setI] = useState(start);
  const [closing, setClosing] = useState(false);
  const item = items[i];

  useEffect(() => {
    const d = dialog.current;
    d?.showModal();
    closeBtn.current?.focus();
    return () => {
      d?.close();
      // the page is no longer inert once the dialog is closed, so focus can go back to the figure that opened it
      returnTo.focus({ preventScroll: true });
    };
  }, [returnTo]);

  // each picture opens at the top
  useEffect(() => {
    scroller.current?.scrollTo(0, 0);
  }, [i]);

  const requestClose = () => {
    if (closing) return;
    setClosing(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(onClose, reduce ? 0 : 130);
  };
  const go = (d: number) => setI((n) => (n + d + items.length) % items.length);

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      data-closing={closing || undefined}
      aria-label={`Figure ${i + 1} of ${items.length}`}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        else if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className={styles.bar}>
        <span className={styles.count} aria-hidden>
          fig {i + 1}/{items.length}
        </span>
        {items.length > 1 && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous figure">&lt; prev</button>
            <button type="button" onClick={() => go(1)} aria-label="Next figure">next &gt;</button>
          </>
        )}
        <button type="button" className={styles.close} onClick={requestClose} ref={closeBtn}>close</button>
      </div>
      <div
        className={styles.scroller}
        ref={scroller}
        tabIndex={0}
        onClick={(e) => e.target === e.currentTarget && requestClose()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- the overlay shows the exact file the page links to */}
        <img src={item.src} alt={item.alt} data-dark={item.src.endsWith(".svg") || undefined} style={{ ["--w" as string]: `${item.width}px` }} />
      </div>
      <p className={styles.caption}>{item.caption}</p>
    </dialog>
  );
}
