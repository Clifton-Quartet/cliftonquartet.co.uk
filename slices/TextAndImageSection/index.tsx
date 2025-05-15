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
      className="bg-cover bg-center bg-no-repeat min-h-[100vh] max-h-[110vh] overflow-hidden"
      style={{
        backgroundImage: slice.primary.background_image
          ? `url(${slice.primary.background_image.url})`
          : undefined,
        backgroundColor: slice.primary.background_color || undefined,
      }}
    >
      <div className="container mx-auto px-4 py-8 min-h-[100vh] flex justify-center items-center">
        <div className="glass-bright w-full p-4">
          <div className="text-6xl tracking-widest text-slate-800 mt-4">
            <PrismicRichText field={slice.primary.title} />
          </div>
          <div className="text-slate-800 text-2xl leading-10 mt-16">
            <PrismicRichText field={slice.primary.paragraph_1} />
            <PrismicRichText field={slice.primary.paragraph_2} />
            <PrismicRichText field={slice.primary.paragraph_3} />
            <PrismicRichText field={slice.primary.paragraph_4} />
            <PrismicRichText field={slice.primary.paragraph_5} />
            <PrismicRichText field={slice.primary.paragraph_6} />
            <PrismicRichText field={slice.primary.paragraph_7} />
            <PrismicRichText field={slice.primary.paragraph_8} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Weddings;
