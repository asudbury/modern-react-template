[**modern-react-template v0.0.4**](../../../../README.md)

***

[modern-react-template](../../../../modules.md) / [components/Button/Button](../README.md) / ButtonProps

# Interface: ButtonProps

Defined in: [src/components/Button/Button.tsx:25](https://github.com/asudbury/modern-react-template/blob/fa66b8a6e1100d41a1986ade93b6bfe3f02d8e6b/src/components/Button/Button.tsx#L25)

Button Component

An accessible, keyboard-navigable button component following WCAG 2.2 AA guidelines.

Features:
- Keyboard accessible (Enter, Space)
- Screen reader friendly with proper ARIA attributes
- Supports disabled state with appropriate styling
- Uses design tokens for colors (no hardcoded values)
- Forwards ref for parent access
- No inline event handlers (uses useCallback)

## Example

```tsx
<Button variant="primary" onClick={handleClick}>
  Click me
</Button>
```

## Extends

- `ButtonHTMLAttributes`\<`HTMLButtonElement`\>

## Properties

### fullWidth?

> `optional` **fullWidth**: `boolean`

Defined in: [src/components/Button/Button.tsx:28](https://github.com/asudbury/modern-react-template/blob/fa66b8a6e1100d41a1986ade93b6bfe3f02d8e6b/src/components/Button/Button.tsx#L28)

***

### size?

> `optional` **size**: `"sm"` \| `"md"` \| `"lg"`

Defined in: [src/components/Button/Button.tsx:27](https://github.com/asudbury/modern-react-template/blob/fa66b8a6e1100d41a1986ade93b6bfe3f02d8e6b/src/components/Button/Button.tsx#L27)

***

### variant?

> `optional` **variant**: `"primary"` \| `"secondary"` \| `"accent"` \| `"danger"`

Defined in: [src/components/Button/Button.tsx:26](https://github.com/asudbury/modern-react-template/blob/fa66b8a6e1100d41a1986ade93b6bfe3f02d8e6b/src/components/Button/Button.tsx#L26)
