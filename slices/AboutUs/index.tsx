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
          className={`w-full p-4 md:p-12 ${slice.primary.background_image.url ? "glass-bright" : ""}`}
        >
          <SlideIn>
            <div className="text-6xl tracking-widest text-slate-800 mt-4">
              <PrismicRichText field={slice.primary.title} />
            </div>
          </SlideIn>
          <div className="text-slate-800 text-2xl leading-10 mt-16">
            <div className="flex flex-col lg:flex-row justify-center items-center mb-6">
              <div className="lg:w-1/2">
                <SlideIn>
                  <PrismicRichText field={slice.primary.paragraph_1} />
                </SlideIn>
                <SlideIn>
                  <PrismicRichText field={slice.primary.paragraph_2} />
                </SlideIn>
              </div>
              <div className="lg:w-1/2">
                <SlideIn>
                  <div className="photos-polaroid bg-white p-2 pb-10 rotate-3 mx-auto h-[230px] xl:h-[330px] my-10 shadow-2xl shadow-slate-900 w-fit">
                    <div
                      className="w-[250px] h-[160px] xl:w-[300px] xl:h-[220px] bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${slice.primary.image_1.url})`,
                      }}
                    ></div>
                  </div>
                </SlideIn>
              </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-row justify-center items-center ">
              <div className="lg:w-1/2">
                <SlideIn>
                  <div className="photos-polaroid bg-white p-2 pb-10 -rotate-3 mx-auto h-[230px] xl:h-[330px] my-10 shadow-2xl shadow-slate-900 w-fit">
                    <div
                      className="w-[250px] h-[160px] xl:w-[300px] xl:h-[220px] bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url(${slice.primary.image_2.url})`,
                      }}
                    ></div>
                  </div>
                </SlideIn>
              </div>
              <div className="lg:w-1/2">
                <SlideIn>
                  <PrismicRichText field={slice.primary.paragraph_3} />
                </SlideIn>
                <SlideIn>
                  <PrismicRichText field={slice.primary.paragraph_4} />
                </SlideIn>
                <SlideIn>
                  <PrismicRichText field={slice.primary.paragraph_5} />
                </SlideIn>
                <SlideIn>
                  <PrismicRichText field={slice.primary.paragraph_6} />
                </SlideIn>
                <SlideIn>
                  <PrismicRichText field={slice.primary.paragraph_7} />
                </SlideIn>
                <SlideIn>
                  <PrismicRichText field={slice.primary.paragraph_8} />
                </SlideIn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Weddings;
