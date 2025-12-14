import { Button } from '@/components/Button';
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
  <div
    ref={ref}
    className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center"
    {...props}
  >
    <h1 className="text-5xl font-bold">404</h1>
    <p>Sorry, the page you are looking for could not be found.</p>
    <Button variant="secondary" size="lg">
      <Link to="/">Go back home</Link>
    </Button>
  </div>
));
NotFoundPage.displayName = 'NotFoundPage';
