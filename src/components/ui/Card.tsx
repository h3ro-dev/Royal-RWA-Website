'use client'

import React, { forwardRef } from 'react'
import { motion, type HTMLMotionProps, MotionProps } from 'framer-motion'
import { cn } from '../../utils/cn'
import { glassStyles } from '../../utils/style-helpers'

type CardElement = React.ElementRef<'div'>;

export interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'glass' | 'solid' | 'gradient'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  hover?: boolean
  glow?: boolean
  gradient?: 'gold' | 'royal' | 'mixed' | 'custom'
  customGradient?: string
  children: React.ReactNode
}

const variants = {
  default: 'bg-background-secondary border border-white/10',
  glass: glassStyles.medium,
  solid: 'bg-royal-midnight border border-royal-deep-blue',
  gradient: '', // Applied conditionally based on gradient prop
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10',
}

const gradients = {
  gold: 'bg-gradient-to-br from-royal-gold/20 to-royal-bright-gold/10',
  royal: 'bg-gradient-to-br from-royal-midnight to-royal-deep-blue',
  mixed: 'bg-gradient-to-br from-royal-gold/20 via-royal-deep-blue/20 to-royal-bright-gold/10',
  custom: '', // Uses customGradient prop
}

const Card = forwardRef<CardElement, CardProps>(
  (
    {
      className,
      variant = 'glass',
      padding = 'md',
      hover = true,
      glow = false,
      gradient,
      customGradient,
      children,
      ...props
    },
    ref
  ) => {
    const isGradientVariant = variant === 'gradient' || gradient

    return (
      <motion.div
        ref={ref}
        className={cn(
          // Base styles
          'relative rounded-2xl overflow-hidden',
          'shadow-lg',
          
          // Variant styles
          variants[variant],
          
          // Gradient styles
          isGradientVariant && [
            gradient && gradients[gradient],
            customGradient,
            'border border-white/10',
          ],
          
          // Padding
          paddings[padding],
          
          // Hover effects
          hover && [
            'transition-all duration-base',
            'hover:shadow-xl',
            variant === 'glass' && 'hover:bg-white/10 hover:border-white/20',
            variant === 'default' && 'hover:bg-background-tertiary',
            variant === 'solid' && 'hover:bg-royal-deep-blue',
          ],
          
          // Glow effect
          glow && 'shadow-glow-gold',
          
          className
        )}
        whileHover={hover ? { y: -2 } : undefined}
        {...props}
      >
        {/* Background blur layer for glass effect */}
        {variant === 'glass' && (
          <div className="absolute inset-0 bg-gradient-glass opacity-50" />
        )}
        
        {/* Content */}
        <div className="relative z-10">{children}</div>
        
        {/* Animated border gradient */}
        {(glow || hover) && (
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0"
            style={{
              background: 'linear-gradient(45deg, transparent 30%, rgba(212, 175, 55, 0.5) 50%, transparent 70%)',
              filter: 'blur(10px)',
            }}
            animate={glow ? { opacity: [0.3, 0.6, 0.3] } : undefined}
            whileHover={hover ? { opacity: 0.3 } : undefined}
            transition={glow ? { duration: 2, repeat: Infinity } : { duration: 0.3 }}
          />
        )}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

export default Card

// Card Header Component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  action?: React.ReactNode
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  title,
  subtitle,
  action,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4 pb-4',
        className
      )}
      {...props}
    >
      {children || (
        <>
          <div className="space-y-1">
            {title && (
              <h3 className="text-xl font-semibold text-white">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-text-secondary">{subtitle}</p>
            )}
          </div>
          {action && <div className="flex-shrink-0">{action}</div>}
        </>
      )}
    </div>
  )
}

// Card Content Component
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent: React.FC<CardContentProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn('space-y-4', className)}
      {...props}
    />
  )
}

// Card Footer Component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'left' | 'center' | 'right' | 'between'
}

export const CardFooter: React.FC<CardFooterProps> = ({
  className,
  align = 'right',
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex gap-4 pt-4 mt-4 border-t border-white/10',
        {
          'justify-start': align === 'left',
          'justify-center': align === 'center',
          'justify-end': align === 'right',
          'justify-between': align === 'between',
        },
        className
      )}
      {...props}
    />
  )
}