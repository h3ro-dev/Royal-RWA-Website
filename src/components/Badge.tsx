'use client';

import React, { forwardRef } from 'react';
import { BadgeProps } from '@/types/components';
import { cn } from '@/lib/utils';

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'md',
      dot = false,
      badgeContent,
      max = 99,
      className,
      children,
      ...props
    },
    ref
  ) => {
    // Format content if it's a number and exceeds max
    const displayContent = typeof badgeContent === 'number' && badgeContent > max 
      ? `${max}+` 
      : badgeContent;

    // Size styles
    const sizeStyles = {
      sm: cn(
        dot ? 'w-2 h-2' : 'text-xs px-1.5 py-0.5',
        'min-w-[1rem]'
      ),
      md: cn(
        dot ? 'w-2.5 h-2.5' : 'text-sm px-2 py-0.5',
        'min-w-[1.25rem]'
      ),
      lg: cn(
        dot ? 'w-3 h-3' : 'text-base px-2.5 py-1',
        'min-w-[1.5rem]'
      ),
    };

    // Variant styles
    const variantStyles = {
      default: 'bg-gray-500 text-white',
      success: 'bg-green-500 text-white',
      warning: 'bg-yellow-500 text-white',
      danger: 'bg-red-500 text-white',
      info: 'bg-blue-500 text-white',
    };

    // Render dot badge
    if (dot) {
      return (
        <span
          ref={ref}
          className={cn(
            'inline-block rounded-full',
            sizeStyles[size],
            variantStyles[variant],
            'animate-pulse',
            className
          )}
          {...props}
        />
      );
    }

    // Render content badge
    if (badgeContent !== undefined || children) {
      return (
        <span
          ref={ref}
          className={cn(
            'inline-flex items-center justify-center font-medium rounded-full',
            sizeStyles[size],
            variantStyles[variant],
            className
          )}
          {...props}
        >
          {displayContent || children}
        </span>
      );
    }

    return null;
  }
);

Badge.displayName = 'Badge';

// BadgeContainer component for positioning badges
interface BadgeContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: React.ReactNode;
  badgePosition?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const BadgeContainer = forwardRef<HTMLDivElement, BadgeContainerProps>(
  ({ badge, badgePosition = 'top-right', className, children, ...props }, ref) => {
    const positionStyles = {
      'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
      'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
      'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
      'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
    };

    return (
      <div ref={ref} className={cn('relative inline-block', className)} {...props}>
        {children}
        {badge && (
          <div className={cn('absolute z-10', positionStyles[badgePosition])}>
            {badge}
          </div>
        )}
      </div>
    );
  }
);

BadgeContainer.displayName = 'BadgeContainer';

export { Badge };