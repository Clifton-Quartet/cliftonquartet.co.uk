"use client";

import { FC, useEffect, useRef } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { Navigation } from "@/components/Navigation";
import { PrismicNextImage } from "@prismicio/next";

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = ({ slice }) => {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let tl: gsap.core.Timeline | null = null;

    const initAnimation = async () => {
      const { gsap } = await import("gsap/dist/gsap");

      gsap.set([backgroundRef.current, titleRef.current], {
        opacity: 0,
        force3D: true,
      });

      gsap.set(titleRef.current, { y: 50 });

      tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(backgroundRef.current, {
        opacity: 1,
        duration: 1.5,
      });

      tl.to(
        titleRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1.8,
        },
        "-=0.6"
      );
    };

    initAnimation();

    return () => {
      if (tl) {
        tl.kill();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="h-dvh overflow-hidden relative"
    >
      <div
        ref={backgroundRef}
        className="relative h-full w-full bg-cover bg-no-repeat bg-center opacity-0"
        style={{
          backgroundImage: `url(${slice.primary.background_image.url})`,
        }}
      >
        <PrismicNextImage
          field={slice.primary.background_image}
          fill
          className="object-cover"
          priority={true}
          quality={75}
          sizes="100vw"
          fallbackAlt=""
        />
      </div>
      <div
        ref={titleRef}
        className="absolute title-mobile bottom-8 left-8 select-none text-yellow-100"
        style={{
          opacity: 0,
        }}
      >
        {slice.primary.title}
      </div>
      <div className="absolute -right-11 top-[30%] min-[440px]:top-[50%] -translate-y-[50%] z-10">
        <Navigation />
      </div>
    </section>
  );
};
export default Hero;
