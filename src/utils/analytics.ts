/* eslint-disable @typescript-eslint/no-explicit-any */
// Google Analytics event tracking utility

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;


// const gtagSafe = (...args: unknown[]) => {
//   if (typeof window !== "undefined" && window.gtag) {
//     window.gtag(...args);
//   }
// };
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;

  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      category,        // custom param
      label,           // custom param
      value,
    });
  }
};

// Predefined event trackers
export const analytics = {
  // Page views (GA4 already tracks via config, this is for custom page events if needed)
  trackPageView: (pageName: string, path?: string) => {
    trackEvent("view", "page", `${pageName}${path ? ` - ${path}` : ""}`);
  },

  // Button clicks
  trackButtonClick: (buttonName: string, location?: string) => {
    trackEvent("click", "button", `${buttonName}${location ? ` - ${location}` : ""}`);
  },

  // External link clicks
  trackExternalLink: (url: string, linkText: string) => {
    trackEvent("click", "external_link", `${linkText} - ${url}`);
  },

  // Resume download
  trackResumeDownload: () => {
    trackEvent("download", "file", "resume");
  },

  // Project views
  trackProjectView: (projectName: string, projectSlug: string) => {
    trackEvent("view", "project", `${projectName} - ${projectSlug}`);
  },

  // Section scrolls
  trackSectionView: (sectionName: string) => {
    trackEvent("view", "section", sectionName);
  },

  // Contact actions
  trackEmailClick: () => {
    trackEvent("click", "contact", "email");
  },

  trackPhoneClick: () => {
    trackEvent("click", "contact", "phone");
  },

  // Social media clicks
  trackSocialClick: (platform: string, url: string) => {
    trackEvent("click", "social", `${platform} - ${url}`);
  },

  // Navbar navigation clicks
  trackNavClick: (targetSection: string) => {
    trackEvent("click", "nav", targetSection);
  },

  // Carousel / horizontally scrollable content views
  trackCarouselCardView: (
    carouselId: string,
    cardId: string,
    index: number,
    total: number,
  ) => {
    trackEvent(
      "view",
      "carousel_card",
      `${carouselId} - card:${cardId} index:${index + 1}/${total}`,
    );
  },

  trackCarouselCompletion: (carouselId: string, total: number) => {
    trackEvent("complete", "carousel", `${carouselId} - viewed_all:${total}`);
  },
};
