/**
 * Root Application Component
 *
 * This component sets up the application's global providers and renders the router.
 *
 * Provider Hierarchy:
 * 1. QueryClientProvider - Manages server state with TanStack Query
 * 2. AppProvider - Manages client-side state with Context + Reducer
 * 3. RouterProvider - Manages routing with TanStack Router
 *
 * Configuration:
 * - Query stale time: 5 minutes
 * - Window focus refetching: disabled
 * - Router preloading: on intent
 *
 * @returns The configured application with all necessary providers
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { AppProvider } from './context/AppContext';
import { router } from './router';

/**
 * TanStack Query client configuration
 *
 * Configured with sensible defaults that can be tuned via env vars:
 * - `VITE_QUERY_STALE_TIME_MS` (default: 0)
 * - `VITE_QUERY_REFETCH_ON_WINDOW_FOCUS` (default: false)
 */
const queryStaleTime = Number(import.meta.env.VITE_QUERY_STALE_TIME_MS) || 0;
const queryRefetchOnWindowFocus =
  (import.meta.env.VITE_QUERY_REFETCH_ON_WINDOW_FOCUS ?? 'false') === 'true';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: queryStaleTime,
      refetchOnWindowFocus: queryRefetchOnWindowFocus,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </QueryClientProvider>
  );
}
