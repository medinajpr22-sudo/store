/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
      },
      colors: {
        'neon-yellow': '#CCFF00',
        'pure-black': '#000000',
        'dark-bg': '#0a0a0a',
        'card-bg': '#141414',
      },
    },
  },
  plugins: [],
};
