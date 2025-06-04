import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

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
    >
      <div className="flex">
        <div className="w-full h-full">
          <PrismicNextImage
            field={slice.primary.image_1}
            className="aspect-video h-full w-full"
          />
        </div>
        <div className="w-full h-full">
          <PrismicNextImage
            field={slice.primary.image_2}
            className="aspect-video h-full w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default ImagesSection;
