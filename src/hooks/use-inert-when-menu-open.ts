import type { RefObject } from "react";

import { useEffect, useMemo } from "react";

import { useHamburgerMenu } from "@/contexts/hamburger-menu-context";
import { useMediaQuery } from "@/hooks/use-media-query";

export function useInertWhenMenuOpen(targetRef: RefObject<HTMLElement | null>) {
  const { isHamburgerMenuOpen } = useHamburgerMenu();

  const tabletBreakpoint = useMemo(() => {
    if (typeof window === "undefined")
      return "1024px";
    const root = document.documentElement;
    const breakpointValue = getComputedStyle(root)
      .getPropertyValue("--breakpoint-tablet")
      .trim();
    return breakpointValue || "1024px";
  }, []);

  const isAboveTablet = useMediaQuery(`(min-width: ${tabletBreakpoint})`);

  useEffect(() => {
    const el = targetRef.current;
    if (!el)
      return;
    if (isHamburgerMenuOpen && !isAboveTablet) {
      el.setAttribute("inert", "");
    }
    else {
      el.removeAttribute("inert");
    }
  }, [isHamburgerMenuOpen, isAboveTablet, targetRef]);
}
