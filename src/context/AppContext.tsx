import { createContext, useReducer } from 'react';

/**
 * Application State Management
 *
 * This file defines the global client state using Context + Reducer pattern.
 * Use this for client-side state only. Server state should use TanStack Query.
 *
 * Examples of client state:
 * - UI state (modals, sidebar open/close)
 * - User preferences (theme, language)
 * - Form state (draft values, validation)
 * - Navigation state
 */
import type { AppContextValue, AppProviderProps } from './appTypes';
import { appReducer, initialState } from './appReducer';

export const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
