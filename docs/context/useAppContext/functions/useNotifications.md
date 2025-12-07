[**modern-react-template v0.0.4**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [context/useAppContext](../README.md) / useNotifications

# Function: useNotifications()

> **useNotifications**(): `object`

Defined in: [src/context/useAppContext.ts:36](https://github.com/asudbury/modern-react-template/blob/fa66b8a6e1100d41a1986ade93b6bfe3f02d8e6b/src/context/useAppContext.ts#L36)

## Returns

`object`

### addNotification()

> **addNotification**: (`notification`) => `void`

#### Parameters

##### notification

`Omit`\<[`Notification`](../../appTypes/interfaces/Notification.md), `"id"` \| `"timestamp"`\>

#### Returns

`void`

### notifications

> **notifications**: [`Notification`](../../appTypes/interfaces/Notification.md)[] = `state.notifications`

### removeNotification()

> **removeNotification**: (`id`) => `void`

#### Parameters

##### id

`string`

#### Returns

`void`
