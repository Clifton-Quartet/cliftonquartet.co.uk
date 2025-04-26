import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Repertoire`.
 */
export type RepertoireProps = SliceComponentProps<Content.RepertoireSlice>;

/**
 * Component for "Repertoire" Slices.
 */
const Repertoire: FC<RepertoireProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for repertoire (variation: {slice.variation}) Slices
    </section>
  );
};

export default Repertoire;
