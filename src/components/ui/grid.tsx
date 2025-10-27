import type { ComponentPropsWithRef } from "react";

import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

type GridProps = ComponentPropsWithRef<"div"> & {
  asChild?: boolean;
};

type GridItemProps = ComponentPropsWithRef<"div"> & {
  asChild?: boolean;
};

function GridItem({ className, asChild = false, ref, ...props }: GridItemProps) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      ref={ref}
      className={cn("component-grid-item", className)}
      {...props}
    />
  );
}

function Grid({ className, asChild = false, ...props }: GridProps) {
  const Component = asChild ? Slot : "div";

  return (
    <Component
      className={cn(
        `component-grid tablet:grid-cols-12 tablet:gap-8 desktop:gap-12 mx-5 grid grid-cols-4 gap-4`,
        className,
      )}
      {...props}
    />
  );
}

export { Grid, GridItem };
