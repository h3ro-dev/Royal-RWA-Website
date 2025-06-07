'use client'

import React, { forwardRef } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'
import { cn } from '../../utils/cn'
import { focusRing, transitions } from '../../utils/style-helpers'

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fullWidth?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  glow?: boolean
  pulse?: boolean
}

const variants = {
  primary: [
    'bg-gradient-to-r from-royal-gold to-royal-bright-gold',
    'text-royal-midnight font-semibold',
    'shadow-lg shadow-royal-gold/20',
    'hover:shadow-xl hover:shadow-royal-gold/30',
    'hover:scale-105 active:scale-95',
    'border border-royal-gold/20',
  ],
  secondary: [
    'bg-white/10 backdrop-blur-md',
    'text-white',
    'border border-white/20',
    'hover:bg-white/20 hover:border-white/30',
    'shadow-lg',
  ],
  outline: [
    'bg-transparent',
    'text-royal-gold',
    'border-2 border-royal-gold',
    'hover:bg-royal-gold hover:text-royal-midnight',
    'hover:shadow-lg hover:shadow-royal-gold/20',
  ],
  ghost: [
    'bg-transparent',
    'text-white',
    'hover:bg-white/10',
    'hover:backdrop-blur-sm',
  ],
  link: [
    'bg-transparent',
    'text-royal-gold',
    'hover:text-royal-bright-gold',
    'underline-offset-4 hover:underline',
    'p-0 h-auto',
  ],
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-4 py-2 text-base rounded-xl',
  lg: 'px-6 py-3 text-lg rounded-xl',
  xl: 'px-8 py-4 text-xl rounded-2xl',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      loading = false,
      disabled = false,
      icon,
      iconPosition = 'left',
      glow = false,
      pulse = false,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    return (
      <motion.button
        ref={ref}
        className={cn(
          // Base styles
          'relative inline-flex items-center justify-center gap-2',
          'font-medium leading-none',
          'select-none touch-manipulation',
          transitions.base,
          focusRing.gold,
          
          // Variant styles
          variants[variant],
          
          // Size styles (not applied to link variant)
          variant !== 'link' && sizes[size],
          
          // Full width
          fullWidth && 'w-full',
          
          // Glow effect
          glow && 'shadow-glow-gold animate-glow',
          
          // Pulse effect
          pulse && 'animate-pulse-gold',
          
          // Disabled styles
          isDisabled && [
            'opacity-50 cursor-not-allowed',
            'hover:scale-100 hover:shadow-none',
          ],
          
          className
        )}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02 } : undefined}
        whileTap={!isDisabled ? { scale: 0.98 } : undefined}
        {...props}
      >
        {/* Loading spinner */}
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </motion.div>
        )}
        
        {/* Content */}
        <motion.div
          className={cn(
            'flex items-center gap-2',
            loading && 'invisible'
          )}
        >
          {icon && iconPosition === 'left' && (
            <span className="inline-flex">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="inline-flex">{icon}</span>
          )}
        </motion.div>
        
        {/* Hover gradient overlay for primary variant */}
        {variant === 'primary' && (
          <motion.div
            className="absolute inset-0 rounded-inherit bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0"
            initial={false}
            whileHover={{ opacity: 1, x: '100%' }}
            transition={{ duration: 0.5 }}
            style={{ x: '-100%' }}
          />
        )}
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export default Button

// Button Group Component
export interface ButtonGroupProps {
  children: React.ReactNode
  className?: string
  vertical?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className,
  vertical = false,
  size,
  variant,
}) => {
  return (
    <div
      className={cn(
        'inline-flex',
        vertical ? 'flex-col' : 'flex-row',
        !vertical && 'divide-x divide-white/20',
        vertical && 'divide-y divide-white/20',
        'rounded-xl overflow-hidden',
        'border border-white/20',
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === Button) {
          return React.cloneElement(child as React.ReactElement<ButtonProps>, {
            size: size || child.props.size,
            variant: variant || child.props.variant,
            className: cn(
              child.props.className,
              'rounded-none border-0 shadow-none',
              !vertical && 'first:rounded-l-xl last:rounded-r-xl',
              vertical && 'first:rounded-t-xl last:rounded-b-xl'
            ),
          })
        }
        return child
      })}
    </div>
  )
}