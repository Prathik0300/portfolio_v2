export type SkillCategoryId = "primary" | "languages" | "stack";

export interface SkillCategory {
  id: SkillCategoryId;
  label: string;
  skills: string[];
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  logoSrc?: string;
  points: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export interface ProjectItem {
  name: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export const heroCopy = {
  subtitle: "Software Developer · Full-Stack & Cloud Developer",
  blurbLines: [
    "Software Developer specializing in full-stack engineering, cloud infrastructure, CI/CD automation, and scalable product architectures.",
    "Experienced in modernizing systems, improving performance, and building distributed, production-ready services.",
  ],
};

export const aboutCopy = {
  title: "About Me",
  body: [
    "I'm currently pursuing a Master of Science in Computer Science at the University of Illinois Chicago, focusing on cloud computing, backend development, and distributed systems. Before this, I completed my BTech in Computer Science at Vellore Institute of Technology.",
    "My experience spans building scalable multi-tenant cloud architectures, AI-enabled automation pipelines, Kubernetes workloads, backend systems, and CI/CD environments. I’m comfortable operating across infrastructure, backend engineering, and developer productivity.",
    "I care deeply about secure, high-performance systems and enjoy leading modernization initiatives that make platforms more reliable, observable, and efficient to work on.",
  ],
};

export const skillCategories: SkillCategory[] = [
  {
    id: "primary",
    label: "Primary Skills",
    skills: [
      "Cassandra",
      "Software Infrastructure",
      "AI Agents",
      "NestJS",
      "Fastify",
      "GCP",
      "GKE",
      "GitHub Actions",
      "Google Cloud Build",
      "CI/CD",
      "Kubernetes",
      "Node.js",
      "React",
      "TypeScript",
      "Redis",
      "ELK",
      "JWT Auth",
      "Helm",
      "Microservices",
      "Distributed Systems",
    ],
  },
  {
    id: "languages",
    label: "Languages Spoken",
    skills: [
      "English (Full Professional)",
      "Hindi (Full Professional)",
      "Tamil (Native)",
      "French (Elementary)",
      "Gujarati (Elementary)",
    ],
  },
  {
    id: "stack",
    label: "Programming Languages & Tools",
    skills: [
      "JavaScript",
      "TypeScript",
      "Node.js",
      "NestJS",
      "React",
      "Docker",
      "Kubernetes",
      "Cassandra",
      "MongoDB",
      "Cloud Build",
      "GitHub Actions",
    ],
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    company: "UIC College of Education",
    role: "Graduate Hourly",
    period: "May 2025 – Present",
    location: "Chicago, IL",
    logoSrc: "/logos/uic-logo.png",
    points: [
      "Supporting technical initiatives in education and academic environments.",
      "Assisting in applied research and software-related tasks.",
    ],
  },
  {
    company: "RadioFX, Inc.",
    role: "Software Development Intern",
    period: "Sept 2025 – Dec 2025",
    location: "Chicago, IL",
    logoSrc: "/logos/rfx-logo.png",
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
    role: "Software Development Intern",
    period: "Jun 2025 – Aug 2025",
    location: "Chicago, IL",
    logoSrc: "/logos/rfx-logo.png",
    points: [
      "Led migration of legacy workloads to GKE across dev/prod clusters with namespace isolation.",
      "Built CI/CD pipelines using Cloud Build and GitHub Actions enabling zero-downtime rollouts.",
      "Modernized backend microservices to NestJS + Fastify, improving latency and throughput.",
      "Built an AI-powered website builder with evaluation agents and layout generation via Vercel.",
      "Integrated internal Node modules into Google Artifact Registry for streamlined dependency management.",
    ],
  },
  {
    company: "Bajaj Finserv Health",
    role: "Software Development Engineer",
    period: "Sep 2023 – Jul 2024",
    location: "Pune, India",
    logoSrc: "/logos/bfhl-logo.png",
    points: [
      "Owned end-to-end maintenance of three key B2C modules powering 98% of website traffic.",
      "Reduced bug counts by 95% and improved stability across critical user flows.",
      "Designed CanvasRx — an in-house image annotation tool for doctor consultations.",
      "Led development of modules within the doctor portal improving both developer and user experience.",
    ],
  },
  {
    company: "Bajaj Finserv Health",
    role: "Associate SDE",
    period: "Jul 2022 – Sep 2023",
    location: "Pune, India",
    logoSrc: "/logos/bfhl-logo.png",
    points: [
      "Implemented AMP pages and boosted PageSpeed scores from 65 → 99.",
      "Reduced build times by 25% across key services.",
      "Improved Lighthouse scores and overall frontend performance on high-traffic pages.",
    ],
  },
  {
    company: "Bajaj Finserv Health",
    role: "SDE Intern",
    period: "Jan 2022 – Jun 2022",
    location: "Pune, India",
    logoSrc: "/logos/bfhl-logo.png",
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
    role: "Business Analyst Intern",
    period: "Jun 2021 – Aug 2021",
    location: "India",
    logoSrc: "/logos/ubs-logo.png",
    points: [
      "Designed Alteryx workflows for large dataset processing.",
      "Automated macros improving data preparation pipelines.",
      "Mapped processes using ARIS, reducing ~7000 manual tasks to ~500.",
    ],
  },
];

export const serviceItems: ServiceItem[] = [
  {
    id: "fullstack",
    title: "Full-Stack Web Development",
    description:
      "End-to-end product development — from modern React/Next.js frontends to robust Node/NestJS backends and data stores.",
  },
  {
    id: "cloudDevops",
    title: "Cloud Architecture & DevOps",
    description:
      "Designing and operating GCP/GKE-based infrastructure, CI/CD pipelines, and multi-tenant deployments tuned for reliability and velocity.",
  },
  {
    id: "modernization",
    title: "Infrastructure Modernization",
    description:
      "Migrating legacy systems into containerized, observable, and scalable architectures with clear rollout and rollback strategies.",
  },
  {
    id: "performance",
    title: "Performance & SEO Optimization",
    description:
      "Improving Core Web Vitals, Lighthouse scores, and overall responsiveness through profiling, caching, and frontend/backend tuning.",
  },
  {
    id: "ai",
    title: "AI & LLM Integrations",
    description:
      "Embedding AI agents and LLM-driven workflows into products with a focus on safety, observability, and user experience.",
  },
];

export const projectItems: ProjectItem[] = [
  {
    name: "CRLite+ – Lightweight Certificate Revocation Extension",
    description:
      "Research work on CRLite+, a lightweight browser extension approach for practical certificate revocation and safer TLS connections.",
    techStack: ["Security", "Browser Extensions", "CRLite"],
  },
  {
    name: "Coverage-Guided Fuzzing + LLM Repair",
    description:
      "Exploration of combining coverage-guided fuzzing with LLM reasoning to automatically repair crash-inducing bugs.",
    techStack: ["LLMs", "Fuzzing", "Program Repair"],
  },
  {
    name: "Cloud-Native Portfolio & Infrastructure Playground",
    description:
      "Personal portfolio and experimentation space for full-stack features, observability, and deployment workflows on modern cloud platforms.",
    techStack: ["Next.js", "TypeScript", "GCP", "CI/CD"],
  },
];
