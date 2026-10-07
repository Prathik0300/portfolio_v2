import type { EducationItem, ExperienceItem } from "./types";

export const experienceItems: ExperienceItem[] = [
  {
    company: "RadioFX, Inc.",
    companyId: "radiofx",
    role: "Software Development Co-op",
    id: "radiofx-coop",
    start: "2025-09",
    end: "2025-12",
    location: "Chicago, IL",
    points: [
      "Engineered a multi-agent AI website generation pipeline using Gemini 2.5 Pro, Gemini 3 Pro, and Vercel v0, automating prompt → code → deployment workflows.",
      "Designed scalable multi-tenant deployment architecture for dynamically generated websites using Helm, GKE workload isolation, and NGINX ingress.",
      "Implemented selective redeployments via GitHub Actions based on diff detection to reduce execution time and compute cost.",
      "Built third-party embeddable streaming, chat, and polling API components using modular gateway patterns.",
      "Developed token-based authentication using JWT/opaque tokens for secure partner integrations.",
      "Developed production-grade CMS backend using NestJS + Cassandra with DTO validation, guards, and distributed datastore patterns.",
    ],
  },
  {
    company: "RadioFX, Inc.",
    companyId: "radiofx",
    role: "Software Development Intern",
    id: "radiofx-intern",
    start: "2025-06",
    end: "2025-08",
    location: "Chicago, IL",
    points: [
      "Led migration of legacy workloads to GKE across dev/prod clusters with namespace isolation.",
      "Built CI/CD pipelines using Cloud Build and GitHub Actions enabling zero-downtime rollouts.",
      "Modernized backend microservices to NestJS + Fastify, improving latency and throughput.",
    ],
  },
  {
    company: "Bajaj Finserv Health",
    companyId: "bfhl",
    role: "Software Development Engineer",
    id: "bfhl-sde",
    start: "2023-09",
    end: "2024-07",
    location: "Pune, India",
    points: [
      "Owned end-to-end maintenance of three key B2C modules powering 98% of website traffic.",
      "Reduced bug counts by 95% and improved stability across critical user flows.",
      "Designed CanvasRx — an in-house image annotation tool for doctor consultations.",
      "Led development of modules within the doctor portal improving both developer and user experience.",
    ],
  },
  {
    company: "Bajaj Finserv Health",
    companyId: "bfhl",
    role: "Associate SDE",
    id: "bfhl-associate",
    start: "2022-07",
    end: "2023-09",
    location: "Pune, India",
    points: [
      "Implemented AMP pages and boosted PageSpeed scores from 65 → 99.",
      "Reduced build times by 25% across key services.",
      "Improved Lighthouse scores and overall frontend performance on high-traffic pages.",
    ],
  },
  {
    company: "Bajaj Finserv Health",
    companyId: "bfhl",
    role: "SDE Intern",
    id: "bfhl-intern",
    start: "2022-01",
    end: "2022-06",
    location: "Pune, India",
    points: [
      "Improved page load time by 85% on critical user journeys.",
      "Improved Doctor Profile Page SEO score from 34 → 88.",
      "Reduced poor URLs from 11,380 → 562 through targeted technical SEO work.",
      "Implemented ELK logging for debugging and monitoring across services.",
      "Enabled Sonar pipeline increasing code coverage from 0% → 55%.",
    ],
  },
  {
    company: "UBS",
    companyId: "ubs",
    role: "Business Analyst Intern",
    id: "ubs-analyst",
    start: "2021-06",
    end: "2021-08",
    location: "India",
    points: [
      "Designed Alteryx workflows for large dataset processing.",
      "Automated macros improving data preparation pipelines.",
      "Mapped processes using ARIS, reducing ~7000 manual tasks to ~500.",
    ],
  },
];

export const educationItems: EducationItem[] = [
  {
    school: "University of Illinois Chicago",
    degree: "MS, Computer Science",
    start: "2024-08",
    end: "present",
    note: "Cloud computing, backend and distributed systems",
  },
  {
    school: "Vellore Institute of Technology",
    degree: "BTech, Computer Science",
    start: "2018-07",
    end: "2022-05",
  },
];

/** Condensed rows for the home page. Dates come from the matching roles above. */
export interface SnapshotRow {
  company: string;
  role: string;
  start: string;
  end: string;
  line: string;
}

export const experienceSnapshot: SnapshotRow[] = [
  {
    company: "RadioFX, Inc.",
    role: "Software Development Co-op",
    start: "2025-09",
    end: "2025-12",
    line: "Built a multi-agent website generation pipeline and the multi-tenant GKE deployment setup behind it, plus JWT/opaque-token auth for partner integrations and a NestJS + Cassandra CMS backend.",
  },
  {
    company: "RadioFX, Inc.",
    role: "Software Development Intern",
    start: "2025-06",
    end: "2025-08",
    line: "Led the move of legacy workloads to GKE with namespace isolation, built Cloud Build and GitHub Actions pipelines for zero-downtime rollouts, and modernized services to NestJS + Fastify.",
  },
  {
    company: "Bajaj Finserv Health",
    role: "SDE, Associate SDE, SDE Intern",
    start: "2022-01",
    end: "2024-07",
    line: "Owned three B2C modules serving 98% of site traffic. Cut bugs by 95%, took PageSpeed from 65 to 99, and set up ELK logging and a Sonar pipeline (0% to 55% coverage).",
  },
  {
    company: "UBS",
    role: "Business Analyst Intern",
    start: "2021-06",
    end: "2021-08",
    line: "Built Alteryx workflows and macros, and mapped processes in ARIS, cutting about 7,000 manual tasks to about 500.",
  },
];
