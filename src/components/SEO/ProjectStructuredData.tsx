"use client";

import type { ProjectItem } from "@/lib/portfolioData";

type Props = {
  project: ProjectItem;
};

function absoluteUrl(baseUrl: string, pathOrUrl?: string) {
  if (!pathOrUrl) return undefined;
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  return `${baseUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export function ProjectStructuredData({ project }: Props) {
  const baseUrl = "https://prathikpugazhenthi.dev";
  const projectUrl = `${baseUrl}/projects/${project.slug}`;

  const primaryImage =
    project.tileMedia?.kind === "image"
      ? absoluteUrl(baseUrl, project.tileMedia.src)
      : `${baseUrl}/prathik-hero.png`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${projectUrl}#creativework`,
    url: projectUrl,
    name: project.name,
    description: project.description,
    image: primaryImage ? [primaryImage] : undefined,
    keywords: project.techStack?.length ? project.techStack.join(", ") : undefined,
    creator: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Prathik Pugazhenthi",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      name: "Prathik Pugazhenthi Portfolio",
      url: baseUrl,
    },
    dateCreated: project.detailDateRange,
    isPartOf: {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Prathik Pugazhenthi Portfolio",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": projectUrl,
      url: projectUrl,
    },
    sameAs: project.detailLinks?.map((l) => l.url),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

