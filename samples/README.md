# Samples Directory

> ⚠️ **IMPORTANT: DELETE THIS DIRECTORY BEFORE PRODUCTION**
> 
> This directory contains educational sample components that demonstrate the features and patterns of this template. These samples are meant for learning purposes only and should be **deleted** before deploying your application to production.

## Why Delete This Directory?

1. **Not Production Code**: These samples are for demonstration and learning only
2. **Reduce Bundle Size**: Removing samples eliminates unnecessary code from your production build
3. **Security**: Samples may contain mock data or examples that aren't suitable for production
4. **Clean Codebase**: Keep your production codebase focused on actual application features

## How to Delete

```bash
# Remove the entire samples directory
rm -rf samples/

# Or if you're on Windows
rmdir /s samples
```

## What's Included

This directory contains four comprehensive sample components that demonstrate the core features of this React template:

### 1. SampleForm.tsx
**Demonstrates:**
- ✅ Form handling with Zod validation
- ✅ Accessible form markup with proper labels
- ✅ Event handlers using `useCallback` (no inline functions)
- ✅ Error handling and display with ARIA attributes
- ✅ Design token usage for styling
- ✅ WCAG 2.2 AA compliance

**Key Concepts:**
- Runtime validation with Zod schemas
- Form state management with `useState`
- Accessible error messages with `aria-describedby`
- Required field indicators with proper ARIA labels
- Controlled form inputs

**Best Practices Shown:**
- No inline event handlers
- Named exports only
- Design tokens for all colors
- Proper TypeScript typing
- JSDoc documentation

---

### 2. SampleDataFetching.tsx
**Demonstrates:**
- ✅ TanStack Query for server state management
- ✅ Data fetching with loading and error states
- ✅ Mutations with cache invalidation
- ✅ Zod schema validation for API responses
- ✅ Accessible data display with proper ARIA attributes
- ✅ No inline event handlers (useCallback)

**Key Concepts:**
- `useQuery` hook for data fetching
- `useMutation` hook for data updates
- Query invalidation and refetching
- Schema validation for external data
- Loading and error state handling
- Query configuration (staleTime, retry)

**Best Practices Shown:**
- Separation of data fetching logic
- Error boundaries and error handling
- Accessible loading states with `role="status"`
- Keyboard navigation support
- TypeScript generics for type safety

---

### 3. SampleContextUsage.tsx
**Demonstrates:**
- ✅ React Context for client state management
- ✅ useReducer pattern for state updates
- ✅ Custom hooks for accessing context
- ✅ Proper event handlers with useCallback
- ✅ Accessible UI state indicators

**Key Concepts:**
- Global state with Context API
- Reducer pattern for predictable state updates
- Custom hooks (`useAppContext`, `useNotifications`)
- State immutability
- Action dispatching
- Notification system implementation

**Best Practices Shown:**
- Separation of concerns (state, types, reducer)
- Custom hooks for common operations
- Named exports for all modules
- Proper TypeScript typing for actions and state
- No inline event handlers

---

### 4. SampleAccessibility.tsx
**Demonstrates:**
- ✅ WCAG 2.2 AA compliance features
- ✅ Keyboard navigation patterns
- ✅ Screen reader support with ARIA attributes
- ✅ Focus management with `useRef`
- ✅ Semantic HTML usage
- ✅ Skip links for keyboard users
- ✅ Live regions for dynamic content

**Key Concepts:**
- Skip links for keyboard navigation
- ARIA live regions for dynamic updates
- Programmatic focus management
- Semantic HTML landmarks
- Keyboard event handling
- Color contrast requirements
- Form accessibility patterns

**Best Practices Shown:**
- Proper heading hierarchy (h1 → h2 → h3)
- ARIA attributes when needed (`aria-label`, `aria-live`, etc.)
- Keyboard-accessible interactive elements
- Focus indicators with design tokens
- Screen reader-only content with `.sr-only`

## Using the Samples

### Running Locally

The samples are standalone components. To use them in your development environment:

1. Import the sample component:
```tsx
import { SampleForm } from './samples/components';
```

2. Add it to a page or route:
```tsx
function DemoPage() {
  return <SampleForm />;
}
```

3. View in your browser at `http://localhost:5173`

### Learning from the Code

