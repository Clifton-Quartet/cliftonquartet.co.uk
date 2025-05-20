"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function PageTransitionOverlay() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Fade out when new page is loaded
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Fade out the overlay when new page loads
    gsap.to(overlay, {
      duration: 0.5,
      opacity: 0,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(overlay, { visibility: "hidden" });
      },
    });
  }, [pathname]);

  return (
    <div
      id="page-transition-overlay"
      ref={overlayRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "black",
        zIndex: 9999,
        opacity: 0,
        visibility: "hidden",
        pointerEvents: "none",
      }}
    />
  );
}
