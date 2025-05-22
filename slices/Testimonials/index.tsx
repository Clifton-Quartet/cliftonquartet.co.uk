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
      className="font-script bg-cover bg-center bg-no-repeat bg-white text-yellow-100 leading-loose tracking-wide"
      style={{
        backgroundImage: slice.primary.background_image
          ? `url(${slice.primary.background_image.url})`
          : undefined,
        backgroundColor: slice.primary.background_color || undefined,
      }}
    >
      <div className="px-6 md:px-12 py-8 flex flex-col justify-center items-center">
        <SlideIn>
          <div className="text-3xl lg:text-5xl tracking-widest uppercase font-serif font-bold mt-4">
            <p>{slice.primary.title}</p>
          </div>
        </SlideIn>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full justify-center items-start mt-12">
          {slice.primary.testimonial.map((item, index) => (
            <SlideIn key={index}>
              <div className="text-lg lg:p-4">
                <PrismicRichText field={item.testimonial_message} />
                <p className="italic text-sm mt-2">{item.author}</p>
              </div>
            </SlideIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
