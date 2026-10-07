"use client";

import { useEffect } from "react";

/** Marks the contents link for the section being read. No state, no re-renders: it only flips a data attribute. */
export function SectionSpy() {
  useEffect(() => {
    const heads = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const links = new Map<string, HTMLElement[]>();
    document.querySelectorAll<HTMLAnchorElement>("[data-toc] a").forEach((a) => {
      const id = a.hash.slice(1);
      links.set(id, [...(links.get(id) ?? []), a.closest("[data-toc-item]") as HTMLElement]);
    });
    if (!heads.length || !links.size) return;

    const end = document.querySelector<HTMLElement>("[data-end]");
    const visible = new Set<string>();
    const mark = () => {
      // at the very bottom the last section may never reach the top of the page, so the end of the article counts as being in it
      const current = visible.has("end") ? heads[heads.length - 1].id : heads.find((h) => visible.has(h.id))?.id ?? [...heads].reverse().find((h) => h.getBoundingClientRect().top < 140)?.id ?? heads[0].id;
      links.forEach((lis, id) => lis.forEach((li) => (id === current ? li.setAttribute("data-active", "") : li.removeAttribute("data-active"))));
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        mark();
      },
      { rootMargin: "-84px 0px -65% 0px" },
    );
    heads.forEach((h) => io.observe(h));
    // the closing link is only fully on screen once you have scrolled to the bottom
    const endIo = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) visible.add("end");
        else visible.delete("end");
        mark();
      },
      { threshold: 1 },
    );
    if (end) endIo.observe(end);
    mark();
    return () => {
      io.disconnect();
      endIo.disconnect();
    };
  }, []);
  return null;
}
