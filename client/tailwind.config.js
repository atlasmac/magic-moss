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
      minHeight:{
        'screen-95': '95vh'
      },
      height:{
        'screen-70': '70vh',
        'screen-90': '90vh'
      },
      maxWidth: {
        '80': '80%',
      },
      fontFamily: {
        robotoSlab: ["Roboto Slab", "serif"],
       },
    },
  },
  daisyui: {
    styled: true,
    themes: ["dark"],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
  plugins: [
    require("daisyui"),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ]
}
