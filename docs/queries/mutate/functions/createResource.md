[**modern-react-template v0.0.9**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/mutate](../README.md) / createResource

# Function: createResource()

> **createResource**\<`TInput`, `TOutput`\>(`url`, `data`): `Promise`\<`TOutput`\>

Defined in: [src/queries/mutate.ts:51](https://github.com/asudbury/modern-react-template/blob/e551150c6d7b992f2996ee9c8cc1f4169b755230/src/queries/mutate.ts#L51)

Create a new resource

Sends a POST request to create a new resource on the server.

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

API endpoint URL

### data

`TInput`

Data to send in the request body

## Returns

`Promise`\<`TOutput`\>

Promise resolving to the created resource

## Example

```ts
const user = await createResource<UserInput, User>('/api/users', {
  name: 'John Doe',
  email: 'john@example.com'
});
```
