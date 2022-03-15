module.exports = {
  content: [
    "./public/*.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        ripple: {
          '0%' : {
            transform: 'scale(1)',
            opacity: '1'
          },
          '50%': {
            transform: 'scale(10)',
            opacity: '0.375'
          },
          '100%': {
            transform: 'scale(35)',
            opacity: '0'
          }
        }
      },
      animation: {
        ripple: '0.9s ease 1 forwards ripple'
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
  variants: {
    scrollbar: ['rounded']
  },
  darkMode: 'class'
}
