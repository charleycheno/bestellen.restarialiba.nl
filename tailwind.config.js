const {nextui} = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'coral-reef': {
          '50': '#f9f7f3',
          '100': '#f0ece4',
          '200': '#e0d8c8',
          '300': '#caba9f',
          '400': '#b8a07f',
          '500': '#a98966',
          '600': '#9c795a',
          '700': '#82624c',
          '800': '#6a5142',
          '900': '#574337',
          '950': '#2e221c',
        },
        'chicago': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#565656',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#262626',
        },
      },
      spacing: {
        100: '25rem',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
