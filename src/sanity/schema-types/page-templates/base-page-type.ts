import { defineField, defineType } from "sanity";

// This is the base type for all pages. It is used as a general template for all pages.
// It is not used directly in the CMS, but is used in other page templates / types.

export const basePageType = defineType({
  type: "document",
  name: "basePage",
  title: "Base Page",
  fields: [
    defineField({
      name: "title",
      title: "Internal title",
      type: "string",
      validation: rule => rule.required(),
      description: "This is used to identify the page in the CMS, and is not displayed on the live site.",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
      description: "This is used to generate the URL for the page, and can be generated from the title.",
      hidden: ({ document }) => document?._type === "homePage" || document?._type === "notFoundPage",
      validation: rule => rule.custom((slug, context) => {
        if (context.document?._type === "homePage" || context.document?._type === "notFoundPage") {
          return true;
        }
        if (!slug?.current) {
          return "Slug is required";
        }
        return true;
      }),
    }),
    defineField({
      name: "seo",
      type: "seo",
      title: "SEO",
      validation: rule => rule.required().error("SEO content is required"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
