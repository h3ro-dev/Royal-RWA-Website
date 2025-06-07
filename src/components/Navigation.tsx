'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import { NavigationProps, NavigationItem } from '@/types/components';
import { cn } from '@/lib/utils';

const Navigation = forwardRef<HTMLElement, NavigationProps>(
  (
    {
      items,
      variant = 'default',
      orientation = 'horizontal',
      sticky = false,
      className,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

    // Close mobile menu on resize
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth >= 768) {
          setIsOpen(false);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Base styles
    const baseStyles = cn(
      'w-full',
      sticky && 'sticky top-0 z-40',
      'transition-all duration-300'
    );

    // Variant styles
    const variantStyles = {
      default: 'bg-white dark:bg-gray-800 shadow-sm',
      minimal: 'bg-transparent',
      bordered: 'bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700',
    };

    // Render navigation item
    const renderNavItem = (item: NavigationItem, isMobile = false) => {
      const hasChildren = item.children && item.children.length > 0;
      const isSubmenuOpen = activeSubmenu === item.id;

      const itemStyles = cn(
        'relative flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg',
        'hover:bg-gray-100 dark:hover:bg-gray-700',
        item.active && 'bg-royal-gold/10 text-royal-gold dark:text-royal-bright-gold',
        !item.active && 'text-gray-700 dark:text-gray-300',
        item.disabled && 'opacity-50 cursor-not-allowed',
        isMobile && 'w-full'
      );

      const handleClick = (e: React.MouseEvent) => {
        if (item.disabled) {
          e.preventDefault();
          return;
        }

        if (hasChildren) {
          e.preventDefault();
          setActiveSubmenu(isSubmenuOpen ? null : item.id);
        } else if (item.onClick) {
          e.preventDefault();
          item.onClick();
          if (isMobile) setIsOpen(false);
        }
      };

      const content = (
        <>
          {item.icon && <span className="w-5 h-5">{item.icon}</span>}
          <span>{item.label}</span>
          {hasChildren && (
            <svg
              className={cn(
                'w-4 h-4 ml-auto transition-transform',
                isSubmenuOpen && 'rotate-180'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </>
      );

      return (
        <li key={item.id} className={isMobile ? 'w-full' : 'relative'}>
          {item.href ? (
            <a
              href={item.href}
              className={itemStyles}
              onClick={handleClick}
              aria-disabled={item.disabled}
              aria-current={item.active ? 'page' : undefined}
            >
              {content}
            </a>
          ) : (
            <button
              className={itemStyles}
              onClick={handleClick}
              disabled={item.disabled}
              aria-expanded={hasChildren ? isSubmenuOpen : undefined}
              aria-current={item.active ? 'page' : undefined}
            >
              {content}
            </button>
          )}

          {/* Submenu */}
          {hasChildren && isSubmenuOpen && (
            <ul
              className={cn(
                'mt-1',
                isMobile ? 'pl-4' : 'absolute left-0 top-full min-w-[200px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1'
              )}
            >
              {item.children!.map((child) => renderNavItem(child, isMobile))}
            </ul>
          )}
        </li>
      );
    };

    return (
      <nav
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], className)}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Desktop Navigation */}
            <ul
              className={cn(
                'hidden md:flex items-center',
                orientation === 'horizontal' ? 'flex-row space-x-1' : 'flex-col space-y-1'
              )}
            >
              {items.map((item) => renderNavItem(item))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={cn(
              'md:hidden overflow-hidden transition-all duration-300',
              isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <ul className="py-4 space-y-1">
              {items.map((item) => renderNavItem(item, true))}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
);

Navigation.displayName = 'Navigation';

export { Navigation };