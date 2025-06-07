'use client';

import React, { forwardRef } from 'react';
import { CardProps } from '@/types/components';
import { cn } from '@/lib/utils';

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hoverable = false,
      clickable = false,
      gradient = false,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = cn(
      'rounded-xl transition-all duration-300',
      clickable && 'cursor-pointer',
      hoverable && 'hover:scale-[1.02] hover:shadow-lg'
    );

    // Padding styles
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    // Variant styles
    const variantStyles = {
      default: cn(
        'bg-white dark:bg-gray-800',
        'border border-gray-200 dark:border-gray-700',
        hoverable && 'hover:border-royal-gold dark:hover:border-royal-bright-gold'
      ),
      glass: cn(
        'backdrop-blur-lg',
        'bg-white/10 dark:bg-gray-900/10',
        'border border-white/20 dark:border-white/10',
        'shadow-lg',
        hoverable && 'hover:bg-white/20 dark:hover:bg-gray-900/20'
      ),
      elevated: cn(
        'bg-white dark:bg-gray-800',
        'shadow-lg hover:shadow-xl',
        'border border-transparent'
      ),
      bordered: cn(
        'bg-transparent',
        'border-2 border-royal-gold dark:border-royal-bright-gold',
        hoverable && 'hover:bg-royal-gold/5 dark:hover:bg-royal-bright-gold/5'
      ),
    };

    // Gradient overlay
    const gradientOverlay = gradient && (
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-royal-gold/10 to-royal-bright-gold/10 pointer-events-none" />
    );

    // Glass morphism effects
    const glassEffects = variant === 'glass' && (
      <>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        <div className="absolute inset-0 rounded-xl backdrop-blur-xl pointer-events-none" />
      </>
    );

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          paddingStyles[padding],
          variantStyles[variant],
          'relative',
          className
        )}
        onClick={onClick}
        {...props}
      >
        {glassEffects}
        {gradientOverlay}
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);

Card.displayName = 'Card';

// Card Header Component
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex items-start justify-between mb-4', className)}
        {...props}
      >
        {children || (
          <>
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            {action && <div className="ml-4">{action}</div>}
          </>
        )}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

// Card Body Component
interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('text-gray-700 dark:text-gray-300', className)}
        {...props}
      />
    );
  }
);

CardBody.displayName = 'CardBody';

// Card Footer Component
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  separator?: boolean;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ separator = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mt-4',
          separator && 'pt-4 border-t border-gray-200 dark:border-gray-700',
          className
        )}
        {...props}
      />
    );
  }
);

CardFooter.displayName = 'CardFooter';

export { Card };