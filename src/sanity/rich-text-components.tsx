import type { PortableTextComponents } from "next-sanity";

import { Image } from "@/components/core/image";
import { Heading, Paragraph } from "@/components/ui/typography";

export function getPortableTextComponents(options?: { allowImages?: boolean; colorScheme?: "light" | "dark" }): PortableTextComponents {
  const { allowImages = true, colorScheme = "dark" } = options ?? {};

  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => <Paragraph colorScheme={colorScheme}>{children}</Paragraph>,
      h2: ({ children }) => <Heading size="h4" as="h2" colorScheme={colorScheme}>{children}</Heading>,
      h3: ({ children }) => <Heading size="h4" as="h3" colorScheme={colorScheme}>{children}</Heading>,
      h4: ({ children }) => <Heading size="h4" as="h4" colorScheme={colorScheme}>{children}</Heading>,
    },
    marks: {
      // Inline blocks are rendered as marks in Portable Text
    },
  };

  // Add inline block types for contact references
  // Inline blocks appear in the children array, so they're handled as inline components
  components.types = {
    ...(components.types || {}),
    emailReference: (props: any) => {
      // For inline blocks, the value is the entire node object
      const email = props.value?.email;
      if (!email)
        return null;
      return (
        <a href={`mailto:${email}`} className="underline">
          {email}
        </a>
      );
    },
    phoneReference: (props: any) => {
      // For inline blocks, the value is the entire node object
      const phone = props.value?.phone;
      if (!phone)
        return null;
      return (
        <a href={`tel:${phone}`} className="underline">
          {phone}
        </a>
      );
    },
  };

  if (allowImages) {
    components.types = {
      ...components.types,
      imageFieldType: props =>
        props.value
          ? (
              <Image
                className="not-prose aspect-square w-auto h-auto object-cover my-16"
                image={props.value}
              />
            )
          : null,
    };
  }

  return components;
}

export const components = getPortableTextComponents();
