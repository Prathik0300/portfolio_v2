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
      ],
    },
    {
      title: "What I built",
      blocks: [
        {
          type: "p",
          text: "CRLite+ brings that idea to Chrome. Revoked certificates live in cascaded Bloom filters: one for revoked serial numbers and one for known-good ones, which removes the false positives. The extension checks every certificate against them locally, so there are no network calls and nothing about your browsing leaves the machine.",
        },
        {
          type: "list",
          items: [
            "A Python script builds the filter cascades from a revocation list.",
            "A Node.js backend fetches certificates over raw TLS connections and keeps the revocation lists current.",
            "The extension looks each certificate up and blocks the page if it is revoked.",
            "Static filters cover known revocations. A smaller dynamic filter handles updates between rebuilds.",
          ],
        },
        { type: "figure", src: "/img/crlite/system-architecture.webp", alt: "CRLite+ system architecture showing the Chrome extension, Node.js backend, Bloom filters and the Python filter generator", width: 814, height: 637, caption: "How the pieces fit together." },
        { type: "figure", src: "/img/crlite/data-flow-diagram.webp", alt: "CRLite+ data flow from offline filter generation through distribution to the browser", width: 1600, height: 1197, caption: "From certificate retrieval to filter generation to the browser." },
        { type: "figure", src: "/img/crlite/pic1.webp", alt: "The extension blocking access to a site with a revoked certificate", width: 1600, height: 900, caption: "A blocked site (github.com, added to the revoked list for the test)." },
        { type: "figure", src: "/img/crlite/pic2.webp", alt: "Popup showing the details of a revoked certificate", width: 313, height: 319, caption: "Popup for a revoked certificate." },
        { type: "figure", src: "/img/crlite/pic3.webp", alt: "Popup showing a valid certificate for piazza.com", width: 314, height: 318, caption: "Popup for a valid one." },
      ],
    },
    {
      title: "Results",
      blocks: [
        {
          type: "p",
          text: "It caught every revoked certificate I tested (100%), with 2 to 5 ms per check, no false positives, and filters under 512 KB (static) and 200 KB (dynamic).",
        },
        {
          type: "p",
          text: "The revocations were simulated. I added domains I trust, like github.com, to the revoked list and checked that the extension blocked them end to end. I have not tested against live CA feeds.",
        },
      ],
    },
    {
      title: "Not done yet",
      blocks: [{ type: "p", text: "Real CA feeds, revocations of intermediate CAs, and a transparency log for revocations." }],
    },
  ],
};
