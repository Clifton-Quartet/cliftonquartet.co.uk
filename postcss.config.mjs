const config = {
  plugins: [
    "@tailwindcss/postcss",
    // Add these for production optimization
    ...(process.env.NODE_ENV === "production"
      ? [
          [
            "@fullhuman/postcss-purgecss",
            {
              content: [
                "./pages/**/*.{js,ts,jsx,tsx}",
                "./components/**/*.{js,ts,jsx,tsx}",
                "./app/**/*.{js,ts,jsx,tsx}",
                "./slices/**/*.{js,ts,jsx,tsx}",
              ],
              defaultExtractor: (content) =>
                content.match(/[\w-/:]+(?<!:)/g) || [],
              safelist: [
                "html",
                "body",
                // Add any classes that are dynamically generated
                /^text-/, // Preserve dynamic text colors
                /^bg-/, // Preserve dynamic background colors
                /^hero-/, // Preserve hero classes
                "vinyl-player",
                "glass-bright",
              ],
            },
          ],
          "postcss-preset-env",
        ]
      : []),
  ],
};

export default config;
