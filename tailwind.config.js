/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      keyframes: {
        zoomIn: {
          '0%': { scale: 0 },
          '100%': { scale: '100%' },
        }
      },
      animation: {
        'zoom-in': 'zoomIn 0.5s ease-in-out',
      }
    },
  },
  plugins: [],
}

