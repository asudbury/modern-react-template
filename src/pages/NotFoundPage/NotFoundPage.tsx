import { Link } from '@tanstack/react-router';
import { ShadcnButton } from '@/components/shadcn';
import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';

/**
 * NotFoundPage
 *
 * Accessible 404 Not Found page for unmatched routes.
 * - Keyboard and screen reader accessible
 * - Uses design tokens and Tailwind
 *
 * @example
 * ```tsx
 * <NotFoundPage />
 * ```
 */
export const NotFoundPage = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(() => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center">
    <h1 className="text-5xl font-bold">404</h1>
    <p>Sorry, the page you are looking for could not be found.</p>
    <ShadcnButton asChild variant="secondary" size="lg">
      <Link to="/">Go back home</Link>
    </ShadcnButton>
  </div>
));

NotFoundPage.displayName = 'NotFoundPage';
