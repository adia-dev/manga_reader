/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-primary": "#1E1E1E",
        "dark-secondary": "#543864",
        "dark-tertiary": "#FF6363",
        "dark-quaternary": "#FFBD69",
      },
    },
    plugins: [],
  },
  mode: "jit",
};
