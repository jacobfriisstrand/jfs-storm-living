import { defineField, defineType } from "sanity";

export const globalSettingsType = defineType({
  name: "globalSettings",
  title: "Globale indstillinger",
  type: "document",
  icon: () => "⚙️",
  fields: [
    defineField({
      name: "companyName",
      type: "string",
      title: "Firmanavn",
      description: "Virksomhedens officielle navn. Dette vises alle steder hvor firmanavnet er nødvendigt.",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "favicon",
      type: "image",
      title: "Favicon",
      validation: Rule => Rule.required(),
      description: "Upload et kvadratisk billede (anbefalet størrelse: 32x32 pixels) til brug som favicon. Det vises i browsertabs og bogmærker.",
      options: {
        accept: "image/png, image/x-icon, image/svg+xml",
      },
    }),
    defineField({
      name: "contactInfo",
      type: "object",
      title: "Kontaktoplysninger",
      description: "Dette vises alle steder hvor kontaktinformationer er nødvendige.",
      fields: [
        defineField({
          name: "phone",
          type: "string",
          validation: Rule => Rule.required(),
          title: "Telefon",
        }),
        defineField({
          name: "email",
          type: "string",
          validation: Rule => Rule.required(),
          title: "E-mail",
        }),
      ],
    }),
    defineField({
      name: "address",
      type: "object",
      title: "Adresse",
      description: "Dette vises i footeren.",
      validation: Rule => Rule.required(),
      fields: [
        defineField({
          name: "streetName",
          type: "string",
          title: "Vejnavn",
        }),
        defineField({
          name: "streetNumber",
          type: "string",
          title: "Husnummer",
        }),
        defineField({
          name: "floor",
          type: "string",
          title: "Etage",
        }),
        defineField({
          name: "zipCode",
          type: "string",
          title: "Postnummer",
        }),
        defineField({
          name: "city",
          type: "string",
          title: "By",
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      type: "object",
      title: "Sociale links",
      description: "Indtast en gyldig URL, der starter med https:// (f.eks. https://eksempel.dk)",
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
      title: "Copyright-tekst",
      description: "Dette vises i footeren.",
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "vatNumberObject",
      type: "object",
      title: "CVR-nummer",
      description: "Dette vises i footeren og hvor CVR-nummeret ellers er nødvendigt.",
      validation: Rule => Rule.required(),
      fields: [
        defineField({
          name: "vatNumberHeading",
          type: "string",
          title: "CVR-overskrift",
          placeholder: "Eksempel: 'CVR'",
        }),
        defineField({
          name: "vatNumber",
          type: "string",
          title: "CVR-nummer",
        }),
      ],
    }),

  ],
  preview: {
    prepare() {
      return {
        title: "Globale indstillinger",
      };
    },
  },
});
