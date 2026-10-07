import type { Metadata } from "next";
import { Ledger } from "@/components/experience/Ledger";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumb, graph } from "@/lib/seo";
import styles from "./experience.module.css";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Six roles across RadioFX, Bajaj Finserv Health and UBS: multi-agent AI pipelines, GKE multi-tenancy, CI/CD, and high-traffic web performance.",
};

export default function ExperiencePage() {
  return (
    <div className="wrap">
      <JsonLd data={graph(breadcrumb([{ name: "Home", path: "/" }, { name: "Experience", path: "/experience" }]))} />
      <header className={styles.head}>
        <p className="kicker">Experience</p>
        <h1 className={styles.h1}>Where I&apos;ve worked</h1>
      </header>
      <Ledger />
    </div>
  );
}
