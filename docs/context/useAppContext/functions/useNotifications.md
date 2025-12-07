[**modern-react-template v0.0.4**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [context/useAppContext](../README.md) / useNotifications

# Function: useNotifications()

> **useNotifications**(): `object`

Defined in: [src/context/useAppContext.ts:36](https://github.com/asudbury/modern-react-template/blob/000be6994f4ac0ab10bd189fe11233a0d8a44ac0/src/context/useAppContext.ts#L36)

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
