"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/projects", label: "projects" },
  { href: "/experience", label: "experience" },
  { href: "/about", label: "about" },
] as const;

/**
 * The highlight moves the instant you click, not when the next page arrives.
 * `clicked` remembers which path it was clicked from, so it expires on its own once the route changes.
 */
export function NavLinks() {
  const pathname = usePathname();
  const [clicked, setClicked] = useState<{ from: string; href: string } | null>(null);
  const active = clicked && clicked.from === pathname ? clicked.href : pathname;
  const isActive = (href: string) => active === href || active.startsWith(`${href}/`);

  return (
    <>
      {ITEMS.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          aria-current={isActive(it.href) ? "page" : undefined}
          data-track={`nav|${it.label}`}
          onClick={() => setClicked({ from: pathname, href: it.href })}
        >
          {it.label}
        </Link>
      ))}
    </>
  );
}
