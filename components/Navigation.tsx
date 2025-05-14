"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import type { Content } from "@prismicio/client";

export function Navigation() {
  const [settings, setSettings] = useState<Content.SettingsDocument | null>(
    null
  );

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
      {settings.data.navigation.map((item) => (
        <li key={item.navigation_link.text}>
          <PrismicNextLink field={item.navigation_link} />
        </li>
      ))}
    </ul>
  );
}
