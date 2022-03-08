module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    ripple: theme => ({
      colors: theme('colors')
    })
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("tailwindcss-ripple")()
  ],
  variants: {
    scrollbar: ['rounded']
  },
  darkMode: 'class'
}
