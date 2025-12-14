import { forwardRef, useCallback } from 'react';
import type { ButtonHTMLAttributes } from 'react';

/**
 * Button Component
 *
 * An accessible, keyboard-navigable button component following WCAG 2.2 AA guidelines.
 *
 * Features:
 * - Keyboard accessible (Enter, Space)
 * - Screen reader friendly with proper ARIA attributes
 * - Supports disabled state with appropriate styling
 * - Uses design tokens for colors (no hardcoded values)
 * - Forwards ref for parent access
 * - No inline event handlers (uses useCallback)
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      className = '',
      disabled = false,
      type = 'button',
      onClick,
      ...rest
    },
    ref
  ) => {
    // Memoized click handler to avoid inline functions
    const handleClick = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        if (disabled) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
      },
      [disabled, onClick]
    );

    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary:
        'bg-primary text-white hover:bg-primary-hover active:bg-primary-active focus-visible:outline-primary',
      secondary:
        'bg-secondary text-white hover:bg-secondary-hover active:bg-secondary-active focus-visible:outline-secondary',
      accent:
        'bg-accent text-white hover:bg-accent-hover active:bg-accent-active focus-visible:outline-accent',
      danger: 'bg-error text-white hover:bg-error focus-visible:outline-error',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    const combinedClassName =
      `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`.trim();

    return (
      <button
        ref={ref}
        type={type}
        className={combinedClassName}
        disabled={disabled}
        onClick={handleClick}
        aria-disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
);
