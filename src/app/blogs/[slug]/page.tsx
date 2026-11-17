import React from "react";
import { Metadata } from "next";
import { loadPage } from "@/lib/pageLoader";
import PageRenderer from "@/components/PageRenderer";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return [{ slug: "recipes" }];
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = loadPage("blogs", slug);
  return {
    title: pageData.title || `Blog | SRSTI`,
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const pageData = loadPage("blogs", slug);
  return <PageRenderer pageData={pageData} />;
}
