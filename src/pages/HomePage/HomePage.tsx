import packageJson from '../../../package.json';
import type { ReactNode } from 'react';

/**
 * Feature
 *
 * Describes a single feature entry rendered in the
 * Core or Optional Features sections.
 *
 * @property label - Visible label for the feature
 * @property url - Optional external URL for more information
 * @property description - Short supporting description
 * @property icon - Optional decorative icon (emoji or SVG)
 */
interface Feature {
  label: string;
  url?: string;
  description: string;
  icon?: ReactNode;
}

/**
 * TextCard
 *
 * Simple content card used for short explanatory sections
 * such as "Key Features".
 *
 * @property heading - Card title
 * @property content - Card body text
 */
interface TextCard {
  heading: string;
  content: string;
}

/**
 * Section
 *
 * Generic, accessible section renderer used to eliminate
 * duplicated JSX patterns across the Home page.
 *
 * Features:
 * - Enforces a single heading per section
 * - Provides consistent layout and spacing
 * - Uses `aria-labelledby` for assistive technologies
 *
 * @typeParam T - Item type rendered by the section
 *
 * @param title - Visible section title
 * @param ariaId - ID used for `aria-labelledby`
 * @param items - Collection of items to render
 * @param renderItem - Render function for a single item
 *
 * @returns JSX.Element representing a semantic page section
 */
function Section<T>({
  title,
  ariaId,
  items,
  renderItem,
}: Readonly<{
  title: string;
  ariaId: string;
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
}>) {
  return (
    <section className="mt-16" aria-labelledby={ariaId}>
      <h2 id={ariaId} className="text-secondary">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-4">{items.map(renderItem)}</div>
    </section>
  );
}

/**
 * renderTextCard
 *
 * Renders a single `TextCard` as an accessible article.
 *
 * @param card - Card content to render
 * @param index - Index used to generate a stable heading ID
 * @param ariaId - Section ID prefix for accessibility
 *
 * @returns JSX.Element representing a card article
 */
function renderTextCard(
  card: TextCard,
  index: number,
  ariaId: string
): ReactNode {
  return (
    <article
      key={card.heading}
      className="card mb-4"
      aria-labelledby={`${ariaId}-${index}`}
    >
      <h3 id={`${ariaId}-${index}`}>{card.heading}</h3>
      <p>{card.content}</p>
    </article>
  );
}

/**
 * renderFeatureCard
 *
 * Renders a grouped list of features inside a single card.
 *
 * Accessibility:
 * - Uses a semantic `<ul>` list
 * - Decorative icons are hidden from assistive tech
 * - External links open in a new tab with proper `rel` values
 *
 * @param features - Collection of features to render
 * @param ariaId - ID used for the card heading
 *
 * @returns JSX.Element representing a feature list card
 */
function renderFeatureCard(features: Feature[], ariaId: string): ReactNode {
  return (
    <article className="card mb-4" aria-labelledby={ariaId}>
      <h3 id={ariaId}>Features</h3>
      <ul className="list-none">
        {features.map((feature, index) => (
          <li key={`${feature.label}-${index}`} className="mb-2 flex gap-2">
            {feature.icon && <span aria-hidden="true">{feature.icon}</span>}
            <span>
              {feature.url ? (
                <a href={feature.url} target="_blank" rel="noopener noreferrer">
                  {feature.label}
                </a>
              ) : (
                <span>{feature.label}</span>
              )}
              {feature.description && <span> {feature.description}</span>}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

/**
 * keyFeatureCards
 *
 * High-level value propositions shown near the top
 * of the Home page.
 */
const keyFeatureCards: readonly TextCard[] = [
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
];

/**
 * coreFeatures
 *
 * Core functionality included by default in the template.
 */
const coreFeatures: Feature[] = [
  {
    icon: '♿',
    label: 'Accessibility-first',
    url: 'https://www.w3.org/WAI/WCAG22/quickref/',
    description: '(WCAG 2.2 AA compliant)',
  },
  {
    icon: '🦾',
    label: 'Axe-core accessibility checks',
    url: 'https://github.com/dequelabs/axe-core',
    description: 'Automated accessibility assertions',
  },
  {
    icon: '✨',
    label: 'React 19',
    url: 'https://react.dev/',
    description: 'with the latest features',
  },
  {
    icon: '🧪',
    label: 'Vitest + RTL',
    url: 'https://vitest.dev/',
    description: 'unit and accessibility testing',
  },
];

/**
 * optionalFeatures
 *
 * Optional, opt-in tooling that can be enabled
 * depending on project needs.
 */
const optionalFeatures: Feature[] = [
  {
    icon: '🔎',
    label: 'CodeQL',
    url: 'https://securitylab.github.com/tools/codeql',
    description: 'static security analysis',
  },
  {
    icon: '☁️',
    label: 'SonarCloud',
    url: 'https://sonarcloud.io/',
    description: 'code quality and security',
  },
  {
    icon: '📝',
    label: 'TypeDoc',
    url: 'https://typedoc.org/',
    description: 'automated API documentation',
  },
];

/**
 * HomePage
 *
 * Landing page for the Modern React Template.
 *
 * Design goals:
 * - Accessibility-first semantics
 * - Zero duplicated JSX patterns
 * - Strict typing and documented APIs
 * - SonarCloud-compliant structure
 *
 * @returns JSX.Element representing the Home page
 */
export function HomePage() {
  return (
    <main
      className="bg-surface text-text-primary min-h-screen"
      id="main-content"
    >
      <div className="container">
        <section aria-labelledby="page-title">
          <h1 id="page-title" className="text-primary">
            Modern React Template v{packageJson.version}
          </h1>

          <p>
            Welcome to your accessibility-first React application built with
            Vite and TypeScript.
          </p>

          <Section
            title="Key Features"
            ariaId="key-features-title"
            items={keyFeatureCards}
            renderItem={(card, index) =>
              renderTextCard(card, index, 'key-features-title')
            }
          />

          <Section
            title="Core Features"
            ariaId="core-features-title"
            items={[coreFeatures]}
            renderItem={() =>
              renderFeatureCard(coreFeatures, 'core-features-title-list')
            }
          />

          <Section
            title="Optional Features"
            ariaId="optional-features-title"
            items={[optionalFeatures]}
            renderItem={() =>
              renderFeatureCard(
                optionalFeatures,
                'optional-features-title-list'
              )
            }
          />
        </section>
      </div>
    </main>
  );
}
