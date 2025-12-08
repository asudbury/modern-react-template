/**
 * Router Configuration
 *
 * This file configures the TanStack Router instance with all routes.
 *
 * Features:
 * - File-based routing
 * - Type-safe navigation
 * - Lazy loading support
 *
 * @example
 * ```tsx
 * import { router } from './router';
 * // Use router in your app
 * ```
 */

import {
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from '@tanstack/react-router';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { SamplesDemo } from './pages/SamplesDemo';

/**
 * Root route component that renders the navigation and outlet for child routes
 */
function RootComponent() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

/**
 * Root route definition for TanStack Router
 */
const rootRoute = createRootRoute({
  component: RootComponent,
});

/**
 * Index route definition (home page)
 */
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

/**
 * Samples route definition
 */
const samplesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/samples',
  component: SamplesDemo,
});

/**
 * Route tree configuration
 * Defines the hierarchy and structure of all routes
 */
const routeTree = rootRoute.addChildren([indexRoute, samplesRoute]);

/**
 * Router instance
 * Configured with the route tree and default options
 */
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
});

/**
 * Type declaration for router instance
 * Enables type-safe navigation throughout the app
 */
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
