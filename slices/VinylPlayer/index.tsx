"use client";

import React, { useEffect, useRef, FC, useState } from "react";
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
  mp3_file: MP3AudioFile;
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
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [isChangingSong, setIsChangingSong] = useState(false);

  // Safely access the repertoire items with type assertion
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const items =
    ((slice.primary as any)?.repertoire_carousel as RepertoireItem[]) || [];

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

  const handleSongSelect = async (songUrl: string) => {
    if (currentSong === songUrl) return; // Don't change if same song

    setIsChangingSong(true);

    // Wait for vinyl player to animate out if there's a current song
    if (currentSong) {
      await new Promise((resolve) => setTimeout(resolve, 800)); // Wait for animation
    }

    setCurrentSong(songUrl);
    setIsChangingSong(false);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative min-h-[100vh] w-full overflow-hidden bg-cover bg-center flex flex-col justify-center items-center p-8 md:p-20"
      style={{
        backgroundImage: slice.primary.background_image
          ? `url(${slice.primary.background_image.url})`
          : "",
        backgroundColor: slice.primary.background_color
          ? `${slice.primary.background_color}`
          : "",
      }}
    >
      <div
        className="plant absolute top-[60%] 2xl:top-[55%] left-4 w-[300px] h-[300px] 2xl:w-[500px] 2xl:h-[500px] 3xl:w-[700px] 3xl:h-[700px] hidden lg:block z-20"
        style={{
          backgroundImage: slice.primary.aside_image_1_desktop_only
            ? `url(${slice.primary.aside_image_1_desktop_only.url})`
            : "",
        }}
      ></div>
      <div
        className="plant-with-flowers absolute top-[55%] 2xl:top-[50%] right-4 w-[300px] h-[300px] 2xl:w-[450px] 2xl:h-[450px] 3xl:w-[700px] 3xl:h-[700px] hidden lg:block rotate-90 z-20"
        style={{
          backgroundImage: slice.primary.aside_image_2_desktop_only
            ? `url(${slice.primary.aside_image_2_desktop_only.url})`
            : "",
        }}
      ></div>
      <div className="relative flex flex-col items-center w-full justify-center">
        <div className="lg:w-2/3">
          <SlideIn>
            <h2 className="relative uppercase font-bold tracking-widest text-yellow-100 text-center text-4xl lg:text-6xl mb-6">
              {slice.primary.title}
            </h2>
          </SlideIn>
          <div className="glass-bright p-10 mb-12 backdrop-blur-lg">
            <SlideIn>
              <div className="relative font-sans text-yellow-100 text-center z-10 max-w-4xl text-xl mx-auto">
                <PrismicRichText field={slice.primary.text} />
              </div>
            </SlideIn>
          </div>
        </div>

        {/* Song Selection Buttons */}
        <p className="text-2xl text-yellow-100 font-extralight font-sans mb-6 text-center">
          Select a song and press Start on the record player to play it
        </p>
        <div className="flex flex-wrap gap-4 mb-8 justify-center font-sans">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSongSelect(item.mp3_file.url)}
              disabled={isChangingSong}
              className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 cursor-pointer ${
                currentSong === item.mp3_file.url
                  ? "bg-yellow-100 text-black shadow-lg"
                  : "bg-amber-950 text-yellow-100 border border-yellow-100 hover:bg-yellow-100/10 hover:border-yellow-500"
              } ${isChangingSong ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {item.song}
            </button>
          ))}
        </div>

        <div className="w-[150%] md:w-[100%] lg:w-[80%]">
          <VinylPlayer song={currentSong} isChangingSong={isChangingSong} />
        </div>
      </div>
      <div className="relative w-[100vw] overflow-hidden mt-6 hidden">
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
        <div
          className="vinyl-container hidden md:block w-[26%] p-6 lg:p-20 lg:w-[30%] aspect-square mx-auto perspective-1000 cursor-pointer"
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
        >
          <div
            className={
              "relative w-full h-full transition-transform duration-700"
            }
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${isFlipped ? 180 : 0}deg) rotateZ(${isFlipped ? 3 : -12}deg)`,
            }}
          >
            <div
              className="vinyl-shadow absolute w-full h-full backface-hidden shadow-xl rounded-lg overflow-hidden bg-cover"
              style={{
                backgroundImage: `url(${slice.primary.vinyl_cover.url})`,
                transform: "translateZ(6px)",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.9)",
              }}
            ></div>

            <div
              className="vinyl-shadow absolute w-full h-full backface-hidden shadow-lg rounded-lg bg-cover text-white rotate-y-180 p-2 overflow-y-auto"
              style={{
                backgroundImage: `url(${slice.primary.vinyl_back.url})`,
                transform: "rotateY(180deg) translateZ(6px)",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.9)",
              }}
            >
              <div className="p-1">
                <p>Side A</p>
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex text-sm xl:text-base w-1/2 font-sans"
                  >
                    <p className="mr-1">{index + 1}.</p>
                    <p>
                      {item.artist} {item.artist ? "-" : ""} {item.song}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Repertoire;
