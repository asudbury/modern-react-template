[**modern-react-template v0.0.0**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/mutate](../README.md) / deleteResource

# Function: deleteResource()

> **deleteResource**(`url`): `Promise`\<`void`\>

Defined in: [src/queries/mutate.ts:133](https://github.com/asudbury/modern-react-template/blob/5ca730a1d7a0cbdc691717316e5f7ae69f7342d7/src/queries/mutate.ts#L133)

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
