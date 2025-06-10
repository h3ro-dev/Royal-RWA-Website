import { tokens } from '../styles/design-tokens'
import type { CSSProperties } from 'react'

/**
 * Generate responsive font size classes
 */
export const responsiveText = {
  h1: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
  h2: 'text-3xl md:text-4xl lg:text-5xl',
  h3: 'text-2xl md:text-3xl lg:text-4xl',
  h4: 'text-xl md:text-2xl lg:text-3xl',
  h5: 'text-lg md:text-xl lg:text-2xl',
  h6: 'text-base md:text-lg lg:text-xl',
  body: 'text-base md:text-lg',
  small: 'text-sm md:text-base',
  tiny: 'text-xs md:text-sm',
}

/**
 * Generate glass morphism classes with different intensities
 */
export const glassStyles = {
  light: 'backdrop-blur-sm bg-white/5 border border-white/10',
  medium: 'backdrop-blur-md bg-white/10 border border-white/20',
  strong: 'backdrop-blur-lg bg-white/20 border border-white/30',
  dark: 'backdrop-blur-md bg-black/20 border border-black/30',
}

/**
 * Animation delay utilities
 */
export const animationDelay = (index: number, baseDelay: number = 100) => ({
  animationDelay: `${index * baseDelay}ms`,
})

/**
 * Stagger children animations
 */
export const staggerChildren = (delayBetween: number = 0.1) => ({
  transition: {
    staggerChildren: delayBetween,
  },
})

/**
 * Common gradient text styles
 */
export const gradientText = (
  gradient: 'gold' | 'royal' | 'mixed' | 'custom' = 'gold',
  customGradient?: string
) => {
  const gradients: Record<string, string> = {
    gold: 'bg-gradient-to-r from-royal-gold to-royal-bright-gold',
    royal: 'bg-gradient-to-r from-royal-deep-blue to-royal-midnight',
    mixed: 'bg-gradient-to-r from-royal-gold via-royal-deep-blue to-royal-bright-gold',
    custom: customGradient || '',
  }

  return gradients[gradient]
}

/**
 * Common shadow styles with glow effects
 */
export const glowShadows = {
  gold: 'shadow-[0_0_20px_rgba(212,175,55,0.5)]',
  goldHover: 'hover:shadow-[0_0_30px_rgba(212,175,55,0.7)]',
  blue: 'shadow-[0_0_20px_rgba(45,45,127,0.5)]',
  blueHover: 'hover:shadow-[0_0_30px_rgba(45,45,127,0.7)]',
  mixed: 'shadow-[0_0_20px_rgba(212,175,55,0.3),0_0_20px_rgba(45,45,127,0.3)]',
}

/**
 * Container width utilities
 */
export const containerWidths = {
  tight: 'max-w-4xl',
  base: 'max-w-6xl',
  wide: 'max-w-7xl',
  full: 'max-w-full',
}

/**
 * Section padding utilities
 */
export const sectionPadding = {
  none: '',
  small: 'py-8 md:py-12 lg:py-16',
  medium: 'py-12 md:py-16 lg:py-24',
  large: 'py-16 md:py-24 lg:py-32',
  xlarge: 'py-24 md:py-32 lg:py-48',
}

/**
 * Focus ring styles
 */
export const focusRing = {
  gold: 'focus-visible:ring-2 focus-visible:ring-royal-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  blue: 'focus-visible:ring-2 focus-visible:ring-royal-deep-blue focus-visible:ring-offset-2 focus-visible:ring-offset-background',
  white: 'focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-background',
}

/**
 * Generate aspect ratio classes
 */
export const aspectRatios = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-[21/9]',
  ultrawide: 'aspect-[32/9]',
  portrait: 'aspect-[3/4]',
  phone: 'aspect-[9/16]',
}

/**
 * Transition presets
 */
export const transitions = {
  fast: 'transition-all duration-fast ease-out',
  base: 'transition-all duration-base ease-out',
  slow: 'transition-all duration-slow ease-out',
  bounce: 'transition-all duration-base ease-bounce',
  smooth: 'transition-all duration-slower ease-in-out',
}

/**
 * Z-index utilities mapped to design tokens
 */
export const zIndexClasses = {
  behind: 'z-[-1]',
  base: 'z-0',
  dropdown: 'z-10',
  sticky: 'z-20',
  fixed: 'z-30',
  modalBackdrop: 'z-40',
  modal: 'z-50',
  popover: 'z-[60]',
  tooltip: 'z-[70]',
  notification: 'z-[80]',
  top: 'z-[90]',
}

/**
 * Get token value by path
 */
export const getToken = (path: string) => {
  const keys = path.split('.')
  let value: any = tokens
  
  for (const key of keys) {
    value = value[key]
    if (value === undefined) return undefined
  }
  
  return value
}

/**
 * Media query helpers
 */
export const mediaQueries = {
  xs: `@media (min-width: ${tokens.breakpoints.xs})`,
  sm: `@media (min-width: ${tokens.breakpoints.sm})`,
  md: `@media (min-width: ${tokens.breakpoints.md})`,
  lg: `@media (min-width: ${tokens.breakpoints.lg})`,
  xl: `@media (min-width: ${tokens.breakpoints.xl})`,
  '2xl': `@media (min-width: ${tokens.breakpoints['2xl']})`,
}

/**
 * Create custom CSS variables from token values
 */
export const cssVar = (name: string, value: string) => ({
  [`--${name}`]: value,
} as CSSProperties)