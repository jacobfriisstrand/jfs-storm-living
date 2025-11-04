import type { PortableTextComponents } from "next-sanity";

import { Image } from "@/components/core/image";

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
};
