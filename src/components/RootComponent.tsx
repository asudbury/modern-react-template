import { Outlet } from '@tanstack/react-router';
import { Navigation } from '../components/Navigation';
import type { ReactNode } from 'react';

/**
 * RootComponent
 *
 * Renders the navigation and outlet for child routes.
 * Used as the root route component in the router.
 *
 * @example
 * <RootComponent />
 */
export function RootComponent(): ReactNode {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
