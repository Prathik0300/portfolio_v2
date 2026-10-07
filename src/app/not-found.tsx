import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <div className="wrap" style={{ paddingBlock: "clamp(56px, 10vw, 120px)", display: "grid", gap: 16, maxWidth: 640 }}>
      <p className="kicker">404</p>
      <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 2.6rem)" }}>That page doesn&apos;t exist.</h1>
      <p style={{ color: "var(--dim)", margin: 0 }}>The link may be old. Try one of these instead.</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        <Link href="/" className="btn btn--primary">Home</Link>
        <Link href="/work" className="btn">Work</Link>
        <Link href="/experience" className="btn">Experience</Link>
      </div>
    </div>
  );
}
