/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      maxHeight: {
        'screen-70': '70vh',
        'screen-90': '90vh'
      },
      height:{
        'screen-70': '70vh',
        'screen-90': '90vh'
      }
    },
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],

  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
}
