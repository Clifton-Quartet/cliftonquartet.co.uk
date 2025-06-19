import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { SlideIn } from "@/components/SlideIn";

/**
 * Props for `ImagesSection`.
 */
export type ImagesSectionProps =
  SliceComponentProps<Content.ImagesSectionSlice>;

/**
 * Component for "ImagesSection" Slices.
 */
const ImagesSection: FC<ImagesSectionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`bg-${slice.primary.background_color} py-8 md:py-12`}
    >
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 max-w-7xl mx-auto px-4">
        {slice.primary.image_1 && (
          <div className="flex-1 min-h-0">
            <SlideIn>
              <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
                <PrismicNextImage
                  field={slice.primary.image_1}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </SlideIn>
          </div>
        )}

        {slice.primary.image_2 && (
          <div className="flex-1 min-h-0">
            <SlideIn>
              <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
                <PrismicNextImage
                  field={slice.primary.image_2}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </SlideIn>
          </div>
        )}

        {slice.primary.image_3.url ? (
          <div className="flex-1 min-h-0 hidden sm:block">
            <SlideIn>
              <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg">
                <PrismicNextImage
                  field={slice.primary.image_3}
                  className="absolute inset-0 w-full h-full object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </SlideIn>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
};

export default ImagesSection;
