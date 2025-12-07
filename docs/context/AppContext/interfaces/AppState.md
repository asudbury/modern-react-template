[**modern-react-template v0.0.0**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [context/AppContext](../README.md) / AppState

# Interface: AppState

Defined in: [src/context/AppContext.tsx:19](https://github.com/asudbury/modern-react-template/blob/5ca730a1d7a0cbdc691717316e5f7ae69f7342d7/src/context/AppContext.tsx#L19)

Application State Management

This file defines the global client state using Context + Reducer pattern.
Use this for client-side state only. Server state should use TanStack Query.

Examples of client state:
- UI state (modals, sidebar open/close)
- User preferences (theme, language)
- Form state (draft values, validation)
- Navigation state

## Properties

### notifications

> **notifications**: [`Notification`](Notification.md)[]

Defined in: [src/context/AppContext.tsx:22](https://github.com/asudbury/modern-react-template/blob/5ca730a1d7a0cbdc691717316e5f7ae69f7342d7/src/context/AppContext.tsx#L22)

***

### sidebarOpen

> **sidebarOpen**: `boolean`

Defined in: [src/context/AppContext.tsx:21](https://github.com/asudbury/modern-react-template/blob/5ca730a1d7a0cbdc691717316e5f7ae69f7342d7/src/context/AppContext.tsx#L21)

***

### theme

> **theme**: `"light"` \| `"dark"`

Defined in: [src/context/AppContext.tsx:20](https://github.com/asudbury/modern-react-template/blob/5ca730a1d7a0cbdc691717316e5f7ae69f7342d7/src/context/AppContext.tsx#L20)
