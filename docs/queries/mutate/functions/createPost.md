[**modern-react-template v0.0.0**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/mutate](../README.md) / createPost

# Function: createPost()

> **createPost**(`data`): `Promise`\<`unknown`\>

Defined in: [src/queries/mutate.ts:157](https://github.com/asudbury/modern-react-template/blob/5ca730a1d7a0cbdc691717316e5f7ae69f7342d7/src/queries/mutate.ts#L157)

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
