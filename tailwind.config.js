/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern:
        /bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
    {
      pattern:
        /text-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)/,
    },
    {
      pattern:
        /bg-(primary|secondary|dark-gray|white)(-(0|50|100|200|300|400|500|600|700|800))?/,
    },
    {
      pattern:
        /text-(primary|secondary|dark-gray|white)(-(0|50|100|200|300|400|500|600|700|800))?/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: "var(--primary500)",
          600: "var(--primary600)",
          700: "var(--primary700)",
        },
        secondary: {
          800: "var(--secondary800)",
        },
        "dark-gray": {
          50: "var(--dark-gray50)",
          100: "var(--dark-gray100)",
        },
        white: {
          DEFAULT: "var(--white)",
          0: "var(--white0)",
          50: "var(--white50)",
          100: "var(--white100)",
          200: "var(--white200)",
          300: "var(--white300)",
          400: "var(--white400)",
          500: "var(--white500)",
        },
      },
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
