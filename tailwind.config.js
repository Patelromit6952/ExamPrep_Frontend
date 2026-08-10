/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Primary: deep official navy, used for headers, primary actions, active states
        navy: {
          50: "#eef3f9",
          100: "#d7e3f0",
          200: "#b0c7e0",
          300: "#82a5cc",
          400: "#5580b3",
          500: "#3a6296",
          600: "#294a78",
          700: "#1f3a61",
          800: "#182e4d",
          900: "#13243c",
          950: "#0c182a",
        },
        // Accent: warm gold, used sparingly for highlights, badges, signature elements
        gold: {
          50: "#fdf8ec",
          100: "#faedc7",
          200: "#f4d98a",
          300: "#edc04d",
          400: "#e5a923",
          500: "#c88c15",
          600: "#a06c10",
          700: "#7a5111",
          800: "#5c3e14",
          900: "#402c13",
        },
        // Status colors for the exam palette
        status: {
          notVisited: "#94a3b8",
          notAnswered: "#dc4545",
          answered: "#16a34a",
          marked: "#7c3aed",
          answeredMarked: "#4f46e5",
        },
      },
      fontFamily: {
        display: ["Lexend", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(19, 36, 60, 0.06), 0 1px 3px 0 rgba(19, 36, 60, 0.08)",
        elevated: "0 4px 12px -2px rgba(19, 36, 60, 0.12), 0 2px 4px -2px rgba(19, 36, 60, 0.08)",
      },
      animation: {
        "pulse-ring": "pulse-ring 1.8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        "pulse-ring": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};
