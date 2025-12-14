[**modern-react-template v0.0.9**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/mutate](../README.md) / deleteResource

# Function: deleteResource()

> **deleteResource**(`url`): `Promise`\<`void`\>

Defined in: [src/queries/mutate.ts:133](https://github.com/asudbury/modern-react-template/blob/e551150c6d7b992f2996ee9c8cc1f4169b755230/src/queries/mutate.ts#L133)

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
