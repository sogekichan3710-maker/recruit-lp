import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0a0908",
        surface: "#141210",
        surface2: "#1c1916",
        gold: {
          DEFAULT: "#c6a15b",
          bright: "#e8c77e",
          deep: "#8a6d34",
        },
        ivory: "#f3eee3",
        muted: "#a79c88",
        hairline: "rgba(198,161,91,0.18)",
      },
      fontFamily: {
        display: ["var(--font-serif)", "serif"],
        body: ["var(--font-sans)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      boxShadow: {
        gold: "0 8px 30px -8px rgba(198,161,91,0.35)",
        card: "0 20px 60px -20px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "gold-line":
          "linear-gradient(90deg, transparent 0%, #c6a15b 15%, #e8c77e 50%, #c6a15b 85%, transparent 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
