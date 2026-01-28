"use client";

import { projectItems } from "@/lib/portfolioData";

export function StructuredData() {
  const baseUrl = "https://prathikpugazhenthi.dev";
  const primaryName = "Prathik Pugazhenthi";
  const siteName = "Prathik Pugazhenthi Portfolio";

  const personId = `${baseUrl}/#person`;
  const orgId = `${baseUrl}/#organization`;
  const websiteId = `${baseUrl}/#website`;
  const webpageId = `${baseUrl}/#webpage`;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: primaryName,
    jobTitle: "Software Developer",
    description:
      "Full-Stack & Cloud Developer specializing in distributed systems, Kubernetes, CI/CD automation, and AI-enabled systems.",
    email: "prathik0300@gmail.com",
    telephone: "+13128893640",
    url: baseUrl,
    image: `${baseUrl}/prathik-hero.png`,
    sameAs: [
      "https://github.com/Prathik0300",
      "https://www.linkedin.com/in/prathik-pugazhenthi-487855177/",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Chicago",
      addressRegion: "IL",
      addressCountry: "US",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "University of Illinois Chicago",
        department: "Computer Science",
      },
      {
        "@type": "EducationalOrganization",
        name: "Vellore Institute of Technology",
        department: "Computer Science and Engineering",
      },
    ],
    knowsAbout: [
      "Full-Stack Development",
      "Cloud Computing",
      "Kubernetes",
      "DevOps",
      "CI/CD",
      "Node.js",
      "React",
      "TypeScript",
      "Python",
      "GCP",
      "AWS",
      "Distributed Systems",
      "AI Automation",
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": orgId,
    name: siteName,
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/favicon.ico`,
    },
    founder: { "@id": personId },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    name: siteName,
    url: baseUrl,
    description:
      "Portfolio website of Prathik Pugazhenthi, a software developer specializing in full-stack engineering, cloud infrastructure, and scalable product architectures.",
    publisher: { "@id": orgId },
    author: { "@id": personId },
    inLanguage: "en-US",
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": webpageId,
    url: baseUrl,
    name: `${primaryName} | Full-Stack & Cloud Developer`,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${baseUrl}/prathik-hero.png`,
    },
    inLanguage: "en-US",
  };

  const projectsItemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${primaryName} Projects`,
    itemListElement: projectItems.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${baseUrl}/projects/${project.slug}`,
      name: project.name,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsItemList) }}
      />
    </>
  );
}
