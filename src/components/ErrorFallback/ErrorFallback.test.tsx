
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect } from 'vitest';
import { ErrorFallback } from './ErrorFallback';

describe('ErrorFallback', () => {
  it('renders error message and try again button', () => {
    const error = new Error('Test error message');
    const resetErrorBoundary = vi.fn();

    render(
      <ErrorFallback
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    );

    // Check header
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // Check error message
    expect(screen.getByText('Test error message')).toBeInTheDocument();

    // Check button
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
  });

  it('calls resetErrorBoundary when button is clicked', async () => {
    const user = userEvent.setup();
    const error = new Error('Test error');
    const resetErrorBoundary = vi.fn();

    render(
      <ErrorFallback
        error={error}
        resetErrorBoundary={resetErrorBoundary}
      />
    );

    const button = screen.getByRole('button', { name: /try again/i });
    await user.click(button);

    expect(resetErrorBoundary).toHaveBeenCalledTimes(1);
  });
});
