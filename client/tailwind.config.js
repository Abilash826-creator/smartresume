/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        display: ['"Clash Display"', 'Sora', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: {
          50: '#f0f0f5',
          100: '#dddde8',
          200: '#b8b8d0',
          300: '#8888ac',
          400: '#5c5c88',
          500: '#3d3d6b',
          600: '#2d2d54',
          700: '#1e1e3d',
          800: '#12122b',
          900: '#08081a',
        },
        volt: {
          300: '#d4ff6e',
          400: '#c8ff4d',
          500: '#b8f400',
          600: '#9acc00',
        },
        coral: {
          400: '#ff7b6b',
          500: '#ff5a47',
        },
        sky: {
          400: '#60b8ff',
          500: '#3da5ff',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
