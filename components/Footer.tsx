const Footer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 items-center m-4">
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
    </div>
  );
};

export default Footer;
