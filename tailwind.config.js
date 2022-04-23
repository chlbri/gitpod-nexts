const plugin = require('tailwindcss/plugin');

module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      gray: {
        500: '#C4C4C4',
        600: '#929492',
        100: '#F3F3F3',
        200: '#E5E3E3',
        900: '#4E4E4E',
        700: '#767575',
      },
      poussin: '#FD9C00',
      white: '#FFFFFF',
      transparent: 'transparent',
      red: '#F04A06',
      green: '#18AE76',
      lightYellow: '#FFDFB3',
      blue: {
        500: '#5E82D4',
      },
      purple: {
        500: '#7A1FA2',
      },
    },
    extend: {
      screens: {
        '2xl': '1600px',
        '3xl': '2000px',
      },
    },
  },
  variants: {
    extend: {
      // animation: ['group-hover', 'responsive', 'hover', 'focus'],
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addUtilities({
        '.text-shadow': {
          'text-shadow': '2px 2px 8px rgba(4,2,1,0.5)',
        },
      });
    }),
  ],
};
