'use client'

import React from 'react'
import { cn } from '../../utils/cn'
import { containerWidths, sectionPadding } from '../../utils/style-helpers'

// Container Component
export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: keyof typeof containerWidths
  padding?: keyof typeof sectionPadding
  as?: React.ElementType
  center?: boolean
}

export const Container: React.FC<ContainerProps> = ({
  size = 'wide',
  padding = 'medium',
  as: Component = 'div',
  center = true,
  className,
  children,
  ...props
}) => {
  return (
    <Component
      className={cn(
        containerWidths[size],
        sectionPadding[padding],
        center && 'mx-auto',
        'px-4 sm:px-6 lg:px-8',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

// Section Component
export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'alternate' | 'dark' | 'gradient'
  padding?: keyof typeof sectionPadding
  fullWidth?: boolean
}

const sectionVariants = {
  default: 'bg-background-primary',
  alternate: 'bg-background-secondary',
  dark: 'bg-background-tertiary',
  gradient: 'bg-gradient-to-b from-background-primary to-background-secondary',
}

export const Section: React.FC<SectionProps> = ({
  variant = 'default',
  padding = 'large',
  fullWidth = false,
  className,
  children,
  ...props
}) => {
  return (
    <section
      className={cn(
        sectionVariants[variant],
        !fullWidth && sectionPadding[padding],
        'relative overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </section>
  )
}

// Grid Component
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
}

const gridCols = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
  6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
  12: 'grid-cols-1 md:grid-cols-4 lg:grid-cols-12',
}

const gridGaps = {
  none: 'gap-0',
  sm: 'gap-2 md:gap-3 lg:gap-4',
  md: 'gap-4 md:gap-6 lg:gap-8',
  lg: 'gap-6 md:gap-8 lg:gap-10',
  xl: 'gap-8 md:gap-10 lg:gap-12',
}

export const Grid: React.FC<GridProps> = ({
  cols = 3,
  gap = 'md',
  responsive = true,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'grid',
        responsive ? gridCols[cols] : `grid-cols-${cols}`,
        gridGaps[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Row Component
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
  gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  direction?: 'row' | 'col'
}

const alignItems = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
}

const justifyContent = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
}

const rowGaps = {
  none: 'gap-0',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
}

export const Row: React.FC<RowProps> = ({
  align = 'center',
  justify = 'start',
  wrap = false,
  gap = 'md',
  direction = 'row',
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex',
        direction === 'row' ? 'flex-row' : 'flex-col',
        alignItems[align],
        justifyContent[justify],
        wrap && 'flex-wrap',
        rowGaps[gap],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Column Component
export interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number
  offset?: number
  order?: number
}

export const Column: React.FC<ColumnProps> = ({
  span,
  offset,
  order,
  className,
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        span && `col-span-${span}`,
        offset && `col-start-${offset + 1}`,
        order && `order-${order}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Spacer Component
export interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  axis?: 'horizontal' | 'vertical'
}

const spacerSizes = {
  xs: 'h-2 w-2',
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
  '2xl': 'h-20 w-20',
  '3xl': 'h-24 w-24',
}

export const Spacer: React.FC<SpacerProps> = ({
  size = 'md',
  axis = 'vertical',
}) => {
  const sizeClasses = spacerSizes[size]
  const [height, width] = sizeClasses.split(' ')
  
  return (
    <div
      className={cn(
        axis === 'vertical' ? height : 'h-0',
        axis === 'horizontal' ? width : 'w-0'
      )}
      aria-hidden="true"
    />
  )
}

// Divider Component
export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient'
  color?: 'default' | 'gold' | 'blue'
  spacing?: 'sm' | 'md' | 'lg'
}

const dividerVariants = {
  solid: 'border-solid',
  dashed: 'border-dashed',
  dotted: 'border-dotted',
  gradient: 'border-none bg-gradient-to-r',
}

const dividerColors = {
  default: 'border-white/20',
  gold: 'border-royal-gold/50',
  blue: 'border-royal-deep-blue/50',
}

const dividerSpacing = {
  sm: 'my-4',
  md: 'my-8',
  lg: 'my-12',
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'solid',
  color = 'default',
  spacing = 'md',
  className,
  ...props
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        className={cn(
          'inline-block self-stretch',
          'w-px min-h-[1em]',
          'mx-4',
          variant !== 'gradient' && [
            'border-l',
            dividerVariants[variant],
            dividerColors[color],
          ],
          variant === 'gradient' && [
            'w-px',
            color === 'gold' && 'from-transparent via-royal-gold to-transparent',
            color === 'blue' && 'from-transparent via-royal-deep-blue to-transparent',
            color === 'default' && 'from-transparent via-white/20 to-transparent',
          ],
          className
        )}
        {...props}
      />
    )
  }

  return (
    <hr
      className={cn(
        'border-0',
        dividerSpacing[spacing],
        variant !== 'gradient' && [
          'border-t',
          dividerVariants[variant],
          dividerColors[color],
        ],
        variant === 'gradient' && [
          'h-px',
          color === 'gold' && 'from-transparent via-royal-gold to-transparent',
          color === 'blue' && 'from-transparent via-royal-deep-blue to-transparent',
          color === 'default' && 'from-transparent via-white/20 to-transparent',
        ],
        className
      )}
      {...props}
    />
  )
}