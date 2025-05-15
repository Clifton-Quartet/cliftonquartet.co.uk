import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const [page, repertoire, trioRepertoire] = await Promise.all([
    client.getSingle("the_repertoire").catch(() => notFound()),
    client.getAllByType("string_quartet_repertoire", {
      orderings: [{ field: "document.created_at", direction: "desc" }],
    }),
    client.getAllByType("string_trio_repertoire", {
      orderings: [{ field: "document.created_at", direction: "desc" }],
    }),
  ]);

  return (
    <SliceZone
      slices={page.data.slices}
      components={components}
      context={{ repertoire, trioRepertoire }}
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("the_repertoire").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
