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
        roast: {
          950: '#120905',
          900: '#1E100A',
          850: '#26140D',
          800: '#321B11',
          700: '#422417',
          600: '#542F1E',
        },
        crema: {
          50: '#FAF5EE',
          100: '#F5ECE1',
          200: '#EDE0D0',
          300: '#DFCCA',
          400: '#CCAFA',
        },
        amber: {
          500: '#C07A46',
          600: '#A96434',
          700: '#8E4F25',
        },
      },
    },
  },
  plugins: [],
}
