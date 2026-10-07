import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectCard } from "@/components/work/ProjectCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumb, graph } from "@/lib/seo";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies on multi-agent AI pipelines, multi-tenant Kubernetes on GKE, a shipped certificate-revocation extension, and LLM program repair, with the constraint, the build and the measured result.",
};

export default function WorkPage() {
  return (
    <div className="wrap">
      <JsonLd data={graph(breadcrumb([{ name: "Home", path: "/" }, { name: "Work", path: "/work" }]))} />
      <header className={styles.head}>
        <p className="kicker">Work</p>
        <h1 className={styles.h1}>Case studies</h1>
        <p className={styles.lead}>
          Each one covers the problem I was working against, what I built, and what changed, with links to the code, paper or live demo where they exist.
        </p>
      </header>
      <ul className={styles.list}>
        {projects.map((p, i) => (
          <li key={p.slug} className="reveal">
            <ProjectCard project={p} variant="row" index={i + 1} as="h2" />
          </li>
        ))}
      </ul>
    </div>
  );
}
