import { v4 as uuidv4 } from 'uuid';
import type { AppAction, AppState, Notification } from './appTypes';

export const initialState: AppState = {
  theme: 'light',
  sidebarOpen: false,
  notifications: [],
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload,
            id: uuidv4(),
            timestamp: Date.now(),
          },
        ],
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification: Notification) => notification.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
