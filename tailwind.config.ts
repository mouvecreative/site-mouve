import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#9E7A2E",
          gold: "#9E7A2E",
          goldHi: "#C6982F",
          goldDark: "#4D3D23",
          ink: "#000000",
          surface: "#0C0B09",
          surface2: "#131109",
          paper: "#E4E0D7",
          muted: "#9A948A",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        display: ["var(--font-bricolage)", "var(--font-poppins)", "sans-serif"],
        serif: ["var(--font-instrument)", "Georgia", "serif"],
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        floaty: "floaty 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
