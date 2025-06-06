import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { ViolinPhysics, InstrumentConfig } from "@/components/ViolinPhysics";

/**
 * Props for `AnimatedInstruments`.
 */
export type AnimatedInstrumentsProps =
  SliceComponentProps<Content.AnimatedInstrumentsSlice>;

/**
 * Component for "AnimatedInstruments" Slices.
 */
const AnimatedInstruments: FC<AnimatedInstrumentsProps> = ({ slice }) => {
  const violinConfig: InstrumentConfig = {
    url: "/images/violin.png",
    width: 110,
    height: 320,
    quantity: 4,
    options: {
      restitution: 0.3,
      friction: 0.1, // Some friction
      density: 0.003, // Light
    },
  };

  const violinBowConfig: InstrumentConfig = {
    url: "/images/fiddlestick.png",
    width: 20,
    height: 280,
    quantity: 6,
    options: {
      restitution: 0.5,
      friction: 0.05, // Slippery
      density: 0.001, // Very light
    },
  };

  const celloConfig: InstrumentConfig = {
    url: "/images/cello.png",
    width: 160,
    height: 490,
    quantity: 2,
    options: {
      restitution: 0.1, // Medium bounce
      friction: 0.2, // More friction
      density: 0.006, // Heavier
    },
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex justify-center bg-slate-900"
    >
      <div className="relative h-[75vh] xl:h-[100vh] w-full xl:w-[75vw] max-w-[1920px] ~p-10/16 md:my-16">
        <PrismicNextImage
          field={slice.primary.background_image}
          alt=""
          fill
          className="object-cover"
          width={1200}
        />
        <ViolinPhysics
          violinConfig={violinConfig}
          violinBowConfig={violinBowConfig}
          celloConfig={celloConfig}
          className="absolute inset-0 pointer-events-auto"
        />
      </div>
    </section>
  );
};

export default AnimatedInstruments;
