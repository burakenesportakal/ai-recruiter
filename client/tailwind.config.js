/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Rajdhani', 'sans-serif'],
        body: ['Exo 2', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#111827',
          card: 'rgba(31, 41, 55, 0.5)',
          border: 'rgba(55, 65, 81, 0.5)',
        },
      },
    },
  },
  plugins: [],
}