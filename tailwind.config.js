/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      red: "#e63946",
      orange: "#f3722c",
      "orange-light": "#f8961e",
      yellow: "#ffb703",
      "yellow-light": "#FFC222",
      white: "#ffffff",
      green: "#00A149",
      blue: "#219ebc",
      grey: "#d9d9d9",
      black: "#000000",
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "autumn"],
  },
};
