/**
 * Navigation Component
 *
 * A navigation bar component using TanStack Router's Link component.
 *
 * Features:
 * - Type-safe navigation with TanStack Router
 * - Accessible keyboard navigation
 * - Active link styling
 * - Semantic HTML with nav element
 *
 * WCAG 2.2 AA Compliance:
 * - Uses semantic <nav> element
 * - Links are keyboard accessible
 * - Clear focus indicators
 * - Active state visible
 *
 * @example
 * ```tsx
 * <Navigation />
 * ```
 */

import { Link } from '@tanstack/react-router';
import { cn } from '@/lib/utils';

/**
 * Navigation component props
 */
export interface NavigationProps {
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Navigation component
 *
 * Renders a navigation bar with links to main sections of the app.
 */
export function Navigation({ className }: NavigationProps) {
  return (
    <nav
      className={cn(
        'flex gap-2 p-4 bg-surface border-b border-border',
        className
      )}
      aria-label="Main navigation"
    >
      <Link
        to="/"
        className="px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary text-text-primary hover:bg-surface-hover"
        activeProps={{
          className:
            'bg-primary text-white font-semibold hover:bg-primary-hover',
        }}
        aria-label="Navigate to home page"
      >
        Home
      </Link>
      <Link
        to="/samples"
        className="px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary text-text-primary hover:bg-surface-hover"
        activeProps={{
          className:
            'bg-primary text-white font-semibold hover:bg-primary-hover',
        }}
        aria-label="Navigate to samples page"
      >
        Samples
      </Link>
    </nav>
  );
}
