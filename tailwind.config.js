/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF9933',
        secondary: '#138808',
        chakra: '#000080',
        light: '#FFF5E6',
        dark: '#1f2937'
      },
      fontFamily: {
        sans: ['"Noto Sans"', '"Noto Sans Devanagari"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

