const plugin = require('tailwindcss/plugin')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        serif: ['var(--font-fira)'],
      },
      textShadow: {
        0: '0 0px 0px var(--tw-shadow-color)',
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 10px 16px var(--tw-shadow-color)',
      },
    },
  },
  daisyui: {
    themes: [
      {
        elka: {
          primary: '#11405A',
          secondary: '#2D3136',
          accent: '#162B4A',
          neutral: '#1C1E21',
          'base-100': '#191919',
          info: '#0084c3',
          success: '#008635',
          warning: '#d19000',
          error: '#ec0042',
        },
      },
    ],
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    addVariablesForColors,
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') },
      )
    }),
  ],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme('colors'))
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]))

  addBase({
    ':root': newVars,
  })
}
