'use client'

import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../utils/cn'
import { responsiveText, gradientText } from '../../utils/style-helpers'

// Base Typography Props
interface BaseTypographyProps {
  gradient?: keyof typeof gradientText | false
  glow?: boolean
  animate?: 'fade' | 'slide' | 'bounce' | false
  className?: string
  children: React.ReactNode
}

// Heading Component
export interface HeadingProps extends BaseTypographyProps, HTMLMotionProps<'h1'> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span'
}

const headingStyles = {
  1: cn(responsiveText.h1, 'font-display font-bold tracking-tight'),
  2: cn(responsiveText.h2, 'font-display font-bold tracking-tight'),
  3: cn(responsiveText.h3, 'font-display font-semibold'),
  4: cn(responsiveText.h4, 'font-display font-semibold'),
  5: cn(responsiveText.h5, 'font-sans font-medium'),
  6: cn(responsiveText.h6, 'font-sans font-medium'),
}

export const Heading: React.FC<HeadingProps> = ({
  level = 2,
  as,
  gradient = false,
  glow = false,
  animate = false,
  className,
  children,
  ...props
}) => {
  const Component = as || (`h${level}` as any)
  
  const animationProps = {
    initial: animate ? { opacity: 0, y: animate === 'slide' ? 20 : 0 } : undefined,
    animate: animate ? { opacity: 1, y: 0 } : undefined,
    transition: animate ? { duration: 0.5, ease: 'easeOut' } : undefined,
  }

  return (
    <Component
      className={cn(
        headingStyles[level],
        gradient !== false && gradientText[gradient],
        glow && gradient === 'gold' && 'drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]',
        glow && gradient === 'royal' && 'drop-shadow-[0_0_20px_rgba(45,45,127,0.5)]',
        className
      )}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  )
}

// Text Component
export interface TextProps extends BaseTypographyProps, HTMLMotionProps<'p'> {
  as?: 'p' | 'span' | 'div'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'primary' | 'secondary' | 'tertiary' | 'gold' | 'inverse'
  leading?: 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose'
}

const textSizes = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
}

const textWeights = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const textColors = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  tertiary: 'text-text-tertiary',
  gold: 'text-royal-gold',
  inverse: 'text-royal-midnight',
}

const textLeading = {
  tight: 'leading-tight',
  snug: 'leading-snug',
  normal: 'leading-normal',
  relaxed: 'leading-relaxed',
  loose: 'leading-loose',
}

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'primary',
  leading = 'normal',
  gradient = false,
  glow = false,
  animate = false,
  className,
  children,
  ...props
}) => {
  const animationProps = {
    initial: animate ? { opacity: 0, y: animate === 'slide' ? 10 : 0 } : undefined,
    animate: animate ? { opacity: 1, y: 0 } : undefined,
    transition: animate ? { duration: 0.3, ease: 'easeOut' } : undefined,
  }

  return (
    <Component
      className={cn(
        'font-sans',
        textSizes[size],
        textWeights[weight],
        gradient === false && textColors[color],
        textLeading[leading],
        gradient !== false && gradientText[gradient],
        glow && gradient === 'gold' && 'drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]',
        glow && gradient === 'royal' && 'drop-shadow-[0_0_10px_rgba(45,45,127,0.5)]',
        className
      )}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  )
}

// Label Component
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean
  size?: 'sm' | 'base' | 'lg'
}

export const Label: React.FC<LabelProps> = ({
  required = false,
  size = 'base',
  className,
  children,
  ...props
}) => {
  return (
    <label
      className={cn(
        'font-medium text-text-secondary',
        {
          'text-sm': size === 'sm',
          'text-base': size === 'base',
          'text-lg': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="ml-1 text-error">*</span>}
    </label>
  )
}

// Display Component for large decorative text
export interface DisplayProps extends BaseTypographyProps, HTMLMotionProps<'div'> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const displaySizes = {
  sm: 'text-4xl md:text-5xl lg:text-6xl',
  md: 'text-5xl md:text-6xl lg:text-7xl',
  lg: 'text-6xl md:text-7xl lg:text-8xl',
  xl: 'text-7xl md:text-8xl lg:text-9xl',
}

export const Display: React.FC<DisplayProps> = ({
  size = 'md',
  gradient = 'gold',
  glow = true,
  animate = 'fade',
  className,
  children,
  ...props
}) => {
  const animationProps = {
    initial: animate ? { opacity: 0, scale: animate === 'bounce' ? 0.8 : 1 } : undefined,
    animate: animate ? { opacity: 1, scale: 1 } : undefined,
    transition: animate ? { duration: 0.6, ease: 'easeOut' } : undefined,
  }

  return (
    <motion.div
      className={cn(
        'font-display font-bold tracking-tighter',
        displaySizes[size],
        gradient !== false && gradientText[gradient],
        glow && gradient === 'gold' && 'drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]',
        glow && gradient === 'royal' && 'drop-shadow-[0_0_30px_rgba(45,45,127,0.6)]',
        className
      )}
      {...animationProps}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Code Component
export interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'inline' | 'block'
}

export const Code: React.FC<CodeProps> = ({
  variant = 'inline',
  className,
  children,
  ...props
}) => {
  if (variant === 'block') {
    return (
      <pre
        className={cn(
          'rounded-lg bg-black/50 p-4 font-mono text-sm',
          'border border-white/10',
          'overflow-x-auto scrollbar-hide',
          className
        )}
        {...props}
      >
        <code>{children}</code>
      </pre>
    )
  }

  return (
    <code
      className={cn(
        'rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm',
        'border border-white/10',
        className
      )}
      {...props}
    >
      {children}
    </code>
  )
}

// Quote Component
export interface QuoteProps extends React.BlockquoteHTMLAttributes<HTMLQuoteElement> {
  author?: string
  source?: string
}

export const Quote: React.FC<QuoteProps> = ({
  author,
  source,
  className,
  children,
  ...props
}) => {
  return (
    <blockquote
      className={cn(
        'relative border-l-4 border-royal-gold pl-6 py-4',
        'italic text-text-secondary',
        className
      )}
      {...props}
    >
      <div className="text-lg leading-relaxed">{children}</div>
      {(author || source) && (
        <footer className="mt-2 text-sm text-text-tertiary not-italic">
          {author && <cite className="font-medium">{author}</cite>}
          {author && source && ' — '}
          {source && <span>{source}</span>}
        </footer>
      )}
    </blockquote>
  )
}

// List Component
export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  variant?: 'bullet' | 'number' | 'check' | 'none'
  spacing?: 'tight' | 'normal' | 'loose'
}

export const List: React.FC<ListProps> = ({
  variant = 'bullet',
  spacing = 'normal',
  className,
  children,
  ...props
}) => {
  const Component = variant === 'number' ? 'ol' : 'ul'
  
  return (
    <Component
      className={cn(
        'ml-6',
        {
          'list-disc': variant === 'bullet',
          'list-decimal': variant === 'number',
          'list-none': variant === 'none' || variant === 'check',
          'space-y-1': spacing === 'tight',
          'space-y-2': spacing === 'normal',
          'space-y-4': spacing === 'loose',
        },
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === 'li' && variant === 'check') {
          return React.cloneElement(child as React.ReactElement<any>, {
            className: cn('flex items-start gap-2', child.props.className),
            children: (
              <>
                <span className="text-success mt-0.5">✓</span>
                <span>{child.props.children}</span>
              </>
            ),
          })
        }
        return child
      })}
    </Component>
  )
}