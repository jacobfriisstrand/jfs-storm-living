import { defineField, defineType } from "sanity";

export const textAndImageType = defineType({
  name: "textAndImage",
  type: "object",
  fields: [
    defineField({
      name: "orientation",
      type: "string",
      title: "Billedeplacering",
      options: {
        list: [
          { value: "imageLeft", title: "Billede til venstre" },
          { value: "imageRight", title: "Billede til højre" },
        ],
      },
    }),
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "imageFieldType",
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
        subtitle: "Tekst og billede",
        media,
      };
    },
  },
});
