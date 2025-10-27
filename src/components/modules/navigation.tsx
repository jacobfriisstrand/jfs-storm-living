import Logo from "@public/assets/template-logo.svg";

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
            <Link href="/">
              <Logo />
            </Link>
            <ul className="flex items-center justify-center gap-12">
              {transformedLinks.map((item, index) => {
                const href = getNavigationHref(item);
                return (
                  <li key={index}>
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
