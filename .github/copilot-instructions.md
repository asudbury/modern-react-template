# GitHub Copilot Instructions — Modern React App (Vite + TypeScript)

This file contains project-specific guidelines and conventions for GitHub Copilot to follow when generating code for this repository.

You are contributing to a modern, accessibility-first React 19 application built with Vite 7 and TypeScript 5. This repository enforces strict rules for accessibility (WCAG 2.2 AA), no inline JSX handlers, design tokens, TanStack React Query 5, Context + Reducers for client state, Vitest + RTL tests, and Playwright + Axe for E2E accessibility checks.

> **Note for Forks:** This template is designed to be fork-friendly. All optional features (SonarCloud, GitHub Pages, and JSDoc in CI) are **disabled by default** and only run when explicitly enabled via repository variables. 

## Purpose

This document is the authoritative source of conventions, constraints, and expectations for this starter repository. The project uses Vite 7 + React 19 + TypeScript 5 and is built with an accessibility-first approach (WCAG 2.2 AA). The repo includes a tokenized design system, TanStack Query for server state, strict linting, and automated accessibility checks (Playwright + axe) in CI.

Use this file to guide Copilot suggestions and human contributors — prefer solutions that are accessible, well-typed, and maintainable.

### Development Tools

- **TypeDoc**: Automated API documentation generation from JSDoc comments. Documentation is published to GitHub Pages.
- **SonarCloud**: Continuous code quality and security analysis integrated into CI/CD pipeline (optional, disabled by default for forks).
- **GitHub Pages**: Deployment for app and documentation (optional, disabled by default for forks).

### Optional Features (Opt-In Only)

The following features are **disabled by default** to make this template fork-friendly:

- **SonarCloud**: Only runs if `RUN_SONARCLOUD=true` in repository variables
- **GitHub Pages**: Only runs if `ENABLE_GH_PAGES=true` in repository variables
- **JSDoc in CI**: Only builds if `ENABLE_JSDOC_BUILD=true` in repository variables

## Core Principles

1. **Accessibility First**: Every component must be keyboard-navigable, screen reader friendly, and WCAG 2.2 AA compliant
2. **Type Safety**: All code must be strictly typed with TypeScript
3. **No Default Exports**: Use named exports only for components and modules
4. **Design Tokens Only**: Never use hardcoded colors or spacing - always use design tokens from `src/styles/tokens.css`
5. **Data Validation**: All external data must be validated using Zod schemas
7. **JSDoc Documentation**: All exported functions, components, and types must have comprehensive JSDoc comments for TypeDoc generation
8. **Predictable APIs**: Components expose clear controlled/uncontrolled APIs, forward refs, accept `className` and `data-*` props
9. **No inline JSX functions**: Avoid inline callbacks in JSX (e.g., `onClick={() => ...}`). Use `useCallback` or named functions defined outside of JSX to improve performance and testability
10. **Tokenized styles**: Use design tokens via `src/styles/tokens.css`. Do not hardcode color or spacing values in components

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



## JSDoc Documentation

All functions, components, and types should have JSDoc comments following these guidelines:

### Components

````tsx
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
````

### Functions

````tsx
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
````

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

```
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

### Advanced Accessibility Patterns

**Skip Links for Keyboard Navigation**

```tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0"
    >
      Skip to main content
    </a>
  );
}
```

**Focus Management for Modals**

```tsx
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousActiveElement = document.activeElement as HTMLElement;

    // Focus first focusable element in modal
    const firstFocusable = modalRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusable?.focus();

    // Restore focus when modal closes
    return () => {
      previousActiveElement?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      ref={modalRef}
    >
      {children}
    </div>
  );
}
```

**Accessible Loading States**

```tsx
// Use aria-busy for loading states
<div aria-busy={isLoading}>
  {isLoading ? <Spinner aria-label="Loading content" /> : <Content />}
</div>

// Announce loading completion
<div role="status" aria-live="polite">
  {isLoading && 'Loading...'}
  {!isLoading && data && 'Content loaded successfully'}
