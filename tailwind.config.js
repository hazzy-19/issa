/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'md': '768px',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        terracotta: {
          50: '#FDF8F3',
          100: '#F9EDE0',
          500: '#C27838',
          600: '#A96126',
          700: '#8A4B1B',
        },
        warmstone: {
          50: '#FAF8F5',
          100: '#F5F2EB',
          200: '#E7E2D8',
          300: '#D6CEBE',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
      },
    },
  },
  plugins: [],
}
