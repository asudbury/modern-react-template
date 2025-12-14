import { Button } from '@/components/Button/Button';
import { Link } from '@tanstack/react-router';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

// Adapter for TanStack Router's notFoundComponent prop
export function NotFoundPageAdapter(_props: {}) {
  // NotFoundPage does not use any props from the router
  return <NotFoundPage />;
}

/**
 * NotFoundPage
 *
 * Accessible 404 Not Found page for unmatched routes.
 * - Keyboard and screen reader accessible
 * - Uses design tokens
 *
 * @example
 * ```tsx
 * <NotFoundPage />
 * ```
 */
export const NotFoundPage = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>((props, ref) => (
  <div ref={ref} {...props}>
    <h1>404</h1>
    <p>Sorry, the page you are looking for could not be found.</p>
    <Button>
      <Link to="/">Go back home</Link>
    </Button>
  </div>
));
NotFoundPage.displayName = 'NotFoundPage';
