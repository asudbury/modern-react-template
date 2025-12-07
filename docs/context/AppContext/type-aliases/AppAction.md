[**modern-react-template v0.0.0**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [context/AppContext](../README.md) / AppAction

# Type Alias: AppAction

> **AppAction** = \{ `payload`: `"light"` \| `"dark"`; `type`: `"SET_THEME"`; \} \| \{ `type`: `"TOGGLE_SIDEBAR"`; \} \| \{ `payload`: `Omit`\<[`Notification`](../interfaces/Notification.md), `"id"` \| `"timestamp"`\>; `type`: `"ADD_NOTIFICATION"`; \} \| \{ `payload`: `string`; `type`: `"REMOVE_NOTIFICATION"`; \}

Defined in: [src/context/AppContext.tsx:33](https://github.com/asudbury/modern-react-template/blob/5ca730a1d7a0cbdc691717316e5f7ae69f7342d7/src/context/AppContext.tsx#L33)
