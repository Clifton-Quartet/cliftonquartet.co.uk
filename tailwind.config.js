/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-instrument-serif)"],
        sans: ["var(--font-inter)"],
        inter: ["var(--font-inter)"],
        script: ["var(--font-league-script)", "cursive"],
        league: ["var(--font-league-script)", "cursive"],
        "league-script": ["var(--font-league-script)", "cursive"],
      },
    },
  },
  plugins: [],
};
