import packageJson from '../../../package.json';
import type { ReactNode } from 'react';
import { useCallback } from 'react';

/**
 * Feature
 *
 * Represents a feature displayed on the HomePage.
 *
 * @property label - Display label for the feature
 * @property url - URL for more information
 * @property description - Short description of the feature
 * @property icon - Optional icon (emoji or SVG)
 */
export interface Feature {
  label: string;
  url?: string;
  description: string;
  icon?: ReactNode;
}
function makeFeatures(features: Feature[]): Feature[] {
  return features;
}

/**
 * List of core features for the HomePage.
 */
const coreFeatures = makeFeatures([
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
    icon: '✨',
    label: 'React 19',
    url: 'https://react.dev/',
    description: 'with the latest features',
  },
  {
    icon: '🎨',
    label: 'Tailwind-like CSS',
    url: 'https://tailwindcss.com/',
    description: 'utility classes in index.css',
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
    icon: '🌗',
    label: 'Theming',
    description: 'with light/dark mode and design tokens',
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
  {
    icon: '🚫',
    label: '404 Not Found Page',
    description: 'accessible, customizable fallback for unmatched routes',
  },
]);

/**
 * List of optional features for the HomePage.
 */
const optionalFeatures = makeFeatures([
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
    icon: '📝',
    label: 'TypeDoc',
    url: 'https://typedoc.org/',
    description: 'for automated API documentation',
  },
]);

/**
 * HomePage
 *
 * Accessible, tokenized landing page for the Modern React Template.
 *
 * Features:
 * - Semantic HTML and proper heading hierarchy
 * - No inline event handlers (uses useCallback)
 * - Accessible lists and keyboard navigation
 * - Strict TypeScript types
 */
export function HomePage() {
  /**
   * Render a feature list item.
   *
   * @param feature - Feature to render
   * @param idx - Index in the list
   * @returns List item node
   */
  const renderFeatureItem = useCallback(
    (feature: Feature, idx: number) => (
      <li key={feature.label + idx} className="gap-2 mb-2">
        {feature.icon && <span aria-hidden="true">{feature.icon}</span>}
        <span>
          <a href={feature.url} target="_blank" rel="noopener noreferrer">
            {feature.label}
          </a>
          {feature.description && <span> {feature.description}</span>}
        </span>
      </li>
    ),
    []
  );

  return (
    <main
      className="bg-surface text-text-primary min-h-screen"
      id="main-content"
    >
      <div className="container">
        <section aria-labelledby="page-title">
          <h1 className="text-primary">
            Modern React Template v{packageJson.version}
          </h1>
          <p>
            Welcome to your accessibility-first React application built with
            Vite and TypeScript.
          </p>

          <section className="mt-16" aria-labelledby="features-title">
            <h2 className="text-secondary">Key Features</h2>
            <div className="grid grid-cols-1 gap-4">
              <article
                className="card mb-4"
                aria-labelledby="accessibility-title"
              >
                <h3 id="accessibility-title">Accessibility First</h3>
                <p>
                  Every component is keyboard-navigable, screen-reader friendly,
                  and meets WCAG 2.2 AA standards.
                </p>
              </article>
              <article
                className="card mb-4"
                aria-labelledby="type-safety-title"
              >
                <h3 id="type-safety-title">Type Safety</h3>
                <p>
                  Strict TypeScript configuration with Zod validation for all
                  external data.
                </p>
              </article>
              <article
                className="card mb-4"
                aria-labelledby="performance-title"
              >
                <h3 id="performance-title">Performance</h3>
                <p>
                  No inline handlers, optimized rendering, and efficient state
                  management.
                </p>
              </article>
            </div>
          </section>

          <section className="mt-8" aria-labelledby="core-features-title">
            <article className="card mb-4">
              <h3 id="core-features-title">Core features</h3>
              <ul className="list-none">
                {coreFeatures.map(renderFeatureItem)}
              </ul>
            </article>
          </section>

          <section className="mt-8" aria-labelledby="optional-features-title">
            <article className="card mb-4">
              <h3 id="optional-features-title">Optional features</h3>
              <ul className="list-none">
                {optionalFeatures.map(renderFeatureItem)}
              </ul>
            </article>
          </section>
        </section>
      </div>
    </main>
  );
}

export default HomePage;
