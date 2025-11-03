import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

import { DisableDraftMode } from "@/components/core/disable-draft-mode";
import Footer from "@/components/modules/footer";
import Navigation from "@/components/modules/navigation";
import { HamburgerMenuProvider } from "@/contexts/hamburger-menu-context";
import { TouchProvider } from "@/contexts/touch-context";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { CONTACT_BUTTONS_QUERY, LOGO_QUERY, NAVIGATION_QUERY } from "@/sanity/lib/queries";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: navigationData } = await sanityFetch({
    query: NAVIGATION_QUERY,
  });

  const { data: logoData } = await sanityFetch<typeof LOGO_QUERY>({ query: LOGO_QUERY });

  const { data: contactButtonsData } = await sanityFetch<typeof CONTACT_BUTTONS_QUERY>({ query: CONTACT_BUTTONS_QUERY });

  return (
    <TouchProvider>
      <HamburgerMenuProvider>
        <Navigation navigationData={navigationData} logoData={logoData} contactButtonsData={contactButtonsData} />
        {children}
        <Footer />
        <SanityLive />
        {(await draftMode()).isEnabled && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
      </HamburgerMenuProvider>
    </TouchProvider>
  );
}
