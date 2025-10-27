import { defineType } from "sanity";

export const imageFieldType = defineType({
  name: "imageFieldType",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "alt",
      type: "string",
      title: "Alternative text",
      description: "Alternative text is required.",
      validation: Rule => Rule.required(),
    },
    {
      name: "caption",
      type: "string",
      title: "Caption",
      hidden: ({ parent }) => !parent?.asset,
    },
  ],
});
