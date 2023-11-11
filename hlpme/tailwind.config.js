export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'green': "url('../images/background.jpg')",
      },
      colors: {
        "light-green": "#a5ff8d",
        "midle-green": "#23e912",
        "dark-green": "#37910a",
      },
      plugins: [],
    },
  },
};
