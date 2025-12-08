import { useCallback } from 'react';
import packageJson from '../../../package.json';
import { Button } from '../../components/Button';
import { useNotifications } from '../../context/useAppContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/shadcn';

/**
 * HomePage Component
 *
 * Example page component demonstrating:
 * - Accessible markup (semantic HTML)
 * - Use of design tokens via Tailwind
 * - No inline event handlers (useCallback)
 * - Context usage for client state
 * - Keyboard navigation
 *
 * WCAG 2.2 AA Compliance:
 * - Proper heading hierarchy
 * - Semantic landmarks (main, section)
 * - Keyboard accessible buttons
 * - High contrast colors from tokens
 */

export function HomePage() {
  const { addNotification } = useNotifications();

  const handlePrimaryClick = useCallback(() => {
    addNotification({
      message: 'Primary button clicked!',
      type: 'success',
    });
  }, [addNotification]);

  const handleSecondaryClick = useCallback(() => {
    addNotification({
      message: 'Secondary button clicked!',
      type: 'info',
    });
  }, [addNotification]);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex-1 w-full">
        <section id="main-content" aria-labelledby="page-title">
          <h1
            id="page-title"
            className="text-3xl font-bold text-text-primary mb-6"
          >
            Modern React Template
          </h1>

          <div className="mb-8 space-y-4">
            <p className="text-lg text-text-secondary">
              Welcome to your accessibility-first React 19 application built
              with Vite 7 and TypeScript 5.
            </p>

            <p className="text-base text-text-secondary">
              This template includes:
            </p>

            <ul className="list-disc list-inside space-y-2 text-text-secondary">
              <li>WCAG 2.2 AA accessibility compliance</li>
              <li>Tailwind CSS with design tokens</li>
              <li>TanStack Query for server state</li>
              <li>Context + Reducers for client state</li>
              <li>Vitest + React Testing Library</li>
              <li>Playwright + Axe for E2E testing</li>
              <li>ESLint + Prettier with strict rules</li>
              <li>Husky pre-commit hooks</li>
            </ul>
          </div>

          <div className="space-x-4">
            <Button
              variant="primary"
              size="md"
              onClick={handlePrimaryClick}
              aria-label="Try primary button"
            >
              Primary Action
            </Button>

            <Button
              variant="secondary"
              size="md"
              onClick={handleSecondaryClick}
              aria-label="Try secondary button"
            >
              Secondary Action
            </Button>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="features-title">
          <h2
            id="features-title"
            className="text-2xl font-semibold text-text-primary mb-4"
          >
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="bg-surface p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Accessibility First
              </h3>
              <p className="text-text-secondary">
                Every component is keyboard-navigable, screen-reader friendly,
                and meets WCAG 2.2 AA standards.
              </p>
            </article>

            <article className="bg-surface p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Type Safety
              </h3>
              <p className="text-text-secondary">
                Strict TypeScript configuration with Zod validation for all
                external data.
              </p>
            </article>

            <article className="bg-surface p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-text-primary mb-2">
                Performance
              </h3>
              <p className="text-text-secondary">
                No inline handlers, optimized rendering, and efficient state
                management.
              </p>
            </article>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="shadcn-title">
          <h2
            id="shadcn-title"
            className="text-2xl font-semibold text-text-primary mb-4"
          >
            shadcn/ui Components
          </h2>

          <p className="text-text-secondary mb-6">
            This template now includes shadcn/ui components - beautifully
            designed, accessible components that you can copy and customize.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Card Component
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>
                      Card description goes here
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      This is a shadcn/ui Card component demonstrating the
                      integration with this template.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Features</CardTitle>
                    <CardDescription>Key capabilities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2">
                      <li>✓ Accessible by default</li>
                      <li>✓ Customizable with Tailwind</li>
                      <li>✓ TypeScript support</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Get Started</CardTitle>
                    <CardDescription>Quick setup</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">
                      shadcn/ui components are now ready to use in your project.
                      Start building!
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Badge Component
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Alert Component
              </h3>
              <div className="space-y-4">
                <Alert variant="default">
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    This is an informational alert using shadcn/ui components.
                  </AlertDescription>
                </Alert>

                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    This is a destructive alert demonstrating error states.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="w-full border-t border-border-subtle bg-surface px-4 py-4 text-xs text-text-secondary sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <p aria-label={`Template version ${packageJson.version}`}>
            Template version{' '}
            <span className="font-mono">{packageJson.version}</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
