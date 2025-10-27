import { defineField, defineType } from "sanity";

export const globalSettingsType = defineType({
  name: "globalSettings",
  title: "Global Settings",
  type: "document",
  icon: () => "⚙️",
  fields: [
    defineField({
      name: "companyName",
      type: "string",
      title: "Company Name",
      description: "The official name of the company. This will not be displayed anywhere on the website.",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "favicon",
      type: "image",
      title: "Favicon",
      validation: Rule => Rule.required(),
      description: "Upload a square image (recommended size: 32x32 pixels) to use as the website favicon. This will appear in browser tabs and bookmarks.",
      options: {
        accept: "image/png, image/x-icon, image/svg+xml",
      },
    }),
    defineField({
      name: "contactInfo",
      type: "object",
      title: "Contact Info",
      description: "This will be displayed in the navigation on mobile, as well as the footer.",
      fields: [
        defineField({
          name: "phone",
          type: "string",
          validation: Rule => Rule.required(),
          title: "Phone",
        }),
        defineField({
          name: "email",
          type: "string",
          validation: Rule => Rule.required(),
          title: "Email",
        }),
      ],
    }),
    defineField({
      name: "address",
      type: "object",
      title: "Address",
      description: "This will be displayed in the footer.",
      validation: Rule => Rule.required(),
      fields: [
        defineField({
          name: "streetName",
          type: "string",
          title: "Street name",
        }),
        defineField({
          name: "streetNumber",
          type: "string",
          title: "Street number",
        }),
        defineField({
          name: "floor",
          type: "string",
          title: "Floor",
        }),
        defineField({
          name: "zipCode",
          type: "string",
          title: "Zip code",
        }),
        defineField({
          name: "city",
          type: "string",
          title: "City",
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      type: "object",
      title: "Social links",
      description: "Enter a valid URL starting with https:// (e.g., https://example.com)",
      fields: [
        defineField({
          name: "instagram",
          type: "url",
          title: "Instagram",
        }),
        defineField({
          name: "linkedIn",
          type: "url",
          title: "LinkedIn",
        }),
      ],
    }),
    defineField({
      name: "copyright",
      type: "string",
      title: "Copyright text",
      description: "This will be displayed in the footer.",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "vatNumberObject",
      type: "object",
      title: "VAT number",
      description: "This will be displayed in the footer and wherever the VAT number is needed.",
      validation: Rule => Rule.required(),
      fields: [
        defineField({
          name: "vatNumberHeading",
          type: "string",
          title: "VAT Number Heading",
          placeholder: "Example: 'CVR'",
        }),
        defineField({
          name: "vatNumber",
          type: "string",
          title: "VAT Number (CVR)",
        }),
      ],
    }),

  ],
  preview: {
    prepare() {
      return {
        title: "Global Settings",
      };
    },
  },
});
