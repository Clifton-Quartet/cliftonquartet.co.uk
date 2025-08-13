import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("the_players").catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("the_players").catch(() => notFound());

  const metaImage = page.data.meta_image;
  const imageUrl = metaImage ? asImageSrc(metaImage) : null;

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    authors: [{ name: "Clifton Quartet" }],
    creator: "Clifton Quartet",
    publisher: "Clifton Quartet",

    openGraph: {
      title: page.data.meta_title || undefined,
      description: page.data.meta_description || undefined,
      type: "website",
      locale: "en_GB",
      siteName: "Clifton Quartet",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: page.data.meta_title || "Clifton Quartet",
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: page.data.meta_title || undefined,
      description: page.data.meta_description || undefined,
      images: imageUrl ? [imageUrl] : undefined,
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
