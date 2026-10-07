"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import type { PaletteCommand } from "./CommandPalette";

// Loaded the first time the palette opens, so it costs nothing on page load.
const CommandPalette = lazy(() => import("./CommandPalette"));

/** The only global client behaviour: Ctrl/Cmd+K (or any [data-palette] button) opens the palette. */
export function PaletteHost({ commands }: { commands: PaletteCommand[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest("[data-palette]")) setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  if (!open) return null;
  return (
    <Suspense fallback={null}>
      <CommandPalette commands={commands} onClose={() => setOpen(false)} />
    </Suspense>
  );
}
