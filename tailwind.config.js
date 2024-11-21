const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        starwars: ['"Star Jedi"', 'sans-serif'], // Добавьте шрифт
      },
      backgroundImage: {
        stars: "url('https://i.gifer.com/origin/54/5477f3d72619fd15945e1b3814ba6192_w200.webp')", // Первый фон
        starsw: "url('https://i.gifer.com/origin/a8/a8f3104a31fa371955e76df980491ab3_w200.webp')", // Второй фон
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.text-star': {
          fontFamily: '"Star Jedi", sans-serif',
        },
      });
    }),
  ],
};
