import React from "react";
import { Metadata } from "next";
import { loadPage } from "@/lib/pageLoader";
import PageRenderer from "@/components/PageRenderer";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return [
    { slug: "sizzle-drizzle-combo-pack" },
    { slug: "the-trio" },
    { slug: "original-mayo" },
    { slug: "potato-chips" },
    { slug: "fancy-mayo" },
    { slug: "garlic-aioli" },
    { slug: "drizzle" },
    { slug: "sizzle" },
    { slug: "drizzle-refill-can" },
    { slug: "sizzle-refill-can" },
    { slug: "duo-refill-can" },
    { slug: "sizzle-bag-in-box" },
    { slug: "the-graza-tote" },
    { slug: "the-starter-kit" },
    { slug: "gift-set-drizzle-sizzle" },
  ];
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageData = loadPage("products", slug);
  return {
    title: pageData.title || `Product | SRSTI`,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const pageData = loadPage("products", slug);
  return <PageRenderer pageData={pageData} />;
}
