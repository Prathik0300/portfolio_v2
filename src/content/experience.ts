import type { EducationItem, ExperienceItem } from "./types";

export const experienceItems: ExperienceItem[] = [
  {
    id: "radiofx-coop",
    company: "RadioFX, Inc.",
    companyId: "radiofx",
    role: "Software Development Co-op",
    start: "2025-09",
    end: "2025-12",
    location: "Chicago, IL",
    points: [
      "Built a multi-agent pipeline that turns a prompt into a deployed website, using Gemini 2.5 Pro, Gemini 3 Pro and Vercel v0.",
      "Designed how the generated sites are hosted: one tenant per site on GKE, with Helm, workload isolation and NGINX ingress.",
      "Set up GitHub Actions to detect what changed and redeploy only that, which cut deploy time and compute cost.",
      "Built embeddable streaming, chat and polling components that partners add to their own sites, with JWT and opaque-token auth.",
      "Wrote the CMS backend in NestJS on Cassandra, with DTO validation and guards.",
    ],
  },
  {
    id: "radiofx-intern",
    company: "RadioFX, Inc.",
    companyId: "radiofx",
    role: "Software Development Intern",
    start: "2025-06",
    end: "2025-08",
    location: "Chicago, IL",
    points: [
      "Led the move of legacy workloads onto GKE across the dev and prod clusters, isolated by namespace.",
      "Wrote CI/CD pipelines in Cloud Build and GitHub Actions so releases roll out with zero downtime.",
      "Moved backend services to NestJS with Fastify, which improved latency and throughput.",
    ],
  },
  {
    id: "bfhl-sde",
    company: "Bajaj Finserv Health",
    companyId: "bfhl",
    role: "Software Development Engineer",
    start: "2023-09",
    end: "2024-07",
    location: "Pune, India",
    points: [
      "Owned three B2C modules that carried 98% of the website's traffic.",
      "Cut bug counts by 95% and steadied the critical user flows.",
      "Designed CanvasRx, an internal tool that lets doctors annotate images during consultations.",
      "Led work on modules in the doctor portal, for both developer and user experience.",
    ],
  },
  {
    id: "bfhl-associate",
    company: "Bajaj Finserv Health",
    companyId: "bfhl",
    role: "Associate SDE",
    start: "2022-07",
    end: "2023-09",
    location: "Pune, India",
    points: [
      "Built AMP pages, which took PageSpeed from 65 to 99.",
      "Cut build times by 25% across key services.",
      "Raised Lighthouse scores on high-traffic pages.",
    ],
  },
  {
    id: "bfhl-intern",
    company: "Bajaj Finserv Health",
    companyId: "bfhl",
    role: "SDE Intern",
    start: "2022-01",
    end: "2022-06",
    location: "Pune, India",
    points: [
      "Cut page load time by 85% on critical user journeys.",
      "Raised the Doctor Profile page SEO score from 34 to 88.",
      "Brought poor URLs down from 11,380 to 562 with technical SEO fixes.",
      "Added ELK logging for debugging and monitoring across services.",
      "Set up a Sonar pipeline, which took code coverage from 0% to 55%.",
    ],
  },
  {
    id: "ubs-analyst",
    company: "UBS",
    companyId: "ubs",
    role: "Business Analyst Intern",
    start: "2021-06",
    end: "2021-08",
    location: "India",
    points: [
      "Built Alteryx workflows for processing large datasets.",
      "Automated data preparation with macros.",
      "Mapped processes in ARIS, which took about 7,000 manual tasks down to about 500.",
    ],
  },
];

export const educationItems: EducationItem[] = [
  {
    school: "University of Illinois Chicago",
    degree: "MS, Computer Science",
    start: "2024-08",
    end: "present",
    note: "cloud computing, backend and distributed systems",
  },
  {
    school: "Vellore Institute of Technology",
    degree: "BTech, Computer Science",
    start: "2018-07",
    end: "2022-05",
  },
];
