/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: { sm: "480px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1600px" },
    extend: {
      // Semantic roles come from the active surface (src/styles/tokens.css); no raw hex in components.
      colors: { bg: "var(--bg)", fg: "var(--fg)", muted: "var(--muted)", accent: "var(--accent)", line: "var(--line)" },
      fontFamily: { display: ["var(--font-display)"], sans: ["var(--font-text)"] },
    },
  },
  plugins: [],
};
