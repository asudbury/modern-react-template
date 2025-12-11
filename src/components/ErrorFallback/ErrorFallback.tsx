
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
export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const handleReload = useCallback(() => {
    // Try to reset the boundary first
    resetErrorBoundary();
    // If that fails or if we want a hard reload, we could use:
    // window.location.reload();
  }, [resetErrorBoundary]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-7xl w-full bg-white rounded-lg shadow-lg p-12 space-y-8 text-center min-h-[50vh] flex flex-col justify-center items-center">
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
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

        <h1 className="text-2xl font-bold text-gray-900">
          Something went wrong
        </h1>

        <div className="text-left bg-gray-100 rounded p-4 overflow-auto max-h-48 text-sm font-mono text-red-700 break-words">
          {error.message}
        </div>

        <p className="text-gray-600">
          We apologize for the inconvenience. Please try reloading the page.
        </p>

        <div className="flex gap-4 justify-center">
          <Button
            onClick={handleReload}
            variant="primary"
          >
            Try Again
          </Button>

          <Button
            onClick={() => (window.location.href = '/')}
            variant="secondary"
          >
            Go to Home page
          </Button>
        </div>
      </div>
    </div>
  );
}
