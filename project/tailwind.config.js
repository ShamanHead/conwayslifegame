/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        screens: {
            'md-max': {'max': '768px'}
        }
    },
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}
