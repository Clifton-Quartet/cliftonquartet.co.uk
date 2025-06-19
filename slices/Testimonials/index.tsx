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
      className={`bg-cover bg-center bg-no-repeat bg-${slice.primary.background_color} text-${slice.primary.text_color} leading-loose tracking-wide min-h-[100vh] flex justify-center items-center`}
    >
      <div className="px-6 md:px-12 py-8 flex flex-col justify-center items-center">
        <SlideIn>
          <div className="text-3xl lg:text-5xl tracking-widest uppercase font-serif font-bold mt-4">
            <p>{slice.primary.title}</p>
          </div>
        </SlideIn>
        <SlideIn>
          <div className="font-sans grid grid-cols-1 lg:grid-cols-2 gap-12 w-full justify-center items-start mt-12">
            {slice.primary.testimonial.map((item, index) => (
              <div key={index} className="text-lg lg:p-4">
                <PrismicRichText field={item.testimonial_message} />
                <p className="italic text-sm mt-2">{item.author}</p>
              </div>
            ))}
          </div>
        </SlideIn>
      </div>
    </section>
  );
};

export default Testimonials;
