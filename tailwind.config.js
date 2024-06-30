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
}