/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        signature: ['Roboto']
      },
      colors: {
        defaultColor: '#6F459B',
        hoverColor: '#8D66AF'
      }
    },
  },
  plugins: [],
}
