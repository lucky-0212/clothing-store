/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E0D0C",
        surface: "#171513",
        paper: "#F5F2EC",
        gold: "#C9A15A",
        line: "#2B2825",
        linelight: "#DED8C9",
        muted: "#948E84",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        wide2: "0.14em",
      },
    },
  },
  plugins: [],
};
