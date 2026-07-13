/** @type {import('tailwindcss').Config} */

// Design system tokens derived from the reference dashboard.
// Merge the `theme.extend` block into your existing tailwind.config.js.
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Dark navy — sidebar / primary interface
        navy: {
          DEFAULT: "#0B1437",
          950: "#070C24",
          900: "#0B1437",
          800: "#131C4A",
          700: "#1B2560",
        },
        // Accent — blue / indigo (used for active nav, links, primary actions)
        primary: {
          DEFAULT: "#2F6FEE",
          50: "#F0F5FF",
          100: "#E1EBFF",
          200: "#BCD2FF",
          500: "#2F6FEE",
          600: "#1E50C5",
          700: "#13358F",
        },
        // Neutral working surface
        surface: "#F5F7FB",
        // Status colors
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
      },
      fontFamily: {
        heading: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 1px 3px rgba(16,24,40,0.06)",
        "card-hover": "0 6px 20px rgba(16,24,40,0.08)",
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
    },
  },
  plugins: [],
};
