# GitHub Copilot Instructions — Modern React App (Vite + TypeScript)

This file contains project-specific guidelines and conventions for GitHub Copilot to follow when generating code for this repository.

You are contributing to a modern, accessibility-first React 19 application built with Vite 7 and TypeScript 5. This repository enforces strict rules for accessibility (WCAG 2.2 AA), no inline JSX handlers, Tailwind tokenized colors, TanStack React Query 5, Context + Reducers for client state, Vitest + RTL tests, and Playwright + Axe for E2E accessibility checks.

## Purpose

This document is the authoritative source of conventions, constraints, and expectations for this starter repository. The project uses Vite 7 + React 19 + TypeScript 5 and is built with an accessibility-first approach (WCAG 2.2 AA). The repo includes a tokenized Tailwind design system, TanStack Query for server state, strict linting, and automated accessibility checks (Playwright + axe) in CI.

Use this file to guide Copilot suggestions and human contributors — prefer solutions that are accessible, well-typed, and maintainable.

### Development Tools

- **Storybook**: Component development and documentation in isolation. All components should have corresponding `.stories.tsx` files.
- **TypeDoc**: Automated API documentation generation from JSDoc comments. Documentation is published to GitHub Pages.
- **SonarCloud**: Continuous code quality and security analysis integrated into CI/CD pipeline.

## Core Principles

1. **Accessibility First**: Every component must be keyboard-navigable, screen reader friendly, and WCAG 2.2 AA compliant
2. **Type Safety**: All code must be strictly typed with TypeScript
3. **No Default Exports**: Use named exports only for components and modules
4. **Design Tokens Only**: Never use hardcoded colors or spacing - always use design tokens from `src/styles/tokens.css`
5. **Data Validation**: All external data must be validated using Zod schemas
6. **Storybook Stories**: All UI components must have Storybook stories for documentation and testing
7. **JSDoc Documentation**: All exported functions, components, and types must have comprehensive JSDoc comments for TypeDoc generation
8. **Predictable APIs**: Components expose clear controlled/uncontrolled APIs, forward refs, accept `className` and `data-*` props
9. **No inline JSX functions**: Avoid inline callbacks in JSX (e.g., `onClick={() => ...}`). Use `useCallback` or named functions defined outside of JSX to improve performance and testability
10. **Tokenized styles**: Use design tokens via `src/styles/tokens.css` and Tailwind utilities. Do not hardcode color or spacing values in components

## Repository Conventions

- **Layout**: `src/` contains application code. Components live under `src/components/<ComponentName>/` with `index.ts`, `<ComponentName>.tsx`, `<ComponentName>.test.tsx`
- **Naming**: PascalCase for components and directories. Hooks prefixed with `use` and named in camelCase (e.g., `useAuth.ts`)
- **Exports**: Use named exports (no default exports for components) and maintain a single barrel `index.ts` per component folder
- **Handlers**: Define handlers with `useCallback` or as stable functions outside render; pass references to JSX props

### File Organization

- **Pages**: Route components live in `src/pages/` (organize nested folders by campaign/iteration structure)
- **Components**: Reusable UI belongs in `src/components/` (forms, tables, pickers, etc.). Group by feature and include `index.ts`, component file, styles, and tests
- **Utils**: Pure utility functions belong in `src/utils/` (e.g., `ruleUtils`, `iterationUtils`, `validatorUtils`). Keep pure logic testable and side-effect free
- **Types / Schemas**: Zod schemas and exported TS types live in `src/schemas/` — export both the runtime `schema` and the derived TypeScript `type`

### Naming Conventions

- **React Components**: PascalCase, named exports preferred
- **Utilities**: camelCase
- **Constants**: UPPER_SNAKE_CASE
- **Types**: PascalCase with descriptive names (avoid generic `Props`)
- **Test files**: `*.test.tsx` or `*.test.ts`

## Code Style Conventions

### Event Handlers
- **NEVER** use inline JSX event handlers
- Always use `useCallback` or named functions defined outside JSX
- Example:
  ```tsx
  // ✅ Good
  const handleClick = useCallback(() => {
    doSomething();
  }, [doSomething]);
  
  return <button onClick={handleClick}>Click me</button>;
  
  // ❌ Bad
  return <button onClick={() => doSomething()}>Click me</button>;
  ```

### Exports
- Use named exports only - no default exports
- Example:
  ```tsx
  // ✅ Good
  export function MyComponent() { }
  export const Button = forwardRef(...);
  
  // ❌ Bad
  export default function MyComponent() { }
  ```

