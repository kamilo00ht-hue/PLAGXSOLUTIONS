/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0f172a',
        technicalGray: '#334155',
        cleanWhite: '#f8fafc'
      }
    }
  },
  plugins: []
};
