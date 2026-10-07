/**
 * Single source of truth for the public origin.
 * Vercel redirects the apex domain to www, so www is the canonical host.
 */
export const SITE_URL = "https://www.prathikpugazhenthi.dev";
export const SITE_NAME = "Prathik Pugazhenthi";
export const SITE_TITLE = "Prathik Pugazhenthi | Software engineer, AI infrastructure";
export const SITE_DESCRIPTION =
  "Software engineer in Chicago working on the infrastructure side of AI: model pipelines, Kubernetes on GKE, CI/CD. MS at UIC, previously at Bajaj Finserv Health.";

export const absoluteUrl = (path = "/") => new URL(path, SITE_URL).toString();

/** Bump when page content meaningfully changes; feeds sitemap lastModified. */
export const CONTENT_UPDATED = "2026-10-06";
