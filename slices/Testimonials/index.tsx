import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { SlideIn } from "@/components/SlideIn";

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials: FC<TestimonialsProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: slice.primary.background_image
          ? `url(${slice.primary.background_image.url})`
          : undefined,
        backgroundColor: slice.primary.background_color || undefined,
      }}
    >
      <div className="container mx-auto px-4 md:px-12 py-8 flex flex-col justify-center items-center py-32">
        <SlideIn>
          <div className="text-6xl tracking-widest text-slate-800 mt-4">
            <p>{slice.primary.title}</p>
          </div>
        </SlideIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-[960px] justify-center items-center text-slate-900 mt-12">
          {slice.primary.testimonial.map((item, index) => (
            <div key={index} className="relative min-h-52">
              <div
                style={{
                  backgroundImage: `url(${item.background_image.url})`,
                }}
                className="flex flex-col justify-center bg-contain bg-no-repeat bg-center min-h-52 text-xl p-4"
              >
                <PrismicRichText field={item.testimonial_message} />
                <p className="italic text-sm mt-2">{item.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
