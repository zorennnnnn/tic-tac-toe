import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { x: "#38e1ff", o: "#ff5d8f", ink: "#0b0d1a" },
      fontFamily: { sans: ["var(--font-sora)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
};
export default config;
