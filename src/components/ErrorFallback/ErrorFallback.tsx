import { useCallback } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { Button } from '../Button';

/**
 * ErrorFallback Component
 *
 * Displays a user-friendly error message when the application crashes.
 * Provides a way to reload the application/reset the error boundary.
 *
 * @param {FallbackProps} props - The props provided by react-error-boundary
 * @param {Error} props.error - The error that was thrown
 * @param {Function} props.resetErrorBoundary - Function to reset the error boundary
 */
export function ErrorFallback({
  error,
  resetErrorBoundary,
}: Readonly<FallbackProps>) {
  const handleReload = useCallback(() => {
    // Try to reset the boundary first
    resetErrorBoundary();
    // If that fails or if we want a hard reload, we could use:
    // globalThis.location.reload();
  }, [resetErrorBoundary]);

  return (
    <div>
      <div>
        <div>
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1>Something went wrong</h1>

        <div>{error.message}</div>

        <p>
          We apologize for the inconvenience. Please try reloading the page.
        </p>

        <div>
          <Button onClick={handleReload} variant="primary">
            Try Again
          </Button>

          <Button onClick={() => (globalThis.location.href = '/')}>
            Go to Home page
          </Button>
        </div>
      </div>
    </div>
  );
}