### Design Tokens
- Always use Tailwind classes that reference design tokens
- Example:
  ```tsx
  // ✅ Good
  <button className="bg-primary text-white hover:bg-primary-hover">
  
  // ❌ Bad
  <button className="bg-blue-600 text-white hover:bg-blue-700">
  ```

## JSDoc Documentation

All functions, components, and types should have JSDoc comments following these guidelines:

### Components
```tsx
/**
 * ComponentName
 *
 * Brief description of what the component does.
 *
 * Features:
 * - List key features
 * - Accessibility considerations
 * - Notable behaviors
 *
 * @example
 * ```tsx
 * <ComponentName prop="value">
 *   Content
 * </ComponentName>
 * ```
 */
```

### Functions
```tsx
/**
 * Brief description of what the function does
 *
 * @param paramName - Description of the parameter
 * @param optionalParam - Description (optional)
 * @returns Description of return value
 * @throws ErrorType - When error occurs
 *
 * @example
 * ```ts
 * const result = functionName(param);
 * ```
 */
```

### Types and Interfaces
```tsx
/**
 * Description of the type/interface
 *
 * @property prop1 - Description of prop1
 * @property prop2 - Description of prop2
 */
```

## Component Structure

### Component File Organization
```
ComponentName/
├── ComponentName.tsx         # Main component implementation
├── ComponentName.test.tsx    # Unit tests
├── ComponentName.stories.tsx # Storybook stories
└── index.ts                  # Re-export (named export only)
```

### Component Template
```tsx
import { forwardRef, useCallback } from 'react';
import type { HTMLAttributes } from 'react';

/**
 * ComponentName
 *
 * Description goes here.
 */

export interface ComponentNameProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary';
  // ... other props
}

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ variant = 'primary', ...rest }, ref) => {
    const handleClick = useCallback(() => {
      // Handler logic
    }, []);

    return (
      <div ref={ref} {...rest}>
        {/* Component content */}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

## Storybook Guidelines

### Story File Structure
All UI components must have accompanying Storybook stories:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Example',
  },
};
```

### Story Requirements
- Include all component variants and states
- Add accessibility considerations in story descriptions
- Use `tags: ['autodocs']` for automatic documentation
- Test components in isolation with different props
- Include interactive examples where applicable


## Accessibility Requirements
## Accessibility (WCAG 2.2 AA) Rules

These are enforced via linting, unit/E2E tests, and CI. Key checks:

- **Semantic HTML**: Prefer native elements (`button`, `a`, `input`) over generic `div` elements
- **Keyboard operability**: Ensure interactive controls are reachable and operable using the keyboard (Tab, Shift+Tab, Enter, Space, Arrow keys where appropriate)
- **Focus management**: For overlays (modals, dialogs, menus), trap focus while open and restore focus on close
- **Color contrast**: Ensure minimum contrast ratios (4.5:1 for normal text, 3:1 for large text) using tokens
- **Labels**: Inputs require accessible labels via `<label>` or `aria-label`/`aria-labelledby`
- **ARIA usage**: Only add ARIA role/attributes when necessary; prefer native semantics
- **Images**: Provide informative `alt` attributes; use `alt=""` for decorative images

### Component Checklist
- [ ] Keyboard navigable (Tab, Enter, Space, Arrow keys)
- [ ] Screen reader friendly (proper ARIA labels and roles)
- [ ] Semantic HTML elements used
- [ ] Color contrast meets WCAG 2.2 AA (4.5:1 for text)
- [ ] Focus indicators visible
- [ ] Error messages are accessible

### Common ARIA Patterns
- Use `role`, `aria-label`, `aria-labelledby`, `aria-describedby`
- Use `aria-disabled` in addition to `disabled` attribute
- Use `aria-live` for dynamic content updates
- Use proper heading hierarchy (h1 → h2 → h3)

## Linting, Formatting, and Pre-commit

- **ESLint**: The repo uses `eslint.config.js` configured with `@typescript-eslint`, `jsx-a11y`, and custom rules enforcing the project's conventions
- **Prettier**: Use `.prettierrc` for formatting. Pre-commit hooks run formatting and linting
- **Husky + lint-staged**: Commits must pass linters and unit tests as configured in `package.json` scripts
 - **Commitlint**: Commit messages must follow Conventional Commits and are
   validated by a Husky `commit-msg` hook

### Husky Pre-commit Hook

Set up a Husky pre-commit hook to enforce code quality and build integrity on every commit:

```sh
npm run prettier
npm run test
npm run lint
npm run build
```

