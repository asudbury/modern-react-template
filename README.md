# Modern React Template

A modern, accessibility-first React 19 application built with Vite 7 and TypeScript 5. This template enforces strict rules for accessibility (WCAG 2.2 AA), performance, and code quality.

## Features

- ✨ **React 19** with the latest features
- ⚡ **Vite 7** for lightning-fast development
- 📘 **TypeScript 5** with strict mode enabled
- 🎨 **Tailwind CSS** with design tokens
- ♿ **Accessibility-first** (WCAG 2.2 AA compliant)
- 🔄 **TanStack Query** for server state management
- 🎯 **Context + Reducers** for client state
- 🧪 **Vitest** + **React Testing Library** for unit tests
- 🎭 **Playwright** + **Axe** for E2E accessibility testing
- 🔒 **Strict ESLint** + **Prettier** configuration
- 🪝 **Husky** pre-commit hooks
- 🔐 **Zod** validation for all external data

## Quick Start

### Prerequisites

- Node.js 20 or higher
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd modern-react-template

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run prettier` - Format code with Prettier
- `npm run test` - Run unit tests in watch mode
- `npm run test:unit` - Run unit tests
- `npm run test:ui` - Run tests with UI
- `npm run test:e2e` - Run E2E tests with Playwright

## Project Structure

```
modern-react-template/
├── .github/
│   └── workflows/
│       └── ci.yml              # CI/CD pipeline
├── .husky/
│   └── pre-commit              # Pre-commit hooks
├── playwright/
│   └── homepage.spec.ts        # E2E tests
├── src/
│   ├── components/             # Reusable UI components
│   │   └── Button/
│   │       ├── Button.tsx
│   │       ├── Button.test.tsx
│   │       └── index.ts
│   ├── context/                # React Context for client state
│   │   └── AppContext.tsx
│   ├── pages/                  # Page components
│   │   └── HomePage/
│   ├── queries/                # TanStack Query functions
│   │   ├── fetch.ts
│   │   └── mutate.ts
│   ├── schemas/                # Zod schemas
│   │   └── api.ts
│   ├── styles/                 # Design tokens and styles
│   │   └── tokens.css
│   ├── test/                   # Test setup
│   │   └── setup.ts
│   ├── utils/                  # Utility functions
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── .gitleaksignore             # Secret scanning ignore rules
├── .prettierrc                 # Prettier configuration
├── eslint.config.js            # ESLint configuration
├── package.json                # Dependencies and scripts
├── playwright.config.ts        # Playwright configuration
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
└── vitest.config.ts            # Vitest configuration
```

## Key Conventions

### Accessibility

- Every component is keyboard-navigable
- Screen reader friendly with proper ARIA attributes
- WCAG 2.2 AA compliant
- Color contrast ratios meet minimum requirements
- Automated accessibility testing with Axe

### Code Style

- **No inline JSX handlers** - Use `useCallback` or named functions
- **Named exports** - No default exports for components
- **Design tokens only** - No hardcoded colors or spacing
- **Strict TypeScript** - All code must be fully typed
- **Zod validation** - All external data must be validated

### Component Guidelines

```tsx
// ✅ Good: Named function with useCallback
const handleClick = useCallback(() => {
  doSomething();
}, [doSomething]);

return <button onClick={handleClick}>Click me</button>;

// ❌ Bad: Inline function
return <button onClick={() => doSomething()}>Click me</button>;
```

### Testing

- **Unit tests** - Use Vitest + React Testing Library
- **Query by role** - Use accessible queries (`getByRole`, `getByLabelText`)
- **User events** - Use `userEvent.setup()`, never `fireEvent`
- **E2E tests** - Use Playwright with Axe accessibility checks

## Design Tokens

All design tokens are defined in `src/styles/tokens.css` and mapped to Tailwind utilities in `tailwind.config.ts`. Always use tokens instead of hardcoded values.

### Color System

- **Primary**: Blue (buttons, links, primary actions)
- **Secondary**: Violet (secondary actions)
- **Accent**: Cyan (highlights, special features)
- **Neutral**: Grayscale (text, backgrounds, borders)
- **Semantic**: Success (green), Warning (amber), Error (red), Info (blue)

### Example Usage

```tsx
// ✅ Good: Using design tokens
<button className="bg-primary text-white hover:bg-primary-hover">
  Click me
</button>

// ❌ Bad: Hardcoded colors
<button className="bg-blue-600 text-white hover:bg-blue-700">
  Click me
</button>
```

## State Management

### Server State (TanStack Query)

Use TanStack Query for all server data:

```tsx
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './queries/fetch';

function MyComponent() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // ...
}
```

### Client State (Context + Reducer)

Use Context + Reducer for client-side state:

```tsx
import { useAppContext } from './context/AppContext';

function MyComponent() {
  const { state, dispatch } = useAppContext();

  const handleClick = useCallback(() => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  }, [dispatch]);

  // ...
}
```

## Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

All environment variables must be prefixed with `VITE_` to be exposed to the client.

## CI/CD Pipeline

The CI pipeline runs on every push and pull request:

1. **Lint** - ESLint checks
2. **Format** - Prettier checks
3. **Test** - Unit tests with Vitest
4. **Build** - Production build
5. **E2E** - Playwright tests with Axe accessibility scans

## Pre-commit Hooks

Husky runs the following checks on every commit:

1. Format code with Prettier
2. Run unit tests
3. Lint with ESLint
4. Build the project

If any check fails, the commit is blocked.

## Contributing

1. Follow the coding conventions outlined in this README
2. Write tests for all new features
3. Ensure accessibility compliance
4. Run all checks before committing
5. Keep PRs small and focused

## Browser Support

This template targets modern browsers with the following minimum versions:

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

## License

MIT

## Resources

- [React 19 Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TanStack Query Documentation](https://tanstack.com/query)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Playwright Documentation](https://playwright.dev)
- [Vitest Documentation](https://vitest.dev)
