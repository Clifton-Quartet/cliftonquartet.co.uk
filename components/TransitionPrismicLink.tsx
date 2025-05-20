"use client";

import { PrismicNextLink } from "@prismicio/next";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface TransitionPrismicLinkProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  className?: string;
  children?: React.ReactNode;
  isActive?: boolean; // Add this prop
}

export default function TransitionPrismicLink({
  field,
  className,
  children,
  isActive = false, // Default to false
}: TransitionPrismicLinkProps) {
  const router = useRouter();

  // Create a function to get link URL from Prismic field
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getLinkUrl = (link: any): string => {
    if (!link) return "/";

    if (link.link_type === "Web" && link.url) {
      return link.url;
    } else if (link.link_type === "Document" && link.uid) {
      return link.type === "page"
        ? `/${link.uid}`
        : `/${link.type}/${link.uid}`;
    }

    return "/";
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Skip transition if this is the active link
    if (isActive) {
      e.preventDefault(); // Prevent any navigation
      return;
    }

    // Determine if this is an external link
    const isExternal =
      field.link_type === "Web" &&
      field.url?.startsWith("http") &&
      !field.url.startsWith(window.location.origin);

    // Skip transition for external links
    if (isExternal) {
      return; // Let PrismicNextLink handle external links normally
    }

    e.preventDefault();

    // Get the target URL
    const href = getLinkUrl(field);

    // Get the overlay element
    const overlay = document.getElementById("page-transition-overlay");
    if (!overlay) {
      // Fallback if overlay not found
      router.push(href);
      return;
    }

    // Fade in animation
    gsap.set(overlay, { visibility: "visible" });
    gsap.to(overlay, {
      duration: 0.5,
      opacity: 1,
      ease: "power2.inOut",
      onComplete: () => {
        // Navigate after animation completes
        router.push(href);
      },
    });
  };

  return (
    <PrismicNextLink field={field} className={className} onClick={handleClick}>
      {children || field.text}
    </PrismicNextLink>
  );
}
