import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('renders 404 message', () => {
    render(<NotFoundPage />);
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(
      screen.getByText(/could not be found/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /go back home/i })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<NotFoundPage />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});