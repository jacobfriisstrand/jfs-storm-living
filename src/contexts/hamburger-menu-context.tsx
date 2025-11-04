"use client";

import type { ReactNode } from "react";

import { createContext, use, useEffect, useMemo, useState } from "react";

import { useMediaQuery } from "@/hooks/use-media-query";

type HamburgerMenuContextType = {
  isHamburgerMenuOpen: boolean;
  setIsHamburgerMenuOpen: (open: boolean) => void;
};

const HamburgerMenuContext = createContext<HamburgerMenuContextType | undefined>(undefined);

export function HamburgerMenuProvider({ children }: { children: ReactNode }) {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

  // Get the breakpoint value from CSS variable
  const tabletBreakpoint = useMemo(() => {
    if (typeof window === "undefined")
      return "1024px";
    const root = document.documentElement;
    const breakpointValue = getComputedStyle(root).getPropertyValue("--breakpoint-tablet").trim();
    return breakpointValue || "1024px";
  }, []);

  const isAboveTablet = useMediaQuery(`(min-width: ${tabletBreakpoint})`);

  // Add overflow-hidden to body when menu is open (only on small screens)
  useEffect(() => {
    if (isHamburgerMenuOpen && !isAboveTablet) {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isHamburgerMenuOpen, isAboveTablet]);

  return (
    <HamburgerMenuContext value={{ isHamburgerMenuOpen, setIsHamburgerMenuOpen }}>
      {children}
    </HamburgerMenuContext>
  );
}

export function useHamburgerMenu() {
  const context = use(HamburgerMenuContext);
  if (context === undefined) {
    throw new Error("useHamburgerMenu must be used within a HamburgerMenuProvider");
  }
  return context;
}
