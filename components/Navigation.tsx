"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import type { Content } from "@prismicio/client";
import gsap from "gsap";

export function Navigation() {
  const [settings, setSettings] = useState<Content.SettingsDocument | null>(
    null
  );
  const pathname = usePathname();
  const navRef = useRef<HTMLUListElement>(null);
  const navItemsRef = useRef<HTMLLIElement[]>([]);

  useEffect(() => {
    async function fetchSettings() {
      const client = createClient();
      const data = await client.getSingle("settings");
      setSettings(data);
    }
    fetchSettings();
  }, []);

  useEffect(() => {
    // Animation runs after settings are loaded and navigation items are rendered
    if (settings && navRef.current) {
      // Get all list items for the animation
      const navItems = navRef.current.querySelectorAll("li");

      // Set initial state - positioned outside the screen
      gsap.set(navItems, {
        x: 200,
        immediateRender: true,
      });

      // Animate each item in with a stagger effect
      gsap.to(navItems, {
        x: 0, // Move to original position
        duration: 1, // Animation duration
        stagger: 0.3, // 300ms between each animation
        delay: 1.6,
        ease: "power3.out", // Smooth easing function
      });

      navItems.forEach((item) => {
        if (!item.classList.contains("active")) {
          item.addEventListener("mouseenter", () => {
            gsap.to(item, { x: -30, duration: 0.3 });
          });
          item.addEventListener("mouseleave", () => {
            gsap.to(item, { x: 0, duration: 0.3 });
          });
        }
      });
    }
  }, [settings]); // Run animation when settings are loaded

  const addToNavItemsRef = (el: HTMLLIElement | null, index: number) => {
    if (el && !navItemsRef.current.includes(el)) {
      navItemsRef.current[index] = el;
    }
  };

  if (!settings) return null;

  return (
    <ul className="" ref={navRef}>
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
          <li
            key={`nav-${index}`}
            className="relative glass m-2 backdrop-blur-sm translate-x-8 group cursor-pointer"
            ref={(el) => addToNavItemsRef(el, index)}
          >
            <PrismicNextLink
              field={item.navigation_link}
              className={`relative text-white m-2 px-8 py-4 w-full z-20 text-left pr-20 inline-block ${
                isActive ? "opacity-100" : "opacity-70 group-hover:opacity-90"
              }`}
            />
          </li>
        );
      })}
    </ul>
  );
}
