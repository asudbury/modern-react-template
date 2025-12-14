[**modern-react-template v0.0.9**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/fetch](../README.md) / fetchUserById

# Function: fetchUserById()

> **fetchUserById**(`userId`): `Promise`\<`unknown`\>

Defined in: [src/queries/fetch.ts:169](https://github.com/asudbury/modern-react-template/blob/e551150c6d7b992f2996ee9c8cc1f4169b755230/src/queries/fetch.ts#L169)

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
