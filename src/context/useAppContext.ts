import { useCallback, useContext } from 'react';
import { AppContext } from './AppContext';
import type { Notification } from './appTypes';

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

export function useTheme() {
  const { state, dispatch } = useAppContext();

  const setTheme = useCallback(
    (theme: 'light' | 'dark') => {
      dispatch({ type: 'SET_THEME', payload: theme });
    },
    [dispatch]
  );

  return { theme: state.theme, setTheme };
}

export function useSidebar() {
  const { state, dispatch } = useAppContext();

  const toggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, [dispatch]);

  return { sidebarOpen: state.sidebarOpen, toggleSidebar };
}

export function useNotifications() {
  const { state, dispatch } = useAppContext();

  const addNotification = useCallback(
    (notification: Omit<Notification, 'id' | 'timestamp'>) => {
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification });
    },
    [dispatch]
  );

  const removeNotification = useCallback(
    (id: string) => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
    },
    [dispatch]
  );

  return {
    notifications: state.notifications,
    addNotification,
    removeNotification,
  };
}
