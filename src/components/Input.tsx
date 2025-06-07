'use client';

import React, { forwardRef, useState, useId } from 'react';
import { InputProps } from '@/types/components';
import { cn } from '@/lib/utils';

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      variant = 'default',
      leftIcon,
      rightIcon,
      floatingLabel = false,
      className,
      disabled,
      required,
      value,
      onChange,
      onFocus,
      onBlur,
      placeholder,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(!!value);
    const inputId = useId();

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(!!e.target.value);
      onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      onChange?.(e);
    };

    // Base styles
    const baseStyles = cn(
      'w-full rounded-lg transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-royal-gold focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'placeholder:text-gray-400 dark:placeholder:text-gray-500'
    );

    // Size styles
    const sizeStyles = {
      sm: cn(
        'text-sm',
        leftIcon || rightIcon ? 'py-1.5' : 'py-2',
        leftIcon ? 'pl-9' : 'pl-3',
        rightIcon ? 'pr-9' : 'pr-3'
      ),
      md: cn(
        'text-base',
        leftIcon || rightIcon ? 'py-2' : 'py-2.5',
        leftIcon ? 'pl-10' : 'pl-4',
        rightIcon ? 'pr-10' : 'pr-4'
      ),
      lg: cn(
        'text-lg',
        leftIcon || rightIcon ? 'py-2.5' : 'py-3',
        leftIcon ? 'pl-12' : 'pl-5',
        rightIcon ? 'pr-12' : 'pr-5'
      ),
    };

    // Variant styles
    const variantStyles = {
      default: cn(
        'bg-white dark:bg-gray-800',
        'border border-gray-300 dark:border-gray-600',
        'hover:border-gray-400 dark:hover:border-gray-500',
        isFocused && 'border-royal-gold dark:border-royal-bright-gold',
        error && 'border-red-500 dark:border-red-400'
      ),
      filled: cn(
        'bg-gray-100 dark:bg-gray-900',
        'border border-transparent',
        'hover:bg-gray-200 dark:hover:bg-gray-800',
        isFocused && 'bg-white dark:bg-gray-800 border-royal-gold dark:border-royal-bright-gold',
        error && 'bg-red-50 dark:bg-red-900/20 border-red-500 dark:border-red-400'
      ),
      outlined: cn(
        'bg-transparent',
        'border-2 border-gray-300 dark:border-gray-600',
        'hover:border-gray-400 dark:hover:border-gray-500',
        isFocused && 'border-royal-gold dark:border-royal-bright-gold',
        error && 'border-red-500 dark:border-red-400'
      ),
    };

    // Icon size styles
    const iconSizeStyles = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    // Floating label styles
    const labelStyles = floatingLabel
      ? cn(
          'absolute left-3 transition-all duration-200 pointer-events-none',
          'text-gray-500 dark:text-gray-400',
          leftIcon && 'left-10',
          (isFocused || hasValue) && cn(
            'text-xs -top-2.5 left-3 bg-white dark:bg-gray-800 px-1',
            isFocused && 'text-royal-gold dark:text-royal-bright-gold',
            error && 'text-red-500 dark:text-red-400'
          ),
          !(isFocused || hasValue) && cn(
            size === 'sm' && 'top-2 text-sm',
            size === 'md' && 'top-2.5 text-base',
            size === 'lg' && 'top-3 text-lg'
          )
        )
      : cn(
          'block mb-2 font-medium',
          'text-gray-700 dark:text-gray-300',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-base',
          size === 'lg' && 'text-lg',
          error && 'text-red-500 dark:text-red-400'
        );

    return (
      <div className="w-full">
        {label && !floatingLabel && (
          <label htmlFor={inputId} className={labelStyles}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400',
              iconSizeStyles[size]
            )}>
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            required={required}
            placeholder={floatingLabel ? ' ' : placeholder}
            className={cn(
              baseStyles,
              sizeStyles[size],
              variantStyles[variant],
              'text-gray-900 dark:text-white',
              className
            )}
            {...props}
          />

          {floatingLabel && label && (
            <label htmlFor={inputId} className={labelStyles}>
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}

          {rightIcon && (
            <div className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400',
              iconSizeStyles[size]
            )}>
              {rightIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p className={cn(
            'mt-1.5 text-sm',
            error ? 'text-red-500 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };