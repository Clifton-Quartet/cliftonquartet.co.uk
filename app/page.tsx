import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { generatePageMetadata } from "@/utils/generatePageMetadata";

export default async function Page() {
  const client = createClient();
  const page = await client
    .getSingle("clifton_quartet_homepage")
    .catch(() => notFound());

  return <SliceZone slices={page.data.slices} components={components} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getSingle("clifton_quartet_homepage")
    .catch(() => notFound());

  return {
    ...generatePageMetadata(page.data),
    verification: {
      google: "Lhvy3OTu-DeE70yBntLkPIeXP0z5G2LzbrBSllNMdNk",
    },
  };
}
