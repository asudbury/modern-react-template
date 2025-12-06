/**
 * Root Application Component
 *
 * This component sets up the application's global providers and renders the main page.
 *
 * Provider Hierarchy:
 * 1. QueryClientProvider - Manages server state with TanStack Query
 * 2. AppProvider - Manages client-side state with Context + Reducer
 * 3. HomePage - Main application page
 *
 * Configuration:
 * - Query stale time: 5 minutes
 * - Window focus refetching: disabled
 *
 * @returns The configured application with all necessary providers
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from './context/AppContext';
import { HomePage } from './pages/HomePage';

/**
 * TanStack Query client configuration
 *
 * Configured with sensible defaults:
 * - 5 minute stale time to reduce unnecessary refetches
 * - No refetch on window focus to prevent interrupting user workflows
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <HomePage />
      </AppProvider>
    </QueryClientProvider>
  );
}
