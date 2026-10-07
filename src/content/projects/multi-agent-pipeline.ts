import type { Project } from "../types";

export const multiAgentPipeline: Project = {
  slug: "multi-agent-website-pipeline",
  file: "multi-agent-pipeline",
  name: "Multi-agent website generation pipeline",
  blurb: "Turns a prompt into a deployed website, with every site isolated on GKE.",
  description:
    "A prompt-to-website pipeline I built at RadioFX: Gemini and v0 write the site, each one runs as its own GKE tenant, and GitHub Actions redeploys only what changed.",
  date: "2025-12",
  dateLabel: "Jun – Dec 2025",
  where: "RadioFX, Inc. (internship, then co-op)",
  stack: ["Gemini 2.5 Pro", "Gemini 3 Pro", "Vercel v0", "GKE", "Helm", "NGINX ingress", "GitHub Actions", "NestJS", "Cassandra"],
  links: [],
  sections: [
    {
      title: "What it does",
      blocks: [
        {
          type: "p",
          text: "You describe a website in plain language. A set of model agents, built on Gemini 2.5 Pro, Gemini 3 Pro and Vercel v0, turn that into code, and the pipeline deploys the result without anyone doing it by hand.",
        },
      ],
    },
    {
      title: "Hosting each site",
      blocks: [
        {
          type: "p",
          text: "Every generated site runs as its own tenant on GKE. I packaged them with Helm, isolated them at the workload level, and routed traffic to them through NGINX ingress.",
        },
        {
          type: "p",
          text: "GitHub Actions works out what changed in a push and redeploys only that. It cut deploy time and compute cost.",
        },
      ],
    },
    {
      title: "Around it",
      blocks: [
        {
          type: "list",
          items: [
            "Embeddable streaming, chat and polling components that partners add to their own sites, behind a small gateway layer.",
            "JWT and opaque-token auth for those partner integrations.",
            "The CMS backend, in NestJS on Cassandra, with DTO validation and guards.",
          ],
        },
      ],
    },
    {
      title: "Timeline",
      blocks: [
        {
          type: "p",
          text: "Moving RadioFX's existing services onto GKE, and the CI/CD behind it, came first, during my internship (Jun – Aug 2025). The pipeline above was my co-op project (Sep – Dec 2025).",
        },
      ],
    },
  ],
};
