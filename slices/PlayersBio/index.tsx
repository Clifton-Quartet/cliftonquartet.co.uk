import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { SlideIn } from "@/components/SlideIn";

/**
 * Props for `PlayersBio`.
 */
export type PlayersBioProps = SliceComponentProps<Content.PlayersBioSlice>;

/**
 * Component for "PlayersBio" Slices.
 */
const PlayersBio: FC<PlayersBioProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden min-h-full font-sans leading-loose text-yellow-900"
      style={{
        backgroundColor: slice.primary.background_color || undefined,
      }}
    >
      <div className="p-8 lg:p-16">
        <SlideIn>
          <div className="font-serif uppercase font-bold tracking-widest text-5xl lg:text-7xl mb-4">
            <PrismicRichText field={slice.primary.title} />
          </div>
        </SlideIn>
        <SlideIn>
          <div className="text-2xl lg:text-4xl">
            <PrismicRichText field={slice.primary.sub_heading} />
          </div>
        </SlideIn>
      </div>
      <div className="p-8 lg:p-16 flex flex-col sm:grid sm:grid-cols-2 xl:grid-cols-4 justify-center gap-16">
        {slice.primary.player_bio.map((item, index) => (
          <div key={index} className="flex flex-col gap-4 justify-center">
            <div
              className="w-full aspect-square bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${item.player_photo.url})`,
              }}
            ></div>
            <div className="text-xl">
              <div className="text-3xl font-bold">
                <PrismicRichText field={item.player_name} />
              </div>
              <PrismicRichText field={item.player_bio} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlayersBio;
