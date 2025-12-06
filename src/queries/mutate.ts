import { fetchData } from './fetch';

/**
 * Mutation utilities for data modification operations
 *
 * These functions handle POST, PUT, PATCH, DELETE requests with proper error handling.
 */

/**
 * Create a new resource
 */
export async function createResource<TInput, TOutput>(
  url: string,
  data: TInput
): Promise<TOutput> {
  return fetchData<TOutput>(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Update an existing resource (full update)
 */
export async function updateResource<TInput, TOutput>(
  url: string,
  data: TInput
): Promise<TOutput> {
  return fetchData<TOutput>(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Partially update an existing resource
 */
export async function patchResource<TInput, TOutput>(
  url: string,
  data: Partial<TInput>
): Promise<TOutput> {
  return fetchData<TOutput>(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/**
 * Delete a resource
 */
export async function deleteResource(url: string): Promise<void> {
  await fetchData(url, {
    method: 'DELETE',
  });
}

/**
 * Example mutation functions
 */

// Example: Create a new post
export async function createPost(data: { title: string; content: string }) {
  const { postSchema } = await import('../schemas/api');
  return fetchData('/api/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    schema: postSchema,
  });
}

// Example: Update user
export async function updateUser(
  userId: string,
  data: { name: string; email: string }
) {
  const { userSchema } = await import('../schemas/api');
  return fetchData(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    schema: userSchema,
  });
}

// Example: Delete post
export async function deletePost(postId: string) {
  return deleteResource(`/api/posts/${postId}`);
}
