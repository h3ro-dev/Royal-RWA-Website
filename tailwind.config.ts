import type { Config } from 'tailwindcss'
import { tokens } from './src/styles/design-tokens'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Royal brand colors
        royal: {
          midnight: tokens.colors.royal.midnight,
          'deep-blue': tokens.colors.royal.deepBlue,
          gold: tokens.colors.royal.gold,
          'bright-gold': tokens.colors.royal.brightGold,
          'light-blue': tokens.colors.royal.lightBlue,
          'dark-blue': tokens.colors.royal.darkBlue,
        },
        
        // Background colors using CSS variables
        background: {
          DEFAULT: 'rgb(var(--bg-primary) / <alpha-value>)',
          primary: 'rgb(var(--bg-primary) / <alpha-value>)',
          secondary: 'rgb(var(--bg-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--bg-tertiary) / <alpha-value>)',
        },
        
        // Text colors using CSS variables
        text: {
          DEFAULT: 'rgb(var(--text-primary) / <alpha-value>)',
          primary: 'rgb(var(--text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          tertiary: 'rgb(var(--text-tertiary) / <alpha-value>)',
        },
        
        // Status colors
        success: 'rgb(var(--success) / <alpha-value>)',
        warning: 'rgb(var(--warning) / <alpha-value>)',
        error: 'rgb(var(--error) / <alpha-value>)',
        info: 'rgb(var(--info) / <alpha-value>)',
        
        // Glass effect
        glass: {
          DEFAULT: tokens.colors.glass.background,
          border: tokens.colors.glass.border,
        },
      },
      
      fontFamily: {
        sans: tokens.typography.fontFamily.sans,
        display: tokens.typography.fontFamily.display,
        mono: tokens.typography.fontFamily.mono,
      },
      
      fontSize: tokens.typography.fontSize,
      fontWeight: tokens.typography.fontWeight,
      lineHeight: tokens.typography.lineHeight,
      letterSpacing: tokens.typography.letterSpacing,
      
      spacing: tokens.spacing,
      borderRadius: tokens.borderRadius,
      
      boxShadow: {
        ...tokens.shadows,
        glass: tokens.shadows.glass,
        'glow-gold': tokens.shadows.glow.gold,
        'glow-blue': tokens.shadows.glow.blue,
      },
      
      animation: {
        'fade-in': 'fadeIn var(--animation-base) ease-out',
        'slide-in': 'slideIn var(--animation-base) ease-out',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'spin': 'spin 1s linear infinite',
        'drift': 'drift linear infinite',
      },
      
      transitionDuration: {
        fast: 'var(--animation-fast)',
        base: 'var(--animation-base)',
        slow: 'var(--animation-slow)',
        slower: 'var(--animation-slower)',
        slowest: 'var(--animation-slowest)',
      },
      
      transitionTimingFunction: tokens.animation.easing,
      
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-gold': tokens.colors.gradients.goldShine,
        'gradient-royal': tokens.colors.gradients.royalBlue,
        'gradient-dark': tokens.colors.gradients.darkFade,
        'gradient-glass': tokens.colors.gradients.glassOverlay,
      },
      
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      
      screens: {
        xs: tokens.breakpoints.xs,
        sm: tokens.breakpoints.sm,
        md: tokens.breakpoints.md,
        lg: tokens.breakpoints.lg,
        xl: tokens.breakpoints.xl,
        '2xl': tokens.breakpoints['2xl'],
      },
      
      zIndex: tokens.zIndex,
      
      keyframes: {
        fadeIn: tokens.animation.keyframes.fadeIn,
        slideIn: tokens.animation.keyframes.slideIn,
        pulse: tokens.animation.keyframes.pulse,
        shimmer: tokens.animation.keyframes.shimmer,
        float: tokens.animation.keyframes.float,
        glow: tokens.animation.keyframes.glow,
        spin: {
          to: { transform: 'rotate(360deg)' },
        },
        drift: {
          from: { transform: 'translateY(100vh) translateX(0)' },
          to: { transform: 'translateY(-10px) translateX(100px)' },
        },
      },
    },
  },
  plugins: [
    // Custom plugin for glass morphism utilities
    function ({ addUtilities }: any) {
      const newUtilities = {
        '.glass-blur': {
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
        },
        '.glass-saturate': {
          'backdrop-filter': 'saturate(180%)',
          '-webkit-backdrop-filter': 'saturate(180%)',
        },
        '.glass-combined': {
          'backdrop-filter': 'blur(10px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(10px) saturate(180%)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}

export default config