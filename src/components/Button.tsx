'use client';

import React, { forwardRef } from 'react';
import { ButtonProps } from '@/types/components';
import { cn } from '@/lib/utils';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = cn(
      'inline-flex items-center justify-center font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royal-gold',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'relative overflow-hidden'
    );

    // Size variants
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-lg',
    };

    // Variant styles
    const variantStyles = {
      primary: cn(
        'bg-gradient-to-r from-royal-gold to-royal-bright-gold text-royal-midnight',
        'hover:shadow-gold hover:scale-[1.02] active:scale-[0.98]',
        'disabled:hover:shadow-none disabled:hover:scale-100'
      ),
      secondary: cn(
        'bg-gradient-to-r from-royal-midnight to-royal-deep-blue text-white',
        'hover:shadow-royal hover:scale-[1.02] active:scale-[0.98]',
        'disabled:hover:shadow-none disabled:hover:scale-100'
      ),
      ghost: cn(
        'bg-transparent text-royal-deep-blue dark:text-royal-gold',
        'hover:bg-royal-deep-blue/10 dark:hover:bg-royal-gold/10',
        'border border-transparent'
      ),
      outline: cn(
        'bg-transparent border-2 border-royal-gold text-royal-gold',
        'hover:bg-royal-gold hover:text-royal-midnight',
        'dark:border-royal-bright-gold dark:text-royal-bright-gold',
        'dark:hover:bg-royal-bright-gold dark:hover:text-royal-midnight'
      ),
      danger: cn(
        'bg-red-600 text-white',
        'hover:bg-red-700 hover:shadow-lg active:scale-[0.98]',
        'disabled:hover:bg-red-600 disabled:hover:shadow-none'
      ),
    };

    // Loading spinner
    const LoadingSpinner = () => (
      <svg
        className={cn(
          'animate-spin h-4 w-4',
          leftIcon && children ? 'mr-2' : '',
          rightIcon && children ? 'ml-2' : ''
        )}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    );

    // Shimmer effect for primary variant
    const shimmerEffect = variant === 'primary' && !disabled && (
      <div className="absolute inset-0 -top-2 -bottom-2 opacity-0 hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
      </div>
    );

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {shimmerEffect}
        {loading && !leftIcon && <LoadingSpinner />}
        {!loading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!loading && rightIcon && <span className="ml-2">{rightIcon}</span>}
        {loading && rightIcon && <LoadingSpinner />}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };