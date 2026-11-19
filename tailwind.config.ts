import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#B98A3B",
          gold: "#B98A3B",
          goldHi: "#D7A94E",
          goldDark: "#6E5324",
          ink: "#111111",
          surface: "#1A1A1B",
          surface2: "#242526",
          paper: "#EFEFED",
          muted: "#8C8C8C",
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
