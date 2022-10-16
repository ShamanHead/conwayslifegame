/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    //screens: {
    //    'xs': '320px'
    //},
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require("@tailwindcss/forms")
  ],
}
