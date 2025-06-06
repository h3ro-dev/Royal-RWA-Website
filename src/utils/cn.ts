import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines clsx and tailwind-merge for optimal className handling
 * This utility:
 * - Merges Tailwind CSS classes intelligently
 * - Handles conditional classes
 * - Removes duplicate/conflicting utilities
 * - Supports all clsx input types
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}