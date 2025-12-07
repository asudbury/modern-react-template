import type { ReactNode } from 'react';

export interface AppState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  timestamp: number;
}

export type AppAction =
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'TOGGLE_SIDEBAR' }
  | {
      type: 'ADD_NOTIFICATION';
      payload: Omit<Notification, 'id' | 'timestamp'>;
    }
  | { type: 'REMOVE_NOTIFICATION'; payload: string };

export interface AppProviderProps {
  children: ReactNode;
}

export interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}
