import type { Person, Quotation, WithContext } from "schema-dts";

import type { PAGE_QUERYResult } from "@/sanity/types";

import { JSONLD } from "@/components/core/json-ld";
import { Container } from "@/components/ui/container";
import { Grid, GridItem } from "@/components/ui/grid";
import { Heading, headingVariants, Paragraph } from "@/components/ui/typography";
import { cn } from "@/lib/utils";

function generateQuoteModuleData(props: QuoteModuleProps): WithContext<Quotation> {
  const { _key, title, quote, author } = props;

  const authorObject: Person | undefined = author
    ? {
        "@type": "Person",
        "name": author,
      }
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": `#quote-module-${_key ?? "primary"}`,
    ...(title ? { name: title } : {}),
    ...(quote ? { text: quote } : {}),
    ...(authorObject ? { author: authorObject } : {}),
  };
}

type QuoteModuleProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["pageBuilder"]>[number],
  { _type: "quoteModule" }
>;

export function QuoteModule({
  _key,
  title,
  quote,
  author,
  ...props
}: QuoteModuleProps) {
  const quoteModuleData = generateQuoteModuleData({ _key, title, quote, author, ...props });

  return (
    <Container asChild>
      <section>
        <JSONLD data={quoteModuleData} />
        <Grid>
          <GridItem className="text-center mb-40">
            {title && <Heading size="h2" as="h2" colorScheme="dark">{title}</Heading>}
          </GridItem>
          <GridItem className="flex flex-col gap-20 tablet:col-span-6">
            <QuoteSymbol />
            <blockquote>
              {quote && <Paragraph as="span" className={cn(headingVariants({ size: "h4", colorScheme: "dark" }), "italic font-serif leading-48")}>{quote}</Paragraph>}
            </blockquote>
            <QuoteSymbol className="self-end" />
          </GridItem>
          <GridItem className="mt-20 tablet:col-span-6 tablet:col-start-8 tablet:row-start-3">
            <cite className="not-italic">
              {author && <Paragraph className={cn(headingVariants({ size: "h3", colorScheme: "dark" }), "font-sans tracking-normal")}>{author}</Paragraph>}
            </cite>
          </GridItem>
        </Grid>
      </section>
    </Container>
  );
}

function QuoteSymbol({ className }: { className?: string }) {
  return (
    <div className={cn(headingVariants({ size: "h1", colorScheme: "dark" }), "font-serif w-fit h-[1cap]", className)}>"</div>
  );
}
