import type { ImageProps as NextImageProps } from "next/image";

import NextImage from "next/image";

import { cn } from "@/lib/utils";

type Props = Omit<NextImageProps, "src" | "alt"> & {
  image: {
    asset?: {
      url: string;
    };
    alt: string;
  };
};

function Image({
  image,
  className,
  sizes = "(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw",
  ...props
}: Props) {
  if (!image?.asset?.url || !image.alt)
    return null;

  return (
    <div className={cn("relative w-full h-full", className)}>
      <NextImage
        src={image.asset.url}
        alt={image.alt}
        fill
        quality={100}
        sizes={sizes}
        {...props}
        className="object-cover"
      />
    </div>
  );
}

Image.displayName = "Image";

export { Image };
