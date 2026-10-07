import Link from "next/link";
import { experienceSnapshot } from "@/lib/portfolioData";
import { getCompanyGroups } from "@/lib/experience";
import { experienceItems } from "@/lib/portfolioData";
import { Reveal } from "@/components/ui";
import styles from "./ExperienceSnapshot.module.css";
import home from "./home.module.css";

function shortRange(start: string, end: string) {
  const fmt = (v: string) => {
    if (v === "present") return "present";
    const [y, m] = v.split("-");
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${months[Number(m) - 1]} ${y}`;
  };
  return `${fmt(start)} — ${fmt(end)}`;
}

export function ExperienceSnapshot() {
  const groups = getCompanyGroups();
  const byId = Object.fromEntries(groups.map((g) => [g.companyId, g]));
  // radiofx has two roles; snapshot splits them, so pull ranges from raw items
  const radiofxCoop = experienceItems.find((i) => i.role.includes("Co-op"));
  const radiofxIntern = experienceItems.find(
    (i) => i.companyId === "radiofx" && i.role.includes("Intern"),
  );

  const rangeFor = (companyId: string) => {
    if (companyId === "radiofx" && radiofxCoop)
      return shortRange(radiofxCoop.start, radiofxCoop.end);
    if (companyId === "radiofx-intern" && radiofxIntern)
      return shortRange(radiofxIntern.start, radiofxIntern.end);
    const g = byId[companyId];
    return g ? shortRange(g.start, g.end) : "";
  };
  const nameFor = (companyId: string) =>
    companyId.startsWith("radiofx")
      ? "RadioFX, Inc."
      : byId[companyId]?.company ?? "";

  return (
    <section id="experience" className="section">
      <div className="wrap">
        <Reveal className={home.head} as="div">
          <div className={home.headText}>
            <span className="kicker">Track record</span>
            <p className={home.headNote}>Six roles across three companies since 2021.</p>
          </div>
          <Link href="/experience" className={home.moreLink}>full history →</Link>
        </Reveal>

        <div className={styles.rows}>
          {experienceSnapshot.map((row, i) => (
            <Reveal key={row.companyId} index={i} className={styles.row} as="div">
              <div className={`mono ${styles.meta}`}>
                {rangeFor(row.companyId)}
                <span className={styles.company}>{nameFor(row.companyId)}</span>
              </div>
              <div className={styles.body}>
                <div className={styles.role}>{row.roleSummary}</div>
                <p className={styles.line}>{row.line}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
