/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./src/app/globals.css",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#0000FF'
      },
    },
  },
  plugins: [],
};
