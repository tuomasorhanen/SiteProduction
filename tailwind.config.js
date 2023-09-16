const { theme } = require('@sanity/demo/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    ...theme,
    darkMode: 'class',

    screens: {
      sm: '700px', //tablet
      md: '1100px', //small desktop or laptop
      lg: '1920px', // bigger desktop
    },
    extend: {
      colors: {
        bg: {
          DEFAULT: 'var(--bg-color)',
        },
        text: {
          DEFAULT: 'var(--text-color)',
        },
        accent: {
          DEFAULT: 'var(--accent-color)',
        },
      },
    },
  },
};
