# GitHub Copilot Instructions for Modern React Template

This file contains project-specific guidelines and conventions for GitHub Copilot to follow when generating code for this repository.

## Project Overview

This is a modern, accessibility-first React 19 application built with Vite 7 and TypeScript 5. The template enforces strict rules for accessibility (WCAG 2.2 AA), performance, and code quality.

## Core Principles

1. **Accessibility First**: Every component must be keyboard-navigable, screen reader friendly, and WCAG 2.2 AA compliant
2. **Type Safety**: All code must be strictly typed with TypeScript
3. **No Default Exports**: Use named exports only for components and modules
4. **Design Tokens Only**: Never use hardcoded colors or spacing - always use design tokens from `src/styles/tokens.css`
5. **Data Validation**: All external data must be validated using Zod schemas

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
├── ComponentName.tsx       # Main component implementation
├── ComponentName.test.tsx  # Unit tests
└── index.ts               # Re-export (named export only)
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

## Accessibility Requirements

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

### Unit Tests
- Use Vitest + React Testing Library
- Use accessible queries: `getByRole`, `getByLabelText`, `getByText`
- Use `userEvent.setup()` for user interactions (never `fireEvent`)
- Test accessibility: keyboard navigation, ARIA attributes

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
