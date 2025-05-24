"use client";

import { FC } from "react";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import RepertoirePlaylist from "@/components/RepertoirePlaylist";
import TrioRepertoirePlaylist from "@/components/TrioRepertoirePlaylist";
import { PrismicNextLink } from "@prismicio/next";
import { SlideIn } from "@/components/SlideIn";

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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-slate-900 font-sans"
    >
      <SlideIn>
        <div className="text-yellow-100 font-extralight text-2xl text-center pt-12">
          <PrismicRichText field={slice.primary.title} />
        </div>
      </SlideIn>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 w-full text-center text-2xl text-slate-900 pt-12 px-4">
        <SlideIn>
          <button
            className="border w-full lg:w-fit px-6 py-3 rounded-xl bg-yellow-100 hover:bg-yellow-50 transition-colors cursor-pointer"
            onClick={() => scrollToSection("quartetRepertoire")}
          >
            String Quartet Repertoire
          </button>
        </SlideIn>
        <SlideIn>
          <button
            className="border w-full lg:w-fit px-6 py-3 rounded-xl bg-yellow-100 hover:bg-yellow-50 transition-colors cursor-pointer"
            onClick={() => scrollToSection("trioRepertoire")}
          >
            String Trio Repertoire
          </button>
        </SlideIn>
      </div>
      <RepertoirePlaylist repertoire={repertoire} />
      <SlideIn>
        <div className="flex flex-col justify-center items-center font-sans bg-yellow-950 my-10 p-10">
          <h3 className="text-3xl text-white text-center">
            {slice.primary.text}
          </h3>
          <div
            className={`flex flex-col md:flex-row ${slice.primary.phone_number.text ? "gap-4 md:gap-8" : ""} mt-6`}
          >
            {slice.primary.phone_number.text ? (
              <button className="bg-[#fcf2bd] rounded-lg hover:opacity-90 transition-colors cursor-pointer text-slate-900">
                <PrismicNextLink
                  field={slice.primary.phone_number}
                  className="px-4 py-2 block w-full h-full"
                />
              </button>
            ) : (
              <div></div>
            )}
            <button className="bg-[#fcf2bd] rounded-lg hover:opacity-90 transition-colors cursor-pointer text-slate-900">
              <PrismicNextLink
                field={slice.primary.email}
                className="px-4 py-2 block w-full h-full"
              />
            </button>
          </div>
        </div>
      </SlideIn>
      <TrioRepertoirePlaylist trioRepertoire={trioRepertoire} />
    </section>
  );
};

export default TheRepertoire;
