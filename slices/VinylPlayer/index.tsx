"use client";

import React, { useEffect, useRef, FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import CarouselItem from "@/components/CarouselItem";
import gsap from "gsap";
import VinylPlayer from "@/components/VinylPlayer";
import { SlideIn } from "@/components/SlideIn";

/**
 * Type definitions for MP3 files and repertoire items
 */
interface MP3AudioFile {
  link_type: string;
  key: string;
  kind: string;
  id: string;
  url: string;
  name: string;
  size: string;
  text: string;
}

interface RepertoireItem {
  artist: string;
  song: string;
}

/**
 * Type for the component props using Prismic's SliceComponentProps
 */
export type RepertoireProps = SliceComponentProps<Content.RepertoireSlice>;

/**
 * Component for "Repertoire" Slices.
 */
const Repertoire: FC<RepertoireProps> = ({ slice }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  // Safely access the repertoire items with type assertion
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const items =
    ((slice.primary as any)?.repertoire_carousel as RepertoireItem[]) || [];

  // Extract song URLs
  const songUrl: string = (slice.primary.mp3_song as MP3AudioFile).url;

  console.log("Song:", songUrl);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;

    const container = containerRef.current;
    const itemWidth = 182; // Width of a single carousel item
    const totalWidth = itemWidth * items.length;
    const containerWidth = window.innerWidth; // Use viewport width

    // Kill any existing animations
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Initial position: start off-screen to the right
    gsap.set(container, {
      width: totalWidth,
      x: containerWidth, // Start from right edge of screen
    });

    // Create animation timeline
    const tl = gsap.timeline({
      repeat: -1, // Infinite repeat
    });

    // Animate from right to left (past the left edge)
    tl.to(container, {
      x: -totalWidth, // Move past the left edge
      duration: items.length * 2, // Duration based on number of items
      ease: "linear",
      onComplete: () => {
        // This won't run due to the repeat: -1, but included for clarity
        gsap.set(container, { x: containerWidth });
      },
    });

    // After the carousel moves off screen to the left, reset it to the right
    tl.set(container, {
      x: containerWidth, // Reset to right side
      immediateRender: false, // Important for smooth looping
    });

    // Store the timeline reference for cleanup
    animationRef.current = tl;

    // Handle window resize
    const handleResize = () => {
      if (tl && containerRef.current) {
        const newContainerWidth = window.innerWidth;

        // Pause animation
        tl.pause();

        // Reset position based on new viewport width
        gsap.set(container, { x: newContainerWidth });

        // Resume animation
        tl.restart();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [items.length]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-[100vh] w-full overflow-hidden bg-cover bg-center flex flex-col justify-center items-center p-8 md:p-20"
      style={{
        backgroundImage: `url(${slice.primary.background_image.url})`,
      }}
    >
      <div className="plant absolute top-[50%] 2xl:top-[35%] left-4 w-[300px] h-[300px] 2xl:w-[500px] 2xl:h-[500px] 3xl:w-[700px] 3xl:h-[700px] hidden lg:block z-20"></div>
      <div className="plant-with-flowers absolute top-[45%] 2xl:top-[30%] right-4 w-[300px] h-[300px] 2xl:w-[450px] 2xl:h-[450px] 3xl:w-[700px] 3xl:h-[700px] hidden lg:block rotate-90 z-20"></div>
      <div className="relative flex flex-col items-center w-full justify-center">
        <div className="lg:w-2/3">
          <SlideIn>
            <h2 className="relative text-white text-center text-7xl mb-6">
              {slice.primary.title}
            </h2>
          </SlideIn>
          <SlideIn>
            <div className="relative text-white text-center mb-12 max-w-4xl text-2xl mx-auto">
              <PrismicRichText field={slice.primary.text} />
            </div>
          </SlideIn>
        </div>
        <div className="w-[150%] md:w-[100%] lg:w-[80%]">
          <VinylPlayer song={songUrl} />
        </div>
      </div>
      <div className="relative w-[100vw] overflow-hidden mt-6">
        <div
          className="flex items-start py-6 md:hidden"
          ref={containerRef}
          style={{ willChange: "transform", position: "relative" }}
        >
          {items.map((item, index) => (
            <CarouselItem
              key={index}
              trackNumber={index}
              artist={item.artist}
              song={item.song}
            />
          ))}
        </div>
        <div className="hidden md:block text-center">
          {items.map((item, index) => (
            <div key={index} className="flex justify-center">
              <p className="mr-1">{index + 1}.</p>
              <p>
                {item.artist} {item.artist ? "-" : ""} {item.song}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Repertoire;
