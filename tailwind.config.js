/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    screens: { sm: "480px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1600px" },
    extend: {
      // Semantic tokens only (src/styles/tokens.css). No raw hex in components.
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        raised: "var(--color-raised)",
        text: "var(--color-text)",
        muted: "var(--color-text-muted)",
        border: "var(--color-border)",
        "border-strong": "var(--color-border-strong)",
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "on-accent": "var(--color-on-accent)",
        dark: "var(--color-dark-bg)",
        "dark-text": "var(--color-dark-text)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      maxWidth: { content: "var(--content-max)", measure: "var(--measure)" },
      transitionTimingFunction: { out: "var(--ease-out)", "in-out": "var(--ease-in-out)" },
      transitionDuration: { fast: "var(--dur-fast)", base: "var(--dur-base)", slow: "var(--dur-slow)" },
    },
  },
  plugins: [],
};
