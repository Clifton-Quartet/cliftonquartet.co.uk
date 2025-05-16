import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

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
      className="bg-cover bg-center bg-no-repeat min-h-[100vh] overflow-hidden"
      style={{
        backgroundImage: slice.primary.background_image
          ? `url(${slice.primary.background_image.url})`
          : undefined,
        backgroundColor: slice.primary.background_color || undefined,
      }}
    >
      <div className="container mx-auto px-4 md:px-12 py-8 min-h-[100vh] flex justify-center items-center my-32">
        <div
          className={`w-full p-4 md:p-12 ${slice.primary.background_image ? "glass-bright" : ""}`}
        >
          <div className="text-6xl tracking-widest text-slate-800 mt-4">
            <PrismicRichText field={slice.primary.title} />
          </div>
          <div className="text-slate-800 text-2xl leading-10 mt-16">
            <div className="flex flex-col md:flex-row justify-center items-center mb-6">
              <div className="md:w-1/2">
                <PrismicRichText field={slice.primary.paragraph_1} />
                <PrismicRichText field={slice.primary.paragraph_2} />
              </div>
              <div className="bg-white p-2 pb-10 rotate-3 mx-auto min-h-[230px] max-h-[260px] my-10">
                <div className="min-w-[250px] max-w-[300px]">
                  <PrismicNextImage field={slice.primary.image_1} />
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-center items-center">
              <div className="bg-white p-2 pb-10 -rotate-3 mx-auto min-h-[230px] max-h-[260px] my-10">
                <div className="min-w-[250px] max-w-[300px]">
                  <PrismicNextImage field={slice.primary.image_2} />
                </div>
              </div>
              <div className="md:w-1/2">
                <PrismicRichText field={slice.primary.paragraph_3} />
                <PrismicRichText field={slice.primary.paragraph_4} />
                <PrismicRichText field={slice.primary.paragraph_5} />
                <PrismicRichText field={slice.primary.paragraph_6} />
                <PrismicRichText field={slice.primary.paragraph_7} />
                <PrismicRichText field={slice.primary.paragraph_8} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Weddings;