Each sample component includes:
- **Comprehensive JSDoc comments** explaining the purpose and features
- **Inline comments** describing key patterns and decisions
- **TypeScript types** showing proper type definitions
- **Accessibility features** demonstrating WCAG 2.2 AA compliance
- **Design tokens** showing how to use the Tailwind configuration
- **Repository conventions** following all project standards

## Key Patterns Demonstrated

### 1. Event Handlers (No Inline Functions)
```tsx
// ✅ Good: Using useCallback
const handleClick = useCallback(() => {
  doSomething();
}, [doSomething]);

return <button onClick={handleClick}>Click me</button>;

// ❌ Bad: Inline function (NEVER DO THIS)
return <button onClick={() => doSomething()}>Click me</button>;
```

### 2. Named Exports Only
```tsx
// ✅ Good: Named export
export function MyComponent() { }

// ❌ Bad: Default export (NEVER DO THIS)
export default function MyComponent() { }
```

### 3. Design Tokens for Styling
```tsx
// ✅ Good: Using design tokens
<button className="bg-primary text-white hover:bg-primary-hover">

// ❌ Bad: Hardcoded colors (NEVER DO THIS)
<button className="bg-blue-600 text-white hover:bg-blue-700">
```

### 4. Zod Validation for External Data
```tsx
// ✅ Always validate external data
const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
});

const user = userSchema.parse(apiResponse);
```

### 5. TanStack Query for Server State
```tsx
// ✅ Use TanStack Query for all API data
const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: fetchUsers,
});
```

### 6. Context + Reducer for Client State
```tsx
// ✅ Use Context for global client state
const { state, dispatch } = useAppContext();
dispatch({ type: 'TOGGLE_SIDEBAR' });
```

### 7. Accessibility-First Approach
```tsx
// ✅ Always include proper accessibility features
<label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid={!!errors.email}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{errors.email && (
  <p id="email-error" role="alert">
    {errors.email}
  </p>
)}
```

## Additional Resources

After reviewing these samples, explore these documentation files for more details:

- **[Main README](../README.md)** - Project overview and features
- **[QUICKSTART.md](../QUICKSTART.md)** - Getting started guide
- **[.github/copilot-instructions.md](../.github/copilot-instructions.md)** - Complete coding conventions
- **[CONTRIBUTING.md](../CONTRIBUTING.md)** - Development guidelines
- **[EXTENSIONS.md](../EXTENSIONS.md)** - Additional features and integrations

## Sample Component Dependencies

All samples use dependencies already included in this template:
- **React 19** - UI library
- **TypeScript 5** - Type safety
- **Zod** - Runtime validation
- **TanStack Query** - Server state management
- **shadcn/ui** - Pre-built accessible components
- **Tailwind CSS** - Styling with design tokens

No additional dependencies are required to run the samples.

## Testing the Samples

The samples are not unit-tested themselves (they're for demonstration only), but they follow patterns that **should** be tested in your real components:

### What to Test in Your Real Components:
1. ✅ User interactions (clicks, form submissions)
2. ✅ Keyboard navigation
3. ✅ Accessibility (no axe violations)
4. ✅ Error states and validation
5. ✅ Loading states
6. ✅ Data fetching and mutations
7. ✅ State updates

### Testing Example:
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MyForm } from './MyForm';

test('submits form with valid data', async () => {
  const user = userEvent.setup();
  render(<MyForm />);
  
  await user.type(screen.getByLabelText(/name/i), 'John Doe');
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```

## Before Production Checklist

Before deploying your application, make sure to:

- [ ] Delete the entire `samples/` directory
- [ ] Remove any sample imports from your code
- [ ] Remove sample routes from your router
- [ ] Update README to remove references to samples (if you added any)
- [ ] Run `npm run build` to ensure everything compiles
- [ ] Run `npm run test` to ensure all tests pass
- [ ] Run `npm run lint` to check for any issues

## Questions?

If you have questions about the patterns demonstrated in these samples:

1. Review the [Copilot Instructions](../.github/copilot-instructions.md) for detailed conventions
2. Check the [Contributing Guide](../CONTRIBUTING.md) for development workflows
3. Look at the existing components in `src/components/` for more examples
4. Review the TypeDoc-generated documentation

---

**Remember:** These samples are educational tools. Always **delete this directory** before deploying to production! 🚀
