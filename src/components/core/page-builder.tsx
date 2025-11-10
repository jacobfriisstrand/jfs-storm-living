"use client";

import { createDataAttribute } from "next-sanity";
import { useRef } from "react";

import type { PAGE_QUERYResult } from "@/sanity/types";

import { FeatureList } from "@/components/modules/feature-list";
import { GenericHero } from "@/components/modules/generic-hero";
import { HomepageHero } from "@/components/modules/homepage-hero";
import { ListModule } from "@/components/modules/list-module";
import { TextAndImage } from "@/components/modules/text-and-image";
import { TextAndLinkBlock } from "@/components/modules/text-and-link-block";
import { useInertWhenMenuOpen } from "@/hooks/use-inert-when-menu-open";
import { createDataAttributeConfig } from "@/sanity/lib/data-attribute-config";

type PageBuilderProps = {
  modules: NonNullable<PAGE_QUERYResult>["pageBuilder"];
  documentId: string;
  documentType: string;
};

function DragHandle({
  children,
  blockKey,
  documentId,
  documentType,
}: {
  children: React.ReactNode;
  blockKey: string;
  documentId: string;
  documentType: string;
}) {
  return (
    <div
      data-sanity={createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: `content[_key=="${blockKey}"]`,
      }).toString()}
    >
      {children}
    </div>
  );
}

export function PageBuilder({
  modules,
  documentId,
  documentType,
}: PageBuilderProps) {
  // Ensure content is an array
  const blocks = Array.isArray(modules) ? modules : [];
  const mainRef = useRef<HTMLElement>(null);
  useInertWhenMenuOpen(mainRef);

  return (
    <main
      className="space-y-80 tablet:space-y-180"
      ref={mainRef}
      data-sanity={createDataAttribute({
        ...createDataAttributeConfig,
        id: documentId,
        type: documentType,
        path: "pageBuilder",
      }).toString()}
    >
      {blocks.map((block) => {
        switch (block._type) {
          case "textAndImage":
            return (
              <DragHandle key={block._key} blockKey={block._key} documentId={documentId} documentType={documentType}>
                <TextAndImage {...block} />
              </DragHandle>
            );
          case "homepageHero":
            return (
              <DragHandle key={block._key} blockKey={block._key} documentId={documentId} documentType={documentType}>
                <HomepageHero {...block} />
              </DragHandle>
            );
          case "genericHero":
            return (
              <DragHandle key={block._key} blockKey={block._key} documentId={documentId} documentType={documentType}>
                <GenericHero {...block} />
              </DragHandle>
            );
          case "textAndLinkBlock":
            return (
              <DragHandle key={block._key} blockKey={block._key} documentId={documentId} documentType={documentType}>
                <TextAndLinkBlock {...block} />
              </DragHandle>
            );
          case "listModule":
            return (
              <DragHandle key={block._key} blockKey={block._key} documentId={documentId} documentType={documentType}>
                <ListModule {...block} />
              </DragHandle>
            );
          case "featureList":
            return (
              <DragHandle key={block._key} blockKey={block._key} documentId={documentId} documentType={documentType}>
                <FeatureList {...block} />
              </DragHandle>
            );
          default:
            // This is a fallback for when we don't have a block type
            return (
              <div key={(block as { _key: string; _type: string })._key}>
                Block not found:
                {(block as { _key: string; _type: string })._type}
              </div>
            );
        }
      })}
    </main>
  );
}
