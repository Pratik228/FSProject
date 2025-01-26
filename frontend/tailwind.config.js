/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "dracula", // Add Dracula theme
      "winter", // Add Winter theme
    ],
  },
  plugins: [
    require("daisyui"), // DaisyUI plugin
  ],
};

export default config;
