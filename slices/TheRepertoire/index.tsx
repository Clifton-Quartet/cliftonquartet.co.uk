import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import RepertoirePlaylist from "@/components/RepertoirePlaylist";

// Define the type for your repertoire documents
type StringQuartetRepertoire = Content.StringQuartetRepertoireDocument;

// Define the context type
type SliceContext = {
  repertoire: StringQuartetRepertoire[];
};

export type TheRepertoireProps = SliceComponentProps<
  Content.TheRepertoireSlice,
  SliceContext
>;

const TheRepertoire: FC<TheRepertoireProps> = ({ slice, context }) => {
  const repertoire = context?.repertoire || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-amber-50"
    >
      <RepertoirePlaylist repertoire={repertoire} />
    </section>
  );
};

export default TheRepertoire;
