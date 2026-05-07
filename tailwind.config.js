/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        hyogo: {
          50:  '#f0f7f4',
          100: '#dcede5',
          200: '#bbdacc',
          400: '#5aa880',
          600: '#2d7a54',
          700: '#1f5c3e',
          800: '#1a4d35',
          900: '#0f3322',
        },
      },
      fontFamily: {
        sans: ['Noto Sans JP', 'sans-serif'],
        serif: ['Noto Serif JP', 'serif'],
      },
    },
  },
  plugins: [],
}