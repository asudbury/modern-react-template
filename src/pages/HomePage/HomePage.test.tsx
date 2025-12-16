import { render, screen } from '@testing-library/react';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('should render the main heading and version', () => {
    render(<HomePage />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Modern React Template v/i);
  });

  it('should render all key feature cards', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: /Accessibility First/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Type Safety/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Performance/i })
    ).toBeInTheDocument();
  });

  it('should render core features list', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: /Core features/i })
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole('link')
        .some((link) =>
          link.textContent?.match(
            /Accessibility-first|Axe-core|Commitlint|ESLint|Husky|Playwright|Prettier|TanStack Query|TanStack Router|Vitest|Zod/
          )
        )
    ).toBe(true);
  });

  it('should render optional features list', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: /Optional features/i })
    ).toBeInTheDocument();
    expect(
      screen
        .getAllByRole('link')
        .some((link) =>
          link.textContent?.match(/GitHub Pages|SonarCloud|TypeDoc/)
        )
    ).toBe(true);
  });

  it('should all feature links open in a new tab', () => {
    render(<HomePage />);
    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'));
    });
  });
});
