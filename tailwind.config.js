/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mantao: {
          50: '#FDFBF7',
          100: '#FBF5EC',
          200: '#F5E8D2',
          300: '#EBD4B0',
          400: '#DFBE8B',
          500: '#C89A58',
          600: '#A97A3B',
          700: '#875C2B',
          800: '#5F3F1E',
          900: '#3D2813',
        },
        crimson: {
          500: '#8A1824',
          600: '#75111B',
          700: '#5E0C14',
          800: '#48080E',
          900: '#310408',
        },
        gold: {
          300: '#F9E596',
          400: '#EFCF62',
          500: '#D4AF37',
          600: '#AA881E',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        chinese: ['"Cinzel"', '"Noto Serif TC"', 'serif'],
      },
      boxShadow: {
        'luxury': '0 20px 50px -12px rgba(138, 24, 36, 0.15)',
        'luxury-gold': '0 20px 50px -12px rgba(212, 175, 55, 0.25)',
        'card-hover': '0 25px 60px -15px rgba(45, 20, 10, 0.2)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 5s ease-in-out infinite',
        'steam-1': 'steam 4s ease-in-out infinite',
        'steam-2': 'steam 5s ease-in-out infinite 1.5s',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(1.5deg)' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scaleX(1)', opacity: '0' },
          '30%': { opacity: '0.6' },
          '70%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-60px) scaleX(1.4)', opacity: '0' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
