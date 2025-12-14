[**modern-react-template v0.0.9**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/mutate](../README.md) / patchResource

# Function: patchResource()

> **patchResource**\<`TInput`, `TOutput`\>(`url`, `data`): `Promise`\<`TOutput`\>

Defined in: [src/queries/mutate.ts:110](https://github.com/asudbury/modern-react-template/blob/e551150c6d7b992f2996ee9c8cc1f4169b755230/src/queries/mutate.ts#L110)

Partially update an existing resource

Sends a PATCH request to update only specified fields of a resource.
Use PUT (updateResource) for complete replacement.

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

`Partial`\<`TInput`\>

Partial resource data to update

## Returns

`Promise`\<`TOutput`\>

Promise resolving to the updated resource

## Example

```ts
const user = await patchResource<UserInput, User>('/api/users/123', {
  email: 'newemail@example.com' // Only update email
});
```
