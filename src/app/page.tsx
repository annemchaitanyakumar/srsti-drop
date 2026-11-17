import React from "react";
import { Metadata } from "next";
import { loadPage } from "@/lib/pageLoader";
import PageRenderer from "@/components/PageRenderer";

export const metadata: Metadata = {
  title: "Real Olive Oil Squeeze Bottles – SRSTI",
};

export default function HomePage() {
  const pageData = loadPage("home");
  return <PageRenderer pageData={pageData} />;
}
