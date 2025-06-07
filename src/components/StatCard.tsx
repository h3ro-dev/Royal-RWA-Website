'use client';

import React, { forwardRef } from 'react';
import { StatCardProps } from '@/types/components';
import { cn } from '@/lib/utils';
import { Card } from './Card';

const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      title,
      value,
      change,
      changeLabel,
      icon,
      loading = false,
      variant = 'default',
      trend,
      className,
      ...props
    },
    ref
  ) => {
    // Determine trend based on change if not explicitly provided
    const displayTrend = trend || (change !== undefined ? (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral') : undefined);

    // Trend colors
    const trendColors = {
      up: 'text-green-600 dark:text-green-400',
      down: 'text-red-600 dark:text-red-400',
      neutral: 'text-gray-600 dark:text-gray-400',
    };

    // Card variant mapping
    const cardVariant = variant === 'gradient' ? 'glass' : variant === 'bordered' ? 'bordered' : 'default';

    // Loading skeleton
    if (loading) {
      return (
        <Card ref={ref} variant={cardVariant} className={className} {...props}>
          <div className="animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              {icon && <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />}
            </div>
            <div className="w-1/2 h-8 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="w-1/3 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </Card>
      );
    }

    return (
      <Card
        ref={ref}
        variant={cardVariant}
        className={cn(variant === 'gradient' && 'bg-gradient-to-br from-royal-gold/10 to-royal-bright-gold/10', className)}
        {...props}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
          {icon && (
            <div className="p-2 bg-royal-gold/10 dark:bg-royal-bright-gold/10 rounded-lg text-royal-gold dark:text-royal-bright-gold">
              {icon}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>

          {(change !== undefined || changeLabel) && displayTrend && (
            <div className="flex items-center gap-1">
              {/* Trend Icon */}
              <svg
                className={cn('w-4 h-4', trendColors[displayTrend])}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {displayTrend === 'up' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7V17"
                  />
                ) : displayTrend === 'down' ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 7L7 17M7 17H17M7 17V7"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h8"
                  />
                )}
              </svg>

              {/* Change Value */}
              {change !== undefined && (
                <span className={cn('text-sm font-medium', trendColors[displayTrend])}>
                  {displayTrend === 'up' && '+'}
                  {change}%
                </span>
              )}

              {/* Change Label */}
              {changeLabel && (
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
      </Card>
    );
  }
);

StatCard.displayName = 'StatCard';

export { StatCard };