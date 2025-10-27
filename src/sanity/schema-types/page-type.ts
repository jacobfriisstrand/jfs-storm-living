import { defineField, defineType } from "sanity";

import { client } from "../lib/client";

export const apiVersion = process.env.SANITY_API_VERSION || "2025-03-26";

export const studioClient = client.withConfig({ apiVersion });

export const pageType = defineType({
  name: "page",
  title: "Page",
  icon: () => "📄",
  type: "document",
  groups: [
    {
      name: "seo",
      title: "SEO",
      default: true,
      icon: () => "🔍",
    },
    {
      name: "content",
      title: "Page content",
      icon: () => "📄",
    },
  ],
  fields: [
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO",
      group: "seo",
    }),
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      group: "content",
      validation: rule => rule.required(),
      description: "This is used to identify the page in the CMS, and is not displayed on the live site.",
    }),
    defineField({
      name: "slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
      },
      description: "This is used to generate the URL for the page, and can be generated from the title. If the page is the homepage, this must be left empty.",

      validation: Rule =>
        Rule.custom(async (value, context) => {
          const docId = context.document?._id;
          const cleanDocId = docId?.startsWith("drafts.") ? docId.substring(7) : docId;
          const client = context.getClient({ apiVersion });

          const globalSettings = await client.fetch(`*[_type == "globalSettings"][0]`);

          const isHomePage = globalSettings?.homePage?._ref === cleanDocId;

          if (isHomePage) {
            return value ? { message: "Homepage must not have a slug", isError: true } : true;
          }

          return !value ? { message: "Slug is required for non-homepage pages" } : true;
        })
          .info("This is used to generate the URL for the page, and can be generated from the title. If the page is the homepage, this must be left empty."),
    }),
    defineField({
      name: "content",
      type: "pageBuilder",
      group: "content",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
