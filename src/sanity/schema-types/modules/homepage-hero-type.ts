import { defineField, defineType } from "sanity";

export const homepageHeroType = defineType({
  name: "homepageHero",
  title: "Forside hero",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Titel",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Underoverskrift",
      type: "text",
    }),
    defineField({
      name: "image",
      title: "Billede",
      type: "imageFieldType",
    }),
    defineField({
      name: "buttons",
      title: "Knapper",
      type: "array",
      of: [{ type: "navigationLink" }],
      validation: Rule => Rule.max(2).error("Maksimum 2 knapper er tilladt"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: "Forside hero",
        media,
      };
    },
  },
});
