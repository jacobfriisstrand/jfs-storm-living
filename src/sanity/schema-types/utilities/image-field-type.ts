import { defineField, defineType } from "sanity";

export const imageFieldType = defineType({
  name: "imageFieldType",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Alternative text",
      description: "Alternative text is used to describe the image to visually impaired users. It is also used by search engines to understand the image content.",
      validation: Rule => Rule.required(),
    }),
  ],
});
