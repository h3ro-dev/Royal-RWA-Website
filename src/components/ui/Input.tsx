'use client'

import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'
import { focusRing } from '../../utils/style-helpers'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'glass' | 'solid'
  inputSize?: 'sm' | 'md' | 'lg'
  error?: boolean
  success?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  label?: string
  helper?: string
  errorMessage?: string
  successMessage?: string
}

const variants = {
  default: [
    'bg-white/5 backdrop-blur-sm',
    'border border-white/20',
    'hover:border-white/30',
    'focus:border-royal-gold focus:bg-white/10',
  ],
  glass: [
    'bg-white/10 backdrop-blur-md',
    'border border-white/30',
    'hover:border-white/40',
    'focus:border-royal-gold focus:bg-white/20',
  ],
  solid: [
    'bg-background-secondary',
    'border border-royal-deep-blue/50',
    'hover:border-royal-deep-blue',
    'focus:border-royal-gold focus:bg-background-tertiary',
  ],
}

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-5 text-lg',
}

const iconPadding = {
  left: {
    sm: 'pl-8',
    md: 'pl-10',
    lg: 'pl-12',
  },
  right: {
    sm: 'pr-8',
    md: 'pr-10',
    lg: 'pr-12',
  },
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = 'default',
      inputSize = 'md',
      error = false,
      success = false,
      icon,
      iconPosition = 'left',
      label,
      helper,
      errorMessage,
      successMessage,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = props.id || props.name
    const showError = error && errorMessage
    const showSuccess = success && successMessage
    const showHelper = helper && !showError && !showSuccess

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            {label}
            {props.required && <span className="ml-1 text-error">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div
              className={cn(
                'absolute top-1/2 -translate-y-1/2 text-text-tertiary',
                iconPosition === 'left' ? 'left-3' : 'right-3',
                disabled && 'opacity-50'
              )}
            >
              {icon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              // Base styles
              'w-full rounded-xl',
              'text-white placeholder:text-text-tertiary',
              'transition-all duration-base',
              'outline-none',
              focusRing.gold,
              
              // Variant styles
              variants[variant],
              
              // Size styles
              sizes[inputSize],
              
              // Icon padding
              icon && iconPosition && iconPadding[iconPosition][inputSize],
              
              // State styles
              error && [
                'border-error focus:border-error',
                'text-error placeholder:text-error/50',
              ],
              success && [
                'border-success focus:border-success',
                'text-success placeholder:text-success/50',
              ],
              
              // Disabled styles
              disabled && [
                'cursor-not-allowed opacity-50',
                'hover:border-white/20',
              ],
              
              className
            )}
            disabled={disabled}
            {...props}
          />
        </div>

        {(showHelper || showError || showSuccess) && (
          <p
            className={cn(
              'mt-1.5 text-sm',
              showError && 'text-error',
              showSuccess && 'text-success',
              showHelper && 'text-text-tertiary'
            )}
          >
            {errorMessage || successMessage || helper}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

// Textarea Component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'glass' | 'solid'
  error?: boolean
  success?: boolean
  label?: string
  helper?: string
  errorMessage?: string
  successMessage?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      variant = 'default',
      error = false,
      success = false,
      label,
      helper,
      errorMessage,
      successMessage,
      disabled,
      ...props
    },
    ref
  ) => {
    const textareaId = props.id || props.name
    const showError = error && errorMessage
    const showSuccess = success && successMessage
    const showHelper = helper && !showError && !showSuccess

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            {label}
            {props.required && <span className="ml-1 text-error">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            // Base styles
            'w-full rounded-xl p-4',
            'text-white placeholder:text-text-tertiary',
            'transition-all duration-base',
            'outline-none resize-none',
            'min-h-[120px]',
            focusRing.gold,
            
            // Variant styles
            variants[variant],
            
            // State styles
            error && [
              'border-error focus:border-error',
              'text-error placeholder:text-error/50',
            ],
            success && [
              'border-success focus:border-success',
              'text-success placeholder:text-success/50',
            ],
            
            // Disabled styles
            disabled && [
              'cursor-not-allowed opacity-50',
              'hover:border-white/20',
            ],
            
            className
          )}
          disabled={disabled}
          {...props}
        />

        {(showHelper || showError || showSuccess) && (
          <p
            className={cn(
              'mt-1.5 text-sm',
              showError && 'text-error',
              showSuccess && 'text-success',
              showHelper && 'text-text-tertiary'
            )}
          >
            {errorMessage || successMessage || helper}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

// Input Group Component
export interface InputGroupProps {
  children: React.ReactNode
  className?: string
  label?: string
  error?: boolean
  errorMessage?: string
}

export const InputGroup: React.FC<InputGroupProps> = ({
  children,
  className,
  label,
  error,
  errorMessage,
}) => {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-text-secondary">
          {label}
        </label>
      )}
      
      <div className="flex">
        {React.Children.map(children, (child, index) => {
          if (React.isValidElement(child)) {
            return (
              <div
                className={cn(
                  'flex-1',
                  index === 0 && 'rounded-r-none',
                  index === React.Children.count(children) - 1 && 'rounded-l-none',
                  index > 0 && index < React.Children.count(children) - 1 && 'rounded-none',
                  index > 0 && '-ml-px'
                )}
              >
                {React.cloneElement(child as React.ReactElement<any>, {
                  error,
                  className: cn(
                    child.props.className,
                    index === 0 && 'rounded-r-none',
                    index === React.Children.count(children) - 1 && 'rounded-l-none',
                    index > 0 && index < React.Children.count(children) - 1 && 'rounded-none'
                  ),
                })}
              </div>
            )
          }
          return child
        })}
      </div>
      
      {error && errorMessage && (
        <p className="mt-1.5 text-sm text-error">{errorMessage}</p>
      )}
    </div>
  )
}