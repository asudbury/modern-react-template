[**modern-react-template v0.0.9**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/mutate](../README.md) / createPost

# Function: createPost()

> **createPost**(`data`): `Promise`\<`unknown`\>

Defined in: [src/queries/mutate.ts:157](https://github.com/asudbury/modern-react-template/blob/e551150c6d7b992f2996ee9c8cc1f4169b755230/src/queries/mutate.ts#L157)

Example: Create a new post

Creates a new blog post with validation.

## Parameters

### data

Post data containing title and content

#### content

`string`

#### title

`string`

## Returns

`Promise`\<`unknown`\>

Promise resolving to the created post with server-generated fields

## Throws

If the request fails or validation fails

## Example

```ts
const post = await createPost({
  title: 'My First Post',
  content: 'This is the content...'
});
console.log(post.id); // Server-generated UUID
```
