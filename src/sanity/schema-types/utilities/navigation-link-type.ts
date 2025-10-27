import { defineField, defineType } from "sanity";

import { PAGE_TYPES } from "@/sanity/constants/page-types";

export const navigationLinkType = defineType({
  name: "navigationLink",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      description: "The text that will be displayed in the navigation",
      type: "string",
    }),
    defineField({
      name: "linkType",
      title: "Link Type",
      type: "string",
      options: {
        list: [
          { title: "Internal", value: "internal" },
          { title: "External", value: "external" },
        ],
      },
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description: "Enter a valid URL starting with https:// (e.g., https://example.com)",
      validation: Rule => Rule.custom((value, context) => {
        const parent = context.parent as { linkType?: string };
        if (parent?.linkType === "external" && !value) {
          return "URL is required for external links";
        }
        return true;
      }),
      hidden: ({ parent }) => parent?.linkType !== "external",
    }),
    defineField({
      name: "page",
      title: "Page",
      type: "reference",
      validation: Rule => Rule.custom((value, context) => {
        const parent = context.parent as { linkType?: string };
        if (parent?.linkType === "internal" && !value) {
          return "Page is required for internal links";
        }
        return true;
      }),
      to: PAGE_TYPES.map(type => ({ type })),
      hidden: ({ parent }) => parent?.linkType !== "internal",
    }),
  ],
});
