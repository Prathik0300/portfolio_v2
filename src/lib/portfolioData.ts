export type SkillCategoryId = "languages" | "stack";

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
    id: "backend",
    title: "Cloud-Native Backend Engineering",
    description:
      "Building distributed backend services, APIs, and authentication using Node/NestJS, Python, and modern cloud patterns.",
  },
  {
    id: "cloudInfra",
    title: "Cloud & Kubernetes Infrastructure",
    description:
      "Designing and operating cloud workloads on GCP/AWS with Kubernetes (GKE), containers, autoscaling, ingress, and observability.",
  },
  {
    id: "devops",
    title: "DevOps & CI/CD Automation",
    description:
      "Implementing automated build, test, and deploy pipelines with GitHub Actions and Cloud Build for fast, reliable releases.",
  },
  {
    id: "platform",
    title: "Platform & Developer Tooling",
    description:
      "Building internal platforms, validation systems, and developer productivity tooling to accelerate engineering teams.",
  },
  {
    id: "ai",
    title: "AI & LLM Application Integration",
    description:
      "Embedding OpenAI/Gemini-powered agents, automation flows, and intelligent features into real-world products.",
  },
  {
    id: "fullstack",
    title: "Full-Stack Web Application Development",
    description:
      "End-to-end product development using React/Next.js frontends and NestJS-based backends backed by cloud infrastructure.",
  },
  {
    id: "performance",
    title: "Performance & System Optimization",
    description:
      "Improving latency, throughput, Core Web Vitals, and Lighthouse scores through frontend and backend performance tuning.",
  },
  {
    id: "modernization",
    title: "Cloud Migration & Modernization",
    description:
      "Containerizing legacy systems and migrating to cloud-native architectures with zero-downtime rollout strategies.",
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
