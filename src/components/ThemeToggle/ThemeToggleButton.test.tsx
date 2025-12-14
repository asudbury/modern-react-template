import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggleButton } from './ThemeToggleButton';

describe('ThemeToggleButton', () => {
  it('should render and toggle theme', async () => {
    render(<ThemeToggleButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    // Initial state: light
    expect(document.documentElement.classList.contains('theme-dark')).toBe(
      false
    );
    await userEvent.click(button);
    expect(document.documentElement.classList.contains('theme-dark')).toBe(
      true
    );
    await userEvent.click(button);
    expect(document.documentElement.classList.contains('theme-dark')).toBe(
      false
    );
  });
});
