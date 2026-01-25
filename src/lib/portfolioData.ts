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
  liveUrl?: string;
  githubUrl?: string;
  detailLinks?: Array<{
    label: string;
    url: string;
    icon: "paper" | "github" | "chrome" | "website";
  }>;
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
    slug: "crlite-plus-cert-revocation",
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
      "Tech Stack: Chrome Extension (Manifest V3) · Node.js · Python · Bloom Filters · TLS · SHA-256 · MurmurHash3",
    detailOverview:
      "CRLite+ is a fully functional Chrome extension that introduces CRLite-style revocation enforcement for Chromium-based browsers. It incorporates both static and dynamic Bloom filters to enable local verification of certificate revocation without real-time network checks, providing fast, privacy-preserving revocation checking.",
    detailProblem:
      "Certificate revocation remains one of the most critical yet under-addressed components in web security. Traditional mechanisms like Certificate Revocation Lists (CRLs) and Online Certificate Status Protocol (OCSP) are ineffective for on-demand validations due to latency, inefficiency, and privacy issues. CRLs can grow large and are infrequently updated, while OCSP adds latency to every connection and reveals users' browsing behavior. Although Firefox has implemented CRLite, Chromium-based browsers lack a similar solution.",
    detailMotivation:
      "Mozilla's CRLite provides a scalable, privacy-protecting solution using cascaded Bloom filters that enable local verification without real-time network checks. However, no similar solution existed for Chromium-based browsers. CRLite+ bridges this gap by bringing CRLite-style revocation enforcement to Chrome and other Chromium browsers, demonstrating that fast, privacy-respecting revocation checking is achievable for modern browsers.",
    detailSolution:
      "CRLite+ combines static and dynamic Bloom filters in a hybrid revocation scheme. The extension continuously checks TLS certificates and denies access if a certificate is flagged as revoked. A Node.js backend retrieves certificates and maintains revocation lists, while a Python-based Bloom filter generator builds efficient two-level static filter cascades. The system achieves 100% accuracy in detecting revocations with negligible performance overhead.",
    detailSolutionPoints: [
      "Static Bloom filter cascade (blacklist and whitelist) built from known revoked certificate serials, enabling instant local verification without network roundtrips.",
      "Dynamic filter updates via Node.js backend that fetches TLS certificates and maintains live revocation lists for real-time enforcement.",
      "Chrome extension with Manifest V3 that intercepts certificate validation, performs Bloom filter lookups, and blocks access to revoked domains.",
      "Cascading filter architecture that reduces false positives through layered filtering—first checking a blacklist, then verifying against a whitelist.",
      "Privacy-preserving operation with all filtering performed locally, eliminating the need to reveal browsing behavior to third-party servers.",
      "Memory-efficient design with static filters taking less than 512 KB compressed and dynamic filters using less than 200 KB in memory.",
    ],
    detailReflectionOutcomes:
      "CRLite+ successfully detected all test domains with 100% accuracy when they were injected into the revocation list. The system achieved average certificate checking times of 2-5 ms per site visit with negligible page loading latency. The cascading Bloom filter architecture effectively eliminated false positives through the two-layer approach. The extension demonstrated complete enforcement flow from certificate parsing through Bloom filter lookup to page blocking, validating that fast, privacy-respecting revocation checking is practical for Chromium-based browsers.",
    detailReflectionMoreTime:
      "Future enhancements could include integration with real CA feeds for live CRL/OCSP-to-Bloom conversion, support for intermediate CA revocations, native Chromium browser integration, and revocation transparency logging. The current implementation focuses on serial number-based revocations and could be extended to handle OCSP stapling anomalies and indirect revocation scenarios.",
    detailDesignProcess:
      "The system was architected with a modular approach: a Python script generates static Bloom filter cascades using MurmurHash3 for performance, a Node.js backend creates raw TLS connections to fetch certificate chains and maintains revocation lists, and a Chrome extension performs real-time certificate validation using the local filters. The evaluation simulated revocations by injecting trusted domains into the revocation list to verify the complete enforcement flow.",
    detailDesignProcessSteps: [
      {
        id: "requirement-analysis",
        title: "Requirement Analysis",
        subtitle: "Understanding the revocation problem space",
        paragraphs: [
          "We analyzed the limitations of existing certificate revocation mechanisms—CRLs, OCSP, and OCSP stapling—to identify core requirements for a practical solution. The analysis revealed critical needs: low latency, privacy preservation, scalability to web-scale PKI, and compatibility with Chromium browsers.",
          "Why this mattered: understanding the trade-offs between performance, privacy, and accuracy was essential. Traditional approaches either sacrificed privacy (OCSP) or performance (CRLs), while Firefox's CRLite demonstrated that local Bloom filter-based checking could address both concerns.",
          "How it helps: the requirement analysis shaped our design decisions, leading us to adopt cascaded Bloom filters for accuracy, local-only checking for privacy, and a hybrid static-dynamic approach for flexibility. This foundation ensured CRLite+ would meet real-world constraints while solving the revocation problem effectively.",
        ],
        bullets: [
          "Analyzed limitations of CRLs (large size, infrequent updates) and OCSP (latency, privacy leaks).",
          "Studied Mozilla's CRLite approach to understand cascaded Bloom filter benefits and implementation patterns.",
          "Identified key requirements: sub-10ms checking time, zero network roundtrips, privacy-preserving operation, and Chromium compatibility.",
          "Evaluated trade-offs between false positive rates, memory footprint, and filter update frequency.",
          "Defined success criteria: 100% revocation detection accuracy, negligible performance overhead, and memory efficiency under 1MB.",
        ],
        summary:
          "Requirement analysis revealed that existing revocation mechanisms fail to balance performance, privacy, and scalability. By studying CRLite's approach and identifying core constraints, we established clear requirements that guided the design of CRLite+ as a fast, private, and scalable solution for Chromium browsers.",
      },
      {
        id: "system-architecture",
        title: "System Architecture and Algorithm Design",
        subtitle: "Designing the modular revocation system and cascaded filters",
        images: [
          {
            src: "/projects/crlite/system_architecture.png",
            alt: "CRLite+ System Architecture diagram showing Frontend (Chrome), Backend (Node.js), Bloom Filters, and Static Filter Generator (Python)",
          },
        ],
        paragraphs: [
          "We architected CRLite+ as a three-component system: a Python-based Bloom filter generator, a Node.js backend for certificate retrieval, and a Chrome extension for real-time enforcement. The algorithm design centered on cascaded Bloom filters—a blacklist containing all revoked serials and a whitelist to eliminate false positives.",
          "Why this mattered: the modular architecture enables independent optimization of each component while maintaining clear interfaces. The cascaded filter algorithm ensures high accuracy (zero false positives) while keeping memory footprint minimal, making it practical for browser deployment at web scale.",
          "How it helps: this design pattern ensures certificate checking remains fast and local, while revocation list updates can happen asynchronously without impacting browser performance. The cascade architecture enables CRLite+ to scale to millions of entries with only a few megabytes of memory.",
        ],
        bullets: [
          "Designed three-component architecture: Python filter generator (bloomFilter.py), Node.js backend (server.js), and Chrome extension (Manifest V3).",
          "Architected cascaded Bloom filter algorithm with blacklist (all revoked serials) and whitelist (false positive elimination) layers.",
          "Selected MurmurHash3 for fast, non-cryptographic hashing during filter construction to optimize performance.",
          "Designed JSON-based filter serialization (cascadeFilters.json) for efficient distribution and browser loading.",
          "Specified filter parameters (bit array size, hash functions) to balance false positive rate and memory usage.",
          "Defined certificate serial number extraction and SHA-256 hashing protocol for consistent filter lookups.",
        ],
        summary:
          "The system architecture separates filter generation, certificate retrieval, and browser enforcement into independent, optimized components. The cascaded Bloom filter algorithm enables accurate, scalable revocation checking with minimal memory overhead, making local verification practical for web-scale PKI.",
      },
      {
        id: "data-pipeline",
        title: "Data Pipeline",
        subtitle: "Building the certificate retrieval and filter generation pipeline",
        images: [
          {
            src: "/projects/crlite/data-flow-diagram.png",
            alt: "CRLite+ data flow diagram showing offline generation, distribution, runtime browser, and Node.js backend stages",
          },
        ],
        paragraphs: [
          "We built a data pipeline that flows from certificate retrieval through serial extraction, filter construction, and browser distribution. The Node.js backend creates raw TLS connections to fetch certificate chains, extracts serial numbers, and maintains dynamic revocation lists. The Python script processes revocation data to generate static Bloom filter cascades.",
          "Why this mattered: an efficient data pipeline is critical for keeping revocation lists current and filters optimized. The pipeline must handle certificate parsing, hash computation, filter updates, and seamless distribution to the browser extension without disrupting user experience.",
          "How it helps: the pipeline enables both static pre-computed filters (for known revocations) and dynamic runtime updates (for newly revoked certificates), providing flexibility while maintaining performance. The modular design allows each stage to be optimized independently.",
        ],
        bullets: [
          "Implemented Node.js backend that creates raw TLS socket connections to destination domains and intercepts certificate chains.",
          "Built certificate parsing pipeline to extract X.509 serial numbers, issuer metadata, and validity information.",
          "Designed serial number hashing pipeline using SHA-256 for consistent Bloom filter lookups.",
          "Created Python script (bloomFilter.py) to process revocation lists and generate cascaded Bloom filters using MurmurHash3.",
          "Implemented JSON endpoints (/getSerial, /revokedList) for extension-backend communication and live revocation updates.",
          "Designed filter serialization format (cascadeFilters.json) for efficient browser loading and distribution.",
          "Built dynamic revocation list management system that supports runtime updates without filter regeneration.",
        ],
        summary:
          "The data pipeline enables seamless flow from certificate retrieval through filter generation to browser distribution. By separating static filter construction from dynamic revocation updates, the pipeline provides both efficiency and flexibility, ensuring revocation lists stay current while maintaining fast local checking.",
      },
      {
        id: "implementation",
        title: "Implementation",
        subtitle: "Building the Chrome extension and backend components",
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
          "We implemented CRLite+ across three codebases: the Python filter generator, Node.js backend, and Chrome extension. The extension uses Manifest V3 with content scripts and background workers to intercept certificate validation, perform Bloom filter lookups, and block revoked domains. The backend provides certificate retrieval and revocation list management via REST endpoints.",
          "Why this mattered: implementation details determine the system's performance, security, and user experience. Careful attention to certificate interception timing, filter lookup efficiency, and blocking mechanisms ensures the extension operates seamlessly without impacting browser performance.",
          "How it helps: the implementation delivers real-time revocation enforcement with 2-5 ms checking overhead, demonstrating that privacy-preserving revocation checking is practical. The modular codebase enables independent testing and optimization of each component.",
        ],
        bullets: [
          "Implemented Chrome extension using Manifest V3 with content scripts, background workers, and popup UI (popup.html).",
          "Built certificate interception mechanism that extracts serial numbers during TLS handshake validation.",
          "Implemented Bloom filter lookup algorithm that checks blacklist first, then whitelist to eliminate false positives.",
          "Created domain blocking mechanism that denies access to revoked certificates with user notification and clear error messages.",
          "Developed Node.js backend (server.js) with raw TLS socket connections and certificate chain extraction.",
          "Implemented JSON API endpoints for certificate serial retrieval and revocation list management.",
          "Built Python script (bloomFilter.py) for cascaded Bloom filter construction with configurable parameters.",
          "Created utility functions (utils.js) for certificate format conversion, serial number parsing, and base64 operations.",
          "Designed popup UI to display certificate metadata, issuer, validity period, and revocation status for user transparency.",
        ],
        summary:
          "Implementation delivers a fully functional Chrome extension that performs real-time revocation checking with minimal performance overhead. The modular codebase enables efficient certificate interception, fast Bloom filter lookups, and seamless domain blocking, demonstrating that privacy-preserving revocation enforcement is practical for Chromium browsers.",
      },
      {
        id: "evaluation-iteration",
        title: "Evaluation & Iteration",
        subtitle: "Validating accuracy, performance, and iterating on design",
        paragraphs: [
          "We evaluated CRLite+ using controlled experiments, simulating revocations by injecting trusted domains (github.com, uic.blackboard.com) into the revocation list. This enabled us to verify the complete enforcement flow—from certificate retrieval through filter lookup to domain blocking—without needing actual revoked certificates. Iterations refined filter parameters, improved lookup performance, and optimized memory usage.",
          "Why this mattered: evaluation validates that the system meets requirements for accuracy, performance, and privacy. Iteration ensures the design is optimized for real-world constraints, balancing false positive rates, memory footprint, and checking latency.",
          "How it helps: the evaluation demonstrated 100% accuracy in revocation detection, 2-5 ms average checking time, and effective false positive elimination. Iterations improved filter efficiency, reducing memory usage to under 512 KB for static filters and under 200 KB for dynamic filters.",
        ],
        bullets: [
          "Simulated revocations by injecting trusted domains (github.com, uic.blackboard.com) into the backend revocation list for controlled testing.",
          "Tested revocation detection accuracy across multiple domains and certificate types, achieving 100% success rate.",
          "Measured performance overhead and confirmed 2-5 ms average checking time with negligible page loading latency.",
          "Validated cascade filter effectiveness in eliminating false positives through two-layer verification.",
          "Iterated on filter parameters (bit array size, hash count) to optimize memory usage and false positive rates.",
          "Captured complete demo workflow from certificate retrieval through Bloom filter lookup to domain blocking.",
          "Refined blocking mechanism and user notification design based on testing feedback.",
          "Optimized filter serialization format to reduce load time and memory footprint.",
        ],
        summary:
          "Evaluation confirmed that CRLite+ achieves accurate revocation detection with minimal performance overhead. Iterations refined filter parameters and implementation details, resulting in a system that successfully blocks revoked certificates while maintaining fast, privacy-preserving operation. The controlled experiments validated the practical feasibility of client-side revocation enforcement for Chromium browsers.",
      },
    ],
    detailHighlights: [
      "Cascading Bloom Filters – Two-layer filter architecture (blacklist + whitelist) for accurate, scalable revocation checking with minimal memory footprint.",
      "Privacy-Preserving Operation – All revocation checks performed locally without revealing browsing behavior to third-party servers.",
      "Real-Time Enforcement – Chrome extension intercepts certificates and blocks revoked domains instantly with 2-5 ms checking overhead.",
      "Hybrid Revocation Scheme – Combines static pre-computed filters with dynamic runtime updates for flexibility and scalability.",
      "Memory Efficient – Static filters under 512 KB compressed, dynamic filters under 200 KB in memory, suitable for resource-constrained environments.",
      "100% Detection Accuracy – Successfully detects all revoked certificates with zero false positives through cascade architecture.",
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
    detailOrganization: {
      name: "University of Illinois Chicago",
      logoSrc: "/logos/uic-logo.png",
    },
    detailAssociation: "Associated with University of Illinois Chicago",
    detailProjectType: "Hackathon Project | WildHacks 2025",
    detailTechStack:
      "Tech Stack: React PWA · TailwindCSS · Gemini API · Computer Vision",
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
    description:
      "An AI-driven facial emotion recognition system that analyzes real-time expressions to recommend personalized content and surface long-term emotional trends.",
    techStack: [
      "Next.js",
      "React",
      "Python",
      "TensorFlow",
      "Flask",
      "NestJS",
      "MongoDB",
      "REST APIs",
      "AWS",
      "AI",
    ],
    tileMedia: {
      kind: "image",
      src: "/vercel.svg",
      alt: "Virtual Emotion Mirror interface concept",
    },
    detailMedia: [
      {
        kind: "image",
        src: "/vercel.svg",
        alt: "Virtual Emotion Mirror interface concept",
      },
    ],
  },
  {
    name: "Automated Program Repair Using LLM",
    slug: "automated-program-repair-llm",
    description:
      "An LLM-powered bug-fixing pipeline that integrates AFL fuzzing and GDB traces with a three-round LangChain loop to iteratively repair crash-inducing defects.",
    techStack: ["Python", "AFL", "LLMs", "LangChain", "Program Repair"],
    tileMedia: {
      kind: "image",
      src: "/file.svg",
      alt: "Automated program repair with LLMs",
    },
    detailMedia: [
      {
        kind: "image",
        src: "/file.svg",
        alt: "Automated program repair with LLMs",
      },
    ],
  },
];
