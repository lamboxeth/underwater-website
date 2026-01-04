/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          deep: '#0a1929',
          dark: '#0d1b2a',
          medium: '#1e3a5f',
          light: '#2d4a6b',
          surface: '#4a90a4',
        },
        water: {
          deep: '#0a2540',
          medium: '#1a4a6b',
          light: '#2d6b8f',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'drift': 'drift 20s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        drift: {
          '0%, 100%': { transform: 'translateX(0px) translateY(0px)' },
          '25%': { transform: 'translateX(10px) translateY(-5px)' },
          '50%': { transform: 'translateX(-5px) translateY(-10px)' },
          '75%': { transform: 'translateX(-10px) translateY(-5px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: 0.8 },
          '50%': { opacity: 1 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

