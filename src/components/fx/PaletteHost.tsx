"use client";

import { lazy, Suspense, useEffect, useState } from "react";
import type { PaletteCommand } from "./CommandPalette";

// Loaded the first time the palette opens, so it costs nothing on page load.
const CommandPalette = lazy(() => import("./CommandPalette"));

/** The global client behaviour: Ctrl/Cmd+K (or any [data-palette] button) opens the palette, and mailto links also copy the address. */
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
      const target = e.target as Element | null;
      if (target?.closest("[data-palette]")) setOpen(true);
      // Many computers have no mail app set up, so a mailto: link can do nothing at all. Copy the address too, and say so.
      const mail = target?.closest<HTMLAnchorElement>('a[href^="mailto:"]');
      if (mail) {
        const address = mail.getAttribute("href")!.slice(7);
        // the note says "copied", or shows the address itself if the browser refused to copy it
        const note = (text: string) => {
          mail.setAttribute("data-copied", text);
          window.setTimeout(() => mail.removeAttribute("data-copied"), 2400);
        };
        if (navigator.clipboard) navigator.clipboard.writeText(address).then(() => note("copied"), () => note(address));
        else note(address);
      }
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
