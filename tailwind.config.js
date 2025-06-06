/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        royal: {
          midnight: '#1a1a4e',
          'deep-blue': '#2d2d7f',
          gold: '#d4af37',
          'bright-gold': '#ffd700',
          white: '#ffffff',
          gray: '#f5f5f5',
          'dark-gray': '#333333',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1a1a4e 0%, #2d2d7f 100%)',
        'gradient-gold': 'linear-gradient(135deg, #d4af37 0%, #ffd700 100%)',
        'gradient-radial': 'radial-gradient(circle at 50% 50%, #2d2d7f 0%, #1a1a4e 100%)',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(212, 175, 55, 0.3)',
        'gold-hover': '0 0 40px rgba(212, 175, 55, 0.5)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
}