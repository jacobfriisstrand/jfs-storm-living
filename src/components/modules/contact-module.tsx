import type { WebPageElement, WithContext } from "schema-dts";

import { PortableText } from "next-sanity";

import type { CONTACT_BUTTONS_QUERYResult, PAGE_QUERYResult } from "@/sanity/types";

import { JSONLD } from "@/components/core/json-ld";
import ContactButtons from "@/components/ui/contact-buttons";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/typography";
import { getPortableTextComponents } from "@/sanity/rich-text-components";

import { Grid, GridItem } from "../ui/grid";

function generateContactModuleData(props: ContactModuleProps): WithContext<WebPageElement> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPageElement",
    "name": props.title || "Kontakt modul",
    "description": "Kontakt modul module content",
  };
}

type ContactModuleProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["pageBuilder"]>[number],
  { _type: "contactModule" }
> & {
  contactButtonsData?: CONTACT_BUTTONS_QUERYResult;
};

export function ContactModule({
  _key,
  title,
  description,
  showContactButton,
  contactButtonText,
  contactButtonsData,
  ...props
}: ContactModuleProps) {
  const contactModuleData = generateContactModuleData({ _key, title, description, showContactButton, contactButtonText, ...props });

  return (
    <Container size="fluid" className="bg-brand py-20 tablet:py-60">
      <Container asChild>
        <section>
          <JSONLD data={contactModuleData} />
          <Grid className="gap-y-40 tablet:gap-y-0">
            <GridItem className="tablet:col-span-7">
              {title && <Heading size="h1" as="h2" colorScheme="light" className="text-balance">{title}</Heading>}
            </GridItem>
            <GridItem className="tablet:col-start-9 tablet:aspect-video tablet:flex tablet:flex-col tablet:justify-between">
              {description && <PortableText value={description} components={getPortableTextComponents({ allowImages: false, colorScheme: "light" })} />}
              {showContactButton && contactButtonsData?.email && contactButtonText && contactButtonsData?.copyEmailTooltipText && (
                <ContactButtons
                  className="w-fit focus-visible:outline-light hover:border-light"
                  contactEmail={contactButtonsData.email}
                  contactButtonText={contactButtonText}
                  copyEmailTooltipText={contactButtonsData.copyEmailTooltipText}
                />
              )}
            </GridItem>
          </Grid>
        </section>
      </Container>
    </Container>
  );
}
