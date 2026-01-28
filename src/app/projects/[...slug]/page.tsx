import { Metadata } from "next";
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

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const activeSlug = Array.isArray(slug) ? slug[0] : slug;

  const project =
    projectItems.find(
      (p) =>
        p.slug === activeSlug ||
        normalizeSlug(p.slug) === normalizeSlug(activeSlug) ||
        normalizeSlug(p.name) === normalizeSlug(activeSlug)
    ) ?? null;

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  const baseUrl = "https://prathikpugazhenthi.dev"; // Update with your actual domain
  const projectUrl = `${baseUrl}/projects/${project.slug}`;
  const imageUrl = project.tileMedia.kind === "image" 
    ? `${baseUrl}${project.tileMedia.src}`
    : `${baseUrl}/prathik-hero.png`;

  return {
    title: `${project.name} | Prathik Pugazhenthi`,
    description: project.description,
    keywords: [
      ...project.techStack,
      project.name,
      "Prathik Pugazhenthi",
      "Software Development",
      "Project Portfolio",
    ],
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      title: `${project.name} | Prathik Pugazhenthi`,
      description: project.description,
      url: projectUrl,
      siteName: "Prathik Pugazhenthi Portfolio",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: project.tileMedia.alt || project.name,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Prathik Pugazhenthi`,
      description: project.description,
      images: [imageUrl],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
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
