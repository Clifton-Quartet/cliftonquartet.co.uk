import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import RepertoirePlaylist from "@/components/RepertoirePlaylist";
import TrioRepertoirePlaylist from "@/components/TrioRepertoirePlaylist";

// Define the type for your repertoire documents
type StringQuartetRepertoire = Content.StringQuartetRepertoireDocument;
type StringTrioRepertoire = Content.StringTrioRepertoireDocument;

// Define the context type
type SliceContext = {
  repertoire: StringQuartetRepertoire[];
  trioRepertoire: StringTrioRepertoire[];
};

export type TheRepertoireProps = SliceComponentProps<
  Content.TheRepertoireSlice,
  SliceContext
>;

const TheRepertoire: FC<TheRepertoireProps> = ({ slice, context }) => {
  const repertoire = context?.repertoire || [];
  const trioRepertoire = context?.trioRepertoire || [];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-amber-100"
    >
      <RepertoirePlaylist repertoire={repertoire} />
      <TrioRepertoirePlaylist trioRepertoire={trioRepertoire} />
    </section>
  );
};

export default TheRepertoire;
