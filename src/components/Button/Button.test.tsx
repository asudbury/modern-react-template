import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('should render and call onClick when activated', async () => {
    const handle = vi.fn();
    render(<Button onClick={handle}>Click me</Button>);

    const btn = screen.getByRole('button', { name: /click me/i });
    expect(btn).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(btn);
    expect(handle).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when disabled', async () => {
    const handle = vi.fn();
    render(
      <Button onClick={handle} disabled>
        Disabled
      </Button>
    );
    const btn = screen.getByRole('button', { name: /disabled/i });
    const user = userEvent.setup();
    await user.click(btn);
    expect(handle).not.toHaveBeenCalled();
    expect(btn).toHaveAttribute('aria-disabled', 'true');
  });
});
