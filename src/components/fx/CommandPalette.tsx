"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./CommandPalette.module.css";

export type PaletteCommand = {
  id: string;
  group: "Go to" | "Case studies" | "Actions";
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

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? commands.filter((c) => c.label.toLowerCase().includes(q)) : commands;
  }, [commands, query]);

  useEffect(() => {
    const d = dialog.current;
    d?.showModal();
    return () => d?.close();
  }, []);

  const run = async (c: PaletteCommand) => {
    if (c.action === "copy-email" && c.value) {
      try {
        await navigator.clipboard.writeText(c.value);
        setCopied(true);
        setTimeout(onClose, 700);
      } catch {
        onClose();
      }
      return;
    }
    onClose();
    if (!c.href) return;
    if (c.href.startsWith("/") && !c.href.endsWith(".pdf")) router.push(c.href);
    else window.open(c.href, "_blank", "noopener,noreferrer");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      void run(results[active]);
    }
  };

  return (
    <dialog ref={dialog} className={styles.dialog} onClose={onClose} onClick={(e) => e.target === dialog.current && onClose()} aria-label="Command menu">
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
            }}
            placeholder="Type a command or search"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[active] ? `cmd-${results[active].id}` : undefined}
          />
          <kbd className={styles.kbd}>esc</kbd>
        </div>
        <ul id="palette-list" role="listbox" className={styles.list}>
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
                  onMouseMove={() => setActive(i)}
                  onClick={() => void run(c)}
                >
                  <span>{c.action === "copy-email" && copied ? "Copied" : c.label}</span>
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
