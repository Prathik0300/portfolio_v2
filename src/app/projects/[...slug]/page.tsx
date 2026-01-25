"use client";

import { use } from "react";
import { projectItems } from "@/lib/portfolioData";
import { ProjectDetailClient } from "./ProjectDetailClient";
import styles from "./page.module.css";

type ProjectPageProps = {
  params: Promise<{ slug: string[] }>;
};

const normalizeSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/%20/g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = use(params);
  const activeSlug = Array.isArray(slug) ? slug[0] : slug;

  const project =
    projectItems.find(
      (p) =>
        p.slug === activeSlug ||
        normalizeSlug(p.slug) === normalizeSlug(activeSlug) ||
        normalizeSlug(p.name) === normalizeSlug(activeSlug)
    ) ?? null;

  if (!project) {
    return (
      <main className={styles.notFound}>
        <p>Project not found.</p>
      </main>
    );
  }

  return <ProjectDetailClient project={project} />;
}
