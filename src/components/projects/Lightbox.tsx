"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import type { LightboxItem } from "./LightboxView";

// The overlay is fetched the first time someone clicks a figure.
const LightboxView = lazy(() => import("./LightboxView"));

/** One delegated listener for every figure on the page. Without JS the link simply opens the image. */
export function Lightbox() {
  const [state, setState] = useState<{ items: LightboxItem[]; index: number; trigger: HTMLElement } | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[data-figure]");
      if (!a) return;
      e.preventDefault();
      const all = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[data-figure]"));
      setState({
        items: all.map((x) => ({
          src: x.getAttribute("href") ?? "",
          alt: x.querySelector("img")?.alt ?? "",
          caption: x.dataset.caption ?? "",
          width: Number(x.querySelector("img")?.getAttribute("width")) || 0,
        })),
        index: all.indexOf(a),
        trigger: a,
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!state) return null;
  return (
    <Suspense fallback={null}>
      <LightboxView
        items={state.items}
        start={state.index}
        returnTo={state.trigger}
        onClose={() => {
          setState(null);
        }}
      />
    </Suspense>
  );
}
