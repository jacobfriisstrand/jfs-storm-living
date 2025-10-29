import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function ImageOverlay({
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div className={cn("absolute inset-0 bg-linear-to-t from-dark to-transparent to-75%", className)} {...props}>
    </div>
  );
}
ImageOverlay.displayName = "ImageOverlay";

export { ImageOverlay };
