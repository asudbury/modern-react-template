[**modern-react-template v0.0.9**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/fetch](../README.md) / fetchData

# Function: fetchData()

> **fetchData**\<`T`\>(`url`, `options?`): `Promise`\<`T`\>

Defined in: [src/queries/fetch.ts:106](https://github.com/asudbury/modern-react-template/blob/e551150c6d7b992f2996ee9c8cc1f4169b755230/src/queries/fetch.ts#L106)

Validated Fetch Utility

Makes an HTTP request and validates the response against a Zod schema.
Automatically handles JSON serialization and error responses.

## Type Parameters

### T

`T`

Expected response type (should match schema if provided)

## Parameters

### url

`string`

API endpoint URL (relative or absolute)

### options?

`FetchOptions`

Fetch options including optional Zod schema

## Returns

`Promise`\<`T`\>

Promise resolving to validated response data

## Throws

If HTTP request fails (non-2xx status)

## Throws

If response validation fails (when schema provided)

## Throws

For network errors or other fetch failures

## Example

```ts
// Without validation
const data = await fetchData<User>('/api/user/123');

// With validation
const data = await fetchData<User>('/api/user/123', {
  schema: userSchema
});

// With custom headers
const data = await fetchData<User>('/api/user/123', {
  schema: userSchema,
  headers: { 'Authorization': 'Bearer token' }
});
```
