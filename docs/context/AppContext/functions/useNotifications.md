[**modern-react-template v0.0.0**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [context/AppContext](../README.md) / useNotifications

# Function: useNotifications()

> **useNotifications**(): `object`

Defined in: [src/context/AppContext.tsx:135](https://github.com/asudbury/modern-react-template/blob/5ca730a1d7a0cbdc691717316e5f7ae69f7342d7/src/context/AppContext.tsx#L135)

## Returns

`object`

### addNotification()

> **addNotification**: (`notification`) => `void`

#### Parameters

##### notification

`Omit`\<[`Notification`](../interfaces/Notification.md), `"id"` \| `"timestamp"`\>

#### Returns

`void`

### notifications

> **notifications**: [`Notification`](../interfaces/Notification.md)[] = `state.notifications`

### removeNotification()

> **removeNotification**: (`id`) => `void`

#### Parameters

##### id

`string`

#### Returns

`void`
