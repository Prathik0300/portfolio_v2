import type { ProjectItem } from "../types";

export const crlitePlus: ProjectItem = {
  name: "CRLite+ – Lightweight Certificate Revocation Extension",
  slug: "crlite-plus-cert-revocation",
  seoTitle: "CRLite+ certificate revocation extension",
  blurb:
    "Local, privacy-preserving TLS certificate revocation for Chromium via cascaded Bloom filters. Shipped to the Chrome Web Store.",
  featured: true,
  badge: "Shipped \u00b7 Chrome Web Store",
  badgeTone: "amber",
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
  detailSubtitle: "Lightweight Browser Extension for Dynamic Certificate Revocation Enforcement",
  detailDateRange: "April 2025",
  detailOrganization: {
    name: "University of Illinois Chicago",
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
          src: "/img/crlite/system-architecture.webp",
          width: 814,
          height: 637,
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
          src: "/img/crlite/data-flow-diagram.webp",
          width: 1600,
          height: 1197,
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
          src: "/img/crlite/pic1.webp",
          width: 1600,
          height: 900,
          alt: "CRLite+ extension blocking access to revoked certificate for github.com",
        },
        {
          src: "/img/crlite/pic2.webp",
          width: 313,
          height: 319,
          alt: "CRLite+ certificate status popup showing revoked certificate details",
        },
        {
          src: "/img/crlite/pic3.webp",
          width: 314,
          height: 318,
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
};
