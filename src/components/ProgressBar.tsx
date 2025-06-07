'use client';

import React, { forwardRef } from 'react';
import { ProgressBarProps } from '@/types/components';
import { cn } from '@/lib/utils';

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value,
      max = 100,
      label,
      showValue = false,
      variant = 'default',
      size = 'md',
      animated = true,
      color = 'primary',
      className,
      ...props
    },
    ref
  ) => {
    // Calculate percentage
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    // Size styles
    const sizeStyles = {
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
    };

    // Color styles
    const colorStyles = {
      primary: 'bg-royal-gold',
      success: 'bg-green-500',
      warning: 'bg-yellow-500',
      danger: 'bg-red-500',
    };

    // Variant styles for the fill
    const variantFillStyles = {
      default: colorStyles[color],
      gradient: cn(
        color === 'primary' && 'bg-gradient-to-r from-royal-gold to-royal-bright-gold',
        color === 'success' && 'bg-gradient-to-r from-green-400 to-green-600',
        color === 'warning' && 'bg-gradient-to-r from-yellow-400 to-yellow-600',
        color === 'danger' && 'bg-gradient-to-r from-red-400 to-red-600'
      ),
      striped: cn(
        colorStyles[color],
        'bg-stripes bg-stripes-45'
      ),
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {(label || showValue) && (
          <div className="flex items-center justify-between mb-2">
            {label && (
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}

        <div
          className={cn(
            'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
            sizeStyles[size]
          )}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500 ease-out',
              variantFillStyles[variant],
              animated && 'animate-progress-fill',
              variant === 'striped' && animated && 'animate-stripes'
            )}
            style={{ width: `${percentage}%` }}
          >
            {/* Inner shimmer effect for gradient variant */}
            {variant === 'gradient' && (
              <div className="h-full w-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

ProgressBar.displayName = 'ProgressBar';

export { ProgressBar };