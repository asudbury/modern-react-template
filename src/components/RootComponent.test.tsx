import { render, screen } from '@testing-library/react';

// Mock the TanStack Router Outlet to avoid router setup in unit tests
vi.mock('@tanstack/react-router', () => ({
  Outlet: () => <div data-testid="outlet-mock" />,
}));

import { RootComponent } from './RootComponent';
import type { JSX } from 'react';

describe('RootComponent', () => {
  it('renders the router outlet', () => {
    render((<RootComponent />) as unknown as JSX.Element);
    expect(screen.getByTestId('outlet-mock')).toBeInTheDocument();
  });
});
