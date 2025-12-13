import { useCallback, useState } from 'react';
import packageJson from '../../../package.json';
import { Button } from '../../components/Button';
import { Link } from '@tanstack/react-router';
import { useNotifications } from '../../context/useAppContext';

/**
 * HomePage Component
 *
 * Example page component demonstrating:
 * - Accessible markup (semantic HTML)
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
