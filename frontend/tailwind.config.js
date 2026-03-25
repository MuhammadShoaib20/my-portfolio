/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '375px',   // small phones
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        primary: '#2563eb',
        'primary-dark': '#1d4ed8',
        secondary: '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        // Fluid typography scale using clamp
        'fluid-xs':   ['clamp(0.75rem,  1.5vw, 0.875rem)',  { lineHeight: '1.5' }],
        'fluid-sm':   ['clamp(0.875rem, 2vw,   1rem)',      { lineHeight: '1.6' }],
        'fluid-base': ['clamp(1rem,     2.5vw, 1.125rem)',  { lineHeight: '1.7' }],
        'fluid-lg':   ['clamp(1.125rem, 3vw,   1.25rem)',   { lineHeight: '1.6' }],
        'fluid-xl':   ['clamp(1.25rem,  3.5vw, 1.5rem)',    { lineHeight: '1.4' }],
        'fluid-2xl':  ['clamp(1.5rem,   4vw,   2rem)',      { lineHeight: '1.3' }],
        'fluid-3xl':  ['clamp(1.875rem, 5vw,   2.5rem)',    { lineHeight: '1.2' }],
        'fluid-4xl':  ['clamp(2rem,     6vw,   3.5rem)',    { lineHeight: '1.15' }],
        'fluid-5xl':  ['clamp(2.5rem,   8vw,   4.5rem)',    { lineHeight: '1.1' }],
      },
      spacing: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-top':    'env(safe-area-inset-top)',
      },
      minHeight: {
        'touch': '44px',  // minimum touch target
      },
      minWidth: {
        'touch': '44px',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out both',
        'fade-in':    'fadeIn 0.4s ease-out both',
        'slide-in':   'slideIn 0.3s ease-out both',
        'slide-down': 'slideDown 0.25s ease-out both',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideDown: {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};