"use client";

import { projectItems } from "@/lib/portfolioData";

export function StructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Prathik Pugazhenthi Portfolio",
    url: "https://prathikpugazhenthi.dev", // Update with your actual domain
    description:
      "Portfolio website of Prathik Pugazhenthi, a software developer specializing in full-stack engineering, cloud infrastructure, and scalable product architectures.",
    author: {
      "@type": "Person",
      name: "Prathik Pugazhenthi",
      email: "prathik0300@gmail.com",
      telephone: "+13128893640",
      url: "https://github.com/Prathik0300",
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
    },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Prathik Pugazhenthi",
    jobTitle: "Software Developer",
    description:
      "Full-Stack & Cloud Developer specializing in distributed systems, Kubernetes, CI/CD automation, and AI-enabled systems.",
    email: "prathik0300@gmail.com",
    telephone: "+13128893640",
    url: "https://prathikpugazhenthi.dev", // Update with your actual domain
    image: "https://prathikpugazhenthi.dev/prathik-hero.png", // Update with your actual domain
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

  const projectsSchema = projectItems.map((project) => ({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.description,
    url: `https://prathikpugazhenthi.dev/projects/${project.slug}`, // Update with your actual domain
    keywords: project.techStack.join(", "),
    creator: {
      "@type": "Person",
      name: "Prathik Pugazhenthi",
    },
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {projectsSchema.map((project, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(project) }}
        />
      ))}
    </>
  );
}
