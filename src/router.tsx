/**
 * Router Configuration
 *
 * This file configures the TanStack Router instance with all routes.
 *
 * Features:
 * - Declarative routing
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
import { RootComponent } from './components/RootComponent';
import { HomePage } from './pages/HomePage';
import { SamplesDemo } from './pages/SamplesDemo';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * Root route definition for TanStack Router
 */
const rootRoute = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
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
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  samplesRoute,
  notFoundRoute,
]);

/**
 * Router instance
 * Configured with the route tree and default options
 */
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  basepath:
    import.meta.env.MODE === 'production' ? '/modern-react-template/app' : '/',
  defaultNotFoundComponent: NotFoundPage,
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
