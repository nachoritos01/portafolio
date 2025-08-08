/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss,css}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: 'var(--color-dark)',
        'dark-lighter': 'var(--color-dark-lighter)',
        'dark-card': 'var(--color-dark-card)',
        accent: 'var(--color-accent)',
        'accent-dark': 'var(--color-accent-dark)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        light: 'var(--color-light)',
        'light-lighter': 'var(--color-light-lighter)',
        'light-card': 'var(--color-light-card)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {'0%,100%': {transform: 'translateY(0)'}, '50%': {transform: 'translateY(-20px)'}},
        glow: {'0%': {boxShadow: '0 0 20px rgba(0,255,136,.3)'}, '100%': {boxShadow: '0 0 30px rgba(0,255,136,.6)'}},
        slideUp: {'0%': {transform: 'translateY(100px)', opacity: '0'}, '100%': {transform: 'translateY(0)', opacity: '1'}},
        fadeIn: {'0%': {opacity: '0'}, '100%': {opacity: '1'}},
        scaleIn: {'0%': {transform: 'scale(.9)', opacity: '0'}, '100%': {transform: 'scale(1)', opacity: '1'}},
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}