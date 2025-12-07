[**modern-react-template v0.0.4**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/fetch](../README.md) / fetchPosts

# Function: fetchPosts()

> **fetchPosts**(): `Promise`\<`unknown`\>

Defined in: [src/queries/fetch.ts:199](https://github.com/asudbury/modern-react-template/blob/fa66b8a6e1100d41a1986ade93b6bfe3f02d8e6b/src/queries/fetch.ts#L199)

Fetch all posts

Example query function demonstrating validated fetching of array data.

## Returns

`Promise`\<`unknown`\>

Promise resolving to array of validated post data

## Throws

If the API request fails

## Throws

If response validation fails

## Example

```ts
const posts = await fetchPosts();
posts.forEach(post => {
  console.log(post.title, post.content);
});
```
