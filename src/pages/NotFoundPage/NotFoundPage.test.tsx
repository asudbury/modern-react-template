import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('should render the 404 heading and message', () => {
    render(<NotFoundPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /404|not found/i
    );
    expect(screen.getByText(/could not be found/i)).toBeInTheDocument();
  });

  it('should have a link to return home', () => {
    render(<NotFoundPage />);
    const link = screen.getByRole('link', { name: /home|return/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/');
  });

  it('should have a link that is keyboard accessible', async () => {
    render(<NotFoundPage />);
    const user = userEvent.setup();
    const link = screen.getByRole('link', { name: /home|return/i });
    link.focus();
    expect(link).toHaveFocus();
    await user.keyboard('{Enter}');
  });
});
