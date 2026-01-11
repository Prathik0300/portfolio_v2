'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

export type SectionId =
  | "home"
  | "about"
  | "skills"
  | "experience"
  | "services"
  | "projects";

interface UIContextValue {
  activeSection: SectionId;
  setActiveSection: (section: SectionId) => void;
}

const UIContext = createContext<UIContextValue | undefined>(undefined);

export function UIProvider({ children }: PropsWithChildren) {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  const value = useMemo(
    () => ({
      activeSection,
      setActiveSection,
    }),
    [activeSection],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUIContext(): UIContextValue {
  const ctx = useContext(UIContext);
  if (!ctx) {
    throw new Error("useUIContext must be used within a UIProvider");
  }
  return ctx;
}

