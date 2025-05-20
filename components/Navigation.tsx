"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/prismicio";
import type { Content } from "@prismicio/client";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import TransitionPrismicLink from "./TransitionPrismicLink";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0.3, 0.4, 0.8");

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
    if (settings && navRef.current) {
      // Get all list items for the animation
      const navItems = navRef.current.querySelectorAll("li");

      // Set initial state - positioned outside the screen
      gsap.set(navItems, {
        x: 250,
        immediateRender: true,
      });

      // Animate all items with the same stagger effect
      // but with different end positions based on active state
      gsap.to(navItems, {
        x: (index) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const link = (settings.data as any).navigation[index].navigation_link;
          let itemLinkUrl = "/";

          // Handle different link types
          if (link.link_type === "Web" && link.url) {
            itemLinkUrl = link.url;
          } else if (link.link_type === "Document" && link.uid) {
            itemLinkUrl =
              link.type === "page"
                ? `/${link.uid}`
                : `/${link.type}/${link.uid}`;
          }

          // Check if this specific item is active
          const isItemActive =
            itemLinkUrl === pathname ||
            (itemLinkUrl !== "/" && pathname.startsWith(itemLinkUrl));

          // Return the target position based on active state
          return isItemActive ? -30 : 0;
        },
        duration: 1.5,
        stagger: 0.3, // Same stagger effect for all items
        delay: 1.3,
        ease: "hop",
      });

      // Store event handler references to remove them later
      const enterHandlers: (() => void)[] = [];
      const leaveHandlers: (() => void)[] = [];

      navItemsRef.current.forEach((item, index) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const link = (settings.data as any).navigation[index].navigation_link;
        let itemLinkUrl = "/";

        // Handle different link types
        if (link.link_type === "Web" && link.url) {
          itemLinkUrl = link.url;
        } else if (link.link_type === "Document" && link.uid) {
          itemLinkUrl =
            link.type === "page" ? `/${link.uid}` : `/${link.type}/${link.uid}`;
        }

        // Check if this specific item is active
        const isItemActive =
          itemLinkUrl === pathname ||
          (itemLinkUrl !== "/" && pathname.startsWith(itemLinkUrl));

        // Only add hover animations to inactive items
        if (!isItemActive) {
          const enterHandler = () => {
            gsap.to(item, { x: -30, duration: 0.3 });
          };
          const leaveHandler = () => {
            gsap.to(item, { x: 0, duration: 0.3 });
          };

          item.addEventListener("mouseenter", enterHandler);
          item.addEventListener("mouseleave", leaveHandler);

          enterHandlers[index] = enterHandler;
          leaveHandlers[index] = leaveHandler;
        }
      });

      // Cleanup function
      return () => {
        navItemsRef.current.forEach((item, index) => {
          if (enterHandlers[index])
            item.removeEventListener("mouseenter", enterHandlers[index]);
          if (leaveHandlers[index])
            item.removeEventListener("mouseleave", leaveHandlers[index]);
        });
      };
    }
  }, [settings, pathname]);

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
            className="relative glass mx-2 my-4 backdrop-blur-sm translate-x-8 group cursor-pointer"
            ref={(el) => addToNavItemsRef(el, index)}
          >
            <TransitionPrismicLink
              field={item.navigation_link}
              className={`relative text-white font-sans m-2 px-6 py-2 w-full z-20 text-left pr-20 inline-block ${
                isActive ? "opacity-100" : "opacity-50 group-hover:opacity-90"
              }`}
              isActive={isActive}
            ></TransitionPrismicLink>
          </li>
        );
      })}
    </ul>
  );
}
