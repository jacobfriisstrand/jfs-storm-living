"use client";

import { useRef } from "react";

import { useInertWhenMenuOpen } from "@/hooks/use-inert-when-menu-open";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  useInertWhenMenuOpen(footerRef);

  return (
    <div className="py-20 border-2 border-[red]">
      <footer ref={footerRef}>
        <p>Footer</p>
      </footer>
    </div>
  );
}
