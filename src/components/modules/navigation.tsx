import Logo from "@public/assets/template-logo.svg";
import NextLink from "next/link";

import { Link } from "@/components/ui/link";
import { getNavigationHref, transformNavigationLinks } from "@/lib/utils/transform-navigation-link";
import { sanityFetch } from "@/sanity/lib/live";
import { NAVIGATION_QUERY } from "@/sanity/lib/queries";

export default async function Navigation() {
  const { data: navigationData } = await sanityFetch({
    query: NAVIGATION_QUERY,
  });

  const transformedLinks = transformNavigationLinks(navigationData?.menu);

  return (
    <header>
      <nav className="wrapper py-20 border-2 border-[red]">
        <div>
          <div className="flex items-center justify-between">
            <NextLink href="/" className="focus-visible:focus-outline">
              <Logo />
            </NextLink>
            <ul className="flex items-center justify-center gap-12">
              {transformedLinks.map((item) => {
                const href = getNavigationHref(item);
                return (
                  <li key={item.page?._ref ?? item.url}>
                    <Link href={href}>{item.label}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
