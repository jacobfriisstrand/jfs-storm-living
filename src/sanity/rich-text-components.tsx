import type { PortableTextComponents } from "next-sanity";

import { Image } from "@/components/core/image";

export const components: PortableTextComponents = {
  types: {
    image: props =>
      props.value
        ? (
            <Image
              className="not-prose w-full h-auto"
              image={props.value}
            />
          )
        : null,
  },
};
