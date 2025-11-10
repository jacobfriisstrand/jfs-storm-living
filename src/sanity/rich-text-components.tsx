import type { PortableTextComponents } from "next-sanity";

import { Image } from "@/components/core/image";
import { Heading, Paragraph } from "@/components/ui/typography";

export const components: PortableTextComponents = {
  types: {
    imageFieldType: props =>
      props.value
        ? (
            <Image
              className="not-prose aspect-square w-auto h-auto object-cover my-16"
              image={props.value}
            />
          )
        : null,
  },
  block: {
    normal: ({ children }) => <Paragraph>{children}</Paragraph>,
    h2: ({ children }) => <Heading size="h4" as="h2" colorScheme="dark">{children}</Heading>,
    h3: ({ children }) => <Heading size="h4" as="h3" colorScheme="dark">{children}</Heading>,
    h4: ({ children }) => <Heading size="h4" as="h4" colorScheme="dark">{children}</Heading>,
  },
};
