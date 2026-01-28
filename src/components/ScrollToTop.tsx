"use client";

import { useEffect } from "react";

export function ScrollToTop() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Check if this is a page refresh (not a navigation)
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    const legacyNav = (window.performance as { navigation?: { type?: number } }).navigation;
    const isRefresh = navigation?.type === 'reload' || legacyNav?.type === 1; // Fallback for older browsers
    
    if (isRefresh) {
      // Only scroll to top on actual page refresh
      window.scrollTo({ top: 0, behavior: "instant" });
    } else if ('scrollRestoration' in window.history) {
      // Enable scroll restoration for navigation (maintains scroll position)
      window.history.scrollRestoration = 'auto';
    }
  }, []);

  return null;
}
