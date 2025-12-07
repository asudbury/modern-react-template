[**modern-react-template v0.0.0**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/mutate](../README.md) / createResource

# Function: createResource()

> **createResource**\<`TInput`, `TOutput`\>(`url`, `data`): `Promise`\<`TOutput`\>

Defined in: [src/queries/mutate.ts:51](https://github.com/asudbury/modern-react-template/blob/5ca730a1d7a0cbdc691717316e5f7ae69f7342d7/src/queries/mutate.ts#L51)

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
