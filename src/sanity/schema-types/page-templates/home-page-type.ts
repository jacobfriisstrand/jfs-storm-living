import { defineField, defineType } from "sanity";

import { client } from "@/sanity/lib/client";
import { basePageBuilder } from "@/sanity/schema-types/page-templates/base-page-builder";
import { basePageType } from "@/sanity/schema-types/page-templates/base-page-type";

export const apiVersion = process.env.SANITY_API_VERSION || "2025-03-26";

export const studioClient = client.withConfig({ apiVersion });

const homePageModules = ["textAndImage"];

export const homePageType = defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  icon: () => "🏡",
  fields: [
    ...basePageType.fields,
    defineField({
      ...basePageBuilder(homePageModules),
    }),
  ],
  preview: basePageType.preview,
});
