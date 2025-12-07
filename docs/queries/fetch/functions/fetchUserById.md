[**modern-react-template v0.0.4**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/fetch](../README.md) / fetchUserById

# Function: fetchUserById()

> **fetchUserById**(`userId`): `Promise`\<`unknown`\>

Defined in: [src/queries/fetch.ts:169](https://github.com/asudbury/modern-react-template/blob/fa66b8a6e1100d41a1986ade93b6bfe3f02d8e6b/src/queries/fetch.ts#L169)

Fetch user by ID

Example query function demonstrating validated fetching with UUID validation.

## Parameters

### userId

`string`

UUID string of the user to fetch

## Returns

`Promise`\<`unknown`\>

Promise resolving to validated user data

## Throws

If userId is not a valid UUID format

## Throws

If the API request fails

## Throws

If response validation fails

## Example

```ts
const user = await fetchUserById('550e8400-e29b-41d4-a716-446655440000');
console.log(user.name, user.email);
```
