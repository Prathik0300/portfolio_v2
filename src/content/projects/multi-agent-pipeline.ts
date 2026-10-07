import type { ProjectItem } from "../types";

export const multiAgentPipeline: ProjectItem = {
  name: "Multi-Agent AI Website Generation Pipeline",
  slug: "multi-agent-website-pipeline",
  blurb:
    "Prompt \u2192 code \u2192 deploy, automated \u2014 with every generated site isolated in its own GKE tenant.",
  description:
    "Prompt \u2192 code \u2192 deploy, automated. Orchestrated Gemini 2.5/3 Pro and Vercel v0 into a generation pipeline, then gave each generated site a tenant-isolated home on GKE with Helm, workload isolation and NGINX ingress. Diff-based selective redeploys via GitHub Actions cut build time and compute cost.",
  techStack: [
    "Multi-agent orchestration",
    "Gemini 2.5 / 3 Pro",
    "Vercel v0",
    "GKE",
    "Helm",
    "NGINX ingress",
    "GitHub Actions",
    "NestJS",
    "Cassandra",
  ],
  featured: true,
  flagship: true,
  badge: "Flagship \u00b7 RadioFX",
  badgeTone: "amber",
  detailSubtitle:
    "An automated prompt-to-production pipeline with multi-tenant isolation on GKE",
  detailDateRange: "Jun 2025 \u2013 Dec 2025",
  detailOrganization: { name: "RadioFX, Inc." },
  detailAssociation: "Built at RadioFX, Inc.",
  detailProjectType: "Platform Engineering \u00b7 AI Systems",
  detailTechStack:
    "Gemini 2.5 / 3 Pro \u00b7 Vercel v0 \u00b7 GKE \u00b7 Helm \u00b7 NGINX ingress \u00b7 GitHub Actions \u00b7 NestJS \u00b7 Cassandra",
  detailOverview:
    "A pipeline that turns a natural-language brief into a fully deployed marketing website. Multiple model agents handle briefing, code generation and refinement; every generated site is then deployed into its own isolated tenant on GKE with a dedicated namespace and ingress. A diff-detection step decides what actually needs to redeploy, keeping build time and compute cost down.",
  detailProblem:
    "Generating a site from a prompt is only half the problem. Each generated site needs to be hosted in isolation \u2014 no shared state, no noisy-neighbour risk \u2014 and re-running the whole build for every small edit is slow and expensive.",
  detailMotivation:
    "If generation and hosting are both automated and isolated, a non-engineer can go from idea to a live, production-grade site without a human in the deploy loop.",
  detailSolution:
    "A multi-agent generation stage (Gemini 2.5 Pro, Gemini 3 Pro, Vercel v0) produces and refines the code. A deployment stage packages each site with Helm and lands it in a per-tenant GKE namespace behind NGINX ingress. GitHub Actions runs diff detection so only changed sites/paths redeploy. JWT / opaque-token auth secures embeddable streaming, chat and polling components for partner integrations.",
  detailSolutionPoints: [
    "Multi-agent generation \u2013 briefing, code generation and refinement split across Gemini 2.5 Pro, Gemini 3 Pro and Vercel v0.",
    "Multi-tenant isolation \u2013 every generated site gets its own GKE namespace, Helm release and NGINX ingress route.",
    "Selective redeploys \u2013 GitHub Actions diff detection redeploys only what changed, cutting execution time and compute cost.",
    "Embeddable components \u2013 streaming, chat and polling APIs via modular gateway patterns, with JWT / opaque-token auth for partners.",
    "CMS backend \u2013 NestJS + Cassandra with DTO validation, guards and distributed datastore patterns.",
  ],
  detailHighlights: [
    "Prompt \u2192 code \u2192 deploy with no human in the deploy loop",
    "Per-site tenant isolation on GKE (namespace + Helm + ingress)",
    "Diff-based selective redeployment via GitHub Actions",
    "Partner-facing embeddable streaming / chat / polling components",
    "NestJS + Cassandra CMS backend with distributed datastore patterns",
  ],
  detailReflectionOutcomes:
    "Demonstrated an end-to-end automated path from brief to isolated, production-grade deployment. The isolation model kept generated sites independent, and diff-based redeploys made iteration cheap enough to be practical.",
  detailReflectionMoreTime:
    "Next: autoscaling tenants to zero when idle, a preview-environment per pull request, and richer generation evals before a site is promoted.",
};
