[**modern-react-template v0.0.4**](../../../README.md)

***

[modern-react-template](../../../modules.md) / [queries/fetch](../README.md) / fetchPosts

# Function: fetchPosts()

> **fetchPosts**(): `Promise`\<`unknown`\>

Defined in: [src/queries/fetch.ts:199](https://github.com/asudbury/modern-react-template/blob/000be6994f4ac0ab10bd189fe11233a0d8a44ac0/src/queries/fetch.ts#L199)

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
