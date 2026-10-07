"use client";

import { useState } from "react";
import { experienceItems } from "@/lib/portfolioData";
import {
  getCareerStats,
  getTimeline,
  getStackMix,
  monthsBetween,
  formatDuration,
} from "@/lib/experience";
import { Reveal } from "@/components/ui";
import styles from "./ExperienceMonitor.module.css";

const BUCKET_COLOR: Record<string, string> = {
  platform: "var(--accent)",
  ai: "var(--violet)",
  backend: "var(--green)",
};
const BUCKET_LABEL: Record<string, string> = {
  platform: "platform / k8s",
  ai: "AI / LLM",
  backend: "backend / data",
};
const LANE_COLOR: Record<string, string> = {
  ubs: "rgba(255,255,255,0.28)",
  bfhl: "var(--green)",
  radiofx: "var(--accent)",
  edu: "var(--violet)",
};

const SWIMLANES = [
  { id: "radiofx", label: "RadioFX" },
  { id: "bfhl", label: "Bajaj Finserv" },
  { id: "ubs", label: "UBS" },
  { id: "edu", label: "MS · UIC" },
];

function fmtMonth(v: string) {
  if (v === "present") return "present";
  const [y, m] = v.split("-");
  const M = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${M[Number(m) - 1]} ${y}`;
}

export function ExperienceMonitor() {
  const stats = getCareerStats();
  const timeline = getTimeline();
  const [open, setOpen] = useState<string>(experienceItems[0].procId ?? "");

  return (
    <section className="wrap" style={{ paddingBlock: "clamp(44px, 6vw, 68px)" }}>
      <Reveal className={styles.head} as="div">
        <div>
          <span className="kicker">experience — {stats.roleCount} processes</span>
          <h1 className={styles.h1}>
            Career as a <span className={styles.accent}>process monitor</span>
          </h1>
        </div>
        <p className={`mono ${styles.note}`}>
          Roles are processes. Uptime = tenure.
          <br />
          <span className={styles.noteGreen}>
            Every number here is computed from the role dates and stack tags.
          </span>
        </p>
      </Reveal>

      <Reveal className="term" as="div">
        <div className="term__bar">
          <span className="term__dot" aria-hidden />
          <span className="term__dot" aria-hidden />
          <span className="term__dot" aria-hidden />
          <span style={{ marginLeft: 4 }}>prathik@career:~</span>
          <span style={{ marginLeft: "auto" }}>htop --sort UPTIME</span>
        </div>

        {/* activity strip + counters */}
        <div className={styles.htopHeader}>
          <div className={`mono ${styles.stripLabel}`}>
            ACTIVITY — {timeline.startYear} → present
          </div>

          <div className={styles.swimlanes}>
            {SWIMLANES.map((lane) => {
              const bars =
                lane.id === "edu"
                  ? timeline.eduBars
                  : timeline.roleBars.filter((b) => b.companyId === lane.id);
              return (
                <div key={lane.id} className={styles.lane}>
                  <span className={`mono ${styles.laneName}`}>{lane.label}</span>
                  <span
                    className={styles.laneTrack}
                    style={{ color: LANE_COLOR[lane.id] ?? "var(--dim)" }}
                  >
                    {timeline.years.map((_, i) =>
                      i === 0 ? null : (
                        <span
                          key={i}
                          className={styles.tick}
                          style={{ left: `${(i / timeline.years.length) * 100}%` }}
                        />
                      ),
                    )}
                    {bars.map((b) => (
                      <span
                        key={b.key}
                        className={lane.id === "edu" ? styles.laneBarEdu : styles.laneBar}
                        style={{ left: `${b.leftPct}%`, width: `${b.widthPct}%` }}
                        title={b.label}
                      />
                    ))}
                  </span>
                </div>
              );
            })}
            <div className={styles.lane}>
              <span className={styles.laneName} />
              <span className={`mono ${styles.axis}`}>
                {timeline.years.map((y) => (
                  <span key={y}>{`'${String(y).slice(2)}`}</span>
                ))}
              </span>
            </div>
          </div>

          <div className={styles.counters}>
            <Counter b={stats.totalLabel} s="uptime" />
            <Counter b={String(stats.roleCount)} s="roles" />
            <Counter b={`${stats.companyCount}`} s="companies" />
            <Counter b={String(stats.titleAdvances)} s="promotions" />
          </div>
        </div>

        {/* table header */}
        <div className={styles.rowHead}>
          <span>PID</span>
          <span>PROCESS</span>
          <span>UPTIME</span>
          <span>LOAD PROFILE</span>
          <span>STACK MIX</span>
          <span>STATE</span>
        </div>

        {experienceItems.map((it) => {
          const id = it.procId ?? it.role;
          const months = monthsBetween(it.start, it.end);
          const mix = getStackMix(it.stack ?? []);
          const running = it.end === "present";
          const isOpen = open === id;
          return (
            <div key={id}>
              <button
                type="button"
                className={`${styles.row} ${isOpen ? styles.rowSel : ""}`}
                onClick={() => setOpen(isOpen ? "" : id)}
                aria-expanded={isOpen}
              >
                <span className={styles.pid}>{it.start.split("-")[0]}</span>
                <span className={styles.proc}>
                  <span className={styles.procName}>{it.procId ?? it.role}</span>
                  <span className={styles.sub}>{it.role}</span>
                </span>
                <span className={styles.dim}>{formatDuration(months)}</span>
                <span className={styles.accentSm}>{it.focus}</span>
                <span className={styles.barCell}>
                  <span className={styles.bar}>
                    {mix.buckets.map((bk) => (
                      <i
                        key={bk.bucket}
                        style={{
                          width: `${mix.total ? (bk.count / mix.total) * 100 : 0}%`,
                          background: BUCKET_COLOR[bk.bucket],
                        }}
                      />
                    ))}
                  </span>
                </span>
                <span
                  className={styles.state}
                  style={{ color: running ? "var(--green)" : "var(--dim)" }}
                >
                  <span
                    className={styles.stateDot}
                    style={{
                      background: running ? "var(--green)" : "var(--dim)",
                      boxShadow: running ? "0 0 8px var(--green)" : "none",
                    }}
                  />
                  {running ? "RUNNING" : "DONE"}
                </span>
              </button>

              {isOpen && (
                <div className={styles.panel}>
                  <div className={styles.panelGrid}>
                    <div>
                      <div className={`mono ${styles.panelLabel}`}>
                        STDOUT — {it.company}
                        {it.location ? ` · ${it.location}` : ""} · {fmtMonth(it.start)}–{fmtMonth(it.end)}
                      </div>
                      {it.points.map((pt) => (
                        <div key={pt} className={styles.pt}>
                          {pt}
                        </div>
                      ))}
                      {it.stack && it.stack.length > 0 && (
                        <div className={styles.tags}>
                          {it.stack.map((t) => (
                            <span key={t} className="tag">{t}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className={`mono ${styles.panelLabel}`}>STACK MIX</div>
                      <div className={`mono ${styles.panelSub}`}>
                        counted from this role&apos;s {mix.total} stack tag{mix.total === 1 ? "" : "s"}
                      </div>
                      <div className={styles.mixList}>
                        {mix.buckets.map((bk) => (
                          <div key={bk.bucket}>
                            <div className={`mono ${styles.mixRow}`}>
                              <span>{BUCKET_LABEL[bk.bucket]}</span>
                              <span style={{ color: BUCKET_COLOR[bk.bucket] }}>
                                {bk.count} / {mix.total}
                              </span>
                            </div>
                            <span className={styles.bar} style={{ marginTop: 5, display: "flex" }}>
                              <i
                                style={{
                                  width: `${mix.total ? (bk.count / mix.total) * 100 : 0}%`,
                                  background: BUCKET_COLOR[bk.bucket],
                                }}
                              />
                            </span>
                            {bk.items.length > 0 && (
                              <div className={`mono ${styles.mixItems}`}>{bk.items.join(" · ")}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        <div className={`mono ${styles.footLegend}`}>
          <span><i style={{ background: "var(--violet)" }} /> AI / LLM</span>
          <span><i style={{ background: "var(--accent)" }} /> platform / infra</span>
          <span><i style={{ background: "var(--green)" }} /> backend / product</span>
          <span style={{ marginLeft: "auto" }}>click any row to expand stdout</span>
        </div>
      </Reveal>

      {/* derivation note */}
      <Reveal className={styles.deriv} as="div">
        <div className={`mono ${styles.derivHead}`}>WHERE EVERY NUMBER COMES FROM</div>
        <div className={styles.derivGrid}>
          <p className="mono"><span>activity strip</span> — plotted from each role&apos;s start / end dates</p>
          <p className="mono"><span>uptime {stats.totalLabel}</span> — sum of the {stats.roleCount} role durations</p>
          <p className="mono"><span>processes {stats.roleCount} · hosts {stats.companyCount}</span> — a count of roles and companies</p>
          <p className="mono"><span>promotions {stats.titleAdvances}</span> — in-company title advances, summed across companies (Bajaj ×2, RadioFX ×1)</p>
          <p className="mono" style={{ gridColumn: "1 / -1" }}>
            <span>stack mix</span> — that role&apos;s tech tags bucketed into AI / platform / backend, shown
            as a raw count (3&nbsp;/&nbsp;7), not a made-up percentage
          </p>
        </div>
        <p className={`mono ${styles.derivFoot}`}>
          All of it computes at build time from <code>experienceItems[]</code> — nothing hand-entered,
          nothing to fall out of date.
        </p>
      </Reveal>
    </section>
  );
}

function Counter({ b, s }: { b: string; s: string }) {
  return (
    <div className={styles.counter}>
      <b>{b}</b>
      <span>{s}</span>
    </div>
  );
}