</div>
```

**Accessible Form Error Announcements**

```tsx
export function FormField({ error, ...props }: FormFieldProps) {
  const errorId = `${props.id}-error`;

  return (
    <div>
      <Input
        {...props}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <span id={errorId} role="alert" className="text-error">
          {error}
        </span>
      )}
    </div>
  );
}
```

**Keyboard Navigation Patterns**

```tsx
// Arrow key navigation for lists
export function OptionsList({ options }: OptionsListProps) {
  const [focusedIndex, setFocusedIndex] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((prev) => Math.min(prev + 1, options.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleSelect(options[focusedIndex]);
          break;
      }
    },
    [focusedIndex, options]
  );

  return (
    <ul role="listbox" onKeyDown={handleKeyDown}>
      {options.map((option, index) => (
        <li
          key={option.id}
          role="option"
          aria-selected={index === focusedIndex}
          tabIndex={index === focusedIndex ? 0 : -1}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
}
```

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
feat: add custom control
fix: align theme callbacks with useCallback
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

## Routing with TanStack Router

This project uses [TanStack Router](https://tanstack.com/router) for type-safe, declarative routing.

### Router Configuration

Routes are defined in `src/router.tsx` using `createRoute`:

```tsx
import { createRouter, createRootRoute, createRoute } from '@tanstack/react-router';

const rootRoute = createRootRoute({
  component: RootComponent,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const routeTree = rootRoute.addChildren([indexRoute]);
const router = createRouter({ routeTree });
```

### Navigation

Use the `Link` component for type-safe navigation:

```tsx
import { Link } from '@tanstack/react-router';

<Link to="/" activeProps={{ className: 'active' }}>
  Home
</Link>
```

For programmatic navigation, use `useNavigate`:

```tsx
import { useNavigate } from '@tanstack/react-router';

const navigate = useNavigate();
navigate({ to: '/new-page' });
```

### Best Practices

- **Type Safety**: The router provides full TypeScript autocomplete for routes
- **Active Links**: Use `activeProps` to style active links
- **Preloading**: Router is configured with `defaultPreload: 'intent'` for better UX
- **Accessibility**: Always include proper ARIA labels on navigation links

## React 19 Specific Features

### Automatic Batching

React 19 automatically batches state updates in all scenarios (not just event handlers):

```tsx
// All these updates are batched automatically
async function handleClick() {
  setLoading(true);
  const data = await fetchData();
  setData(data);
  setLoading(false);
  // Only one re-render occurs
}
```

### Transitions for Non-Urgent Updates

Use `useTransition` for non-urgent state updates:

```tsx
import { useTransition } from 'react';

function SearchResults() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (value: string) => {
    // Urgent: Update input immediately
    setQuery(value);

    // Non-urgent: Can be interrupted
    startTransition(() => {
      setResults(performExpensiveSearch(value));
    });
  };

  return (
    <>
      <input value={query} onChange={(e) => handleSearch(e.target.value)} />
      {isPending ? <Spinner /> : <ResultsList results={results} />}
    </>
  );
}
```

### Server Components (If Using Next.js or Similar)

```tsx
// Server Component - runs on server only
export default async function UserProfile({ userId }: Props) {
  // Can directly query database
  const user = await db.user.findUnique({ where: { id: userId } });

  return (
    <div>
      <h1>{user.name}</h1>
      {/* Mix server and client components */}
      <ClientInteractiveButton />
    </div>
  );
}

// Client Component - runs in browser
('use client');

export function ClientInteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

### useOptimistic for Optimistic UI Updates

```tsx
import { useOptimistic } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [...state, { ...newTodo, pending: true }]
  );

  const handleAdd = async (todo: Todo) => {
    addOptimisticTodo(todo);

    try {
      const saved = await saveTodo(todo);
      setTodos((prev) => [...prev, saved]);
    } catch {
      // Revert on error - happens automatically
    }
  };

  return (
    <ul>
      {optimisticTodos.map((todo) => (
        <li key={todo.id} className={todo.pending ? 'opacity-50' : ''}>
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
```

### use() for Reading Resources

```tsx
import { use } from 'react';

function UserProfile({ userPromise }: { userPromise: Promise<User> }) {
  // Suspense-enabled resource reading
  const user = use(userPromise);

  return <div>{user.name}</div>;
}

// Wrap with Suspense
<Suspense fallback={<Spinner />}>
  <UserProfile userPromise={fetchUser(id)} />
</Suspense>;
```

### React 19 Best Practices

- Prefer `useOptimistic` over manual optimistic updates
- Use `useTransition` for expensive, non-urgent updates
- Leverage automatic batching - no need for manual batching
- Use Suspense for async data fetching when appropriate
- Avoid unnecessary `React.memo` - React 19 is smarter about re-renders

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

### Advanced Testing Patterns

**Testing Custom Hooks**

```tsx
import { renderHook, act } from '@testing-library/react';

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);
  });
});
```

**Testing Components with Context**

```tsx
function renderWithContext(ui: ReactElement, options = {}) {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AppProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AppProvider>
  );

  return render(ui, { wrapper, ...options });
}

describe('ComponentWithContext', () => {
  it('should use context values', () => {
    renderWithContext(<ComponentWithContext />);
    expect(screen.getByText(/theme: light/i)).toBeInTheDocument();
  });
});
```

**Testing Async Data Fetching**

```tsx
describe('UserList', () => {
  it('should display users after loading', async () => {
    // Mock API response
    server.use(
      rest.get('/api/users', (req, res, ctx) => {
        return res(
          ctx.json([
            { id: '1', name: 'John' },
            { id: '2', name: 'Jane' },
          ])
        );
      })
    );

    render(<UserList />);

    // Wait for loading to complete
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();

    // Find loaded content
    expect(await screen.findByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });
});
```

**Testing User Interactions**

```tsx
describe('LoginForm', () => {
  it('should submit form with valid data', async () => {
    const handleSubmit = vi.fn();
    const user = userEvent.setup();

    render(<LoginForm onSubmit={handleSubmit} />);

    // Type in form fields
    await user.type(screen.getByLabelText(/email/i), 'user@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');

    // Submit form
    await user.click(screen.getByRole('button', { name: /submit/i }));

    // Verify submission
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'user@example.com',
      password: 'password123',
    });
  });
});
```

**Testing Accessibility**

```tsx
import { axe } from 'jest-axe';

describe('Button accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should be keyboard accessible', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    button.focus();

    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);

    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });
});
```

**Snapshot Testing (Use Sparingly)**

```tsx
// Only for static content that rarely changes
it('should match snapshot', () => {
  const { container } = render(<StaticComponent />);
  expect(container.firstChild).toMatchSnapshot();
});
```

### Testing Best Practices

- **Test behavior, not implementation**: Don't test internal state or private methods
- **Use accessible queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
- **Test edge cases**: Empty states, error states, loading states
- **Mock external dependencies**: APIs, timers, random values
- **Keep tests focused**: One assertion per test when possible
- **Name tests descriptively**: "should do X when Y happens"
- **Avoid brittle tests**: Don't rely on CSS classes or implementation details

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

### Data Fetching Patterns with TanStack Query

#### Basic Query Pattern

```tsx
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/queries/fetch';
import { userSchema } from '@/schemas/api';

export function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchData(`/api/users/${userId}`, { schema: userSchema }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage error={error} />;

  return <div>{data.name}</div>;
}
```

#### Mutation Pattern

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function CreateUserForm() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newUser: UserInput) =>
      fetchData('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
        schema: userSchema,
      }),
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['users'] });
      // Or update cache directly
      queryClient.setQueryData(['user', data.id], data);
    },
    onError: (error) => {
      console.error('Failed to create user:', error);
    },
  });

  const handleSubmit = (formData: UserInput) => {
    mutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create User'}
      </button>
      {mutation.isError && <ErrorMessage error={mutation.error} />}
    </form>
  );
}
```

#### Optimistic Updates Pattern

```tsx
const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries({ queryKey: ['todos'] });

    // Snapshot previous value
    const previousTodos = queryClient.getQueryData(['todos']);

    // Optimistically update
    queryClient.setQueryData(['todos'], (old: Todo[]) => [
      ...old,
      { ...newTodo, id: 'temp-id' },
    ]);

    // Return context with snapshot
    return { previousTodos };
  },
  onError: (err, newTodo, context) => {
    // Rollback on error
    queryClient.setQueryData(['todos'], context?.previousTodos);
  },
  onSettled: () => {
    // Refetch after mutation
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  },
});
```

#### Infinite Query Pattern (Pagination)

```tsx
export function InfiniteUserList() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['users'],
      queryFn: ({ pageParam = 0 }) =>
        fetchData(`/api/users?page=${pageParam}`, { schema: userListSchema }),
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length : undefined,
      initialPageParam: 0,
    });

  return (
    <div>
      {data?.pages.map((page, i) => (
        <Fragment key={i}>
          {page.users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </Fragment>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? 'Loading more...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
```

#### Dependent Queries Pattern

```tsx
export function UserPosts({ userId }: { userId: string }) {
  // First query
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  // Second query depends on first
  const { data: posts } = useQuery({
    queryKey: ['posts', user?.id],
    queryFn: () => fetchPosts(user!.id),
    enabled: !!user, // Only run when user is available
  });

  return <PostList posts={posts} />;
}
```

#### Parallel Queries Pattern

```tsx
export function Dashboard() {
  const userQuery = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
  });

  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  const statsQuery = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });

  // All queries run in parallel
  const isLoading =
    userQuery.isLoading || postsQuery.isLoading || statsQuery.isLoading;

  if (isLoading) return <Spinner />;

  return (
    <div>
      <UserInfo user={userQuery.data} />
      <PostsList posts={postsQuery.data} />
      <Stats data={statsQuery.data} />
    </div>
  );
}
```

### TanStack Query Best Practices

- **Query Keys**: Use arrays with specific, hierarchical keys: `['users', userId, 'posts']`
- **Stale Time**: Set appropriate `staleTime` to reduce unnecessary refetches
- **Cache Time**: Use `gcTime` (formerly `cacheTime`) to control how long inactive data stays in cache
- **Error Handling**: Always handle errors in UI, don't just log them
- **Optimistic Updates**: Use for better UX, but always handle rollback
- **Query Invalidation**: Invalidate related queries after mutations
- **Prefetching**: Use `queryClient.prefetchQuery()` for anticipated data needs
- **Suspense**: Can be enabled per-query or globally for Suspense-based loading

## Testing and CI

- **Unit tests**: Vitest + React Testing Library (see Testing Requirements section above for detailed standards)
- **Accessibility in unit tests**: Use `jest-axe` or `axe` to assert no violations for key components
- **E2E and accessibility**: Playwright tests run `axe` scans in CI to detect regressions against WCAG 2.2 AA. E2E scripts are in the `playwright` folder and invoked by CI
- **CI pipeline**: Lint → Format Check → Unit tests → Build → E2E (Playwright + axe). Axe failures should fail the workflow

## Required Libraries & Tools

- **TanStack Query**: All data fetching and mutations must use TanStack Query (`@tanstack/react-query`)
- **TanStack Router**: All routing must use TanStack Router (`@tanstack/react-router`) for type-safe navigation
- **npm**: Use npm for installing dependencies per this project's convention. Example:
  ```bash
  npm install @tanstack/react-query @tanstack/react-router
  ```

## Component Guidelines and Examples

### API and implementation patterns:

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

### React Optimization Hooks

- **useCallback**: Memoize event handlers and callback functions to prevent unnecessary re-renders

  ```tsx
  const handleSubmit = useCallback(
    (data: FormData) => {
      // Handler logic
    },
    [
      /* dependencies */
    ]
  );
  ```

- **useMemo**: Cache expensive calculations or complex derived state

  ```tsx
  const filteredItems = useMemo(() => {
    return items.filter((item) => item.active);
  }, [items]);
  ```

- **React.memo**: Wrap components that receive the same props frequently
  ```tsx
  export const ExpensiveComponent = memo(({ data }: Props) => {
    return <div>{/* Render logic */}</div>;
  });
  ```

### Performance Best Practices

- Avoid inline object/array creation in JSX - define outside render or use useMemo

  ```tsx
  // ❌ Bad - creates new object on every render
  <Component style={{ padding: 10 }} />;

  // ✅ Good - define outside
  const styles = { padding: 10 };
  <Component style={styles} />;
  ```

- Keep component renders minimal by splitting large components
- Use React 19's automatic batching for state updates
- Leverage TanStack Query's built-in caching and background refetching
- Use code splitting with `React.lazy()` for route-based chunks
  ```tsx
  const LazyComponent = lazy(() => import('./LazyComponent'));
  ```

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

## Custom Hooks

Custom hooks are powerful for encapsulating reusable logic. Follow these patterns:

### Hook Naming and Structure

- Always prefix with `use` (e.g., `useTheme`, `useAuth`, `useLocalStorage`)
- Return objects with clear property names, not arrays (unless order matters like useState)
- Use TypeScript to define clear return types

### Example Pattern

````tsx
/**
 * Custom hook for managing theme state
 *
 * @returns Object with current theme and setter function
 *
 * @example
 * ```tsx
 * const { theme, setTheme } = useTheme();
 * ```
 */
export function useTheme() {
  // ...context logic here (removed useAppContext reference)

  const setTheme = useCallback(
    (theme: 'light' | 'dark') => {
      dispatch({ type: 'SET_THEME', payload: theme });
    },
    [dispatch]
  );

  return { theme: state.theme, setTheme };
}
````

### Common Custom Hook Patterns

- **Data fetching hooks**: Wrap TanStack Query for specific API endpoints
- **Context selector hooks**: Provide focused access to context slices (e.g., `useTheme`, `useSidebar`)
- **DOM manipulation hooks**: Handle window resize, scroll position, intersection observer
- **Form hooks**: Handle form state, validation, and submission
- **Local storage hooks**: Sync state with browser storage

### Hook Composition

- Hooks can call other hooks to build complex functionality
- Extract common patterns into smaller, composable hooks
- Always follow Rules of Hooks (call at top level, not in conditionals)

## Utility Functions

Utility functions should be pure, testable, and well-documented. Keep them in `src/lib/` or `src/utils/`.

### Utility Function Best Practices

- Keep utilities pure (no side effects)
- Provide comprehensive JSDoc comments
- Include usage examples in comments
- Write unit tests for all utility functions
- Use TypeScript for type safety
- Group related utilities in the same file

## Version Control

- Write clear, descriptive commit messages
- Keep commits focused and atomic
- Reference issue numbers when applicable

## Component Composition Patterns

### Compound Components Pattern

Use compound components for flexible, related component groups:

```tsx
// Parent component
export function Select({ children, value, onChange }: SelectProps) {
  return (
    <SelectContext.Provider value={{ value, onChange }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  );
}

// Child components
Select.Trigger = function SelectTrigger({ children }: Props) {
  const { value } = useSelectContext();
  return <button>{children || value}</button>;
};

Select.Options = function SelectOptions({ children }: Props) {
  return <div className="absolute">{children}</div>;
};

// Usage
<Select value={value} onChange={onChange}>
  <Select.Trigger />
  <Select.Options>
    <Select.Option value="1">Option 1</Select.Option>
  </Select.Options>
</Select>;
```

### Render Props Pattern

Use render props for flexible component customization:

```tsx
interface DataFetcherProps<T> {
  children: (data: T, isLoading: boolean, error: Error | null) => ReactNode;
}

export function DataFetcher<T>({ children }: DataFetcherProps<T>) {
  const { data, isLoading, error } = useQuery(/* ... */);
  return <>{children(data, isLoading, error)}</>;
}

// Usage
<DataFetcher>
  {(data, isLoading, error) => {
    if (isLoading) return <Spinner />;
    if (error) return <ErrorMessage />;
    return <DataDisplay data={data} />;
  }}
</DataFetcher>;
```

### Higher-Order Components (HOC)

Use HOCs sparingly, prefer hooks for most reusable logic:

```tsx
// Use HOC for cross-cutting concerns like authentication
export function withAuth<P extends object>(Component: ComponentType<P>) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return <Component {...props} />;
  };
}
```

### Slot Pattern

Use slots for flexible component layouts:

```tsx
interface CardProps {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}

