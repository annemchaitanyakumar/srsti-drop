import React from "react";
import { Metadata } from "next";
import { loadPage } from "@/lib/pageLoader";
import PageRenderer from "@/components/PageRenderer";

interface CollectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { slug: "all" },
    { slug: "bundles" },
    { slug: "gifts" },
    { slug: "olive-oil" },
  ];
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = loadPage("collections", slug);
  return {
    title: pageData.title || `${slug.toUpperCase()} | SRSTI`,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const pageData = loadPage("collections", slug);
  return <PageRenderer pageData={pageData} />;
}
