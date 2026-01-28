"use client";

import { useState, useEffect } from "react";

/**
 * Hook to simulate loading state with optional delay
 * Useful for demonstrating skeleton loaders during network delays
 */
export function useLoadingState(initialLoading = false, delay = 0) {
  const [isLoading, setIsLoading] = useState(initialLoading);

  useEffect(() => {
    if (delay > 0 && initialLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, delay);
      return () => clearTimeout(timer);
    } else if (!initialLoading) {
      setIsLoading(false);
    }
  }, [initialLoading, delay]);

  return isLoading;
}

/**
 * Hook to simulate async data loading with network delay
 */
export function useAsyncData<T>(
  fetchFn: () => Promise<T> | T,
  delay = 1000
): { data: T | null; isLoading: boolean; error: Error | null } {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, delay));

        const result = await Promise.resolve(fetchFn());

        if (isMounted) {
          setData(result);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Failed to load data"));
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [fetchFn, delay]);

  return { data, isLoading, error };
}
