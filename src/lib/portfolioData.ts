export type SkillCategoryId = "languages" | "stack";

export interface SkillCategory {
  id: SkillCategoryId;
  label: string;
  skills: string[];
}

export interface ExperienceItem {
  company: string;
  /** stable id for the company group (used for "promotions within one company") */
  companyId: string;
  role: string;
  period: string;
  /** ISO "YYYY-MM" — start of the role */
  start: string;
  /** ISO "YYYY-MM" or "present" */
  end: string;
  location?: string;
  logoSrc?: string;
  /** short tech tags for this role — bucketed into ai / platform / backend for the stack-mix column */
  stack?: string[];
  /** one-line focus label for the LOAD PROFILE column */
  focus?: string;
  /** short process handle, e.g. "radiofx-coop" */
  procId?: string;
  points: string[];
}

export interface EducationItem {
  school: string;
  degree: string;
  start: string; // "YYYY-MM"
  end: string | "present"; // set the real grad date here when known
  note?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

export type ProjectMediaKind = "image" | "video";

export interface ProjectMedia {
  kind: ProjectMediaKind;
  src: string;
  alt?: string;
}

export interface ProjectItem {
  name: string;
  slug: string;
  description: string;
  techStack: string[];
  /** Media used on the projects tile (can be image or video) */
  tileMedia: ProjectMedia;
  /** One or more media items for the detail page carousel */
  detailMedia: ProjectMedia[];
  /** Media used for the top cover ribbon on the project detail page */
  coverMedia?: ProjectMedia;
  /** Images to render in the Design step of the design-process section */
  designImages?: Array<{ src: string; alt: string }>;
  detailSubtitle?: string;
  detailDateRange?: string;
  detailOrganization?: {
    name: string;
    logoSrc?: string;
  };
  detailAssociation?: string;
  detailProjectType?: string;
  detailTechStack?: string;
  detailOverview?: string;
  detailProblem?: string;
  detailMotivation?: string;
  detailSolution?: string;
  detailDesignProcess?: string;
  detailHighlights?: string[];
  detailSolutionPoints?: string[];
  detailReflectionOutcomes?: string;
  detailReflectionMoreTime?: string;
  detailDesignProcessSteps?: Array<{
    id: string;
    title: string;
    subtitle: string;
    images?: Array<{ src: string; alt: string }>;
    paragraphs?: string[];
    bullets: string[];
    summary: string;
  }>;
  /** short one-liner for cards (distinct from the longer `description`) */
  blurb?: string;
  /** show on the home "selected work" block */
  featured?: boolean;
  /** flagship gets the wide treatment */
  flagship?: boolean;
  /** short label: "Research", "Shipped", "Solo", "Experience \u00b7 RadioFX" */
  badge?: string;
  badgeTone?: "amber" | "green" | "faint";
  /** metric chips rendered on cards: {value,label} */
  outcomes?: Array<{ value: string; label: string }>;
  /** domain filters on /work */
  domains?: string[];
  liveUrl?: string;
  githubUrl?: string;
  detailLinks?: Array<{
    label: string;
    url: string;
    icon: "paper" | "github" | "chrome" | "website";
  }>;
}

export const heroCopy = {
  kicker: "AI Platform & Infrastructure Engineer",
  headline: "I build and run the infrastructure behind AI products.",
  blurb:
    "I'm a software engineer working on the platform side of AI \u2014 the pipelines that turn models into shipped features, the Kubernetes setup underneath, and the CI/CD that keeps releases boring. Right now I'm finishing an MS in CS at UIC; before that I was an SDE at Bajaj Finserv Health.",
  location: "Chicago, IL \u00b7 open to relocate",
  // legacy fields kept so older imports still type-check
  subtitle: "AI Platform & Infrastructure Engineer",
  blurbLines: [
    "I work on the platform side of AI \u2014 pipelines, Kubernetes, and CI/CD.",
  ],
  status: "open to platform / infra / backend roles",
  terminal: [] as Array<{ cmd: string; out: string[] }>,
};

export const shippedAt: string[] = [
  "RadioFX",
  "Bajaj Finserv Health",
  "UBS",
  "UIC",
];

export interface ImpactMetric {
  /** e.g. "65 \u2192 99" or "-95%" */
  value: string;
  label: string;
  /** optional numeric target for the count-up animation */
  countTo?: number;
  countFrom?: number;
  countPrefix?: string;
  countSuffix?: string;
}

export const impactMetrics: ImpactMetric[] = [];

export interface NowItem {
  text: string;
}

export const nowItems: NowItem[] = [];

export interface StackGroup {
  id: string;
  label: string;
  items: string[];
}

export const stackGroups: StackGroup[] = [
  {
    id: "main",
    label: "Mostly working in",
    items: [
      "Kubernetes / GKE",
      "GCP",
      "Helm",
      "GitHub Actions",
      "NestJS",
      "TypeScript",
      "Python",
      "Gemini / OpenAI",
      "Postgres",
      "Cassandra",
    ],
  },
];

export const aboutPage = {
  kicker: "about",
  heading: "I like owning a system from the API down to the ingress.",
  body: [
    "I'm a software engineer finishing an MS in Computer Science at the University of Illinois Chicago, focused on cloud computing and distributed systems. Before grad school I spent two and a half years at Bajaj Finserv Health \u2014 starting on frontend performance and SEO, ending up owning three B2C modules that carried 98% of the company's web traffic.",
    "More recently at RadioFX I built a multi-agent pipeline that turns a prompt into a deployed website, and the multi-tenant GKE architecture that isolates every generated site. That work sits exactly where I want to be: AI systems, the platform they run on, and the CI/CD that ships them.",
    "I care about systems that are secure, observable and cheap to operate \u2014 and about making them pleasant for the next engineer to work on.",
  ],
  principles: [
    { k: "01 · measure first", v: "If I can't state the before/after number, I don't call it done. 65\u219299, 38%\u219285%, 11,380\u2192562." },
    { k: "02 · isolate blast radius", v: "Namespaces, tenants, guards, diff-based deploys \u2014 contain failure before it spreads." },
    { k: "03 · automate the boring path", v: "Zero-downtime rollouts, selective redeploys, Sonar gates. The pipeline should be the safety net." },
    { k: "04 · leave it readable", v: "DTO validation, docs, diagrams. DX is a feature." },
  ],
  beyond:
    "Five languages: Tamil (native), English & Hindi (full professional), French & Gujarati (elementary). Research two papers deep \u2014 certificate revocation and LLM program repair \u2014 both published.",
};

export const siteLinks = {
  email: "prathik0300@gmail.com",
  phone: "+13128893640",
  github: "https://github.com/Prathik0300",
  linkedin: "https://www.linkedin.com/in/prathik-pugazhenthi-487855177/",
  resume: "/Prathik_Pugazhenthi_Resume.pdf",
  location: "Chicago, IL",
};

export interface SnapshotRow {
  companyId: string;
  roleSummary: string;
  line: string;
}

/** condensed 4-row experience for the home page (dates are derived from experienceItems) */
export const experienceSnapshot: SnapshotRow[] = [
  {
    companyId: "radiofx",
    roleSummary: "Software Development Co-op",
    line: "Built the multi-agent website pipeline & multi-tenant GKE deploy architecture; JWT/opaque-token auth for partner integrations; NestJS + Cassandra CMS backend.",
  },
  {
    companyId: "radiofx-intern",
    roleSummary: "Software Development Intern",
    line: "Led legacy → GKE migration across dev/prod with namespace isolation; Cloud Build + GitHub Actions for zero-downtime rollouts; NestJS + Fastify modernization.",
  },
  {
    companyId: "bfhl",
    roleSummary: "SDE → Associate SDE → SDE Intern",
    line: "Owned 3 B2C modules driving 98% of site traffic. Cut bugs 95%, lifted PageSpeed 65→99 and SEO 34→88, reduced poor URLs 11,380→562, stood up ELK + Sonar (0→55% coverage).",
  },
  {
    companyId: "ubs",
    roleSummary: "Business Analyst Intern",
    line: "Alteryx workflows + macro automation; process mapping in ARIS reduced ~7,000 manual tasks to ~500.",
  },
];

export const contactCopy = {
  kicker: "Contact",
  heading: "Looking for someone on the AI platform / infra side?",
  sub: "Email is best \u2014 I usually reply the same day.",
};

export interface AboutFact {
  label: string;
  value: string;
}

export const aboutCopy = {
  title: "About Me",
  body: [
    "I'm currently pursuing a Master of Science in Computer Science at the University of Illinois Chicago, focusing on cloud computing, backend development, and distributed systems. Before this, I completed my BTech in Computer Science at Vellore Institute of Technology.",
    "My experience spans building scalable multi-tenant cloud architectures, AI-enabled automation pipelines, Kubernetes workloads, backend systems, and CI/CD environments. I’m comfortable operating across infrastructure, backend engineering, and developer productivity.",
    "I care deeply about secure, high-performance systems and enjoy leading modernization initiatives that make platforms more reliable, observable, and efficient to work on.",
  ],
};

export const aboutFacts: AboutFact[] = [
  {
    label: "Experience",
    value: "3+ years building production web platforms and services.",
  },
  {
    label: "Cloud & DevOps",
    value: "GCP, GKE, Kubernetes, CI/CD, observability, automation.",
  },
  {
    label: "Product Impact",
    value: "Improved performance, SEO, and reliability across B2C modules.",
  },
  {
    label: "What I enjoy",
    value: "Owning systems end-to-end — from API design to infra and DX.",
  },
];

export const aboutHighlights: string[] = [
  "Currently pursuing an MS in Computer Science at the University of Illinois Chicago with a focus on cloud computing, backend systems, and distributed systems.",
  "Previously a Software Development Engineer at Bajaj Finserv Health, where I worked on high-traffic B2C modules and performance-critical flows.",
  "Hands-on with building AI-enabled automation, multi-tenant architectures on GKE, and end-to-end CI/CD pipelines for reliable delivery.",
];

export const skillCategories: SkillCategory[] = [
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

export interface IconSkill {
  id: string;
  label: string;
  iconSrc: string;
}

export const programmingSkills: IconSkill[] = [
  {
    id: "typescript",
    label: "TypeScript",
    iconSrc: "/logos/skills/typescript.svg",
  },
  {
    id: "javascript",
    label: "JavaScript",
    iconSrc: "/logos/skills/javascript.svg",
  },
  { id: "python", label: "Python", iconSrc: "/logos/skills/python.svg" },
  { id: "sql", label: "SQL", iconSrc: "/logos/skills/sql.svg" },
  { id: "github", label: "Github", iconSrc: "/logos/skills/github.svg" },
  { id: "node", label: "Node.js", iconSrc: "/logos/skills/nodejs.svg" },
  { id: "react", label: "React.js", iconSrc: "/logos/skills/reactjs.svg" },
  { id: "nextjs", label: "Next.js", iconSrc: "/logos/skills/nextjs.svg" },
  { id: "nest", label: "NestJS", iconSrc: "/logos/skills/nestjs.svg" },
  { id: "flask", label: "Flask", iconSrc: "/logos/skills/flask.svg" },
  { id: "docker", label: "Docker", iconSrc: "/logos/skills/docker.svg" },
  {
    id: "kubernetes",
    label: "Kubernetes",
    iconSrc: "/logos/skills/kubernetes.svg",
  },
  { id: "gcp", label: "GCP", iconSrc: "/logos/skills/gcp.svg" },
  { id: "azure", label: "Azure", iconSrc: "/logos/skills/azure.svg" },
  {
    id: "gke",
    label: "Google Kubernetes Engine",
    iconSrc: "/logos/skills/gke.svg",
  },
  { id: "aws", label: "AWS", iconSrc: "/logos/skills/aws.svg" },
  { id: "helm", label: "Helm", iconSrc: "/logos/skills/helm.svg" },
  {
    id: "sonarqube",
    label: "SonarQube",
    iconSrc: "/logos/skills/sonarqube.svg",
  },
  { id: "elk", label: "ELK Stack", iconSrc: "/logos/skills/elk.svg" },
  { id: "jest", label: "Jest", iconSrc: "/logos/skills/jest.svg" },
  {
    id: "github-actions",
    label: "GitHub Actions",
    iconSrc: "/logos/skills/github-actions.svg",
  },
  {
    id: "cloud-build",
    label: "Cloud Build",
    iconSrc: "/logos/skills/cloud-build.svg",
  },
  {
    id: "cassandra",
    label: "Cassandra",
    iconSrc: "/logos/skills/cassandra.svg",
  },
  { id: "mongo", label: "MongoDB", iconSrc: "/logos/skills/mongodb.svg" },
  { id: "redis", label: "Redis", iconSrc: "/logos/skills/redis.svg" },
  { id: "openai", label: "OpenAI", iconSrc: "/logos/skills/openai.svg" },
  {
    id: "tensorflow",
    label: "Tensorflow",
    iconSrc: "/logos/skills/tensorflow.svg",
  },
  { id: "powerbi", label: "PowerBI", iconSrc: "/logos/skills/powerbi.svg" },
  { id: "alteryx", label: "Alteryx", iconSrc: "/logos/skills/alteryx.svg" },
  { id: "rabbitmq", label: "RabbitMQ", iconSrc: "/logos/skills/rabbitmq.svg" },
  {
    id: "azureservicebus",
    label: "Azure Service Bus",
    iconSrc: "/logos/skills/asb.svg",
  },
  { id: "figma", label: "Figma", iconSrc: "/logos/skills/figma.svg" },
  { id: "pgsql", label: "PostgreSQL", iconSrc: "/logos/skills/pgsql.svg" },
];

export interface LanguageSkill {
  id: string;
  nativeLabel: string;
  englishName: string;
  level: string;
}

export const languageSkills: LanguageSkill[] = [
  {
    id: "en",
    nativeLabel: "English",
    englishName: "English",
    level: "Full Professional",
  },
  {
    id: "hi",
    nativeLabel: "हिन्दी",
    englishName: "Hindi",
    level: "Full Professional",
  },
  { id: "ta", nativeLabel: "தமிழ்", englishName: "Tamil", level: "Native" },
  {
    id: "fr",
    nativeLabel: "Français",
    englishName: "French",
    level: "Elementary",
  },
  {
    id: "gu",
    nativeLabel: "ગુજરાતી",
    englishName: "Gujarati",
    level: "Elementary",
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    company: "RadioFX, Inc.",
    companyId: "radiofx",
    role: "Software Development Co-op",
    procId: "radiofx-coop",
    focus: "ai · platform",
    period: "Sep 2025 – Dec 2025",
    start: "2025-09",
    end: "2025-12",
    location: "Chicago, IL",
    logoSrc: "/logos/rfx-logo.png",
    stack: ["Gemini", "Vercel v0", "GKE", "Helm", "NGINX", "NestJS", "Cassandra"],
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
    procId: "radiofx-intern",
    focus: "infra · devops",
    period: "Jun 2025 – Aug 2025",
    start: "2025-06",
    end: "2025-08",
    location: "Chicago, IL",
    logoSrc: "/logos/rfx-logo.png",
    stack: ["GKE", "Cloud Build", "GitHub Actions", "NestJS", "Fastify"],
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
    procId: "bfhl-sde",
    focus: "product · ownership",
    period: "Sep 2023 – Jul 2024",
    start: "2023-09",
    end: "2024-07",
    location: "Pune, India",
    logoSrc: "/logos/bfhl-logo.png",
    stack: ["React", "Node.js", "TypeScript", "ELK"],
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
    procId: "bfhl-associate",
    focus: "frontend performance",
    period: "Jul 2022 – Sep 2023",
    start: "2022-07",
    end: "2023-09",
    location: "Pune, India",
    logoSrc: "/logos/bfhl-logo.png",
    stack: ["React", "AMP", "JavaScript", "Webpack"],
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
    procId: "bfhl-intern",
    focus: "perf · seo · observability",
    period: "Jan 2022 – Jun 2022",
    start: "2022-01",
    end: "2022-06",
    location: "Pune, India",
    logoSrc: "/logos/bfhl-logo.png",
    stack: ["JavaScript", "SEO", "ELK", "SonarQube"],
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
    procId: "ubs-analyst",
    focus: "process automation",
    period: "Jun 2021 – Aug 2021",
    start: "2021-06",
    end: "2021-08",
    location: "India",
    logoSrc: "/logos/ubs-logo.png",
    stack: ["Alteryx", "ARIS"],
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
    end: "present", // TODO: set expected graduation month once confirmed
    note: "Cloud computing, backend & distributed systems",
  },
  {
    school: "Vellore Institute of Technology",
    degree: "BTech, Computer Science",
    start: "2018-07",
    end: "2022-05",
  },
];



export const serviceItems: ServiceItem[] = [
  {
    id: "fullstack",
    title: "Full-Stack Engineering",
    description:
      "Designing and building end-to-end web applications using React, Next.js, NestJS, and scalable backend architectures.",
  },
  {
    id: "cloud",
    title: "Cloud & Platform Engineering",
    description:
      "Architecting and operating cloud-native systems on GCP/AWS using Kubernetes (GKE), containers, autoscaling, ingress, and observability.",
  },
  {
    id: "devops",
    title: "DevOps & CI/CD Automation",
    description:
      "Building automated build, test, and deployment pipelines using GitHub Actions and Cloud Build for fast, reliable releases.",
  },
  {
    id: "ai",
    title: "AI Engineering & LLM Integration",
    description:
      "Engineering AI-powered features using OpenAI and Gemini, including intelligent agents, automation workflows, and real-world integrations.",
  },
  {
    id: "security",
    title: "Security & Reliability Engineering",
    description:
      "Ensuring application security and reliability through robust authentication, gateway-level protections, and fault-tolerant system design.",
  },
  {
    id: "performance",
    title: "Performance Engineering & Optimization",
    description:
      "Optimizing frontend and backend systems to improve latency, throughput, Core Web Vitals, and Lighthouse scores.",
  },
];

export const projectItems: ProjectItem[] = [
  {
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
    domains: ["AI / LLM", "platform & infra"],
    tileMedia: {
      kind: "image",
      src: "/window.svg",
      alt: "Multi-agent AI website generation pipeline architecture",
    },
    detailMedia: [
      { kind: "image", src: "/window.svg", alt: "Pipeline architecture" },
    ],
    detailSubtitle:
      "An automated prompt-to-production pipeline with multi-tenant isolation on GKE",
    detailDateRange: "Jun 2025 \u2013 Dec 2025",
    detailOrganization: { name: "RadioFX, Inc.", logoSrc: "/logos/rfx-logo.png" },
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
  },
  {
    name: "CRLite+ – Lightweight Certificate Revocation Extension",
    slug: "crlite-plus-cert-revocation",
    blurb:
      "Local, privacy-preserving TLS certificate revocation for Chromium via cascaded Bloom filters. Shipped to the Chrome Web Store.",
    featured: true,
    badge: "Shipped \u00b7 Chrome Web Store",
    badgeTone: "amber",
    domains: ["security", "research", "shipped"],
    outcomes: [
      { value: "100%", label: "detection accuracy" },
      { value: "2\u20135ms", label: "check overhead" },
      { value: "<512KB", label: "filter memory" },
    ],
    description:
      "Research work on CRLite+, a lightweight browser extension approach for practical certificate revocation and safer TLS connections.",
    techStack: [
      "Chrome Extension",
      "Node.js",
      "Python",
      "Bloom Filters",
      "TLS",
      "Security",
      "CRLite",
    ],
    tileMedia: {
      kind: "image",
      src: "/projects/crlite/crlite_cover.png",
      alt: "CRLite+ certificate revocation extension blocking revoked certificate",
    },
    designImages: [
      {
        src: "/window.svg",
        alt: "CRLite+ architecture and workflow",
      },
    ],
    detailMedia: [
      {
        kind: "image",
        src: "/window.svg",
        alt: "CRLite+ certificate revocation visuals",
      },
    ],
    detailSubtitle: "Lightweight Browser Extension for Dynamic Certificate Revocation Enforcement",
    detailDateRange: "April 2025",
    detailOrganization: {
      name: "University of Illinois Chicago",
      logoSrc: "/logos/uic-logo.png",
    },
    detailAssociation: "Associated with University of Illinois Chicago",
    detailProjectType: "Research Project | CS588 – Security and Privacy in Networked and Distributed Systems",
    detailTechStack:
      "Chrome Extension (Manifest V3) · Node.js · Python · Bloom Filters · TLS · SHA-256 · MurmurHash3",
    detailOverview:
      "A Chrome extension that brings CRLite-style certificate revocation to Chromium browsers. Uses cascaded Bloom filters for local, privacy-preserving revocation checking without network roundtrips. Achieves 100% accuracy with 2-5ms overhead.",
    detailProblem:
      "Traditional revocation (CRLs, OCSP) is slow, inefficient, and privacy-invasive. CRLs are large and infrequently updated; OCSP adds latency and leaks browsing behavior. Firefox has CRLite, but Chromium browsers lack a similar solution.",
    detailMotivation:
      "Mozilla's CRLite proves local Bloom filter-based checking works. CRLite+ brings this approach to Chrome, demonstrating fast, private revocation is achievable for Chromium browsers.",
    detailSolution:
      "Hybrid revocation scheme: static cascaded Bloom filters (blacklist + whitelist) for known revocations, dynamic filters for real-time updates. Chrome extension intercepts certificates, performs local lookups, and blocks revoked domains. Node.js backend manages revocation lists; Python generates filter cascades.",
    detailSolutionPoints: [
      "Cascaded Bloom Filters – Two-layer architecture (blacklist + whitelist) eliminates false positives while keeping memory under 512KB.",
      "Local Verification – All checks performed client-side, no network roundtrips, zero privacy leaks.",
      "Real-Time Enforcement – Chrome extension intercepts certificates, performs lookups in 2-5ms, blocks revoked domains instantly.",
      "Hybrid Scheme – Static pre-computed filters for known revocations, dynamic filters for real-time updates.",
      "100% Accuracy – Zero false positives through cascade architecture, successfully detects all revoked certificates.",
    ],
    detailReflectionOutcomes:
      "Achieved 100% detection accuracy with 2-5ms checking overhead. Cascaded filters eliminated false positives. Complete enforcement flow validated—from certificate parsing to domain blocking. Proves fast, privacy-respecting revocation is practical for Chromium browsers.",
    detailReflectionMoreTime:
      "Future: integrate real CA feeds for live CRL/OCSP conversion, support intermediate CA revocations, native browser integration, revocation transparency logging.",
    detailDesignProcess:
      "Modular three-component architecture: Python generates static filter cascades, Node.js backend fetches certificates and manages revocation lists, Chrome extension performs real-time validation. Evaluation simulated revocations by injecting trusted domains to verify complete enforcement flow.",
    detailDesignProcessSteps: [
      {
        id: "requirement-analysis",
        title: "Requirement Analysis",
        subtitle: "Understanding the revocation problem",
        paragraphs: [
          "Analyzed CRLs and OCSP limitations: CRLs are large and slow, OCSP adds latency and leaks privacy. Studied Mozilla's CRLite to understand cascaded Bloom filters. Requirements: sub-10ms checking, zero network roundtrips, privacy-preserving, Chromium-compatible.",
        ],
        bullets: [
          "Identified core needs: low latency, privacy, scalability, Chromium compatibility",
          "Studied CRLite's cascaded Bloom filter approach",
          "Defined success: 100% accuracy, <1MB memory, negligible overhead",
        ],
        summary:
          "Analysis revealed existing mechanisms fail to balance performance, privacy, and scalability. CRLite's approach provided the foundation for CRLite+.",
      },
      {
        id: "system-architecture",
        title: "System Architecture",
        subtitle: "Modular three-component design",
        images: [
          {
            src: "/projects/crlite/system_architecture.png",
            alt: "CRLite+ System Architecture diagram showing Frontend (Chrome), Backend (Node.js), Bloom Filters, and Static Filter Generator (Python)",
          },
        ],
        paragraphs: [
          "Three-component system: Python filter generator, Node.js backend for certificate retrieval, Chrome extension for enforcement. Cascaded Bloom filters: blacklist (revoked serials) + whitelist (eliminates false positives). Uses MurmurHash3 for performance, SHA-256 for certificate hashing.",
        ],
        bullets: [
          "Python generates static filter cascades",
          "Node.js backend manages certificates and revocation lists",
          "Chrome extension performs real-time validation",
          "Cascaded filters ensure zero false positives with minimal memory",
        ],
        summary:
          "Modular architecture enables independent optimization. Cascaded filters provide accurate, scalable checking with minimal memory overhead.",
      },
      {
        id: "data-pipeline",
        title: "Data Pipeline",
        subtitle: "Certificate retrieval to filter generation",
        images: [
          {
            src: "/projects/crlite/data-flow-diagram.png",
            alt: "CRLite+ data flow diagram showing offline generation, distribution, runtime browser, and Node.js backend stages",
          },
        ],
        paragraphs: [
          "Pipeline: Node.js backend creates raw TLS connections, extracts certificate serials, maintains revocation lists. Python processes data to generate static filter cascades. JSON endpoints enable extension-backend communication for live updates.",
        ],
        bullets: [
          "Node.js fetches certificates via raw TLS, extracts serials with SHA-256",
          "Python generates cascaded filters from revocation lists",
          "JSON API enables dynamic updates without filter regeneration",
        ],
        summary:
          "Pipeline separates static filter construction from dynamic updates, enabling efficiency and flexibility while keeping revocation lists current.",
      },
      {
        id: "implementation",
        title: "Implementation",
        subtitle: "Chrome extension and backend",
        images: [
          {
            src: "/projects/crlite/pic1.png",
            alt: "CRLite+ extension blocking access to revoked certificate for github.com",
          },
          {
            src: "/projects/crlite/pic2.png",
            alt: "CRLite+ certificate status popup showing revoked certificate details",
          },
          {
            src: "/projects/crlite/pic3.png",
            alt: "CRLite+ certificate status popup showing valid certificate for piazza.com",
          },
        ],
        paragraphs: [
          "Chrome extension (Manifest V3) intercepts certificates during TLS handshake, performs Bloom filter lookups, blocks revoked domains. Node.js backend manages revocation lists via REST API. Python generates filter cascades. Achieves 2-5ms checking overhead.",
        ],
        bullets: [
          "Extension: certificate interception, cascade lookup (blacklist → whitelist), domain blocking",
          "Backend: raw TLS connections, certificate extraction, revocation list management",
          "Python: filter generation with configurable parameters",
        ],
        summary:
          "Fully functional extension with real-time revocation checking. Modular codebase enables efficient interception, fast lookups, and seamless blocking.",
      },
      {
        id: "evaluation-iteration",
        title: "Evaluation & Results",
        subtitle: "Validating accuracy and performance",
        paragraphs: [
          "Simulated revocations by injecting trusted domains (github.com, uic.blackboard.com) to verify complete enforcement flow. Results: 100% detection accuracy, 2-5ms checking time, zero false positives. Iterations optimized filter parameters, reducing memory to <512KB (static) and <200KB (dynamic).",
        ],
        bullets: [
          "100% accuracy across multiple domains and certificate types",
          "2-5ms average checking time, negligible page load impact",
          "Zero false positives through cascade architecture",
          "Memory optimized: <512KB static, <200KB dynamic",
        ],
        summary:
          "Evaluation confirms accurate revocation detection with minimal overhead. Iterations optimized parameters, resulting in a practical client-side revocation system for Chromium browsers.",
      },
    ],
    detailHighlights: [
      "Cascaded Bloom Filters – Two-layer architecture eliminates false positives, <512KB memory",
      "Privacy-Preserving – All checks local, zero network roundtrips, no browsing leaks",
      "Real-Time Enforcement – 2-5ms checking, instant domain blocking",
      "Hybrid Scheme – Static filters for known revocations, dynamic for real-time updates",
      "100% Accuracy – Zero false positives, detects all revoked certificates",
    ],
    detailLinks: [
      {
        label: "Paper",
        url: "https://www.academia.edu/144366111/CRLite_A_lightweight_browser_extension_for_dynamic_certificate_revocation_enforcement?source=swp_share",
        icon: "paper",
      },
      {
        label: "GitHub",
        url: "https://github.com/Prathik0300/CRLite",
        icon: "github",
      },
      {
        label: "Chrome Extension",
        url: "https://chromewebstore.google.com/detail/crlite-extension/mkapckifchidaldnnnoipmcamgcefobj",
        icon: "chrome",
      },
    ],
  },
  {
    name: "EnsoGrow – Personal AI Garden Companion",
    slug: "ensogrow-ai-garden-companion",
    blurb:
      "A calm PWA gardening coach: computer-vision plant diagnosis plus a Gemini assistant, built at WildHacks.",
    badge: "Hackathon \u00b7 WildHacks",
    badgeTone: "faint",
    domains: ["AI / LLM"],
    description:
      "A minimalist PWA that acts as a smart gardening coach for urban growers, combining AI, computer vision, and hyperlocal community features to help people grow organic food at home.",
    techStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "REST APIs",
      "Computer Vision",
      "Google Gemini",
      "AWS",
    ],
    tileMedia: {
      kind: "video",
      src: "/projects/ensogrow/ensogrow.mp4",
      alt: "EnsoGrow AI gardening assistant demo",
    },
    coverMedia: {
      kind: "image",
      src: "/projects/ensogrow/pic5.png",
      alt: "EnsoGrow interface previews",
    },
    designImages: [
      {
        src: "/projects/ensogrow/screens.png",
        alt: "EnsoGrow screens overview",
      },
    ],
    detailMedia: [
      {
        kind: "image",
        src: "/projects/ensogrow/screens.png",
        alt: "EnsoGrow screens overview",
      },
    ],
    detailSubtitle: "Personal AI Garden Companion",
    detailDateRange: "April 2025",
    detailAssociation: "Hackathon",
    detailProjectType: "Hackathon Project | WildHacks 2025",
    detailTechStack:
      "React PWA · TailwindCSS · Gemini API · Computer Vision",
    detailOverview:
      "EnsoGrow is a minimalist PWA that helps everyday people grow organic food at home without the overwhelm. Built for urban growers, students, and busy professionals, it serves as both a smart gardening coach and a community hub.",
    detailProblem:
      "Most gardening apps ignore local constraints like space, light, and time. They also overlook organic-first care and the emotional journey of home-growing. Users give up after confusing guidance, failed crops, and little feedback. EnsoGrow uses AI, computer vision, and personalized planning to solve this.",
    detailMotivation:
      "Home growers need guidance that fits their space, time, and organic-first goals. We wanted to make gardening feel approachable, encouraging, and grounded in local context so people actually stick with it.",
    detailDesignProcess:
      "Built during WildHacks 2025 as a rapid PWA prototype, we focused on clarity-first flows, lightweight interactions, and AI-assisted guidance that could be tested quickly with real users.",
    detailSolution:
      "EnsoGrow blends AI guidance with a simple, calming interface so users can move from curiosity to confident care. The experience is built around short, actionable steps instead of long, intimidating instructions.",
    detailSolutionPoints: [
      "Personalized onboarding maps each user’s space, light, and time into a garden profile that drives every recommendation.",
      "Instant plant care diagnostics turn a photo into clear, organic-first treatment steps and recovery guidance.",
      "Adaptive schedules translate growth stages, local weather, and routines into lightweight reminders that are easy to follow.",
      "Motivation loops keep users engaged with progress visuals, milestones, and community-driven encouragement.",
    ],
    detailReflectionOutcomes:
      "EnsoGrow proved that gardening guidance works best when it’s contextual, lightweight, and encouraging. The hackathon build validated our core loop—quick onboarding, clear next actions, and visible progress—while the AI Plant Doctor and reminders emerged as the strongest “aha” moments for users.",
    detailReflectionMoreTime:
      "With more time, we’d expand testing with a broader set of growers across different climates and living situations, improve the vision model with more labeled plant disease data, and deepen hyperlocal community features (seed swaps, compost pickups, and expert office hours).",
    detailDesignProcessSteps: [
      {
        id: "empathize",
        title: "Empathize",
        subtitle: "Understanding new growers",
        paragraphs: [
          "We studied how beginners and casual growers actually behave day‑to‑day — when they check plants, how they remember tasks, and what makes them give up. Interviews and quick shadowing sessions revealed that most users want guidance that fits their space and schedule, not generic advice.",
          "Why this mattered: the early drop‑off wasn’t about a lack of information, it was about overwhelm. By learning the emotional curve of a home grower (excitement → confusion → frustration), we shaped a tone that is supportive and action‑oriented.",
          "How it helps: this phase ensures the product feels like a coach rather than a manual. Every later feature (diagnosis, reminders, progress) is grounded in real constraints and real routines.",
        ],
        bullets: [
          "Interviewed first‑time and casual growers about their routines, schedules, and decision fatigue.",
          "Captured constraints around space, light, and time that break typical app guidance.",
          "Documented emotional triggers—loss of confidence after failed plants and lack of feedback.",
          "Benchmarked competitor apps to identify what felt overwhelming or too generic.",
        ],
        summary:
          "We focused on the emotional journey of home‑growing. The research showed that beginners abandon plants when advice feels generic or too complex. We listened for what users actually do day‑to‑day, not what they say they will do. This phase helped us design a calmer tone, simpler steps, and a faster path to visible progress so users build confidence early.",
      },
      {
        id: "define",
        title: "Define",
        subtitle: "Clarifying the core problem",
        paragraphs: [
          "We synthesized findings into a clear problem statement: people abandon plants when guidance ignores their context. The system must recognize space, light, time, and organic preferences before giving advice.",
          "Why this mattered: a feature‑heavy product would add more pressure. We needed a minimal set of actions that a user could complete in minutes and still feel progress.",
          "How it helps: defining outcomes like “keep a plant healthy for 2–3 weeks” translated into practical design choices — simple onboarding, clear next steps, and confidence‑building progress indicators.",
        ],
        bullets: [
          "Synthesized interviews into a clear problem statement rooted in context, not just features.",
          "Prioritized pain points by frequency and severity to avoid feature overload.",
          "Converted findings into product requirements for onboarding, reminders, and diagnostics.",
          "Defined success as ‘users can keep a plant healthy for 2–3 weeks’ not just app usage.",
        ],
        summary:
          "We framed the challenge around context‑aware guidance: users don’t just need plant facts, they need advice tuned to their space, time, and organic‑first preferences. By defining outcomes in real‑world terms (healthy plants, reduced confusion), we shaped a solution that prioritizes actionable guidance over information overload.",
      },
      {
        id: "ideate",
        title: "Ideate",
        subtitle: "Exploring solutions",
        images: [
          {
            src: "/projects/ensogrow/user-flow-ensogrow.png",
            alt: "EnsoGrow user flow diagram",
          },
          {
            src: "/projects/ensogrow/task-flow-ensogrow.png",
            alt: "EnsoGrow task flow diagram",
          },
        ],
        paragraphs: [
          "We explored multiple concept directions — from a lightweight daily coach to a community‑first platform. Sketching and flow mapping helped us pick the moments where users needed the most help.",
          "Why this mattered: the best ideas were not the flashiest; they were the ones that reduced cognitive load. We focused on quick actions (photo diagnosis, 1‑tap reminders) that fit into busy schedules.",
          "How it helps: the ideation outputs became a set of flows that deliver value in under one minute, which is critical for retention and repeat use.",
        ],
        bullets: [
          "Explored multiple flows for onboarding: quick quiz, photo‑based setup, and hybrid models.",
          "Prototyped AI use‑cases for diagnosis, reminders, and an ask‑me‑anything assistant.",
          "Designed a lightweight community layer to support hyperlocal seed swaps and advice.",
          "Selected concepts that deliver value in under one minute per session.",
        ],
        summary:
          "We prioritized ideas that reduce cognitive load and deliver immediate value — short tasks, photo‑based help, and ambient reminders instead of long reading. This ensured the product feels like a helper, not another commitment competing for time.",
      },
      {
        id: "design",
        title: "Design",
        subtitle: "Prototyping the experience",
        paragraphs: [
          "We translated the flows into mid‑fidelity PWA screens with an emphasis on clarity. The interface uses calm spacing, minimal friction, and a consistent information hierarchy so users always know the next step.",
          "Why this mattered: the design had to reduce anxiety. We avoided dense content blocks and used visual progress (timeline + milestones) to reinforce small wins.",
          "How it helps: the UI makes it easy to act — users can diagnose a plant, see a recovery plan, and set reminders without digging through menus.",
        ],
        bullets: [
          "Built mid‑fidelity PWA screens emphasizing clarity, calm spacing, and gentle prompts.",
          "Created a visual growth timeline to show progress and reduce drop‑off.",
          "Designed the plant doctor flow to translate diagnosis into a 3‑step recovery plan.",
          "Simplified navigation so key actions are always one tap away.",
        ],
        summary:
          "The UI favors clarity and reassurance. Every screen reinforces a sense of progress and makes it easy to complete one helpful step at a time. We chose a minimalist layout so users can act quickly, which is crucial for busy students and professionals.",
      },
      {
        id: "test",
        title: "Test",
        subtitle: "Rapid feedback loop",
        paragraphs: [
          "We ran rapid demos and short usability checks with hackathon participants and mentors. We observed whether users could complete setup and understand their next action without guidance.",
          "Why this mattered: testing validated the assumption that short guidance beats long explanations. Users asked for confirmation and simple reminders, which informed our copy and UX tweaks.",
          "How it helps: the refinements improved clarity, reduced confusion, and strengthened retention drivers like reminders and visible progress.",
        ],
        bullets: [
          "Demoed the prototype with hackathon participants and mentors for rapid feedback.",
          "Observed setup time and error points to validate a 3‑minute onboarding goal.",
          "Refined micro‑copy and reminders to reduce confusion and anxiety.",
          "Validated that users understood next actions without reading long explanations.",
        ],
        summary:
          "Testing confirmed that guided onboarding and short feedback loops are key to retention. Users responded best to clear next steps and visual progress, so we strengthened reminders and the timeline. This makes the product helpful, not burdensome, and keeps users engaged through early plant care.",
      },
    ],
    detailHighlights: [
      "Plant Matchmaker – Tailored plant picks based on space, sunlight, and time commitment.",
      "AI Plant Doctor – Snap a sick plant for instant diagnosis and organic treatment tips.",
      "Care Reminders – Adaptive nudges based on growth stage, weather, and schedule.",
      "Gamified Tracker – Visual growth timelines and milestone badges to keep momentum.",
      "Hyperlocal Community – Connect nearby gardeners for compost pickups, seed swaps, and tips.",
      "Ask‑Me‑Anything Bot – AI chatbot trained on gardening forums and agri‑research.",
    ],
    detailLinks: [
      {
        label: "GitHub",
        url: "https://github.com/Prathik0300/ensogrow-fe",
        icon: "github",
      },
      {
        label: "Website",
        url: "https://ensogrow-fe.vercel.app/login",
        icon: "website",
      },
    ],
  },
  {
    name: "Virtual Emotion Mirror",
    slug: "virtual-emotion-mirror",
    blurb:
      "Real-time facial emotion inference in the browser \u2014 client-side detection, server-side classification, MongoDB trend analytics.",
    badge: "Solo \u00b7 live demo",
    badgeTone: "faint",
    domains: ["AI / LLM"],
    description:
      "An AI-driven facial emotion recognition system that analyzes real-time expressions to recommend personalized content and surface long-term emotional trends.",
    techStack: [
      "React.js",
      "NestJS",
      "Python",
      "TensorFlow",
      "MongoDB",
      "Computer Vision",
      "Deep Learning",
      "REST APIs",
    ],
    tileMedia: {
      kind: "image",
      src: "/projects/vem/vem_tile.png",
      alt: "Virtual Emotion Mirror multi-device interface showing emotion detection, content recommendations, and analytics dashboard",
    },
    detailMedia: [
      {
        kind: "image",
        src: "/vercel.svg",
        alt: "Virtual Emotion Mirror interface concept",
      },
    ],
    detailSubtitle: "AI-Driven Facial Emotion Recognition & Personalized Content System",
    detailDateRange: "Jan 2025 - Mar 2025",
    detailAssociation: "Solo Project",
    detailTechStack:
      "React.js · NestJS (Node.js) · Python · TensorFlow · MongoDB · Computer Vision · Deep Learning · REST APIs",
    detailOverview:
      "An AI-powered emotion intelligence platform that detects facial expressions in real time and personalizes content (movies, music) based on emotional state. Hybrid architecture: client-side face detection, server-side emotion classification, MongoDB analytics. Provides both real-time recommendations and long-term emotional insights.",
    detailProblem:
      "Traditional recommendations rely on explicit actions (likes, history) and miss emotional context. Real-time emotion recognition can act as an implicit signal for better personalization and self-awareness.",
    detailMotivation:
      "Explore how facial emotion recognition enables emotion-aware personalization and how emotional data can provide self-awareness insights over time.",
    detailSolution:
      "Hybrid architecture: React frontend performs face detection, Python backend classifies emotions (Happy, Sad, Angry, Surprised, Neutral), NestJS orchestrates. Maps emotions to content recommendations and tracks patterns over time for analytics.",
    detailSolutionPoints: [
      "Hybrid Architecture – Client-side face detection reduces latency; server-side emotion classification ensures accuracy. NestJS orchestrates, Python handles inference.",
      "Real-Time Emotion Pipeline – Face detection → feature extraction → emotion classification (5 emotions) → temporal smoothing for stable predictions.",
      "Personalized Recommendations – Maps emotions to content: calm/uplifting music for stress/sadness, high-energy for happiness. Movies filtered by emotional compatibility.",
      "Emotional Analytics – Tracks patterns over days/weeks/months, identifies mood cycles and stress trends for self-awareness insights.",
      "Scalable Design – Modular services enable independent scaling of frontend, inference, and data storage.",
    ],
    detailDesignProcess:
      "Architecture optimized for real-time performance and scalability. Key decisions: client-side face detection to reduce backend load, batched inference requests, hybrid architecture balances speed and accuracy, modular services enable independent scaling.",
    detailDesignProcessSteps: [
      {
        id: "system-architecture",
        title: "System Architecture",
        subtitle: "Hybrid, low-latency design",
        images: [
          {
            src: "/projects/vem/vem_system_architecture.png",
            alt: "Virtual Emotion Mirror system architecture diagram showing Frontend (React App, Webcam Integration, Emotion Dashboard), Backend (NestJS API Gateway, Python Inference Service, Spotify API Connector, IMDB API Connector), and Data Layer (MongoDB)",
          },
        ],
        paragraphs: [
          "Three-layer architecture: React frontend for client-side face detection, NestJS backend for orchestration, Python service for emotion classification, MongoDB for data persistence. Offloading face detection to client reduces backend load and latency.",
        ],
        bullets: [
          "Frontend: React.js with webcam integration, lightweight browser-based face detection",
          "Backend: NestJS API gateway, Python deep learning service for emotion classification",
          "Data: MongoDB for timestamped predictions, patterns, and trends",
        ],
        summary:
          "Hybrid architecture balances real-time performance and scalability. Modular design enables independent optimization and scaling of each component.",
      },
      {
        id: "emotion-pipeline",
        title: "Emotion Recognition Pipeline",
        subtitle: "Real-time detection system",
        images: [
          {
            src: "/projects/vem/emotion_recognition_pipeline.png",
            alt: "Virtual Emotion Mirror emotion recognition pipeline diagram showing the flow from video stream through face detection, feature extraction, emotion classification, temporal smoothing, to personalization and recommendations",
          },
        ],
        paragraphs: [
          "Four-stage pipeline: face detection → feature extraction → emotion classification (Happy, Sad, Angry, Surprised, Neutral) → temporal smoothing. Processes live video frames with probabilistic outputs and confidence scores. Temporal smoothing prevents abrupt changes from noisy frames.",
        ],
        bullets: [
          "Face detection via browser webcam APIs",
          "Feature extraction: facial landmarks and expression features",
          "Emotion classification: TensorFlow models with confidence scores",
          "Temporal smoothing: averages predictions across time windows",
        ],
        summary:
          "Pipeline enables real-time emotion detection with stable predictions. Probabilistic outputs support confidence-based personalization.",
      },
      {
        id: "recommendation-engine",
        title: "Recommendation Engine",
        subtitle: "Emotion-to-content mapping",
        images: [
          {
            src: "/projects/vem/sequence_diagram.png",
            alt: "Virtual Emotion Mirror sequence diagram showing the data flow from user login through face capture, emotion detection, genre mapping, API integration with Spotify and IMDB, to personalized recommendations with feedback loop",
          },
        ],
        paragraphs: [
          "Maps detected emotions to content suggestions. Music: calm/uplifting for stress/sadness, high-energy for happiness. Movies: genre filtering by emotional compatibility. Updates in real time as emotional state changes via feedback loop.",
        ],
        bullets: [
          "Emotion-to-content mapping for music and movies",
          "Real-time updates as emotional state changes",
          "Integration with Spotify and IMDB APIs",
          "Caching and optimization for fast retrieval",
        ],
        summary:
          "Engine creates adaptive recommendations that respond to current emotional state, not just historical behavior. Feedback loop keeps content relevant to user's mood.",
      },
      {
        id: "analytics-insights",
        title: "Emotional Analytics",
        subtitle: "Long-term emotional intelligence",
        paragraphs: [
          "Transforms raw emotion data into insights. Tracks distribution over days/weeks/months, identifies recurring patterns, mood cycles, and stress trends. Dashboard visualizes trends for self-awareness and well-being reflection.",
        ],
        bullets: [
          "Tracks emotional distribution over time",
          "Identifies recurring patterns and mood cycles",
          "Visualization dashboard for trends and insights",
          "Privacy-preserving aggregation",
        ],
        summary:
          "Analytics layer provides long-term value beyond real-time recommendations, enabling users to understand emotional patterns and reflect on well-being.",
      },
      {
        id: "implementation",
        title: "Implementation",
        subtitle: "Production-ready system",
        images: [
          {
            src: "/projects/vem/vem.png",
            alt: "Virtual Emotion Mirror dashboard interface showing laptop and smartphone views with emotion analytics dashboard, daily/weekly/monthly charts, and personalized movie and music recommendations",
          },
        ],
        paragraphs: [
          "React frontend, NestJS backend, Python inference service, MongoDB data layer. Key solutions: client-side preprocessing, batched inference requests, temporal smoothing, modular architecture. Achieves real-time performance with minimal latency and scalable design.",
        ],
        bullets: [
          "Frontend: React.js with webcam integration, browser-based face detection",
          "Backend: NestJS API with authentication and orchestration",
          "Inference: Python TensorFlow models for emotion classification",
          "Data: MongoDB for predictions, patterns, and trends",
        ],
        summary:
          "Production-ready system with real-time emotion detection, accurate predictions, and scalable architecture. Modular design enables independent optimization and scaling.",
      },
    ],
    detailHighlights: [
      "Real-Time Detection – Live facial expression analysis with minimal latency",
      "Hybrid Architecture – Client-side preprocessing, server-side inference for performance and scalability",
      "Personalized Recommendations – Music and movies adapt to emotional state in real time",
      "Emotional Analytics – Tracks patterns, mood cycles, and stress trends for self-awareness",
      "Temporal Smoothing – Stable predictions by averaging across time windows",
    ],
    detailReflectionOutcomes:
      "Successfully built a production-ready hybrid AI architecture integrating deep learning into real-time web apps. Demonstrated real-time emotion detection with personalized recommendations and long-term insights. Explored ethical and technical considerations of emotion-based systems, validating feasibility of emotion-aware applications.",
    detailReflectionMoreTime:
      "Future: multi-modal detection (voice + facial), on-device inference for privacy, emotion-aware UI themes, advanced analytics dashboards with sophisticated pattern recognition.",
    detailLinks: [
      {
        label: "GitHub",
        url: "https://github.com/Prathik0300/Virtual_Emotion_Mirror",
        icon: "github",
      },
      {
        label: "Website",
        url: "https://vem-prathik0300s-projects.vercel.app/",
        icon: "website",
      },
    ],
  },
  {
    name: "Automated Program Repair Using LLM",
    slug: "automated-program-repair-llm",
    blurb:
      "Feeds AFL++ crash inputs and GDB stack traces into an LLM repair loop. Execution context took repair success from 38% to 85%.",
    featured: true,
    badge: "Research \u00b7 UIC",
    badgeTone: "faint",
    domains: ["AI / LLM", "research"],
    outcomes: [
      { value: "38 \u2192 85%", label: "repair success" },
      { value: "4 \u2192 2", label: "median attempts" },
      { value: "11 / 13", label: "programs fixed" },
    ],
    description:
      "An LLM-powered bug-fixing pipeline that integrates coverage-guided fuzzing (AFL/AFL++) and runtime stack traces (GDB) with LLM reasoning to automatically repair crash-inducing defects in C/C++ programs.",
    techStack: [
      "Python",
      "AFL/AFL++",
      "GDB",
      "LLMs",
      "GPT-4o mini",
      "C/C++",
      "Fuzzing",
      "Automated Program Repair",
    ],
    tileMedia: {
      kind: "image",
      src: "/projects/llm/llm_tile.png",
      alt: "Automated program repair with LLMs integrating fuzzing and debugging",
    },
    detailMedia: [
      {
        kind: "image",
        src: "/file.svg",
        alt: "Automated program repair system architecture",
      },
    ],
    detailSubtitle:
      "Integrating Coverage-Guided Fuzzing and LLM Reasoning for Automated Repair of Crash-Inducing Bugs",
    detailDateRange: "Sept 2024 - Dec 2024",
    detailOrganization: {
      name: "University of Illinois Chicago",
      logoSrc: "/logos/uic-logo.png",
    },
    detailAssociation: "Associated with University of Illinois Chicago",
    detailProjectType: "Research Project | Automated Program Repair",
    detailTechStack:
      "Python · AFL/AFL++ · GDB · GPT-4o mini · C/C++ · Fuzzing · Stack Trace Analysis · FNV-1a Hashing · Patch Scoring",
    detailOverview:
      "An automated repair pipeline that combines AFL/AFL++ fuzzing, GDB stack traces, and LLM reasoning to fix crash-inducing bugs in C/C++ programs. The system achieves 85% success rate (11/13 programs) by providing LLMs with concrete execution context—minimized crash inputs and stack traces—rather than code alone.",
    detailProblem:
      "LLMs can reason about code but lack execution context. Traditional repair methods struggle with runtime defects like buffer overflows that need precise crash-triggering inputs and stack traces for accurate localization.",
    detailMotivation:
      "By combining fuzzing to discover crashes, GDB to extract stack traces, and LLM reasoning with execution context, we create an execution-aware repair loop that significantly improves bug localization and repair accuracy.",
    detailSolution:
      "A five-stage pipeline: (1) preprocess code to remove hints, (2) generate seed inputs via LLM, (3) fuzz with AFL to discover and minimize crashes, (4) extract stack traces with GDB, (5) iteratively repair with LLM using execution context. Crash deduplication and patch scoring optimize the process.",
    detailSolutionPoints: [
      "Fuzzing & Crash Discovery – AFL mutates inputs to find crashes, then minimizes them to create focused test cases that capture exact failure conditions.",
      "Stack Trace Extraction – GDB extracts execution paths for each crash, with FNV-1a hashing to deduplicate and preserve only unique failure signatures.",
      "Execution-Aware Prompting – LLM receives sanitized code, minimized crash inputs, and stack traces (not just code), enabling precise bug localization.",
      "Iterative Repair Loop – Each patch is compiled and tested. The model refines repairs across iterations, with persistent memory of previous attempts.",
      "Patch Scoring – Ranks candidates by compilation success, crash elimination, test passing, and edit distance to select optimal fixes.",
    ],
    detailDesignProcess:
      "The pipeline integrates fuzzing, debugging, and LLM reasoning into a cohesive workflow. Key design: preprocessing removes hints, LLM generates seed inputs, AFL discovers/minimizes crashes, GDB extracts traces, and iterative LLM repair uses execution context. Evaluation compared three conditions: code-only (38% success), +traces (69%), and +traces+crashes (85%).",
    detailDesignProcessSteps: [
      {
        id: "preprocessing",
        title: "Preprocessing",
        subtitle: "Clean code baseline",
        paragraphs: [
          "Strips comments and annotations to force the LLM to reason from code structure and execution evidence alone. In later iterations, the model's own comments are retained as self-generated memory.",
        ],
        bullets: [
          "Removes human-written hints before first repair attempt",
          "Retains LLM-generated comments in subsequent cycles for memory",
        ],
        summary:
          "Preprocessing creates a clean baseline by removing hints, then builds memory by retaining the model's own comments across iterations.",
      },
      {
        id: "input-generation",
        title: "Seed Input Generation",
        subtitle: "LLM creates fuzzing seeds",
        paragraphs: [
          "The LLM writes Python scripts to generate syntactically valid seed inputs for AFL. This automates seed creation and ensures the fuzzer starts with diverse test cases that exercise different code paths.",
        ],
        bullets: [
          "LLM generates Python scripts for seed input creation",
          "Identifies input method (stdin vs. file) for AFL configuration",
          "Populates AFL seed corpus automatically",
        ],
        summary:
          "Automates seed input generation, giving AFL high-quality starting points for efficient crash discovery.",
      },
      {
        id: "fuzzing",
        title: "Fuzzing & Crash Discovery",
        subtitle: "AFL finds and minimizes crashes",
        paragraphs: [
          "AFL performs coverage-guided fuzzing, mutating inputs to explore execution paths and discover crashes. When crashes occur, afl-tmin shrinks inputs while keeping them reproducible. These minimized inputs become focused test cases that show exactly what triggers the bug.",
        ],
        bullets: [
          "Coverage-guided mutation explores new execution paths",
          "Minimizes crash inputs to capture exact failure conditions",
          "Provides concrete examples for LLM repair",
        ],
        summary:
          "Fuzzing discovers crashes and minimizes inputs to create precise test cases that help the LLM understand and fix the bug.",
      },
      {
        id: "stacktrace-collection",
        title: "Stack Trace Extraction",
        subtitle: "GDB identifies fault location",
        paragraphs: [
          "GDB extracts stack traces for each crash, showing the execution path that led to failure. FNV-1a hashing deduplicates crashes, preserving only the five most representative traces. This pinpoints the exact function and line where the bug occurs.",
        ],
        bullets: [
          "Extracts execution paths via GDB batch mode",
          "Deduplicates using FNV-1a hashing to preserve unique signatures",
          "Identifies exact function and line of failure",
        ],
        summary:
          "Stack traces provide precise fault localization, showing where crashes occur so the LLM can target repairs accurately.",
      },
      {
        id: "llm-repair",
        title: "LLM Repair",
        subtitle: "Execution-aware iterative fixing",
        paragraphs: [
          "The LLM receives code, crash inputs, and stack traces—not just code. It generates patches that are compiled and tested iteratively. Execution context (traces + crashes) improves success from 38% (code-only) to 85% (+traces+crashes) with fewer attempts.",
        ],
        bullets: [
          "Structured prompt includes code, crash inputs, and stack traces",
          "Iterative compilation and testing validates each patch",
          "85% success rate with execution context vs 38% without",
        ],
        summary:
          "Execution-aware prompting with concrete crash data enables precise bug localization and repair, achieving 85% success rate.",
      },
      {
        id: "evaluation-results",
        title: "Results",
        subtitle: "Execution context improves repair",
        paragraphs: [
          "Tested on 13 crash-inducing programs. Results: code-only (38% success, 4 attempts), +traces (69%, 3 attempts), +traces+crashes (85%, 2 attempts). Execution context cuts attempts in half and doubles success rate.",
        ],
        bullets: [
          "13 programs tested: 10 synthetic + 3 from AFL demos",
          "Best: 85% success with 2 median attempts (+traces+crashes)",
          "Baseline: 38% success with 4 median attempts (code-only)",
          "11 of 13 programs fixed within 3 iterations",
        ],
        summary:
          "Execution-aware prompting doubles success rate (38% → 85%) and halves repair attempts, proving execution context is essential for automated repair.",
      },
    ],
    detailHighlights: [
      "85% Success Rate – 11 of 13 programs fixed within 3 iterations",
      "Execution-Aware Prompting – Crash inputs + stack traces improve repair from 38% to 85%",
      "Iterative Repair Loop – Persistent memory across iterations refines patches",
      "Crash Deduplication – FNV-1a hashing preserves unique failure signatures",
      "Model-Agnostic – Works with various LLM backends",
    ],
    detailReflectionOutcomes:
      "Execution-aware prompting doubles repair success (38% → 85%) and halves attempts needed. Key insight: LLMs need concrete execution context (crashes + traces), not just code. The pipeline demonstrates that combining fuzzing, debugging, and LLM reasoning creates a practical solution for automated repair of runtime defects.",
    detailReflectionMoreTime:
      "Future work: extend to multi-file projects, integrate symbolic execution for richer fault localization, evaluate on SARD/Juliet benchmarks, and explore parallel fuzzing for faster crash discovery.",
    detailLinks: [
      {
        label: "Paper",
        url: "https://www.academia.edu/144366072/Integrating_Coverage_Guided_Fuzzing_and_LLM_Reasoning_for_Automated_Repair_of_Crash_Inducing_Bugs?source=swp_share",
        icon: "paper",
      },
    ],
  },
];
