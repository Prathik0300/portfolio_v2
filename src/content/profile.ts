export const siteLinks = {
  email: "prathik0300@gmail.com",
  github: "https://github.com/Prathik0300",
  linkedin: "https://www.linkedin.com/in/prathik-pugazhenthi-487855177/",
  resume: "/Prathik_Pugazhenthi_Resume.pdf",
  location: "Chicago, IL",
};

export const readme = {
  title: "Prathik Pugazhenthi",
  intro: [
    "I'm a software engineer in Chicago. I build the infrastructure that lets AI systems ship safely and fast.",
    "I finished an MS in Computer Science at UIC in May 2026. Before that I spent about two and a half years at Bajaj Finserv Health in Pune, where I built a medical image annotation platform used by 80,000+ doctors.",
    "In 2025 I was at RadioFX, where I moved the team from Jenkins to a GitOps setup on GKE and built an AI pipeline that rebuilds a customer's website.",
    "I'm looking for roles where AI, platform engineering and backend or cloud systems overlap.",
  ],
};

export const stackItems = [
  "Kubernetes",
  "GKE",
  "Terraform",
  "ArgoCD",
  "Kafka",
  "GCP",
  "Azure Service Bus",
  "TypeScript",
  "NestJS",
  "Next.js",
  "Python",
  "SQL",
  "Cassandra",
  "Turborepo",
  "ELK",
];

/** The full skills list, grouped the same way as the resume so the two always match. */
export const skillGroups: Array<{ label: string; items: string[] }> = [
  {
    label: "Languages and backend",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "Bash", "Shell scripting", "Linux", "NestJS", "Node.js", "Fastify", "REST APIs", "GraphQL"],
  },
  {
    label: "Cloud and infrastructure",
    items: ["GCP", "AWS", "Azure", "Kubernetes", "GKE", "Docker", "Terraform", "Helm", "NGINX", "Load balancing", "VPC networking"],
  },
  {
    label: "CI/CD and platform",
    items: ["GitHub Actions", "Jenkins", "Argo CD", "GitOps", "KEDA", "Workload Identity Federation", "NetworkPolicies", "Secrets management"],
  },
  {
    label: "Observability and messaging",
    items: ["Prometheus", "Grafana", "OpenTelemetry", "ELK Stack", "Kafka", "RabbitMQ", "Azure Service Bus"],
  },
  {
    label: "AI and agentic systems",
    items: ["LangChain", "RAG", "Vector search", "Embeddings", "Multi-agent orchestration", "DAG task decomposition", "Gemini API", "OpenAI API"],
  },
  {
    label: "Databases",
    items: ["PostgreSQL", "MongoDB", "Redis", "Cassandra", "Qdrant", "FAISS", "ChromaDB"],
  },
];

export const aboutPage = {
  body: [
    "I build the infrastructure that lets AI systems ship safely and fast, and I have the research background to know why that matters.",
    "I finished an MS in Computer Science at the University of Illinois Chicago in May 2026 (4.0 GPA), with coursework in systems, security and AI. My BTech in Computer Science is from Vellore Institute of Technology.",
    "From 2022 to 2024 I worked at Bajaj Finserv Health in Pune, starting as an intern and ending as a software development engineer II. I built a medical image annotation platform used by 80,000+ doctors, and replaced synchronous calls between services with event-driven messaging on Azure Service Bus.",
    "In 2025 I was at RadioFX. I owned the infrastructure architecture, moved the team from Jenkins to a GitOps setup on GKE (Terraform and ArgoCD), and built an AI pipeline that rebuilds a customer's website.",
    "On the side I'm building Orchon, a DAG-based multi-agent dev orchestration platform with human-in-the-loop approval gates, and NLGraph, a 12-stage NLP-first pipeline that breaks queries down before any LLM call.",
    "I'm looking for roles where AI, platform engineering and backend or cloud systems overlap.",
  ],
};

export const certifications = [
  "Introduction to Kubernetes",
  "Developing AI Applications on Azure",
  "Programming, Data Structures and Algorithms Using Python",
  "Theory of Computation",
];

export const languages = [
  "Tamil (native)",
  "English (full professional)",
  "Hindi (full professional)",
  "French (elementary)",
  "Gujarati (elementary)",
];
