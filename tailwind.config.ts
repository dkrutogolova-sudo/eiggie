import type { Config } from "tailwindcss";

/**
 * Palette lifted from the iPhone 18 Pro / iPhone Duo lineup (Sept 2026):
 * Burgundy, Glacier Blue, Silver, Deep Black, Starlight, Night Sky.
 * Tuned slightly toward "playful" — a warm paper ground, punchy wine accent.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        starlight: "#F4EFE6",
        paper: "#F7F3EB",
        ink: "#141416",
        deepblack: "#1A1A1C",
        silver: "#E3E4E6",
        burgundy: "#7C2B3B",
        "burgundy-bright": "#A63A4E",
        glacier: "#AAC9D9",
        "glacier-deep": "#5E93AE",
        nightsky: "#1E2A3A",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1.2, 0.36, 1)",
        "spring-soft": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
