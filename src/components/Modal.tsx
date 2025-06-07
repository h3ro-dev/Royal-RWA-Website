'use client';

import React, { forwardRef, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from '@/types/components';
import { cn } from '@/lib/utils';

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      isOpen,
      onClose,
      title,
      size = 'md',
      closeOnBackdropClick = true,
      closeOnEsc = true,
      showCloseButton = true,
      footer,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Handle ESC key press
    const handleEscKey = useCallback(
      (event: KeyboardEvent) => {
        if (closeOnEsc && event.key === 'Escape') {
          onClose();
        }
      },
      [closeOnEsc, onClose]
    );

    // Handle backdrop click
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnBackdropClick && event.target === event.currentTarget) {
        onClose();
      }
    };

    // Focus management
    useEffect(() => {
      if (isOpen) {
        // Store current active element
        previousActiveElement.current = document.activeElement as HTMLElement;
        
        // Focus first focusable element in modal
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements && focusableElements.length > 0) {
          (focusableElements[0] as HTMLElement).focus();
        }

        // Add event listeners
        document.addEventListener('keydown', handleEscKey);
        document.body.style.overflow = 'hidden';

        return () => {
          document.removeEventListener('keydown', handleEscKey);
          document.body.style.overflow = '';
          
          // Restore focus to previous element
          if (previousActiveElement.current) {
            previousActiveElement.current.focus();
          }
        };
      }
    }, [isOpen, handleEscKey]);

    // Size styles
    const sizeStyles = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl',
      full: 'max-w-full mx-4',
    };

    // Animation classes
    const backdropAnimation = isOpen
      ? 'opacity-100'
      : 'opacity-0 pointer-events-none';
    
    const modalAnimation = isOpen
      ? 'opacity-100 scale-100'
      : 'opacity-0 scale-95';

    // Don't render if not open and no animation
    if (!isOpen && !modalAnimation.includes('opacity-0')) {
      return null;
    }

    const modalContent = (
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center p-4',
          'transition-opacity duration-300',
          backdropAnimation
        )}
        onClick={handleBackdropClick}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Modal */}
        <div
          ref={(node) => {
            modalRef.current = node;
            if (ref) {
              if (typeof ref === 'function') {
                ref(node);
              } else if (ref && 'current' in ref) {
                // Use Object.defineProperty to bypass readonly
                Object.defineProperty(ref, 'current', {
                  value: node,
                  writable: true,
                  configurable: true
                });
              }
            }
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          className={cn(
            'relative bg-white dark:bg-gray-800 rounded-xl shadow-xl',
            'w-full',
            'transform transition-all duration-300',
            'max-h-[90vh] flex flex-col',
            sizeStyles[size],
            modalAnimation,
            className
          )}
          {...props}
        >
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              {title && (
                <h2
                  id="modal-title"
                  className="text-xl font-semibold text-gray-900 dark:text-white"
                >
                  {title}
                </h2>
              )}
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="ml-auto p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              {footer}
            </div>
          )}
        </div>
      </div>
    );

    // Use portal to render modal at document root
    if (typeof window !== 'undefined') {
      return createPortal(modalContent, document.body);
    }

    return null;
  }
);

Modal.displayName = 'Modal';

export { Modal };