[**modern-react-template v0.0.9**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/mutate](../README.md) / updateUser

# Function: updateUser()

> **updateUser**(`userId`, `data`): `Promise`\<`unknown`\>

Defined in: [src/queries/mutate.ts:186](https://github.com/asudbury/modern-react-template/blob/e551150c6d7b992f2996ee9c8cc1f4169b755230/src/queries/mutate.ts#L186)

Example: Update a user

Updates user information with validation.

## Parameters

### userId

`string`

UUID of the user to update

### data

Updated user data (name and email)

#### email

`string`

#### name

`string`

## Returns

`Promise`\<`unknown`\>

Promise resolving to the updated user

## Throws

If userId format is invalid

## Throws

If name or email is missing

## Throws

If the request fails or validation fails

## Example

```ts
const user = await updateUser('550e8400-e29b-41d4-a716-446655440000', {
  name: 'Jane Smith',
  email: 'jane.smith@example.com'
});
```
