import { useCallback, useSyncExternalStore } from 'react';
import type { ButtonHTMLAttributes } from 'react';

/**
 * ThemeToggleButton
 *
 * Accessible button to toggle between light and dark themes.
 * Adds/removes the 'theme-dark' class on <html>.
 *
 * @example
 * <ThemeToggleButton />
 */
export interface ThemeToggleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

function getCurrentThemeDark() {
  return (
    document.documentElement.classList.contains('theme-dark') ||
    document.body.classList.contains('theme-dark')
  );
}

export function ThemeToggleButton({ ...rest }: ThemeToggleButtonProps) {
  // Sync with external theme changes (e.g., system, other tabs)
  const isDark = useSyncExternalStore((cb) => {
    window.addEventListener('themechange', cb);
    return () => window.removeEventListener('themechange', cb);
  }, getCurrentThemeDark);

  const handleToggleTheme = useCallback(() => {
    const root = document.documentElement;
    const body = document.body;
    const next = !(
      root.classList.contains('theme-dark') ||
      body.classList.contains('theme-dark')
    );
    root.classList.toggle('theme-dark', next);
    body.classList.toggle('theme-dark', next);
    // Dispatch a custom event for cross-tab/theme sync
    window.dispatchEvent(new Event('themechange'));
  }, []);

  return (
    <button
      type="button"
      aria-pressed={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={handleToggleTheme}
      {...rest}
    >
      {isDark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}

ThemeToggleButton.displayName = 'ThemeToggleButton';
