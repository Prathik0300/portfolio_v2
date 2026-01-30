// Google Analytics event tracking utility

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;

  if (typeof window.gtag !== "undefined") {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined event trackers
export const analytics = {
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
};
