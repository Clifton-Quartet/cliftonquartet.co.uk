"use client";

import { Content } from "@prismicio/client";
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

  return (
    <>
      <div className="relative grid grid-cols-1 lg:grid-cols-3 items-center p-4 bottom-2 bg-slate-900 font-sans">
        <div></div>
        <p className="text-center text-white text-sm">
          &copy; {new Date().getFullYear()} {footerData.footer_copyrights}
        </p>
        <p className="text-center lg:text-right my-2 lg:mt-0 text-white text-sm">
          Designed and Developed by{" "}
          <a
            href="https://www.sergiocorreia.dev"
            target="_blank"
            className="text-[#fcf2bd]"
          >
            Sergio Correia
          </a>
        </p>
        <button
          onClick={scrollToTop}
          className="absolute right-4 bottom-16 w-10 h-10 bg-slate-900 border-2 border-[#fcf2bd] text-[#fcf2bd] flex justify-center items-center rounded-full hover:opacity-90 cursor-pointer"
          aria-label="Scroll to top"
        >
          <ArrowBigUp size={24} />
        </button>
      </div>
    </>
  );
}