Add these commands to your `.husky/pre-commit` file to ensure all code is formatted, tested, linted, and builds successfully before each commit.

### Commit Message Conventions

- Use [Conventional Commits](https://www.conventionalcommits.org/)
- Common types: `feat`, `fix`, `chore`, `refactor`, `test`, `docs`, `ci`
- Subject line should be imperative and concise (≤ 50 characters)

Examples:

```text
feat: add Tailwind token mapping
fix: align AppContext callbacks with useCallback
chore: configure commitlint hook
```

### Code Style (enforced by ESLint)

- Airbnb config + TypeScript
- React 19 (no `React.FC`, no prop spreading restrictions)
- No max-line-length
- Import order managed by Prettier plugin
- 6 warnings allowed (gradual improvement)

## State Management

### Server State (TanStack Query)
- Use TanStack Query for all server/API data
- Always include proper error handling
- Use Zod schemas for response validation

```tsx
const { data, isLoading, error } = useQuery({
  queryKey: ['resource', id],
  queryFn: () => fetchResource(id),
});
```

### Client State (Context + Reducer)
- Use Context + Reducer for client-side state
- Never mutate state directly - always return new objects
- Keep state minimal and focused

## Testing Requirements

### Testing Standards

- **Unit Tests**: Vitest + React Testing Library
  - Use `userEvent.setup()` for interactions (never `fireEvent`)
  - Query by role/label (accessibility-first): `getByRole('combobox')`, `getByLabelText()`, `getByText`
  - Test user behavior, not implementation details
  - Test accessibility: keyboard navigation, ARIA attributes
  - See `src/components/CustomReactSelect/CustomReactSelect.test.tsx` for reference
  - See also for reference https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-testing-libraryuser-event
  - Avoid `waitFor`, prefer `findByX` for reference https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#using-waitfor-to-wait-for-elements-that-can-be-queried-with-find
  - Use accessible queries:
    - `getByRole`
    - `getByLabelText`
    - `findByRole`
  - Mock as little as possible
  - Prefer `toEqual` instead of `toBe`

### E2E Tests
- Use Playwright with Axe for accessibility testing
- Test critical user flows
- Always include `await axe(page)` for accessibility checks

## API and Data Validation

### Fetch Utilities
- Always use the `fetchData` utility from `src/queries/fetch.ts`
- Include Zod schema for response validation
- Handle errors properly with `FetchError`

### Zod Schemas
- Define schemas in `src/schemas/api.ts`
- Export both schema and TypeScript type
- Use UUID validation for IDs
- Treat all external data as untrusted; validate and map to typed shapes before usage

## Testing and CI

- **Unit tests**: Vitest + React Testing Library (see Testing Requirements section above for detailed standards)
- **Accessibility in unit tests**: Use `jest-axe` or `axe` to assert no violations for key components
- **E2E and accessibility**: Playwright tests run `axe` scans in CI to detect regressions against WCAG 2.2 AA. E2E scripts are in the `playwright` folder and invoked by CI
- **CI pipeline**: Lint → Format Check → Unit tests → Build → E2E (Playwright + axe). Axe failures should fail the workflow

## Required Libraries & Tools

- **TanStack Query**: All data fetching and mutations must use TanStack Query (`@tanstack/react-query`)
- **npm**: Use npm for installing dependencies per this project's convention. Example:
  ```bash
  npm install @tanstack/react-query
  ```

## Component Guidelines and Examples

API and implementation patterns:

- **Forward refs**: Use `forwardRef` for components that expose DOM nodes
- **Props**: Accept `className?: string`, `style?: React.CSSProperties`, `data-*` attributes, `ref` when useful, and avoid prop bloat
- **Controlled vs uncontrolled**: Support both patterns using `value`/`onChange` and `defaultValue` respectively

Event handler pattern (required):

```tsx
const handleClick = useCallback(() => {
  doThing();
}, [doThing]);

return <button onClick={handleClick}>Do it</button>;
```

Bad pattern (forbidden):

```tsx
<button onClick={() => doThing()}>Do it</button>
```

Accessibility-first components:

- If you implement custom solutions, replicate their keyboard and ARIA semantics
- Provide unit tests that assert ARIA attributes, keyboard interactions, and no axe violations

## File Naming Conventions

- Components: PascalCase (e.g., `Button.tsx`)
- Utilities: camelCase (e.g., `fetchData.ts`)
- Tests: Match file name with `.test.tsx` suffix
- Index files: `index.ts` (re-exports only)

## Import Order

1. React imports
2. Third-party library imports
3. Internal component imports
4. Internal utility imports
5. Type imports
6. CSS imports

Example:
```tsx
import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../../components/Button';
import { fetchData } from '../../queries/fetch';
import type { User } from '../../schemas/api';
import './styles.css';
```

## Performance Considerations

- Use `useCallback` for event handlers and callbacks
- Use `useMemo` for expensive calculations
- Avoid inline object/array creation in JSX
- Keep component renders minimal

## Error Handling

- Always validate input data with Zod
- Use try-catch blocks for async operations
- Provide user-friendly error messages
- Log errors appropriately

## Comments

- Write self-documenting code when possible
- Use JSDoc for all exported functions and components
- Add inline comments only when the code is not self-explanatory
- Keep comments up-to-date with code changes

## Version Control

- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Reference issue numbers when applicable

## Performance and Runtime Considerations

- Use React lazy-loading for large modules and code-splitting for routes
- Use TanStack Query features (staleTime, cacheTime, background refetching) to reduce unnecessary network usage

## Security

- Do not commit secrets. Use environment variables and SOPS/secret managers for protected values
- Avoid `dangerouslySetInnerHTML` unless content is sanitized

## Environment Variables

- Use `.env` files for local development and configuration. Never commit secrets or production credentials
- Document all required environment variables in `README.md` and provide a `.env.example` file in the repo root
- Example `.env.example`:

```env
# API endpoint for backend
VITE_API_URL=https://api.example.com

# Feature flags
VITE_FEATURE_X=true

# Analytics key (do not use real secrets in example)
VITE_ANALYTICS_KEY=your-analytics-key-here

# Optional: enable preparing GitHub Pages artifacts (dist/gh-pages-index.html)
# Used by scripts like `npm run build:gh-pages`. Leave false by default and
# set to true explicitly in CI or local env when you want to build GH Pages.
ENABLE_GH_PAGES=false

# Optional: enable Storybook builds in CI and Pages workflows
# Controlled via GitHub Actions variables (ENABLE_STORYBOOK_BUILD) and this
# local flag for consistency. Leave false by default for forks.
ENABLE_STORYBOOK_BUILD=false

# Optional: enable HTML JSDoc (TypeDoc) builds in CI and Pages workflows
# Controlled via GitHub Actions variables (ENABLE_JSDOC_BUILD) and this
# local flag for consistency. Leave false by default for forks.
ENABLE_JSDOC_BUILD=false
```

> **Tip:** Prefix all variables with `VITE_` to expose them to the Vite client runtime.

## PR and Review Checklist

Before requesting review, ensure:

1. Code is formatted and lints clean locally
2. Unit tests pass and cover new behavior
3. Accessibility checks (axe) run locally for affected components and show no new violations
4. PR description documents accessibility considerations, visual change, and testing steps

If deviating from conventions, explain the reason in the PR and request approval from maintainers.

## Local Workflows (Common Commands)

Install dependencies (preferred):

```bash
npm install
```

Run linting and formatting:

```bash
npm run lint
npm run prettier
```

Run unit tests:

```bash
npm run test:unit
```

Run Playwright E2E locally:

```bash
npm run test:e2e
```

Create a production build:

```bash
npm run build
```

## Maintenance and Evolution

Keep this file updated as tooling or conventions change. When introducing new eslint rules, testing utilities, or accessibility checks, update CI and document the rationale here.

## Common Pitfalls

- **Don't** mutate reducer state directly - always return new objects
- **Don't** use array indices as React keys - use stable unique identifiers (database IDs, UUIDs via `uuid.v4()`, or other stable unique values)
- **Don't** mix client/server state - campaigns from API go through TanStack Query only
- **Don't** disable ESLint rules without justification - discuss with maintainers first
- **Don't** use inline styles or hardcoded colors - always use Tailwind tokens
- **Don't** forget to test keyboard navigation and screen reader behavior for new components
- **Don't** ignore accessibility violations in CI - fix them before merging
- **Don't** use `any` or `unknown` types - always prefer strict typing with interfaces or `zod` schemas
- **Don't** overuse context - prefer local state or TanStack Query where applicable
- **Don't** forget to document component APIs and accessibility features in comments or README files

## Recommended package.json Scripts

Ensure your `package.json` defines at least the following scripts so tooling and Husky hooks work as expected:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint \"src/**/*.{ts,tsx}\"",
  "prettier": "prettier --write \"src/**/*.{ts,tsx,css}\"",
  "test": "vitest",
  "test:unit": "vitest",
  "test:e2e": "playwright test",
  "prepare": "husky install"
}
```

> Adjust globs/paths as needed, but keep script names consistent so CI and docs remain accurate.

## Advanced & Optional Best Practices

### TypeScript Strictness

- Require `"strict": true` and all strict flags in `tsconfig.json` for maximum type safety

### Error Boundaries

- Use React error boundaries for robust error handling in UI components, especially for large apps

### Browser Support Policy

- State minimum browser versions supported (e.g., latest Chrome, Firefox, Safari, Edge)
- Test critical flows in all supported browsers before release

### Automated Dependency Updates

- Use tools like Renovate or Dependabot to keep dependencies up to date and secure

### Release/Versioning Policy

- Use semantic versioning for releases
- Maintain a `CHANGELOG.md` and tag releases in git

### Monorepo Guidance (if applicable)

- If using a monorepo, manage packages with npm workspaces and document workspace structure

### Accessibility Manual Testing

- In addition to automated checks, perform manual accessibility testing (keyboard navigation, screen reader, color contrast)

### Performance Budgets

- Set performance budgets (bundle size, load time) and monitor with tools like Lighthouse or WebPageTest

### API Mocking/Contract Testing

- Use MSW (Mock Service Worker) or similar for local API mocking and contract tests

### Internationalization (i18n)

- If relevant, follow i18n/l10n best practices and use appropriate tooling (e.g., react-i18next)

### Code Review/PR Template

- Use a PR template with checkboxes for accessibility, testing, and documentation

### Security Audits

- Run `npm audit` or similar regularly and fix vulnerabilities promptly

## Git & Workflow Conventions (Optional but Recommended)

- Use a simple branching model: long-lived `main` branch and short-lived feature branches (e.g., `feature/xyz`)
- Prefer pull requests for all changes; avoid pushing directly to `main`
- Squash merge PRs to keep history clean and easier to navigate
- Keep PRs small and focused on a single concern (feature, bugfix, or refactor)

## Error Handling & Logging

- Handle API errors centrally (e.g., hooks/utilities that return typed error states) and surface them via accessible UI (alerts, toasts, inline messages)
- Use React error boundaries for unexpected render errors and show a user-friendly fallback UI
- Avoid leaving `console.log`/`console.error` in committed code except for well-justified logging; prefer a small logging utility if persistent logs are needed
- Never silently swallow errors; at minimum, log them and present a non-blocking message to the user when appropriate

## Project Setup Checklist (Quick Start)

1. **Scaffold app**: `npm create vite@latest my-app -- --template react-ts`
2. **Install deps**: `npm install` (React 19, Vite 7, TS 5, Tailwind, TanStack Query, Vitest, RTL, Playwright, axe, Husky, lint-staged, ESLint, Prettier)
3. **Configure Tailwind**: tokens in `src/styles/tokens.css` and mapping in `tailwind.config.ts`
4. **Add env config**: create `.env.example` and document variables in `README.md`
5. **Add ignores**: `.gitignore` and `.gitleaksignore` in repo root
6. **Set up Husky**: `npx husky install` and `.husky/pre-commit` running `npm run prettier`, `npm run test`, `npm run lint`, `npm run build`
7. **Wire TanStack Query**: create `src/queries/fetch.ts`, `src/queries/mutate.ts`, and `src/queries/schemas.ts` using `zod`
8. **Set up Context**: add `src/context/AppContext.tsx` with reducer-based global state
9. **Create example page & component**: `ExampleComponent` and `HomePage` following accessibility and testing standards
10. **Configure CI**: `.github/workflows/ci.yml` running lint → unit tests → build → Playwright + axe

## Where to Find Key Files

- Tokens: `src/styles/tokens.css`
- Tailwind mapping: `tailwind.config.ts`
- ESLint: `eslint.config.js`
- CI workflow: `.github/workflows/ci.yml`
- Playwright tests: `playwright` or `tests/e2e`
 - GitHub Pages entry points:
   - Landing page: `https://asudbury.github.io/modern-react-template/`
   - Demo App: `https://asudbury.github.io/modern-react-template/app`
   - Storybook: `https://asudbury.github.io/modern-react-template/storybook`
   - API Docs: `https://asudbury.github.io/modern-react-template/docs`

## Contact / Questions

If unsure how to implement something accessible or typed, open a draft PR and request guidance from maintainers. Prefer small iterative changes and include tests demonstrating the accessibility behavior.

Thank you for following the project's accessibility and code-quality standards.
