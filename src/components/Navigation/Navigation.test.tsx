/**
 * Navigation Component Tests
 *
 * Tests for the Navigation component using TanStack Router.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { createMemoryHistory, RouterProvider } from '@tanstack/react-router';
import { router } from '../../router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from '../../context/AppContext';

/**
 * Helper to render components with router context
 */
function renderWithRouter() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const history = createMemoryHistory({
    initialEntries: ['/'],
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RouterProvider router={router} history={history} />
      </AppProvider>
    </QueryClientProvider>
  );
}

describe('Navigation', () => {
  it('should render navigation with home and samples links', async () => {
    renderWithRouter();

    expect(
      await screen.findByRole('link', { name: /navigate to home page/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /navigate to samples page/i })
    ).toBeInTheDocument();
  });

  it('should have accessible navigation landmark', async () => {
    renderWithRouter();

    expect(await screen.findByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toHaveAccessibleName(
      'Main navigation'
    );
  });

  it('should navigate to samples page when samples link is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    const samplesLink = await screen.findByRole('link', {
      name: /navigate to samples page/i,
    });
    await user.click(samplesLink);

    // Check if we're on the samples page by looking for specific content
    expect(
      await screen.findByText(/Sample Components Demo/i)
    ).toBeInTheDocument();
  });

  it('should be keyboard accessible', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    const homeLink = await screen.findByRole('link', {
      name: /navigate to home page/i,
    });
    const samplesLink = screen.getByRole('link', {
      name: /navigate to samples page/i,
    });

    // Tab to first link
    await user.tab();
    
    await waitFor(() => {
      expect(homeLink).toHaveFocus();
    });

    // Tab to second link
    await user.tab();
    
    await waitFor(() => {
      expect(samplesLink).toHaveFocus();
    });
  });
});
