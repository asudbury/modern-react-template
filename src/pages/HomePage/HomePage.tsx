import { useCallback, useState } from 'react';
import packageJson from '../../../package.json';
import { Button } from '../../components/Button';
import { Link } from '@tanstack/react-router';
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
  ShadcnButton,
  Input,
  Label,
  Separator,
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

// State to trigger an error during render (caught by ErrorBoundary)
export function HomePage() {
  // Optional features data
  interface Feature {
    label: string;
    url: string;
    description: string;
    icon?: string;
  }

  const coreFeatures: Feature[] = [
    {
      icon: '♿',
      label: 'Accessibility-first',
      url: 'https://www.w3.org/WAI/WCAG22/quickref/',
      description: ' (WCAG 2.2 AA compliant)',
    },
    {
      icon: '🦾',
      label: 'Axe-core accessibility checks',
      url: 'https://github.com/dequelabs/axe-core',
      description: 'Automated accessibility assertions',
    },
    {
      icon: '📝',
      label: 'Commitlint',
      url: 'https://www.conventionalcommits.org/',
      description: 'enforcing conventional commit messages',
    },
    {
      icon: '🛡️',
      label: 'Global Error Boundary',
      url: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary',
      description: 'with custom fallback UI and reload/reset support',
    },
    {
      icon: '🔒',
      label: 'ESLint',
      url: 'https://eslint.org/',
      description: ' for linting and code quality',
    },
    {
      icon: '🪝',
      label: 'Husky',
      url: 'https://typicode.github.io/husky/',
      description: ' pre-commit + commit-msg hooks',
    },
    {
      icon: '🎭',
      label: 'Playwright for E2E testing',
      url: 'https://playwright.dev/',
      description: 'End-to-end browser tests',
    },
    {
      icon: '🎨',
      label: 'Prettier',
      url: 'https://prettier.io/',
      description: ' for code formatting',
    },
    {
      icon: '🧩',
      label: 'Shadcn/ui',
      url: 'https://ui.shadcn.com/',
      description: 'components (Card, Badge, Alert, and more)',
    },
    {
      icon: '🔄',
      label: 'TanStack Query',
      url: 'https://tanstack.com/query/latest',
      description: 'for server state management',
    },
    {
      icon: '🧭',
      label: 'TanStack Router',
      url: 'https://tanstack.com/router/latest',
      description: 'for type-safe routing',
    },
    {
      icon: '🎨',
      label: 'Tailwind CSS',
      url: 'https://tailwindcss.com/docs',
      description: 'with design tokens',
    },
    {
      icon: '🎨',
      label: 'Tailwind CSS',
      url: 'https://tailwindcss.com/docs',
      description: 'with design tokens',
    },
    {
      icon: '🧪',
      label: 'Vitest + React Testing Library',
      url: 'https://vitest.dev/',
      description: 'unit testing and accessible queries',
    },
    {
      icon: '🧑‍⚖️',
      label: 'Zod',
      url: 'https://zod.dev/',
      description: 'data validation',
    },
  ];

  const optionalFeatures: Feature[] = [
    {
      icon: '🐙',
      label: 'GitHub Pages',
      url: 'https://docs.github.com/en/pages',
      description: 'deployment',
    },
    {
      icon: '☁️',
      label: 'SonarCloud',
      url: 'https://sonarcloud.io/',
      description: 'for code quality and security analysis',
    },
    {
      icon: '📚',
      label: 'Storybook',
      url: 'https://storybook.js.org/',
      description: 'for component development and documentation',
    },
    {
      icon: '📝',
      label: 'TypeDoc',
      url: 'https://typedoc.org/',
      description: 'for automated API documentation',
    },
  ];

  function renderFeatureItem(feature: Feature, idx: number) {
    // For core features: show icon (if present) outside the hyperlink, hyperlink only the label
    // For optional features: no icon, hyperlink the whole label
    return (
      <li key={feature.label + idx} className="flex items-start gap-2">
        {feature.icon && <span aria-hidden="true">{feature.icon}</span>}
        <span>
          <a
            href={feature.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline hover:text-primary-hover focus:text-primary-hover transition-colors"
          >
            {feature.label}
          </a>
          {feature.description && <span> {feature.description}</span>}
        </span>
      </li>
    );
  }
  const { addNotification } = useNotifications();
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error('This is a simulated crash for testing purposes.');
  }

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
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 flex-1 w-full">
        <section id="main-content" aria-labelledby="page-title">
          <h1
            id="page-title"
            className="text-3xl font-bold text-text-primary mb-6"
          >
            Modern React Template
          </h1>

          <p className="text-lg text-text-secondary font-semibold">
            Welcome to your accessibility-first React application built with
            Vite and TypeScript.
          </p>

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

          <section className="mt-8" aria-labelledby="features-title">
            <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-1 gap-6">
              <article className="bg-surface p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  Core features
                </h3>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  {coreFeatures.map(renderFeatureItem)}
                </ul>
              </article>
            </div>
          </section>

          <section className="mt-8" aria-labelledby="features-title">
            <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-1">
              <article className="bg-surface p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  Optional feature
                </h3>
                <ul className="list-disc list-inside space-y-2 text-text-secondary">
                  {optionalFeatures.map(renderFeatureItem)}
                </ul>
              </article>
            </div>
          </section>
          <div className="mb-8 space-y-4"></div>

          <div className="space-x-4 mb-4">
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

            <Button
              variant="danger"
              size="md"
              onClick={() => setShouldCrash(true)}
              aria-label="Trigger application crash"
            >
              Crash App
            </Button>
            <Button aria-label="Demo 404 Not Found page">
              <Link to="/*">Demo 404 Not Found page</Link>
            </Button>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="shadcn-title">
          <h2
            id="shadcn-title"
            className="text-2xl font-semibold text-text-primary mb-4"
          >
            Shadcn/ui Components
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
                      Shadcn/ui components are now ready to use in your project.
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
                    This is an informational alert using Shadcn/ui components.
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

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Button Component
              </h3>
              <div className="flex flex-wrap gap-2">
                <ShadcnButton variant="default">Default</ShadcnButton>
                <ShadcnButton variant="secondary">Secondary</ShadcnButton>
                <ShadcnButton variant="destructive">Destructive</ShadcnButton>
                <ShadcnButton variant="outline">Outline</ShadcnButton>
                <ShadcnButton variant="ghost">Ghost</ShadcnButton>
                <ShadcnButton variant="link">Link</ShadcnButton>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Form Components
              </h3>
              <div className="max-w-md space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">
                Separator Component
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-text-secondary">
                    Content above separator
                  </p>
                  <Separator className="my-4" />
                  <p className="text-sm text-text-secondary">
                    Content below separator
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="w-full border-t border-border-subtle bg-surface px-4 py-4 text-xs text-text-secondary sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <p>
            Template version{' '}
            <span className="font-mono">{packageJson.version}</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
