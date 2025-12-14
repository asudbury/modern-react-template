[**modern-react-template v0.0.7**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [context/useAppContext](../README.md) / useNotifications

# Function: useNotifications()

> **useNotifications**(): `object`

Defined in: [src/context/useAppContext.ts:36](https://github.com/asudbury/modern-react-template/blob/a50002e6ab1d9c04412145a47cc1999576b975b1/src/context/useAppContext.ts#L36)

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
