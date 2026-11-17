import React from "react";
import { Metadata } from "next";
import { loadPage } from "@/lib/pageLoader";
import PageRenderer from "@/components/PageRenderer";

interface ContentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { slug: "about-us" },
    { slug: "faqs" },
    { slug: "glog" },
    { slug: "store-locator" },
    { slug: "subscribe" },
  ];
}

export async function generateMetadata({
  params,
}: ContentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = loadPage("pages", slug);
  return {
    title: pageData.title || `Page | SRSTI`,
  };
}

export default async function ContentPage({ params }: ContentPageProps) {
  const { slug } = await params;
  const pageData = loadPage("pages", slug);
  return <PageRenderer pageData={pageData} />;
}
