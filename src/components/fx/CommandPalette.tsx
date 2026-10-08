"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CommandPalette.module.css";

export type PaletteCommand = {
  id: string;
  group: "Go to" | "Projects" | "Actions";
  label: string;
  /** internal path, external URL, or one of the built-in actions */
  href?: string;
  action?: "copy-email";
  value?: string;
};

export default function CommandPalette({
  commands,
  onClose,
}: {
  commands: PaletteCommand[];
  onClose: () => void;
}) {
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const [closing, setClosing] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const scrollOnKey = useRef(false);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  useEffect(() => {
    const d = dialog.current;
    d?.showModal();
    return () => d?.close();
  }, []);

  // Let the exit transition play, then unmount. Reduced motion closes at once.
  const requestClose = () => {
    if (closing) return;
    setClosing(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(onClose, reduce ? 0 : 130);
  };

  // Keep the highlighted result in view when arrowing, but not when the mouse is what moved it.
  useEffect(() => {
    if (!scrollOnKey.current) return;
    scrollOnKey.current = false;
    const id = results[active]?.id;
    if (id) document.getElementById(`cmd-${id}`)?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  const run = async (c: PaletteCommand) => {
    if (c.action === "copy-email" && c.value) {
      try {
        await navigator.clipboard.writeText(c.value);
        setCopied(true);
        setTimeout(requestClose, 700);
      } catch {
        requestClose();
      }
      return;
    }
    requestClose();
    if (!c.href) return;
    if (c.href.startsWith("/") && !c.href.endsWith(".pdf")) router.push(c.href);
    else window.open(c.href, "_blank", "noopener,noreferrer");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      scrollOnKey.current = true;
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      scrollOnKey.current = true;
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      void run(results[active]);
    }
  };

  return (
    <dialog
      ref={dialog}
      className={styles.dialog}
      data-closing={closing || undefined}
      onCancel={(e) => {
        e.preventDefault();
        requestClose();
      }}
      onClick={(e) => e.target === dialog.current && requestClose()}
      aria-label="Command menu"
    >
      <div className={styles.panel} onKeyDown={onKeyDown}>
        <div className={styles.inputRow}>
          <span className={styles.prompt} aria-hidden>$</span>
          <input
            autoFocus
            className={styles.input}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
              if (listRef.current) listRef.current.scrollTop = 0;
            }}
            placeholder="search"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
          />
          <kbd className={styles.kbd}>esc</kbd>
        </div>
        <ul id="palette-list" role="listbox" className={styles.list} ref={listRef}>
          {results.map((c, i) => {
            const header = i === 0 || results[i - 1].group !== c.group ? c.group : null;
            return (
              <li key={c.id} role="presentation">
                {header && <p className={styles.group}>{header}</p>}
                <button
                  id={`cmd-${c.id}`}
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  className={styles.item}
                  data-active={i === active}
                  data-copied={(c.action === "copy-email" && copied) || undefined}
                  onMouseMove={() => setActive(i)}
                  onClick={() => void run(c)}
                >
                  <span>{c.action === "copy-email" && copied ? "copied" : c.label}</span>
                  {c.href?.startsWith("http") && <span className={styles.hint}>↗</span>}
                </button>
              </li>
            );
          })}
          {results.length === 0 && <li className={styles.empty}>No matches</li>}
        </ul>
      </div>
    </dialog>
  );
}
