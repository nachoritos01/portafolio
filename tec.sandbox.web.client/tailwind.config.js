/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'xl': '4px 4px 4px 0px rgba(31, 34, 46, 0.50)',
      },
      screens: {
        'xxs': '300px', // min-width
      },
      colors: {
        'tec-sandbox': {
          'text-primary': 'var(--tec-sandbox-text-primary)',
          'text-secondary': 'var(--tec-sandbox-text-secondary)',
          'text-muted': 'var(--tec-sandbox-text-muted)',
          'bg-primary': 'var(--tec-sandbox-bg-primary)',
          'bg-secondary': 'var(--tec-sandbox-bg-secondary)',
          'bg-card': 'var(--tec-sandbox-bg-card)',
        }
      },
    },
  },
  plugins: [],
}
