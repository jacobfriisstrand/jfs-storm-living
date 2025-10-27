import type { PAGE_QUERYResult } from "@/sanity/types";

import { PageBuilder } from "@/components/core/page-builder";

type PageBuilderWrapperProps = {
  modules: NonNullable<PAGE_QUERYResult>["pageBuilder"];
  documentId: string;
  documentType: string;
};

export function PageBuilderWrapper(props: PageBuilderWrapperProps) {
  return <PageBuilder {...props} />;
}
