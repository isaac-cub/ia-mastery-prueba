/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ink:   '#0B1220',
        paper: '#F5F8FF',
        brand: { DEFAULT: '#0052CC', deep: '#003A99', bright: '#2D7FF9', soft: '#E8F0FF' },
        gold:  { DEFAULT: '#FFC83D', deep: '#E0A100' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      maxWidth: { read: '40rem' },
    },
  },
  plugins: [],
}
