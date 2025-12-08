import { useCallback } from 'react';
import { Button } from '../../src/components/Button';
import { useAppContext, useNotifications } from '../../src/context/useAppContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Separator,
} from '@/components/shadcn';

/**
 * SampleContextUsage Component
 *
 * Demonstrates:
 * - React Context for client state management
 * - useReducer pattern for state updates
 * - Custom hooks for accessing context
 * - Proper event handlers with useCallback
 * - Accessible UI state indicators
 *
 * This is a SAMPLE component for educational purposes.
 * DELETE this file and the entire samples/ directory before deploying to production.
 *
 * @example
 * ```tsx
 * <SampleContextUsage />
 * ```
 */

export function SampleContextUsage() {
  const { state, dispatch } = useAppContext();
  const { addNotification, removeNotification } = useNotifications();

  const handleToggleSidebar = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
    addNotification({
      message: `Sidebar ${state.sidebarOpen ? 'closed' : 'opened'}`,
      type: 'info',
    });
  }, [dispatch, addNotification, state.sidebarOpen]);

  const handleToggleTheme = useCallback(() => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    dispatch({ type: 'SET_THEME', payload: newTheme });
    addNotification({
      message: `Theme changed to ${newTheme}`,
      type: 'success',
    });
  }, [dispatch, addNotification, state.theme]);

  const handleAddSuccessNotification = useCallback(() => {
    addNotification({
      message: 'This is a success notification!',
      type: 'success',
    });
  }, [addNotification]);

  const handleAddErrorNotification = useCallback(() => {
    addNotification({
      message: 'This is an error notification!',
      type: 'error',
    });
  }, [addNotification]);

  const handleAddWarningNotification = useCallback(() => {
    addNotification({
      message: 'This is a warning notification!',
      type: 'warning',
    });
  }, [addNotification]);

  const handleAddInfoNotification = useCallback(() => {
    addNotification({
      message: 'This is an info notification!',
      type: 'info',
    });
  }, [addNotification]);

  const handleClearNotifications = useCallback(() => {
    state.notifications.forEach((notification) => {
      removeNotification(notification.id);
    });
  }, [state.notifications, removeNotification]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-text-primary mb-4">
        Sample Context Usage Component
      </h2>

      <Alert variant="default" className="mb-6">
        <AlertTitle>⚠️ Sample Component</AlertTitle>
        <AlertDescription>
          This demonstrates React Context + Reducer for client state.
          DELETE the samples/ directory before production.
        </AlertDescription>
      </Alert>

      {/* Current State Display */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Application State</CardTitle>
          <CardDescription>
            View the current state managed by React Context
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Theme:</span>
            <Badge variant={state.theme === 'light' ? 'default' : 'secondary'}>
              {state.theme}
            </Badge>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Sidebar:</span>
            <Badge variant={state.sidebarOpen ? 'default' : 'outline'}>
              {state.sidebarOpen ? 'Open' : 'Closed'}
            </Badge>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Notifications:</span>
            <Badge variant="secondary">
              {state.notifications.length} active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* State Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>State Controls</CardTitle>
          <CardDescription>
            Dispatch actions to update global state
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            <Button variant="primary" onClick={handleToggleTheme}>
              Toggle Theme
            </Button>
            <Button variant="secondary" onClick={handleToggleSidebar}>
              Toggle Sidebar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Notification System</CardTitle>
          <CardDescription>
            Add notifications to demonstrate state updates
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="primary"
              onClick={handleAddSuccessNotification}
              size="sm"
            >
              Add Success
            </Button>
            <Button
              variant="danger"
              onClick={handleAddErrorNotification}
              size="sm"
            >
              Add Error
            </Button>
            <Button
              variant="accent"
              onClick={handleAddWarningNotification}
              size="sm"
            >
              Add Warning
            </Button>
            <Button
              variant="secondary"
              onClick={handleAddInfoNotification}
              size="sm"
            >
              Add Info
            </Button>
          </div>

          {state.notifications.length > 0 && (
            <>
              <Separator />
              <Button
                variant="danger"
                onClick={handleClearNotifications}
                size="sm"
                fullWidth
              >
                Clear All Notifications
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Active Notifications Display */}
      {state.notifications.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active Notifications</CardTitle>
            <CardDescription>
              {state.notifications.length} notification(s) in state
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3" role="region" aria-label="Notifications">
              {state.notifications.map((notification) => (
                <Alert
                  key={notification.id}
                  variant={
                    notification.type === 'error' ? 'destructive' : 'default'
                  }
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <AlertTitle className="capitalize">
                        {notification.type}
                      </AlertTitle>
                      <AlertDescription>{notification.message}</AlertDescription>
                      <p className="text-xs text-text-tertiary mt-2">
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => removeNotification(notification.id)}
                      aria-label={`Remove ${notification.type} notification`}
                    >
                      Dismiss
                    </Button>
                  </div>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Code Example */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
          <CardDescription>Context + Reducer Pattern</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-neutral-100 p-4 rounded-md overflow-x-auto text-sm">
            <code>{`// 1. Access context and dispatch
const { state, dispatch } = useAppContext();

// 2. Dispatch actions to update state
dispatch({ type: 'TOGGLE_SIDEBAR' });
dispatch({ type: 'SET_THEME', payload: 'dark' });

// 3. Use custom hooks for common operations
const { addNotification } = useNotifications();
addNotification({
  message: 'Success!',
  type: 'success',
});`}</code>
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
