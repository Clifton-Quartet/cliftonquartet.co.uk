import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { SlideIn } from "@/components/SlideIn";

/**
 * Props for `Weddings`.
 */
export type WeddingsProps = SliceComponentProps<Content.WeddingsSlice>;

/**
 * Component for "Weddings" Slices.
 */
const Weddings: FC<WeddingsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden min-h-full font-sans"
      style={{
        backgroundColor: slice.primary.background_color || undefined,
      }}
    >
      <div className="text-2xl">
        <div className="lg:grid lg:grid-cols-4 leading-loose tracking-wide items-center">
          <div className="lg:col-span-3 bg-yellow-100 text-yellow-900 flex flex-col justify-center p-16">
            <SlideIn>
              <div className="font-serif uppercase font-bold tracking-widest text-7xl mb-4">
                <PrismicRichText field={slice.primary.title} />
              </div>
            </SlideIn>
            <SlideIn>
              <PrismicRichText field={slice.primary.paragraph_1} />
            </SlideIn>
            <SlideIn>
              <div className="mt-4">
                <PrismicRichText field={slice.primary.paragraph_2} />
              </div>
            </SlideIn>
            <div className="mt-4">
              <SlideIn>
                <PrismicRichText field={slice.primary.paragraph_3} />
              </SlideIn>
            </div>
          </div>
          <div
            className="lg:col-span-1 bg-cover bg-center bg-no-repeat aspect-video"
            style={{
              backgroundImage: `url(${slice.primary.image_1.url})`,
            }}
          ></div>
        </div>
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-4 leading-loose tracking-wide items-center">
          <div className="lg:col-span-1 bg-cover bg-center bg-no-repeat aspect-video">
            <div
              className="bg-cover bg-center bg-no-repeat h-full"
              style={{
                backgroundImage: `url(${slice.primary.image_2.url})`,
              }}
            ></div>
          </div>
          <div className="lg:col-span-3 bg-yellow-100 text-yellow-900 flex flex-col justify-center p-16">
            {slice.primary.paragraph_4 ? (
              <div>
                <SlideIn>
                  <PrismicRichText field={slice.primary.paragraph_4} />
                </SlideIn>
              </div>
            ) : (
              <div></div>
            )}
            {slice.primary.paragraph_5 ? (
              <div className="mt-4">
                <SlideIn>
                  <PrismicRichText field={slice.primary.paragraph_5} />
                </SlideIn>
              </div>
            ) : (
              <div></div>
            )}
            {slice.primary.paragraph_6 ? (
              <div className="mt-4">
                <SlideIn>
                  <PrismicRichText field={slice.primary.paragraph_6} />
                </SlideIn>
              </div>
            ) : (
              <div></div>
            )}
            {slice.primary.paragraph_7 ? (
              <div className="mt-4">
                <SlideIn>
                  <PrismicRichText field={slice.primary.paragraph_7} />
                </SlideIn>
              </div>
            ) : (
              <div></div>
            )}
            {slice.primary.paragraph_8 ? (
              <div className="mt-4">
                <SlideIn>
                  <PrismicRichText field={slice.primary.paragraph_8} />
                </SlideIn>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Weddings;
