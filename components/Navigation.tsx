"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import type { Content } from "@prismicio/client";

export function Navigation() {
  const [settings, setSettings] = useState<Content.SettingsDocument | null>(
    null
  );
  const pathname = usePathname();

  useEffect(() => {
    async function fetchSettings() {
      const client = createClient();
      const data = await client.getSingle("settings");
      setSettings(data);
    }
    fetchSettings();
  }, []);

  if (!settings) return null;

  return (
    <ul className="">
      {/* Use type assertion to access navigation array */}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {(settings.data as any).navigation.map((item: any, index: number) => {
        // Extract URL from the link field
        let linkUrl = "/";
        const link = item.navigation_link;

        // Handle different link types
        if (link.link_type === "Web" && link.url) {
          linkUrl = link.url;
        } else if (link.link_type === "Document" && link.uid) {
          // Adjust this based on your routing structure
          linkUrl =
            link.type === "page" ? `/${link.uid}` : `/${link.type}/${link.uid}`;
        }

        // Check if current path matches the link
        const isActive =
          linkUrl === pathname ||
          (linkUrl !== "/" && pathname.startsWith(linkUrl));

        return (
          <li key={`nav-${index}`} className="relative glass m-2 p-4">
            <PrismicNextLink
              field={item.navigation_link}
              className={`relative text-white m-2 p-4 z-10 text-center ${
                isActive ? "opacity-100" : "opacity-70 hover:opacity-90"
              }`}
            />
          </li>
        );
      })}
    </ul>
  );
}
