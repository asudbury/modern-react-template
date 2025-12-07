[**modern-react-template v0.0.4**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/mutate](../README.md) / deleteResource

# Function: deleteResource()

> **deleteResource**(`url`): `Promise`\<`void`\>

Defined in: [src/queries/mutate.ts:133](https://github.com/asudbury/modern-react-template/blob/000be6994f4ac0ab10bd189fe11233a0d8a44ac0/src/queries/mutate.ts#L133)

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
