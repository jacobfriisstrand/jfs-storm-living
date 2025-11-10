import type { SchemaTypeDefinition } from "sanity";

import { globalSettingsType } from "@/sanity/schema-types/global-settings-type";
import { featureListType } from "@/sanity/schema-types/modules/feature-list-type";
import { footerType } from "@/sanity/schema-types/modules/footer-type";
import { genericHeroType } from "@/sanity/schema-types/modules/generic-hero-type";
import { homepageHeroType } from "@/sanity/schema-types/modules/homepage-hero-type";
import { listModuleType } from "@/sanity/schema-types/modules/list-module-type";
import { navigationType } from "@/sanity/schema-types/modules/navigation-type";
import { textAndImageType } from "@/sanity/schema-types/modules/text-and-image-type";
import { textAndLinkBlockType } from "@/sanity/schema-types/modules/text-and-link-block-type";
import { basePageType } from "@/sanity/schema-types/page-templates/base-page-type";
import { genericPageType } from "@/sanity/schema-types/page-templates/generic-page-type";
import { homePageType } from "@/sanity/schema-types/page-templates/home-page-type";
import { notFoundPageType } from "@/sanity/schema-types/page-templates/not-found-page-type";
import { imageFieldType } from "@/sanity/schema-types/utilities/image-field-type";
import { navigationLinkType } from "@/sanity/schema-types/utilities/navigation-link-type";
import { redirectType } from "@/sanity/schema-types/utilities/redirect-type";
import { richTextType } from "@/sanity/schema-types/utilities/rich-text-type";
import { seoType } from "@/sanity/schema-types/utilities/seo-type";

export const schema: SchemaTypeDefinition[] = [
  // Base types that other types depend on
  basePageType,
  seoType,
  imageFieldType,
  richTextType,

  // Module types
  textAndImageType,
  navigationType,
  footerType,

  // Document types
  globalSettingsType,
  homePageType,
  notFoundPageType,

  // Utility types
  redirectType,
  navigationLinkType,
  genericPageType,
  homepageHeroType,
  genericHeroType,
  textAndLinkBlockType,
  listModuleType,
  featureListType,
];
