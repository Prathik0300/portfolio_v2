"use client";

import Image from "next/image";
import * as Accordion from "@radix-ui/react-accordion";
import { useState, useEffect, useRef } from "react";
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
  const [openItems, setOpenItems] = useState<string[]>([]);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const autoOpenedRef = useRef<Set<string>>(new Set()); // Track items that have been auto-opened
  const manuallyClosedRef = useRef<Set<string>>(new Set()); // Track items that were manually closed
  const lastScrollY = useRef<number>(0);
  const hasScrolledDownRef = useRef<boolean>(false); // Track if we've done the initial scroll down

  // Handle manual close - mark item as manually closed
  const handleValueChange = (value: string[]) => {
    const previousOpen = openItems;
    const currentOpen = value;
    
    // Find items that were closed (in previous but not in current)
    const closedItems = previousOpen.filter(item => !currentOpen.includes(item));
    closedItems.forEach(item => {
      manuallyClosedRef.current.add(item);
    });
    
    setOpenItems(value);
  };

  // Handle card click to toggle accordion
  const handleCardClick = (itemValue: string, event: React.MouseEvent) => {
    // Don't toggle if clicking on a link inside
    const target = event.target as HTMLElement;
    if (target.tagName === 'A' || target.closest('a')) {
      return;
    }
    
    // Toggle the accordion
    setOpenItems((prev) => {
      if (prev.includes(itemValue)) {
        return prev.filter(item => item !== itemValue);
      } else {
        return [...prev, itemValue];
      }
    });
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize scroll position
    lastScrollY.current = window.scrollY;

    // Track scroll direction
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        hasScrolledDownRef.current = true; // Mark that we've scrolled down at least once
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const observers: IntersectionObserver[] = [];

    // Use setTimeout to ensure refs are set after render
    const timeoutId = setTimeout(() => {
      experienceItems.forEach((_, index) => {
        const itemValue = `item-${index}`;
        const element = itemRefs.current.get(itemValue);
        
        if (!element) return;

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // Only auto-open if:
              // 1. Item is fully in view (intersectionRatio === 1.0)
              // 2. We've scrolled down (first pass)
              // 3. Item hasn't been auto-opened before
              // 4. Item hasn't been manually closed
              if (
                entry.isIntersecting && 
                entry.intersectionRatio === 1.0 &&
                hasScrolledDownRef.current &&
                !autoOpenedRef.current.has(itemValue) &&
                !manuallyClosedRef.current.has(itemValue)
              ) {
                // Mark as auto-opened and open it
                autoOpenedRef.current.add(itemValue);
                setOpenItems((prev) => {
                  if (!prev.includes(itemValue)) {
                    return [...prev, itemValue];
                  }
                  return prev;
                });
              }
            });
          },
          {
            threshold: 1.0, // Only trigger when 100% visible
            rootMargin: '0px', // No margin - must be completely in viewport
          }
        );

        observer.observe(element);
        observers.push(observer);
      });
    }, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
      observers.forEach((observer) => observer.disconnect());
    };
  }, []); // Remove openItems from dependencies to prevent re-initialization

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className={styles.section}
    >
      <div className={styles.headingRow}>
        <h2 id="experience-heading" className={`${styles.heading} sectionTitle`}>
          Experience
        </h2>
        <p className={styles.subtitle}>
          Where I&apos;ve led full-stack, cloud, and infrastructure impact.
        </p>
      </div>
      <Accordion.Root 
        type="multiple" 
        className={styles.timeline}
        value={openItems}
        onValueChange={handleValueChange}
      >
        {experienceItems.map((item, index) => {
          const itemValue = `item-${index}`;
          const isLastItem = index === experienceItems.length - 1;
          
          return (
            <div
              ref={(el) => {
                if (el) {
                  itemRefs.current.set(itemValue, el);
                } else {
                  itemRefs.current.delete(itemValue);
                }
              }}
            >
              <Accordion.Item 
                key={`${item.company}-${item.period}`}
                value={itemValue}
                className={styles.item}
              >
                <div 
                  className={`${styles.dot} ${isLastItem ? styles.dotLast : ""}`} 
                  aria-hidden="true" 
                />
                <article 
                  className={styles.card}
                  onClick={(e) => handleCardClick(itemValue, e)}
                >
                  <Accordion.Header className={styles.accordionHeader}>
                    <Accordion.Trigger 
                      className={styles.accordionTrigger}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCardClick(itemValue, e);
                      }}
                    >
                      {/* Collapsed view: Logo + Role only */}
                      <div className={styles.collapsedHeader}>
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
                        <div className={styles.roleOnly}>
                          <span>{item.role}</span>
                        </div>
                        <div className={styles.chevron}>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </div>
                      </div>
                    </Accordion.Trigger>
                  </Accordion.Header>
                  
                  <Accordion.Content className={styles.accordionContent}>
                    {/* Expanded content: Additional details + bullets */}
                    <div className={styles.expandedContent}>
                      <div className={styles.headerRow}>
                        <div className={styles.headerText}>
                          <h3 className={styles.roleLine}>
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
                      <div className={styles.bulletsContainer}>
                        <ul className={styles.bullets}>
                          {item.points.map((point) => (
                            <li key={point}>{emphasizeText(point)}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Accordion.Content>
                </article>
            </Accordion.Item>
            </div>
          );
        })}
      </Accordion.Root>
    </section>
  );
}

export default ExperienceSection;
