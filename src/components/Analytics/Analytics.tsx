"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views on route changes
function usePageView() {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/d071aa73-303c-431a-96a3-74a9bce093e9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Analytics.tsx:11',message:'usePageView entry',data:{isSSR:typeof window==='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  const pathname = usePathname();
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/d071aa73-303c-431a-96a3-74a9bce093e9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Analytics.tsx:13',message:'before useSearchParams call',data:{pathname,isSSR:typeof window==='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  const searchParams = useSearchParams();
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/d071aa73-303c-431a-96a3-74a9bce093e9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Analytics.tsx:15',message:'after useSearchParams call',data:{pathname,hasSearchParams:!!searchParams,isSSR:typeof window==='undefined'},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'D'})}).catch(()=>{});
  // #endregion

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    // Track page view
    if (typeof window.gtag !== "undefined") {

      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
        debug_mode: true,
      });
    }
  }, [pathname, searchParams]);
}

export function Analytics() {
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/d071aa73-303c-431a-96a3-74a9bce093e9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'Analytics.tsx:31',message:'Analytics component render',data:{isSSR:typeof window==='undefined',hasGAId:!!GA_MEASUREMENT_ID},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
  // #endregion
  usePageView();

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  );
}