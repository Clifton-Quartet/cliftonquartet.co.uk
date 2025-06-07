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
      className={`bg-${slice.primary.background_color}`}
    >
      <div className="flex flex-col sm:flex-row">
        {slice.primary.image_1 ? (
          <div className="w-full h-full">
            <SlideIn>
              <PrismicNextImage
                field={slice.primary.image_1}
                className="aspect-video h-full w-full"
              />
            </SlideIn>
          </div>
        ) : (
          <div></div>
        )}
        {slice.primary.image_2 ? (
          <div className="w-full h-full">
            <SlideIn>
              <PrismicNextImage
                field={slice.primary.image_2}
                className="aspect-video h-full w-full"
              />
            </SlideIn>
          </div>
        ) : (
          <div></div>
        )}
        {slice.primary.image_3 ? (
          <div className="w-full h-full hidden sm:block">
            <SlideIn>
              <PrismicNextImage
                field={slice.primary.image_3}
                className="aspect-video h-full w-full"
              />
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
