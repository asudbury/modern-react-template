import { useCallback, useState, useRef } from 'react';
import { Button } from '../../src/components/Button';
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
  Input,
  Label,
  Separator,
} from '@/components/shadcn';

/**
 * SampleAccessibility Component
 *
 * Demonstrates:
 * - WCAG 2.2 AA compliance features
 * - Keyboard navigation
 * - Screen reader support with ARIA attributes
 * - Focus management
 * - Semantic HTML usage
 * - Skip links
 * - Form accessibility
 * - Live regions for dynamic content
 *
 * This is a SAMPLE component for educational purposes.
 * DELETE this file and the entire samples/ directory before deploying to production.
 *
 * @example
 * ```tsx
 * <SampleAccessibility />
 * ```
 */

export function SampleAccessibility() {
  const [focusCount, setFocusCount] = useState(0);
  const [keyboardMessage, setKeyboardMessage] = useState('');
  const [liveRegionMessage, setLiveRegionMessage] = useState('');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocusButton = useCallback(() => {
    buttonRef.current?.focus();
    setLiveRegionMessage('Focus moved to the demo button');
  }, []);

  const handleFocusInput = useCallback(() => {
    inputRef.current?.focus();
    setLiveRegionMessage('Focus moved to the demo input');
  }, []);

  const handleButtonFocus = useCallback(() => {
    setFocusCount((prev) => prev + 1);
  }, []);

  const handleButtonClick = useCallback(() => {
    setLiveRegionMessage('Demo button was clicked!');
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const key = event.key;
    setKeyboardMessage(`Key pressed: ${key}`);
    setLiveRegionMessage(`Keyboard event detected: ${key}`);
  }, []);

  const handleClearMessages = useCallback(() => {
    setKeyboardMessage('');
    setLiveRegionMessage('');
    setFocusCount(0);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Skip Link Example */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      <h2 id="page-title" className="text-2xl font-bold text-text-primary mb-4">
        Sample Accessibility Features
      </h2>

      {/* Live Region for Screen Readers */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {liveRegionMessage}
      </div>

      <Alert variant="default" className="mb-6">
        <AlertTitle>⚠️ Sample Component</AlertTitle>
        <AlertDescription>
          This demonstrates accessibility features and WCAG 2.2 AA compliance.
          DELETE the samples/ directory before production.
        </AlertDescription>
      </Alert>

      {/* Main Content */}
      <section id="main-content" aria-labelledby="page-title">
        {/* Semantic HTML Example */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Semantic HTML</CardTitle>
            <CardDescription>
              Using proper HTML elements for better accessibility
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-text-secondary">
              <p>
                ✅ Using <code className="bg-neutral-100 px-2 py-1 rounded">&lt;button&gt;</code> for actions
              </p>
              <p>
                ✅ Using <code className="bg-neutral-100 px-2 py-1 rounded">&lt;a&gt;</code> for navigation
              </p>
              <p>
                ✅ Using <code className="bg-neutral-100 px-2 py-1 rounded">&lt;main&gt;</code>, <code className="bg-neutral-100 px-2 py-1 rounded">&lt;section&gt;</code>, <code className="bg-neutral-100 px-2 py-1 rounded">&lt;nav&gt;</code> landmarks
              </p>
              <p>
                ✅ Using <code className="bg-neutral-100 px-2 py-1 rounded">&lt;h1&gt;</code>-<code className="bg-neutral-100 px-2 py-1 rounded">&lt;h6&gt;</code> in proper hierarchy
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ARIA Attributes Example */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>ARIA Attributes</CardTitle>
            <CardDescription>
              Proper use of ARIA for enhanced accessibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-text-primary mb-2">
                Key ARIA Patterns Used:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-text-secondary">
                <li>
                  <code className="bg-neutral-100 px-2 py-1 rounded">aria-label</code> - Provides accessible names
                </li>
                <li>
                  <code className="bg-neutral-100 px-2 py-1 rounded">aria-labelledby</code> - Associates labels
                </li>
                <li>
                  <code className="bg-neutral-100 px-2 py-1 rounded">aria-describedby</code> - Links descriptions
                </li>
                <li>
                  <code className="bg-neutral-100 px-2 py-1 rounded">aria-live</code> - Announces dynamic content
                </li>
                <li>
                  <code className="bg-neutral-100 px-2 py-1 rounded">aria-required</code> - Indicates required fields
                </li>
                <li>
                  <code className="bg-neutral-100 px-2 py-1 rounded">aria-invalid</code> - Marks validation errors
                </li>
                <li>
                  <code className="bg-neutral-100 px-2 py-1 rounded">role="status"</code> - For status updates
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Keyboard Navigation Example */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Keyboard Navigation</CardTitle>
            <CardDescription>
              All interactive elements are keyboard accessible
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div
              className="p-4 bg-neutral-50 rounded-md"
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="region"
              aria-label="Keyboard event detector"
            >
              <p className="text-sm text-text-secondary mb-2">
                Focus this area and press any key:
              </p>
              {keyboardMessage ? (
                <Badge variant="secondary">{keyboardMessage}</Badge>
              ) : (
                <Badge variant="outline">Waiting for keyboard input...</Badge>
              )}
            </div>

            <div className="space-y-2 text-sm text-text-secondary">
              <p>⌨️ <strong>Tab</strong> - Move focus forward</p>
              <p>⌨️ <strong>Shift + Tab</strong> - Move focus backward</p>
              <p>⌨️ <strong>Enter</strong> or <strong>Space</strong> - Activate buttons</p>
              <p>⌨️ <strong>Escape</strong> - Close dialogs/menus</p>
            </div>
          </CardContent>
        </Card>

        {/* Focus Management Example */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Focus Management</CardTitle>
            <CardDescription>
              Programmatic focus control for better UX
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button variant="primary" onClick={handleFocusButton}>
                Focus Button Below
              </Button>
              <Button variant="secondary" onClick={handleFocusInput}>
                Focus Input Below
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <Button
                ref={buttonRef}
                variant="accent"
                onClick={handleButtonClick}
                onFocus={handleButtonFocus}
              >
                Demo Button (Focusable)
              </Button>

              <div className="space-y-2">
                <Label htmlFor="demo-input">Demo Input (Focusable)</Label>
                <Input
                  ref={inputRef}
                  id="demo-input"
                  type="text"
                  placeholder="Try focusing this input"
                  aria-describedby="input-description"
                />
                <p id="input-description" className="text-sm text-text-secondary">
                  This input can be focused programmatically
                </p>
              </div>

              <div className="text-sm text-text-secondary">
                Focus count on demo button: <Badge variant="secondary">{focusCount}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Contrast Example */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Color Contrast (WCAG AA)</CardTitle>
            <CardDescription>
              All colors meet WCAG 2.2 AA contrast requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-primary text-white p-4 rounded-md">
                <p className="font-semibold">Primary on White</p>
                <p className="text-sm">4.5:1+ contrast ratio ✓</p>
              </div>
              <div className="bg-secondary text-white p-4 rounded-md">
                <p className="font-semibold">Secondary on White</p>
                <p className="text-sm">4.5:1+ contrast ratio ✓</p>
              </div>
              <div className="bg-error text-white p-4 rounded-md">
                <p className="font-semibold">Error on White</p>
                <p className="text-sm">4.5:1+ contrast ratio ✓</p>
              </div>
              <div className="bg-success text-white p-4 rounded-md">
                <p className="font-semibold">Success on White</p>
                <p className="text-sm">4.5:1+ contrast ratio ✓</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Accessibility Example */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Form Accessibility</CardTitle>
            <CardDescription>
              Proper labels, descriptions, and error handling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="accessible-email">
                Email Address <span className="text-error" aria-label="required">*</span>
              </Label>
              <Input
                id="accessible-email"
                type="email"
                placeholder="you@example.com"
                aria-required="true"
                aria-describedby="email-help"
              />
              <p id="email-help" className="text-sm text-text-secondary">
                We'll never share your email with anyone else.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessible-password">
                Password <span className="text-error" aria-label="required">*</span>
              </Label>
              <Input
                id="accessible-password"
                type="password"
                placeholder="Enter password"
                aria-required="true"
                aria-describedby="password-help"
              />
              <p id="password-help" className="text-sm text-text-secondary">
                Must be at least 8 characters long.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Live Region Status */}
        {liveRegionMessage && (
          <Alert variant="default" className="mb-6">
            <AlertTitle>Live Region Announcement</AlertTitle>
            <AlertDescription>
              Screen readers will announce: "{liveRegionMessage}"
            </AlertDescription>
          </Alert>
        )}

        {/* Clear Button */}
        <div className="flex justify-center">
          <Button variant="secondary" onClick={handleClearMessages}>
            Clear All Messages
          </Button>
        </div>
      </section>
    </div>
  );
}
