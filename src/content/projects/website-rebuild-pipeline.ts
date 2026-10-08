import type { Project } from "../types";

export const websiteRebuildPipeline: Project = {
  slug: "website-rebuild-pipeline",
  file: "website-rebuild-pipeline",
  name: "Website rebuild pipeline",
  seoTitle: "AI website rebuild pipeline and GitOps platform at RadioFX",
  blurb: "Scrapes a customer's existing site, audits it, and regenerates a modernized one on dedicated infrastructure.",
  description:
    "An AI pipeline I built at RadioFX that scrapes a customer's site, audits it for SEO, security and UX gaps, and regenerates a modernized version. Plus the GitOps platform under it.",
  date: "2025-12",
  dateLabel: "Sep – Dec 2025",
  where: "RadioFX, Inc. (co-op)",
  role: "Software Engineering Co-op (AI + DevOps)",
  glance: {
    problem: "Moving a customer to a modern site meant rebuilding the old one and setting up somewhere for it to run.",
    built: "A pipeline that scrapes the old site, audits it, regenerates it with Gemini and deploys it to dedicated infrastructure, on top of a GitOps platform on GKE.",
    result: "Deployments dropped from 40 minutes to 10 after the move from Jenkins to GitOps.",
  },
  stack: ["Gemini API", "GKE", "Terraform", "ArgoCD", "Trivy", "Next.js"],
  links: [],
  sections: [
    {
      title: "What it does",
      blocks: [
        {
          type: "p",
          text: "Point it at a customer's existing website. It scrapes the site, audits it for SEO, security and UX gaps, and then regenerates a modernized version from the scraped content and assets, using the Gemini API.",
        },
        {
          type: "p",
          text: "The new site is wired into RadioFX's core API suite (chat, polls, streaming and contests) and deploys itself to dedicated infrastructure, so the customer doesn't need anyone to set it up.",
        },
        {
          type: "figure",
          kind: "diagram",
          src: "/img/diagrams/rebuild-pipeline.svg",
          alt: "Website rebuild pipeline: existing site, scrape, audit, regenerate with Gemini, deploy to dedicated infrastructure, new site, connected to the RadioFX API suite",
          width: 960,
          height: 420,
          caption: "The rebuild pipeline, from a customer's current site to a new one connected to RadioFX's APIs.",
        },
      ],
    },
    {
      title: "The infrastructure under it",
      blocks: [
        {
          type: "p",
          text: "I owned the infrastructure architecture at RadioFX: system design, scalability and security for a low-latency platform that serves real users.",
        },
        {
          type: "list",
          items: [
            "Moved RadioFX off Jenkins onto a Kubernetes-native GitOps setup, using Terraform and ArgoCD to provision multi-tenant GKE infrastructure.",
            "Put Trivy scans into the CI/CD pipeline. Deployments went from 40 minutes to 10.",
          ],
        },
        {
          type: "figure",
          kind: "diagram",
          src: "/img/diagrams/delivery-path.svg",
          alt: "Delivery path: git commit, CI with a Trivy scan, ArgoCD, multi-tenant GKE, with Terraform provisioning the cluster, and a bar comparison of 40 minutes on Jenkins and 10 minutes after",
          width: 1000,
          height: 340,
          caption: "How a change reaches the cluster, and the deploy time before and after.",
        },
      ],
    },
    {
      title: "An internal tool",
      blocks: [
        {
          type: "p",
          text: "I built an internal Next.js tool that gives engineers self-service access to live GKE pod health, metrics and logs. It includes an assistant, powered by Gemini, that turns plain-language questions into SQL. The point was to take kubectl and SQL expertise out of production debugging.",
        },
      ],
    },
    {
      title: "Earlier that summer",
      blocks: [
        {
          type: "p",
          text: "During my internship (Jun – Aug 2025) I built a Kafka-backed API subscription platform on GCP, with tiered access, configurable rate limits and quota enforcement, for 15+ enterprise customers. It held sub-200 ms p95 latency under load. I also wrote a schema-driven CMS in NestJS and Cassandra so non-technical teams can ship content updates without a redeploy.",
        },
      ],
    },
  ],
};
