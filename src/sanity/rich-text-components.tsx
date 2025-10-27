import type { PortableTextComponents } from "next-sanity";

import { SanityImage } from "@/components/core/sanity-image";

export const components: PortableTextComponents = {
  types: {
    image: props =>
      props.value
        ? (
            <SanityImage
              className="not-prose w-full h-auto"
              image={props.value}
            />
          )
        : null,
  },
};
