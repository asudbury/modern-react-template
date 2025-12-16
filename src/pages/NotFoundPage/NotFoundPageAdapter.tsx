import { NotFoundPage } from './NotFoundPage';

/**
 * Adapter for TanStack Router's notFoundComponent prop.
 * Accepts NotFoundRouteProps but ignores them, rendering NotFoundPage.
 */
export function NotFoundPageAdapter(/* props: NotFoundRouteProps */) {
  return <NotFoundPage />;
}
