import type { Project } from "../types";

export const crlitePlus: Project = {
  slug: "crlite-plus-cert-revocation",
  file: "crlite-plus",
  name: "CRLite+",
  seoTitle: "CRLite+ certificate revocation extension",
  blurb: "A Chrome extension that checks TLS certificate revocation locally, using Bloom filters.",
  description:
    "CRLite+ is a Manifest V3 Chrome extension that checks certificate revocation locally with cascaded Bloom filters. 2 to 5 ms per check, no network calls.",
  date: "2025-04",
  dateLabel: "Apr 2025",
  where: "University of Illinois Chicago, CS588 (Security and Privacy in Networked and Distributed Systems)",
  role: "Design and implementation",
  glance: {
    problem: "CRLs are big and go stale, OCSP tells the CA every site you visit, and Chrome has no local check like Firefox's CRLite.",
    built: "A Manifest V3 extension that checks each certificate against cascaded Bloom filters on your machine, with a Node.js backend and a Python filter generator behind it.",
    result: "Every revoked certificate I tested was blocked, at 2 to 5 ms a check with no false positives. The revocations were simulated.",
  },
  stack: ["Chrome extension (Manifest V3)", "Node.js", "Python", "Bloom filters", "TLS", "MurmurHash3", "SHA-256"],
  links: [
    { label: "paper", url: "https://www.academia.edu/144366111/CRLite_A_lightweight_browser_extension_for_dynamic_certificate_revocation_enforcement?source=swp_share" },
    { label: "github", url: "https://github.com/Prathik0300/CRLite" },
    { label: "chrome web store", url: "https://chromewebstore.google.com/detail/crlite-extension/mkapckifchidaldnnnoipmcamgcefobj" },
  ],
  sections: [
    {
      title: "The problem",
      blocks: [
        {
          type: "p",
          text: "Browsers have two standard ways to learn that a certificate was revoked. CRLs are large and updated slowly. OCSP asks the certificate authority about every site you visit, which adds latency and tells the CA where you browse. Firefox ships CRLite, which avoids both by checking a local filter. Chromium browsers have nothing like it.",
        },
        { type: "callout", text: "Mozilla's CRLite shows that local Bloom filter checks work. This project asks whether the same idea fits in a Chrome extension." },
      ],
    },
    {
      title: "Approach",
      blocks: [
        {
          type: "p",
          text: "Revoked certificates live in cascaded Bloom filters: one filter for revoked serial numbers and one for known-good ones, which removes the false positives a single Bloom filter would give. The extension checks every certificate against them locally, so there are no network calls and nothing about your browsing leaves the machine.",
        },
        {
          type: "list",
          items: [
            "Static filters cover the revocations we already know about and are built ahead of time.",
            "A smaller dynamic filter handles updates between rebuilds, so a new revocation does not wait for a full regeneration.",
            "Checks run in the browser: the extension reads the certificate, looks it up, and blocks the page if it is revoked.",
          ],
        },
      ],
    },
    {
      title: "Requirements",
      subtitle: "What the design had to satisfy",
      blocks: [
        {
          type: "p",
          text: "I started by reading how CRLs and OCSP fall short and how CRLite's cascade works, then wrote down what the extension had to do.",
        },
        {
          type: "list",
          items: [
            "Fast: a check in under 10 ms, so pages do not feel slower.",
            "Private: no network round trip per site.",
            "Small: filters well under 1 MB, so they fit in a browser extension.",
            "Compatible: runs on Chromium under Manifest V3.",
            "Accurate: catches every revoked certificate it knows about, without blocking good ones.",
          ],
        },
      ],
    },
    {
      title: "Architecture",
      subtitle: "Three parts that can be built and tuned on their own",
      blocks: [
        {
          type: "p",
          text: "A Python script generates the filter cascades. A Node.js backend retrieves certificates and keeps the revocation lists. The Chrome extension does the lookup in the browser. The filters use MurmurHash3 for speed and SHA-256 to hash certificate identifiers.",
        },
        {
          type: "figure",
          kind: "diagram",
          src: "/img/diagrams/crlite-architecture.svg",
          alt: "CRLite+ system architecture showing the Chrome extension, Node.js backend, Bloom filters and the Python filter generator",
          width: 960,
          height: 520,
          caption: "How the pieces fit together.",
        },
        { type: "callout", text: "Keeping the parts separate means the filter generator can change without touching the extension." },
      ],
    },
    {
      title: "Data pipeline",
      subtitle: "From certificate to filter to browser",
      blocks: [
        {
          type: "steps",
          items: [
            "The Node.js backend opens raw TLS connections, pulls out each certificate's serial number and hashes it with SHA-256.",
            "It keeps the revocation lists up to date.",
            "The Python script reads those lists and generates the cascaded filters offline.",
            "The extension loads the static filters and asks a small JSON endpoint for dynamic updates, so new revocations do not need a full rebuild.",
          ],
        },
        {
          type: "figure",
          kind: "diagram",
          src: "/img/diagrams/crlite-data-flow.svg",
          alt: "CRLite+ data flow from offline filter generation through distribution to the browser",
          width: 1120,
          height: 950,
          caption: "Offline generation, distribution, and the runtime check in the browser.",
        },
      ],
    },
    {
      title: "Implementation",
      blocks: [
        {
          type: "list",
          items: [
            "Extension: reads the certificate during the TLS handshake, looks it up in the cascade (revoked filter first, then the known-good one), and blocks the domain if it is revoked.",
            "Backend: raw TLS connections, certificate extraction and the revocation list, served over a REST API.",
            "Python: filter generation with configurable parameters.",
          ],
        },
        {
          type: "figure",
          kind: "screenshot",
          src: "/img/crlite/pic1.webp",
          alt: "The extension blocking access to a site with a revoked certificate",
          width: 1600,
          height: 900,
          caption: "A blocked site (github.com, added to the revoked list for the test).",
        },
        {
          type: "gallery",
          items: [
            {
              kind: "screenshot",
              src: "/img/crlite/pic2.webp",
              alt: "Popup showing the details of a revoked certificate",
              width: 313,
              height: 319,
              caption: "Popup for a revoked certificate.",
            },
            {
              kind: "screenshot",
              src: "/img/crlite/pic3.webp",
              alt: "Popup showing a valid certificate for piazza.com",
              width: 314,
              height: 318,
              caption: "Popup for a valid one.",
            },
          ],
        },
      ],
    },
    {
      title: "Evaluation",
      subtitle: "What I measured",
      blocks: [
        {
          type: "p",
          text: "I simulated revocations by adding domains I trust, like github.com and uic.blackboard.com, to the revoked list and checking that the extension blocked them end to end. I tuned the filter parameters across a few rounds to shrink memory.",
        },
        {
          type: "facts",
          items: [
            { value: "100%", label: "revoked certificates caught in my tests" },
            { value: "2 to 5 ms", label: "per check" },
            { value: "0", label: "false positives" },
            { value: "< 512 KB / < 200 KB", label: "static / dynamic filters" },
          ],
        },
        {
          type: "p",
          text: "These are results on simulated revocations. I have not tested against live CA feeds.",
        },
      ],
    },
    {
      title: "Not done yet",
      blocks: [
        {
          type: "list",
          items: [
            "Real CA feeds, converted from live CRL and OCSP data.",
            "Revocations of intermediate CAs.",
            "Native browser integration instead of an extension.",
            "A transparency log for revocations.",
          ],
        },
      ],
    },
  ],
};
