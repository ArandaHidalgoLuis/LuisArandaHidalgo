/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.astro',
  ],
  theme: {
    extend: {
      colors: {
        bmo: '#63bda4',
        bmoOscuro: '#388C77', 
        bmoClaro: '#d9ffea',
      },
    },
  },
  plugins: [],
}

