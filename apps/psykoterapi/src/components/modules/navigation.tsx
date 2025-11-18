"use client";

import type { CONTACT_BUTTONS_QUERYResult, LOGO_QUERYResult, NAVIGATION_QUERYResult } from "@/sanity/types";
import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import ContactButtons from "@/components/ui/contact-buttons";
import { Container } from "@/components/ui/container";
import { Grid, GridItem } from "@/components/ui/grid";
import { Link } from "@/components/ui/link";
import { Paragraph } from "@/components/ui/typography";
import { useHamburgerMenu } from "@/contexts/hamburger-menu-context";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { getNavigationHref, transformNavigationLinks } from "@/lib/utils/transform-navigation-link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import NextImage from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Navigation({ navigationData, logoData, contactButtonsData }: { navigationData: NAVIGATION_QUERYResult; logoData: LOGO_QUERYResult; contactButtonsData: CONTACT_BUTTONS_QUERYResult }) {
  const { isHamburgerMenuOpen, setIsHamburgerMenuOpen } = useHamburgerMenu();
  const [isVisible, setIsVisible] = useState(true);
  const [hiddenAtPosition, setHiddenAtPosition] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const hideThreshold = 200; // Hide when scrolling down past this point
  const showThreshold = 20; // Show when scrolling up past this point
  const scrollUpOffset = 200; // Require scrolling up this much before showing

  // Get the breakpoint value from CSS variable
  const tabletBreakpoint = useMemo(() => {
    if (typeof window === "undefined")
      return "1024px";
    const root = document.documentElement;
    const breakpointValue = getComputedStyle(root).getPropertyValue("--breakpoint-tablet").trim();
    return breakpointValue || "1024px";
  }, []);

  const isAboveTablet = useMediaQuery(`(min-width: ${tabletBreakpoint})`);

  // Always set menu to open when screen is >= tablet breakpoint, closed otherwise
  useEffect(() => {
    if (isAboveTablet) {
      setIsHamburgerMenuOpen(true);
    }
    else {
      setIsHamburgerMenuOpen(false);
    }
  }, [isAboveTablet, setIsHamburgerMenuOpen]);

  // Close menu when route changes (only on mobile)
  useEffect(() => {
    if (!isAboveTablet) {
      setIsHamburgerMenuOpen(false);
    }
  }, [pathname, isAboveTablet, setIsHamburgerMenuOpen]);

  // Handle scroll-based visibility
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const isScrollingDown = latest > previous;
    const isScrollingUp = latest < previous;

    // Always show when near top of page
    if (latest <= showThreshold) {
      setIsVisible(true);
      setHiddenAtPosition(null);
      return;
    }

    // Hide when scrolling down past hide threshold
    if (isScrollingDown && latest > hideThreshold) {
      setIsVisible(false);
      setHiddenAtPosition(latest);
    }
    // Show when scrolling up, but only after scrolling up by the required offset
    else if (isScrollingUp && hiddenAtPosition !== null) {
      const scrollUpDistance = hiddenAtPosition - latest;
      if (scrollUpDistance >= scrollUpOffset) {
        setIsVisible(true);
        setHiddenAtPosition(null);
      }
    }
    // Show immediately when scrolling up if not hidden
    else if (isScrollingUp && hiddenAtPosition === null) {
      setIsVisible(true);
    }
  });

  const transformedLinks = transformNavigationLinks(navigationData?.menu);

  // Close menu when a link is clicked (only on mobile)
  const handleLinkClick = () => {
    if (!isAboveTablet) {
      setIsHamburgerMenuOpen(false);
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{ y: isVisible ? 0 : "-100%" }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        type: "tween",
      }}
      style={{ willChange: "transform" }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <Container size="fluid" className="bg-dark text-light max-tablet:h-(--navigation-height-mobile) tablet:h-(--navigation-height-desktop)">
        <Container className="max-tablet:contents">
          <Grid className="max-tablet:contents">
            <GridItem className="max-tablet:contents tablet:col-span-full">
              <header>
                <nav>
                  <div className="flex items-center justify-between relative py-8 tablet:py-16 gap-20">
                    <NextLink href="/" onClick={handleLinkClick} className="focus-visible:focus-outline flex items-center gap-8 tablet:text-center max-tablet:pl-16">
                      {logoData?.logo?.asset?.url && (
                        <NextImage src={logoData.logo.asset.url} alt="Logo" width={50} height={50} priority />
                      )}
                      {navigationData?.logoText && <Paragraph as="span" colorScheme="light" className="hidden desktop:block">{navigationData.logoText}</Paragraph>}
                    </NextLink>
                    <HamburgerMenuButton onClick={() => setIsHamburgerMenuOpen(!isHamburgerMenuOpen)} className="px-16 tablet:hidden" isHamburgerMenuOpen={isHamburgerMenuOpen} />
                    <div className={cn("z-10 max-tablet:absolute max-tablet:bottom-0 tablet:transition-none max-tablet:translate-y-[calc(100svh-var(--navigation-height-mobile))] max-tablet:bg-dark max-tablet:h-[calc(100svh-var(--navigation-height-mobile))] max-tablet:w-full max-tablet:grid max-tablet:place-items-end max-tablet:pb-32 transition-transform duration-640 ease-navigation", isHamburgerMenuOpen ? "max-tablet:translate-x-0" : "max-tablet:translate-x-full")}>
                      <ul id="navigation-menu" className="w-full flex flex-col tablet:flex-row tablet:items-center justify-center max-tablet:gap-40 gap-20 desktop:gap-40 max-tablet:text-right max-tablet:px-16">
                        {transformedLinks.map((item) => {
                          const href = getNavigationHref(item);
                          return (
                            <li className="tablet:text-center" key={item.page?._ref ?? item.url}>
                              <Link href={href} onClick={handleLinkClick} tabIndex={isHamburgerMenuOpen ? undefined : -1}>{item.label}</Link>
                            </li>
                          );
                        })}
                        {navigationData?.contactButtonText && (
                          <li className="max-tablet:w-full max-tablet:flex flex-1 [&>div]:max-tablet:w-full">
                            {/* TODO: Add mail link from settings */}
                            {contactButtonsData?.email && contactButtonsData.copyEmailTooltipText && (
                              <ContactButtons className="max-tablet:w-full" isHamburgerMenuOpen={isHamburgerMenuOpen} copyEmailTooltipText={contactButtonsData.copyEmailTooltipText} contactEmail={contactButtonsData.email} contactButtonText={navigationData?.contactButtonText} />
                            )}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </nav>
              </header>
            </GridItem>
          </Grid>
        </Container>
      </Container>
    </motion.div>
  );
}

function HamburgerMenuButton({ onClick, className, isHamburgerMenuOpen }: ComponentProps<"button"> & { isHamburgerMenuOpen: boolean }) {
  return (
    <Button variant="hamburger" aria-controls="navigation-menu" aria-expanded={isHamburgerMenuOpen} className={cn("flex flex-col gap-4 py-12", className)} onClick={onClick}>
      <div className={cn("w-16 h-px bg-light transition-transform duration-640 ease-navigation", isHamburgerMenuOpen ? "rotate-45 translate-y-[5px]" : "rotate-0 translate-y-0")}></div>
      <div className={cn("w-16 h-px bg-light transition-[transform,opacity] duration-640 ease-navigation", isHamburgerMenuOpen ? "opacity-0" : "opacity-100")}></div>
      <div className={cn("w-16 h-px bg-light transition-transform duration-640 ease-navigation", isHamburgerMenuOpen ? "-rotate-45 -translate-y-[5px]" : "rotate-0 translate-y-0")}></div>
    </Button>
  );
}
