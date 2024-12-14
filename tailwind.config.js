/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        whitesmoke: "#e6e6e6",
        orange: "#f59331",
        darkorange: "#8f561e",
        lightblue: "#30d1e3",
        lightorange:"#ffa74f",
        darkgray: "#1c1c21",
        lightgray: "#636261"
      }
    },
  },
  plugins: [],
};
