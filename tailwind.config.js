/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{jsx,tsx,mdx}",
    "./comps/**/*.{jsx,tsx,mdx}",
  ],
  plugins: [
    require('@tailwindcss/typography'),
  ],
  extend: {
    backgroundImage: {
      'gradient-radial': 'radial-gradient(var( - tw-gradient-stops))',
      'gradient-conic':
      'conic-gradient(from 180deg at 50% 50%, var( - tw-gradient-stops))',
    },
    fontFamily: {
      playwright: [ "Playwrite AU VIC", "sans-serif"]
    }
  },
}