export function Card({ header, footer, children }: CardProps) {
  return (
    <div className="card">
      {header && <div className="card-header">{header}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
```

## Advanced TypeScript Patterns

### Discriminated Unions

Use discriminated unions for type-safe state management:

```tsx
// Action types with discriminated unions
type Action =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_DATA'; payload: Data }
  | { type: 'SET_ERROR'; payload: Error };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_DATA':
      return { ...state, data: action.payload, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
```

### Generics for Reusable Components

Use generics for type-safe, reusable components:

```tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string;
}

export function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage with full type inference
<List
  items={users}
  renderItem={(user) => <UserCard user={user} />}
  keyExtractor={(user) => user.id}
/>;
```

### Utility Types

Leverage TypeScript utility types for cleaner code:

```tsx
// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name' | 'avatar'>;

// Omit properties
type UserFormData = Omit<User, 'id' | 'createdAt'>;

// Make all properties optional
type PartialUser = Partial<User>;

// Make all properties required
type RequiredUser = Required<User>;

// Extract specific type from union
type ButtonVariant = ComponentProps<typeof Button>['variant'];
```

### Const Assertions

Use const assertions for literal type inference:

```tsx
// Creates readonly array with literal types
const STATUSES = ['pending', 'active', 'completed'] as const;
type Status = (typeof STATUSES)[number]; // 'pending' | 'active' | 'completed'

// Const object
const CONFIG = {
  api: 'https://api.example.com',
  timeout: 5000,
} as const;
```

### Template Literal Types

Use template literal types for type-safe string patterns:

```tsx
type ColorVariant = 'primary' | 'secondary' | 'accent';
type ColorShade = 'light' | 'dark';
type ColorClass = `${ColorVariant}-${ColorShade}`;
// 'primary-light' | 'primary-dark' | 'secondary-light' | ...
```

## Performance and Runtime Considerations

- Use React lazy-loading for large modules and code-splitting for routes
- Use TanStack Query features (staleTime, cacheTime, background refetching) to reduce unnecessary network usage

## Form Patterns and Validation

### Form Handling Best Practices

- Use controlled inputs with React state for form fields
- Validate on blur and on submit (not on every keystroke for better UX)
- Use Zod schemas for form validation
- Provide clear, accessible error messages

### Example Form with Validation

```tsx
interface FormData {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const result = formSchema.safeParse(formData);
      if (!result.success) {
        const newErrors: Partial<Record<keyof FormData, string>> = {};
        result.error.issues.forEach((issue) => {
          const field = issue.path[0] as keyof FormData;
          newErrors[field] = issue.message;
        });
        setErrors(newErrors);
        return;
      }

      // Submit form
    },
    [formData]
  );

  const handleChange = useCallback(
    (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <span id="email-error" className="text-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Form Accessibility Requirements

- Associate labels with inputs using `htmlFor` and `id`
- Use `aria-invalid` and `aria-describedby` for error states
- Mark required fields with `aria-required` or `required` attribute
- Use `role="alert"` for error messages so they're announced
- Provide clear focus indicators on form fields

## Loading States and Error Handling

### Loading State Patterns

```tsx
// Basic loading state
if (isLoading) {
  return <Spinner aria-label="Loading data" />;
}

// Skeleton screens for better perceived performance
if (isLoading) {
  return <UserCardSkeleton />;
}

// Inline loading with disabled state
<button disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</button>;
```

### Error Boundaries

Implement error boundaries for graceful error handling:

```tsx
export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Error Message Best Practices

- Be specific about what went wrong
- Provide actionable next steps when possible
- Use accessible error announcements with ARIA
- Log errors for debugging without exposing sensitive details to users

```tsx
// Good error messages
'Failed to save changes. Please check your connection and try again.';
'Email address is already in use. Please use a different email.';

// Bad error messages
'Error';
'Something went wrong';
'500 Internal Server Error';
```

## Responsive Design Patterns



### Container Queries (Modern Pattern)

For component-level responsive design:

```tsx
<div className="@container">
  <div
    className="
    flex flex-col
    @md:flex-row    /* Respond to container size, not viewport */
  "
  >
    <Sidebar />
    <Content />
  </div>
</div>
```

### Responsive Images

```tsx
// Using picture element for art direction
<picture>
  <source media="(min-width: 768px)" srcSet="desktop.jpg" />
  <source media="(min-width: 480px)" srcSet="tablet.jpg" />
  <img src="mobile.jpg" alt="Descriptive text" />
</picture>

// Using srcset for resolution switching
<img
  src="image-400.jpg"
  srcSet="image-400.jpg 400w, image-800.jpg 800w, image-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Descriptive text"
/>
```

### Mobile Navigation Patterns

```tsx
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger menu for mobile */}
      <button
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden"
      >
        <span className="sr-only">Toggle menu</span>
        {isOpen ? <XIcon /> : <MenuIcon />}
      </button>

      {/* Navigation */}
      <nav
        id="mobile-menu"
        className={cn(
          'md:block', // Always visible on desktop
          isOpen ? 'block' : 'hidden' // Toggle on mobile
        )}
      >
        {/* Nav items */}
      </nav>
    </>
  );
}
```

### Responsive Typography

```tsx
<h1
  className="
  text-2xl      /* Mobile: 24px */
  md:text-3xl   /* Tablet: 30px */
  lg:text-4xl   /* Desktop: 36px */
  font-bold
"
>
  Heading
</h1>
```

## Animation and Transitions

### CSS Transitions (Preferred for Simple Animations)



### Accessibility Considerations for Animations

- Respect `prefers-reduced-motion` media query
- Provide alternatives to motion-based UI
- Keep animations subtle and purposeful

```css
/* In your CSS */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

```tsx
// In React
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

<div
  className={cn(
    'opacity-0',
    !prefersReducedMotion && 'transition-opacity duration-500'
  )}
>
```

### Common Animation Patterns

**Fade In/Out**

```tsx
export function FadeIn({ children, show }: FadeInProps) {
  return (
    <div
      className={cn(
        'transition-opacity duration-300',
        show ? 'opacity-100' : 'opacity-0'
      )}
    >
      {children}
    </div>
  );
}
```

**Slide In/Out**

```tsx
export function SlideIn({ children, show }: SlideInProps) {
  return (
    <div
      className={cn(
        'transform transition-transform duration-300',
        show ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      {children}
    </div>
  );
}
```

**Scale on Hover**

```tsx
<button
  className="
  transform transition-transform 
  hover:scale-105 
  active:scale-95
"
>
  Click me
</button>
```

**Loading Spinner**

```tsx
export function Spinner() {
  return (
    <div
      className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
```

### Animation Best Practices

- Keep animations under 300ms for UI feedback
- Use `will-change` sparingly for performance-critical animations
- Provide visual feedback for all user interactions
- Test animations at different speeds and on different devices
- Never rely solely on animation to convey information
- Use CSS transforms (translate, scale, rotate) over position changes for better performance

## Security

- Do not commit secrets. Use environment variables and SOPS/secret managers for protected values
- Avoid `dangerouslySetInnerHTML` unless content is sanitized

## Debugging Best Practices

### React Developer Tools

- Use React DevTools browser extension for component inspection
- Use Profiler tab to identify performance bottlenecks
- Inspect component props, state, and hooks in real-time

### Console Debugging Patterns

```tsx
// Structured logging for better debugging
console.group('User Action');
console.log('Action:', action.type);
console.log('Payload:', action.payload);
console.log('Previous State:', prevState);
console.log('Next State:', nextState);
console.groupEnd();

// Use console.table for arrays of objects
console.table(users);

// Time measurements
console.time('fetchData');
await fetchData();
console.timeEnd('fetchData');
```

### TypeScript Debugging

```tsx
// Use type guards to narrow types
function isUser(obj: unknown): obj is User {
  return typeof obj === 'object' && obj !== null && 'id' in obj;
}

// Exhaustive checking in switch statements
function handleAction(action: Action): void {
  switch (action.type) {
    case 'ADD':
      return handleAdd(action);
    case 'DELETE':
      return handleDelete(action);
    default:
      // TypeScript ensures all cases are handled
      const exhaustive: never = action;
      throw new Error(`Unhandled action: ${exhaustive}`);
  }
}
```

### Common Debugging Scenarios

**Issue: Component not re-rendering**

- Check if state/props actually changed (use `Object.is` comparison)
- Verify dependencies in useEffect/useCallback/useMemo
- Check if parent component is using React.memo incorrectly

**Issue: Stale closure in useEffect**

```tsx
// ❌ Bad - stale closure
useEffect(() => {
  setInterval(() => {
    console.log(count); // Always logs initial value
  }, 1000);
}, []); // Missing dependency

// ✅ Good
useEffect(() => {
  const id = setInterval(() => {
    console.log(count);
  }, 1000);
  return () => clearInterval(id);
}, [count]); // Include dependency
```

**Issue: Infinite re-render loop**

- Check for setState calls without conditions in render
- Verify useEffect dependencies aren't changing on every render
- Look for object/array creation in dependency arrays

### Debugging Tools and Commands

```bash
# Type check without emitting
npm run build -- --noEmit

# Run tests in watch mode with debugging
npm run test -- --watch --ui

# Run ESLint with detailed output
npm run lint -- --debug

# Check bundle size
npm run build && npx vite-bundle-visualizer
```

## Code Organization for Larger Features

### Feature-Based Structure

Organize code by feature rather than by file type:

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm/
│   │   │   └── SignupForm/
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── usePermissions.ts
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── api/
│   │   │   └── authApi.ts
│   │   ├── types.ts
│   │   └── index.ts
│   └── dashboard/
│       ├── components/
│       ├── hooks/
│       └── index.ts
```

### Barrel Exports (index.ts)

Use barrel exports to create clean public APIs:

```tsx
// src/features/auth/index.ts
export { LoginForm } from './components/LoginForm';
export { SignupForm } from './components/SignupForm';
export { useAuth } from './hooks/useAuth';
export type { User, AuthState } from './types';

// Usage elsewhere
import { LoginForm, useAuth, type User } from '@/features/auth';
```

### Module Organization Best Practices

1. **Keep related code together**: Components, hooks, and types for a feature should live in the same directory
2. **Create clear boundaries**: Use barrel exports to define public API of each module
3. **Avoid circular dependencies**: Use dependency inversion or split shared code into separate modules
4. **Co-locate tests**: Keep test files next to the code they test

### Shared vs Feature Code

```
src/
├── components/      # Shared UI components (Button, Card, Modal)
├── hooks/          # Shared hooks (useDebounce, useMediaQuery)
├── lib/            # Shared utilities (cn, formatDate)
├── features/       # Feature-specific code (auth, dashboard, settings)
│   └── auth/       # Keep feature code self-contained
└── pages/          # Route-level components
```

### Scaling Patterns

**Small apps (< 10 pages)**

- Flat structure in `src/components` is fine
- Keep all pages in `src/pages`

**Medium apps (10-50 pages)**

- Group components by feature in `src/features`
- Use barrel exports for clean imports
- Co-locate hooks and utilities with features

**Large apps (50+ pages)**

- Consider micro-frontend architecture
- Use workspace/monorepo structure
- Implement lazy loading for feature modules
- Use module federation or similar techniques

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
- **Don't** use inline styles or hardcoded colors - always use design tokens
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
2. **Install deps**: `npm install` (React 19, Vite 7, TS 5, TanStack Query, Vitest, RTL, Playwright, axe, Husky, lint-staged, ESLint, Prettier)
3. **Configure design tokens**: tokens in `src/styles/tokens.css`
4. **Add env config**: create `.env.example` and document variables in `README.md`
5. **Add ignores**: `.gitignore` and `.gitleaksignore` in repo root
6. **Set up Husky**: `npx husky install` and `.husky/pre-commit` running `npm run prettier`, `npm run test`, `npm run lint`, `npm run build`
7. **Wire TanStack Query**: create `src/queries/fetch.ts`, `src/queries/mutate.ts`, and `src/queries/schemas.ts` using `zod`
8. **Set up Context**: add context provider with reducer-based global state (file name and details up to implementation)
9. **Create example page & component**: `ExampleComponent` and `HomePage` following accessibility and testing standards
10. **Configure CI**: `.github/workflows/ci.yml` running lint → unit tests → build → Playwright + axe

## Where to Find Key Files

- Tokens: `src/styles/tokens.css`

- ESLint: `eslint.config.js`
- CI workflow: `.github/workflows/ci.yml`
- Playwright tests: `playwright` or `tests/e2e`
- GitHub Pages entry points:
  - Landing page: `https://asudbury.github.io/modern-react-template/`
  - Demo App: `https://asudbury.github.io/modern-react-template/app`
  - API Docs: `https://asudbury.github.io/modern-react-template/docs`

## Contact / Questions

If unsure how to implement something accessible or typed, open a draft PR and request guidance from maintainers. Prefer small iterative changes and include tests demonstrating the accessibility behavior.

Thank you for following the project's accessibility and code-quality standards.

## Quick Reference Guide

### Common Commands Cheat Sheet

```bash
# Development
npm run dev              # Start dev server

# Testing
npm run test             # Run unit tests (watch mode)
npm run test:coverage    # Run tests with coverage
npm run test:e2e         # Run Playwright E2E tests
npm run test:ui          # Open Vitest UI

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run prettier         # Format code
npm run build            # Type check and build

# Documentation
npm run docs             # Generate all docs
npm run docs:md          # Generate markdown docs
npm run docs:html        # Generate HTML docs
```

### File Templates Quick Reference

**New Component**

```tsx
// src/components/MyComponent/MyComponent.tsx
import { forwardRef, useCallback } from 'react';
import type { HTMLAttributes } from 'react';

export interface MyComponentProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary';
}

export const MyComponent = forwardRef<HTMLDivElement, MyComponentProps>(
  ({ variant = 'primary', className, ...rest }, ref) => {
    const handleClick = useCallback(() => {
      // Handler logic
    }, []);

    return (
      <div ref={ref} className={className} {...rest}>
        {/* Content */}
      </div>
    );
  }
);

```

**New Test File**

```tsx
// src/components/MyComponent/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent>Content</MyComponent>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('should have no accessibility violations', async () => {
    const { container } = render(<MyComponent>Content</MyComponent>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

**New Custom Hook**

```tsx
// src/hooks/useMyHook.ts
import { useState, useCallback } from 'react';

export function useMyHook(initialValue: string) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);

  return { value, handleChange };
}
```

**New Zod Schema**

```tsx
// src/schemas/mySchema.ts
import { z } from 'zod';

