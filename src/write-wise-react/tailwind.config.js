/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBlue: '#eff8fa',
        primary: '#4d4dff',
        textGray: "#555555",
        lightBlue: "#f2f3f9",
        blue: '#f4f5fb'
      }
    },
  },
  plugins: [
    require('tailwindcss-gradients'),
  ],
}

