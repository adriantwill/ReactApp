/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        surround: "0 0 10px 1px rgba(0, 0, 0, 0.2)",
      },
      colors: {
        primary: "#E6E6E6",
        secondary: "#EFEFEF",
      },
      animation: {
        "loop-scroll": "loop-scroll 60s linear infinite",
        "fade-in-down": "fadeInDown 0.5s ease-out forwards",
      },
      keyframes: {
        "loop-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
