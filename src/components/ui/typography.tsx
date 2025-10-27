import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithRef } from "react";

import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const headingVariants = cva("", {
  variants: {
    size: {
      h1: "text-5xl tablet:text-6xl leading-none",
      h2: "text-3xl tablet:text-4xl leading-none",
      h3: "text-xl tablet:text-2xl leading-none",
      h4: "text-md tablet:text-lg leading-none",
    },
    colorScheme: {
      light: "text-light",
      dark: "text-dark",
    },
  },
  defaultVariants: {
    size: "h1",
    colorScheme: "light",
  },
});

type HeadingProps = ComponentPropsWithRef<"h1"> &
  VariantProps<typeof headingVariants> & {
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  };

function Heading({
  className,
  children,
  size,
  colorScheme,
  ref,
  as = "h2",
  ...props
}: HeadingProps) {
  const Component = as;

  return (
    <Component
      className={cn(headingVariants({ size, colorScheme }), className)}
      ref={ref}
      {...props}
    >
      {children}
    </Component>
  );
}

export const paragraphVariants = cva("leading-110", {
  variants: {
    size: {
      default: "text-14 tablet:text-16",
    },
    colorScheme: {
      light: "text-light",
      dark: "text-dark",
    },
  },
  defaultVariants: {
    size: "default",
    colorScheme: "dark",
  },
});

type ParagraphProps = ComponentPropsWithRef<"p"> &
  VariantProps<typeof paragraphVariants> & {
    as?: "p" | "span" | "small";
  };

function Paragraph({
  className,
  children,
  size,
  colorScheme,
  ref,
  as = "p",
  ...props
}: ParagraphProps) {
  const Component = as;

  return (
    <Component
      className={cn(paragraphVariants({ size, colorScheme }), className)}
      ref={ref}
      {...props}
    >
      {children}
    </Component>
  );
}

export { Heading, Paragraph };
