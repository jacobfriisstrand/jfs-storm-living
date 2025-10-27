import type { NavigationLink } from "@/sanity/types";

type SanityNavigationLink = {
  _type: "navigationLink";
  label: string | null;
  linkType: "internal" | "external" | null;
  url: string | null;
  page: {
    _id: string;
    _type: string;
    slug: string | null;
  } | null;
};

export type ExtendedNavigationLink = NavigationLink & {
  page?: {
    _ref: string;
    _type: "reference";
    _weak: boolean;
    slug?: string;
  };
};

export function getNavigationHref(link: ExtendedNavigationLink): string {
  if (link.linkType === "internal" && link.page?.slug) {
    return `/${link.page.slug}`;
  }
  return link.url || "/";
}

export function transformNavigationLinks(links: SanityNavigationLink[] | null | undefined): ExtendedNavigationLink[] {
  return links?.map(link => ({
    ...link,
    label: link.label ?? undefined,
    linkType: link.linkType ?? undefined,
    url: link.url ?? undefined,
    page: link.page
      ? {
          _ref: link.page._id,
          _type: "reference" as const,
          _weak: false,
          slug: link.page.slug ?? undefined,
        }
      : undefined,
  })) ?? [];
}
