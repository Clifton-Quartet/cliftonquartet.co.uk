"use client";

import { Content } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { ArrowBigUp } from "lucide-react";

interface FooterProps {
  footerData: Content.SettingsDocument["data"];
}

export default function Footer({ footerData }: FooterProps) {
  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  console.log("Footer data: ", footerData);

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-[#fdfe6c] my-10 p-10">
        <h3 className="text-3xl text-slate-900">{footerData.text}</h3>
        <div className="flex gap-8 mt-6">
          <button className="px-4 py-2 bg-slate-900 rounded-lg hover:bg-slate-500 transition-colors cursor-pointer text-[#fdfe6c]">
            <PrismicNextLink field={footerData.phone_number} />
          </button>
          <button className="px-4 py-2 bg-slate-900 rounded-lg hover:bg-slate-500 transition-colors cursor-pointer text-[#fdfe6c]">
            <PrismicNextLink field={footerData.email} />
          </button>
        </div>
      </div>
      <div className="relative grid grid-cols-1 md:grid-cols-3 items-center m-4">
        <div></div>
        <p className="text-center text-white text-sm">
          {footerData.footer_copyrigts}
        </p>
        <p className="text-right text-white text-sm">
          Designed and Developed by{" "}
          <a
            href="https://www.sergiocorreia.dev"
            target="_blank"
            className="text-[#fdfe6c]"
          >
            Sergio Correia
          </a>
        </p>
        <button
          onClick={scrollToTop}
          className="absolute right-4 bottom-12 w-10 h-10 bg-slate-900 text-[#fdfe6c] flex justify-center items-center rounded-full hover:bg-slate-500 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowBigUp size={24} />
        </button>
      </div>
    </>
  );
}
