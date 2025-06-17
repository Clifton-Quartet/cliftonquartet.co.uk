import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { SlideIn } from "@/components/SlideIn";
import { ContactForm } from "@/components/ContactForm";

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
      className={`overflow-hidden font-sans leading-loose bg-${slice.primary.background_color} text-${slice.primary.text_color}`}
    >
      <ContactForm />
      <div className="min-h-[100vh] flex flex-col justify-center">
        <div className="p-8 lg:p-16">
          <SlideIn>
            <div className="font-serif uppercase font-bold tracking-widest text-3xl lg:text-5xl mb-4">
              <PrismicRichText field={slice.primary.title} />
            </div>
          </SlideIn>
          <SlideIn>
            <div className="text-xl lg:text-2xl">
              <PrismicRichText field={slice.primary.sub_heading} />
            </div>
          </SlideIn>
        </div>
        <div className="p-8 lg:p-16 flex flex-col sm:grid sm:grid-cols-2 xl:grid-cols-4 justify-center gap-16">
          {slice.primary.player_bio.map((item, index) => (
            <SlideIn key={index}>
              <div className="flex flex-col gap-4 justify-center">
                <div
                  className="w-full aspect-square bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${item.player_photo.url})`,
                  }}
                ></div>
                <div className="text-lg">
                  <div className="text-2xl font-bold">
                    <PrismicRichText field={item.player_name} />
                  </div>
                  <PrismicRichText field={item.player_bio} />
                </div>
              </div>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlayersBio;
