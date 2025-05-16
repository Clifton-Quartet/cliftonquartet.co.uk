import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import RepertoirePlaylist from "@/components/RepertoirePlaylist";
import TrioRepertoirePlaylist from "@/components/TrioRepertoirePlaylist";
import { PrismicNextLink } from "@prismicio/next";

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
      <div className="flex flex-col justify-center items-center bg-[#fcf2bd] my-10 p-10">
        <h3 className="text-3xl text-slate-900 text-center">
          {slice.primary.text}
        </h3>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6">
          <button className="px-4 py-2 bg-slate-900 rounded-lg hover:bg-slate-500 transition-colors cursor-pointer text-[#fcf2bd]">
            <PrismicNextLink field={slice.primary.phone_number} />
          </button>
          <button className="px-4 py-2 bg-slate-900 rounded-lg hover:bg-slate-500 transition-colors cursor-pointer text-[#fcf2bd]">
            <PrismicNextLink field={slice.primary.email} />
          </button>
        </div>
      </div>
      <TrioRepertoirePlaylist trioRepertoire={trioRepertoire} />
    </section>
  );
};

export default TheRepertoire;
