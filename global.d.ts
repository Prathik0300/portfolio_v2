export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }

  // If some package declares global gtag() too, keep this:
  function gtag(...args: unknown[]): void;
}