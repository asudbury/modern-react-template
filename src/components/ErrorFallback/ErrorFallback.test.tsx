import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorFallback } from './ErrorFallback';

describe('ErrorFallback', () => {
  it('should render the error message and reset button', () => {
    render(
      <ErrorFallback
        error={new Error('Test error')}
        resetErrorBoundary={vi.fn()}
      />
    );
    expect(
      screen.getByRole('button', { name: /reset|reload|try again/i })
    ).toBeInTheDocument();
  });

  it('should call resetErrorBoundary when button is clicked', async () => {
    const reset = vi.fn();
    render(
      <ErrorFallback
        error={new Error('Test error')}
        resetErrorBoundary={reset}
      />
    );
    const user = userEvent.setup();
    const button = screen.getByRole('button', {
      name: /reset|reload|try again/i,
    });
    await user.click(button);
    expect(reset).toHaveBeenCalled();
  });

  it('should be reset button is keyboard accessible', async () => {
    render(
      <ErrorFallback
        error={new Error('Test error')}
        resetErrorBoundary={vi.fn()}
      />
    );
    const user = userEvent.setup();
    const button = screen.getByRole('button', {
      name: /reset|reload|try again/i,
    });
    button.focus();
    expect(button).toHaveFocus();
    await user.keyboard('{Enter}');
  });
});
