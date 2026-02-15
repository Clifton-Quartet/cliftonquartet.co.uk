import { type Metadata } from "next";
import { asImageSrc, ImageFieldImage } from "@prismicio/client";

interface PrismicPageData {
  meta_title?: string | null;
  meta_description?: string | null;
  meta_image?: ImageFieldImage | null;
}

/**
 * Generate standard page metadata from a Prismic page document.
 * Eliminates duplicated SEO boilerplate across all page files.
 */
export function generatePageMetadata(data: PrismicPageData): Metadata {
  const imageUrl = data.meta_image ? asImageSrc(data.meta_image) : null;

  return {
    title: data.meta_title,
    description: data.meta_description,
    authors: [{ name: "Clifton Quartet" }],
    creator: "Clifton Quartet",
    publisher: "Clifton Quartet",

    openGraph: {
      title: data.meta_title || undefined,
      description: data.meta_description || undefined,
      type: "website",
      locale: "en_GB",
      siteName: "Clifton Quartet",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: data.meta_title || "Clifton Quartet",
            },
          ]
        : undefined,
    },

    twitter: {
      card: "summary_large_image",
      title: data.meta_title || undefined,
      description: data.meta_description || undefined,
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
