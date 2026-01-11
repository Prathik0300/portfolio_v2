"use client";

import Image from "next/image";
import { experienceItems } from "@/lib/portfolioData";
import styles from "./ExperienceSection.module.css";

function emphasizeText(text: string) {
  const tokens = text.split(/(\s+)/);
  const keywordPattern =
    /^(Improved|Increased|Reduced|Boosted|Led|Owned|Designed|Migrated|Modernized|Implemented|Built|Enabled|Engineered|Developed|Powered)$/i;
  const techPattern =
    /^(Gemini|GKE|Helm|NGINX|NestJS|Fastify|Cassandra|GCP|GKE|CI\/CD|Cloud|Vercel|ELK|Sonar|Alteryx|ARIS|Kubernetes|Redis|JWT|AI|AI-powered)$/i;

  return tokens.map((token, index) => {
    if (/^\s+$/.test(token)) return token;
    const hasNumber = /\d/.test(token);
    const isArrow = /→|->/.test(token);
    const cleaned = token.replace(/[.,]/g, "");
    const isKeyword = keywordPattern.test(cleaned);
    const isTech = techPattern.test(cleaned) || /AI/i.test(cleaned);

    if (hasNumber || isArrow || isKeyword || isTech) {
      return <strong key={index}>{token}</strong>;
    }

    return <span key={index}>{token}</span>;
  });
}

function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className={styles.section}
    >
      <div className={styles.headingRow}>
        <h2 id="experience-heading" className={styles.heading}>
          Experience
        </h2>
        <p className={styles.subtitle}>
          Where I&apos;ve led full-stack, cloud, and infrastructure impact.
        </p>
      </div>
      <div className={styles.timeline}>
        {experienceItems.map((item) => (
          <div key={`${item.company}-${item.period}`} className={styles.item}>
            <div className={styles.dot} aria-hidden="true" />
            <article className={styles.card}>
              <div className={styles.headerRow}>
                {item.logoSrc && (
                  <div className={styles.logoWrap}>
                    <Image
                      src={item.logoSrc}
                      alt={`${item.company} logo`}
                      width={40}
                      height={40}
                      className={styles.logoImg}
                    />
                  </div>
                )}
                <div className={styles.headerText}>
                  <h3 className={styles.roleLine}>
                    <span>{item.role}</span>
                    <span className={styles.delimiter}> · </span>
                    <span className={styles.companySpan}>{item.company}</span>
                    <span className={styles.delimiter}> · </span>
                    <span className={styles.periodSpan}>{item.period}</span>
                    {item.location && (
                      <>
                        <span className={styles.delimiter}> · </span>
                        <span className={styles.locationSpan}>
                          {item.location}
                        </span>
                      </>
                    )}
                  </h3>
                </div>
              </div>
              <ul className={styles.bullets}>
                {item.points.map((point) => (
                  <li key={point}>{emphasizeText(point)}</li>
                ))}
              </ul>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ExperienceSection;
