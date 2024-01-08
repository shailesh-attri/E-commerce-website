/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
  'node_modules/preline/dist/*.js',
],
  theme: {
    extend: {},
    screens: {
      'x260': '260px',
      'x300': '300px',
      'x392': '392px',
      'x480': '480px',
      'x560': '560px',
      'mini-tablet': '640px',
      'tablets': '768px',
      'laptops': '1024px',
      'xl1': '1280px',
      'xl2': '1536px',
      'xl3': '1920px',
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
      require('preline/plugin'),
  ],
}

