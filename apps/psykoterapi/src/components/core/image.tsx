import type { ImageProps as NextImageProps } from "next/image";

import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import NextImage from "next/image";

type Props = Omit<NextImageProps, "src" | "alt"> & {
  image: {
    asset?: {
      url?: string;
      _ref?: string;
    };
    alt: string;
  };
};

function Image({
  image,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}: Props) {
  if ((!image?.asset?.url && !image?.asset?._ref) || !image.alt)
    return null;

  const imageUrl = urlFor(image)
    .auto("format")
    .url();

  return (
    <div className={cn("relative w-full h-full", className)}>
      <NextImage
        src={imageUrl}
        alt={image.alt}
        fill
        quality={80}
        sizes={sizes}
        {...props}
        className="object-cover"
      />
    </div>
  );
}

Image.displayName = "Image";

export { Image };
