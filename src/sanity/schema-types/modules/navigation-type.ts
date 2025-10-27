import { defineField, defineType } from "sanity";

export const navigationType = defineType({
  name: "navigation",
  type: "document",
  title: "Navigation",
  icon: () => "🔗",
  preview: {
    select: {
      title: "title",
    },
    prepare() {
      return {
        title: "Navigation",
      };
    },
  },
  fields: [
    defineField({
      name: "menu",
      description: "The links for the navigation bar.",
      type: "array",
      of: [{ type: "navigationLink" }],
      validation: Rule => Rule.required(),
    }),
  ],
});
