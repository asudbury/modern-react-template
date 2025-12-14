[**modern-react-template v0.0.9**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/mutate](../README.md) / deletePost

# Function: deletePost()

> **deletePost**(`postId`): `Promise`\<`void`\>

Defined in: [src/queries/mutate.ts:225](https://github.com/asudbury/modern-react-template/blob/e551150c6d7b992f2996ee9c8cc1f4169b755230/src/queries/mutate.ts#L225)

Example: Delete a post

Deletes a blog post by ID.

## Parameters

### postId

`string`

UUID of the post to delete

## Returns

`Promise`\<`void`\>

Promise resolving when the post is deleted

## Throws

If postId format is invalid

## Throws

If the request fails

## Example

```ts
await deletePost('550e8400-e29b-41d4-a716-446655440000');
```
