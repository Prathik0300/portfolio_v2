import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Not found", robots: { index: false, follow: false }, alternates: { canonical: null } };

export default function NotFound() {
  return (
    <>
      <p className="md">
        <span className="ps1">$ </span>cd that-page
        <br />
        <span style={{ color: "var(--red)" }}>bash: cd: that-page: No such file or directory</span>
      </p>
      <h1 className="srOnly">Page not found</h1>
      <p style={{ marginTop: 24 }}>
        Try <Link href="/">home</Link>, <Link href="/projects">projects</Link> or <Link href="/experience">experience</Link>.
      </p>
    </>
  );
}
