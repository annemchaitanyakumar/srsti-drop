import React from "react";
import ClientInit from "./ClientInit";
import { PageData } from "@/lib/pageLoader";

export default function PageRenderer({ pageData }: { pageData: PageData }) {
  return (
    <>
      <ClientInit bodyClass={pageData.bodyClass} dataPage={pageData.dataPage} />
      <div
        id="srsti-page-wrapper"
        dangerouslySetInnerHTML={{ __html: pageData.bodyContent }}
        suppressHydrationWarning
      />
    </>
  );
}