export const mySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  createdAt: z.string().datetime(),
});

export type MyType = z.infer<typeof mySchema>;
```

### Common Patterns Quick Reference

| Pattern           | When to Use                                  | Example                                                                   |
| ----------------- | -------------------------------------------- | ------------------------------------------------------------------------- |
| `useCallback`     | Event handlers, callbacks passed to children | `const handleClick = useCallback(() => {...}, [deps])`                    |
| `useMemo`         | Expensive calculations, derived state        | `const filtered = useMemo(() => data.filter(...), [data])`                |
| `memo`            | Pure components that render often            | `export const Item = memo(({ data }) => ...)`                             |
| `forwardRef`      | Components that need to expose DOM refs      | `export const Input = forwardRef<HTMLInputElement, Props>(...)`           |
| `cn` utility      | Merging class names                     | `className={cn('base-class', conditional && 'extra-class')}`              |
| TanStack Query    | Server data fetching                         | `const { data } = useQuery({ queryKey: ['users'], queryFn: fetchUsers })` |
| Context + Reducer | Global client state                          | `const { state, dispatch } = useContext(AppContext)`                      |
| Zod schemas       | Data validation                              | `const result = schema.safeParse(data)`                                   |

### Accessibility Quick Reference

| Element    | ARIA Pattern                              | Example                                                         |
| ---------- | ----------------------------------------- | --------------------------------------------------------------- |
| Button     | `role="button"` (if not using `<button>`) | `<div role="button" tabIndex={0} onClick={...}>`                |
| Modal      | `role="dialog"` + `aria-modal="true"`     | `<div role="dialog" aria-modal="true" aria-labelledby="title">` |
| Alert      | `role="alert"` or `role="status"`         | `<div role="alert">{errorMessage}</div>`                        |
| Form Error | `aria-invalid` + `aria-describedby`       | `<input aria-invalid={!!error} aria-describedby="error-id" />`  |
| Loading    | `aria-busy` or `aria-live="polite"`       | `<div aria-busy={isLoading}>`                                   |
| Skip Link  | Hidden until focused                      | `<a href="#main" className="sr-only focus:not-sr-only">`        |

### Troubleshooting Quick Reference

| Issue                           | Solution                                                                 |
| ------------------------------- | ------------------------------------------------------------------------ |
| Component not re-rendering      | Check if state/props actually changed, verify hook dependencies          |
| Stale closure in useEffect      | Add all dependencies to dependency array                                 |
| Infinite loop                   | Check useEffect dependencies, avoid object/array creation in deps        |
| TypeScript error in JSX         | Ensure component props are properly typed, check for missing imports     |
| Test failing with act() warning | Wrap state updates in `await waitFor(() => ...)` or use `findBy` queries |
| Accessibility violation         | Check semantic HTML, ARIA attributes, keyboard navigation                |
| Build error                     | Run `npm run build` locally, check TypeScript errors                     |
| Lint errors                     | Run `npm run lint:fix` to auto-fix, review remaining issues              |

### Best Practices Summary

✅ **Do:**

- Use named exports
- Use design tokens for colors/spacing
- Use `useCallback` for event handlers
- Validate external data with Zod
- Write JSDoc comments
- Test accessibility with axe
- Use semantic HTML
- Handle loading and error states
- Keep components small and focused

❌ **Don't:**

- Use default exports
- Use inline JSX event handlers
- Hardcode colors or spacing values
- Skip data validation
- Use `any` type
- Forget keyboard navigation
- Use `div` when semantic elements exist
- Silently swallow errors
- Create massive components
