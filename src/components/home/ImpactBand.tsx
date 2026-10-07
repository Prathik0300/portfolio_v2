import { impactMetrics } from "@/lib/portfolioData";
import { Reveal, CountUp } from "@/components/ui";
import styles from "./home.module.css";

export function ImpactBand() {
  return (
    <section className="section" aria-label="Impact metrics">
      <div className="wrap">
        <Reveal>
          <span className="kicker" style={{ marginBottom: 28, display: "inline-flex" }}>
            Impact, in numbers
          </span>
        </Reveal>
        <div className={styles.metricGrid}>
          {impactMetrics.map((m, i) => (
            <Reveal key={m.label} index={i} className="metric">
              <div className="metric__value">
                {typeof m.countTo === "number" ? (
                  <CountUp
                    to={m.countTo}
                    from={m.countFrom ?? 0}
                    prefix={m.countPrefix ?? ""}
                    suffix={m.countSuffix ?? ""}
                  />
                ) : (
                  m.value
                )}
              </div>
              <div className="metric__label">{m.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
