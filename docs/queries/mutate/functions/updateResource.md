[**modern-react-template v0.0.4**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/mutate](../README.md) / updateResource

# Function: updateResource()

> **updateResource**\<`TInput`, `TOutput`\>(`url`, `data`): `Promise`\<`TOutput`\>

Defined in: [src/queries/mutate.ts:81](https://github.com/asudbury/modern-react-template/blob/fa66b8a6e1100d41a1986ade93b6bfe3f02d8e6b/src/queries/mutate.ts#L81)

Update an existing resource (full replacement)

Sends a PUT request to replace an existing resource entirely.
Use PATCH (patchResource) for partial updates.

## Type Parameters

### TInput

`TInput`

Type of the input data

### TOutput

`TOutput`

Type of the response data

## Parameters

### url

`string`

API endpoint URL including resource ID

### data

`TInput`

Complete resource data

## Returns

`Promise`\<`TOutput`\>

Promise resolving to the updated resource

## Example

```ts
const user = await updateResource<UserInput, User>('/api/users/123', {
  name: 'Jane Doe',
  email: 'jane@example.com'
});
```
