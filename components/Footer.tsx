"use client";

import { ArrowBigUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative grid grid-cols-1 md:grid-cols-3 items-center m-4">
      <div></div>
      <p className="text-center text-white text-sm">
        © 2025 The Clifton String Quartet
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
  );
};

export default Footer;
