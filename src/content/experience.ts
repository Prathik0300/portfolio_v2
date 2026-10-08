import type { EducationItem, ExperienceItem } from "./types";

/** Newest first. Source: LinkedIn profile. Nothing before UBS is listed. */
export const experienceItems: ExperienceItem[] = [
  {
    id: "radiofx-coop",
    company: "RadioFX, Inc.",
    companyId: "radiofx",
    role: "Software Engineering Co-op (AI + DevOps)",
    start: "2025-09",
    end: "2025-12",
    location: "Chicago, IL",
    points: [
      {
        lead: "Owned the infrastructure architecture.",
        detail: "System design, scalability and security for a low-latency platform that serves real users.",
      },
      {
        lead: "Moved RadioFX from Jenkins to GitOps on GKE.",
        detail: "Terraform and ArgoCD provision the multi-tenant GKE infrastructure. Trivy-scanned CI/CD cut deployments from 40 minutes to 10.",
      },
      {
        lead: "Built an internal tool for debugging production.",
        detail: "A Next.js app with self-service access to live GKE pod health, metrics and logs, plus a Gemini-powered assistant that turns plain-language questions into SQL. It took kubectl and SQL expertise out of the loop.",
      },
      {
        lead: "Built an AI pipeline that rebuilds a customer's website.",
        detail: "It scrapes the existing site, audits it for SEO, security and UX gaps, and regenerates a modernized one from the scraped content and assets. It plugs into RadioFX's API suite (chat, polls, streaming, contests) and deploys itself to dedicated infrastructure.",
      },
    ],
  },
  {
    id: "radiofx-intern",
    company: "RadioFX, Inc.",
    companyId: "radiofx",
    role: "Software Development Intern (Full Stack)",
    start: "2025-06",
    end: "2025-08",
    location: "Chicago, IL",
    points: [
      {
        lead: "Built a Kafka-backed API subscription platform.",
        detail: "It runs on GCP with tiered access, configurable rate limits and quota enforcement for 15+ enterprise customers, and held sub-200 ms p95 latency under load.",
      },
      {
        lead: "Wrote a schema-driven CMS.",
        detail: "NestJS and Cassandra. It separates content releases from the deployment pipeline, so non-technical teams can ship updates without a redeploy.",
      },
    ],
  },
  {
    id: "bfhl-sde2",
    company: "Bajaj Finserv Health",
    companyId: "bfhl",
    role: "Software Development Engineer II (Full Stack)",
    start: "2023-09",
    end: "2024-07",
    location: "Pune, India",
    points: [
      {
        lead: "Architected a medical image annotation platform (CanvasRx).",
        detail: "Built end to end for 80,000+ doctors: a React and WebGL frontend, and a NestJS and SQL backend with REST APIs that store the annotations.",
      },
      {
        lead: "Replaced synchronous service calls with events.",
        detail: "Azure Service Bus now carries appointment requests, consultation matching and notifications, which ended the cascading failures under high concurrency.",
      },
      {
        lead: "Cut bug occurrences by about 90% in the consumer app and about 55% in the doctor platform.",
        detail: "Over 14 months, tracked on ELK dashboards.",
      },
    ],
  },
  {
    id: "bfhl-sde1",
    company: "Bajaj Finserv Health",
    companyId: "bfhl",
    role: "Software Development Engineer I (Full Stack)",
    start: "2022-07",
    end: "2023-08",
    location: "Pune, India",
    points: [
      {
        lead: "Cut application build time by 25%.",
        detail: "Re-engineered the frontend build pipeline, which also sped up release turnaround.",
      },
      {
        lead: "Moved a monolith to a Turborepo multi-repo setup.",
        detail: "Git submodules across 4 business verticals. Repo size and deployment pipeline time each dropped by about 60%, and local debugging and feature work got faster.",
      },
      {
        lead: "Rolled out AMP and SSR with Next.js.",
        detail: "PageSpeed went from 65 to 99, Lighthouse from 34 to 88, and page load time dropped 85%.",
      },
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
      {
        lead: "Set up SonarQube and ELK from scratch.",
        detail: "Code coverage went from 0% to 55%, and real-time log monitoring brought down 4xx error rates.",
      },
      {
        lead: "Automated SEO audits.",
        detail: "Google Search Console and Lighthouse pipelines. Poor URLs dropped from 11,380 to 562 and the SEO score rose to 98.",
      },
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
      {
        lead: "Built Alteryx workflows for large datasets.",
        detail: "Pre-processing for analysis, and converted 3 Excel macros (EUAs) into Alteryx workflows.",
      },
      {
        lead: "Mapped 11 processes in ARIS.",
        detail: "Used it to find what could be digitized. As a team we cut more than 7,000 manual and redundant tasks down to around 500.",
      },
    ],
  },
];

/** Newest first. GPAs from the resume, coursework from the UIC transcript and LinkedIn courses, everything else from the LinkedIn profile. */
export const educationItems: EducationItem[] = [
  {
    id: "uic-ms",
    school: "University of Illinois Chicago",
    degree: "MS, Computer Science",
    title: "MS in Computer Science",
    location: "Chicago, IL",
    start: "2024-08",
    end: "2026-05",
    note: "4.0 GPA",
    points: [
      {
        lead: "GPA 4.0.",
        detail: "An A in every graded course.",
      },
      {
        lead: "Systems and security coursework.",
        detail: "Intro to Networking, Secure Computer Systems, Networked and Distributed Systems Security, and Foundations of Permissionless Systems.",
      },
      {
        lead: "AI, data and design coursework.",
        detail: "Language Processing, Advanced Computer Vision, Data and Algorithmic Fairness, Data Visualization and Analytics, and User Interface Design.",
      },
      {
        lead: "Wrote two research papers.",
        detail: "CRLite+, a Chrome extension for certificate revocation (CS588), and a study of fixing crashing C programs with fuzzing and an LLM. Both are on the projects page.",
      },
      {
        lead: "Built agentic AI infrastructure on the side.",
        detail: "Orchon, a DAG-based multi-agent dev orchestration platform with human-in-the-loop approval gates, and NLGraph, a 12-stage NLP-first pipeline that breaks a query down before any LLM call.",
      },
    ],
  },
  {
    id: "vit-btech",
    school: "Vellore Institute of Technology",
    degree: "BTech, Computer Science",
    title: "B.Tech in Computer Science",
    location: "Vellore, India",
    start: "2018-07",
    end: "2022-05",
    note: "3.6 GPA",
    points: [
      {
        lead: "GPA 3.6.",
      },
      {
        lead: "Core CS and systems coursework.",
        detail: "Data Structures and Algorithms, Operating Systems, Computer Architecture, Databases, Networks, Parallel and Distributed Computing, and Theory of Computation and Compiler Design.",
      },
      {
        lead: "Security, AI and web coursework.",
        detail: "Digital Forensics, Information Security Management, Blockchain, Artificial Intelligence, Web Mining, and Human Computer Interaction.",
      },
      {
        lead: "Head of the web development team at Heritage Club.",
        detail: "Jan 2021 – Jan 2022.",
      },
      {
        lead: "Back-end developer on ProjectF.",
        detail: "A Node.js and MongoDB backend for an e-commerce platform where artists and designers start their own brands. Sep – Oct 2020.",
      },
      {
        lead: "Core committee member at the Entrepreneurship Cell.",
        detail: "Dec 2018 – Feb 2020. Ran sessions for aspiring entrepreneurs, guided 3 startup ideas into VIT's Technology Business Incubator, and helped manage the annual E-Summit (about 6,000 participants).",
      },
    ],
  },
];
