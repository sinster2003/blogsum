/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'para' : ["source-serif-pro", "Georgia", "Cambria", "Times New Roman", "Times", "serif"]
      },
      fontSize: {
        '4.5xl': "2.5rem"
      }
    },
  },
  plugins: [],
}