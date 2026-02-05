/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'principal': '#d1b3bd',
        'principal-hover': '#c39ba9',
        'rosa-elegante': '#e91e63',
      },
    },
  },
  plugins: [],
};