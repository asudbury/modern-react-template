[**modern-react-template v0.0.4**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/mutate](../README.md) / deleteResource

# Function: deleteResource()

> **deleteResource**(`url`): `Promise`\<`void`\>

Defined in: [src/queries/mutate.ts:133](https://github.com/asudbury/modern-react-template/blob/fa66b8a6e1100d41a1986ade93b6bfe3f02d8e6b/src/queries/mutate.ts#L133)

Delete a resource

Sends a DELETE request to remove a resource from the server.

## Parameters

### url

`string`

API endpoint URL including resource ID

## Returns

`Promise`\<`void`\>

Promise resolving when deletion is complete

## Example

```ts
await deleteResource('/api/users/123');
```
