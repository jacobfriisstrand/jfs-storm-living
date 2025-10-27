import { defineField, defineType } from "sanity";

import { basePageType } from "./base-page-type";

export const notFoundPageType = defineType({
  name: "notFoundPage",
  title: "Not Found Page",
  type: "document",
  icon: () => "📄",
  fields: [
    ...basePageType.fields,
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
    }),
  ],
  preview: basePageType.preview,
});
