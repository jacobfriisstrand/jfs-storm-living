import { defineField, defineType, set } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO title",
      type: "string",
      validation: rule => rule.required().error("SEO title is required"),
    }),
    defineField({
      name: "description",
      title: "SEO description",
      type: "text",
      rows: 3,
      description: "The SEO description is a concise summary of your page. This appears in search results and when your page is shared on social media.",
      components: {
        input: (props) => {
          const { value, onChange } = props;
          const charCount = value ? value.length : 0;

          return (
            <div>
              <textarea
                value={value || ""}
                onChange={e => onChange(set(e.target.value))}
                rows={3}
                className="w-full p-2 border rounded"
              />
              <div className="mt-1 text-xs">
                {charCount}
                {" "}
                characters
              </div>
            </div>
          );
        },
      },
      validation: rule => [
        rule.required().error("SEO description is required"),
        rule.required().info("A SEO description will help search engines understand your page and its content. Use keywords that are relevant to your page and content for better search engine visibility."),
        rule.min(150).max(160).warning("For optimal SEO, this summary should be between 150-160 characters"),
      ],
    }),
    defineField({
      name: "image",
      title: "SEO image",
      type: "image",
      description: "This image will be used for the SEO image, eg. when the page is shared on social media",
    }),
    defineField({
      name: "noIndex",
      type: "boolean",
      description: "If enabled, the page will not be indexed by search engines",
    }),

  ],
});
