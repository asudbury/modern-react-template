// ...existing code...
import packageJson from '../../../package.json';
import type { ReactNode } from 'react';

/**
 * Feature
 *
 * Describes a single feature item shown on the Home page.
 *
 * @property label - Visible label for the feature (used as list item text and key)
 * @property url - Optional external URL with more information (opens in new tab)
 * @property description - Short supporting description shown after the label
 * @property icon - Optional visual indicator (emoji or SVG). Rendered with aria-hidden when present.
 */
interface Feature {
  label: string;
  url?: string;
  description: string;
  icon?: ReactNode;
}
function makeFeatures(features: Feature[]): Feature[] {
  return features;
}

/**
 * FeatureListItem
 *
 * Render a single feature as an accessible list item.
 *
 * Accessibility:
 * - Uses a native <li> element inside a list
 * - Decorative icons are rendered with aria-hidden="true"
 * - External links include rel="noopener noreferrer" and open in a new tab
 *
 * @param param0.feature - Feature data to render
 * @param param0.idx - Index used to create stable IDs/keys when necessary
 *
 * @example
 * <ul><FeatureListItem feature={feature} idx={0} /></ul>
 */
function FeatureListItem({ feature }: Readonly<{ feature: Feature }>) {
  return (
    <li className="gap-2 mb-2">
      {feature.icon && <span aria-hidden="true">{feature.icon}</span>}
      <span>
        <a href={feature.url} target="_blank" rel="noopener noreferrer">
          {feature.label}
        </a>
        {feature.description && <span> {feature.description}</span>}
      </span>
    </li>
  );
}

function featureKey(feature: Feature, idx: number) {
  return `${feature.label}-${idx}`;
}

function FeatureSection({
  title,
  ariaId,
  features,
}: Readonly<{
  title: string;
  ariaId: string;
  features: Feature[];
}>) {
  return (
    <section className="mt-8" aria-labelledby={ariaId}>
      <article className="card mb-4">
        <h3 id={ariaId}>{title}</h3>
        <ul className="list-none">
          {features.map((f, i) => (
            <FeatureListItem feature={f} key={featureKey(f, i)} />
          ))}
        </ul>
      </article>
    </section>
  );
}

/**
 * CardSection
 *
 * Generic, accessible section used to render repeated card/article blocks.
 *
 * Features:
 * - Renders a section with an aria-labelledby reference for proper semantics
 * - Accepts an array of cards where each card contains a heading and content
 * - Each article has an id tied to the section aria-labelledby to preserve accessibility
 *
 * @param title - Visible section title
 * @param ariaId - ID string used for aria-labelledby and per-card heading IDs
 * @param cards - Array of card objects { heading, content } to render
 * @returns JSX.Element - a semantic section containing the provided cards
 *
 * @example
 * <CardSection title="Key Features" ariaId="features-title" cards={[{heading:'A',content:'B'}]} />
 */
function CardSection({
  title,
  cards,
  ariaId,
}: {
  title: string;
  ariaId: string;
  cards: { heading: string; content: string }[];
}) {
  return (
    <section className="mt-16" aria-labelledby={ariaId}>
      <h2 className="text-secondary">{title}</h2>
      <div className="grid grid-cols-1 gap-4">
        {cards.map((c, i) => (
          <article
            className="card mb-4"
            aria-labelledby={`${ariaId}-${i}`}
            key={c.heading}
          >
            <h3 id={`${ariaId}-${i}`}>{c.heading}</h3>
            <p>{c.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
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
    icon: '🔎',
    label: 'CodeQL',
    url: 'https://securitylab.github.com/tools/codeql',
    description: 'static security analysis (opt-in via ENABLE_CODEQL)',
  },
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
 * - No inline event handlers (uses stable functions/components)
 * - Accessible lists and keyboard navigation
 * - Strict TypeScript types
 */
export function HomePage() {
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

          <CardSection
            title="Key Features"
            ariaId="features-title"
            cards={[
              {
                heading: 'Accessibility First',
                content:
                  'Every component is keyboard-navigable, screen-reader friendly, and meets WCAG 2.2 AA standards.',
              },
              {
                heading: 'Type Safety',
                content:
                  'Strict TypeScript configuration with Zod validation for all external data.',
              },
              {
                heading: 'Performance',
                content:
                  'No inline handlers, optimized rendering, and efficient state management.',
              },
            ]}
          />

          <FeatureSection
            title="Core features"
            ariaId="core-features-title"
            features={coreFeatures}
          />

          <FeatureSection
            title="Optional features"
            ariaId="optional-features-title"
            features={optionalFeatures}
          />
        </section>
      </div>
    </main>
  );
}
