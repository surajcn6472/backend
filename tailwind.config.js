/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/views/**/*.hbs",
    "./src/views/**/*.handlebars",
    "./public/**/*.html",
    "./public/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3490dc",
        secondary: "#ffed4e",
        danger: "#e3342f",
      },
    },
  },
  plugins: [],
};
