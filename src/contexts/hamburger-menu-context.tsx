"use client";

import type { ReactNode } from "react";

import { createContext, use, useState } from "react";

type HamburgerMenuContextType = {
  isHamburgerMenuOpen: boolean;
  setIsHamburgerMenuOpen: (open: boolean) => void;
};

const HamburgerMenuContext = createContext<HamburgerMenuContextType | undefined>(undefined);

export function HamburgerMenuProvider({ children }: { children: ReactNode }) {
  const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false);

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
