/**
 * Data Mutation Utilities
 *
 * This module provides utilities for data modification operations (POST, PUT, PATCH, DELETE).
 * All mutations use the validated fetchData utility to ensure proper error handling
 * and response validation.
 *
 * Common Use Cases:
 * - Creating new resources (POST)
 * - Updating existing resources (PUT for full update, PATCH for partial)
 * - Deleting resources (DELETE)
 *
 * Best Practices:
 * - Always validate input data before sending
 * - Use Zod schemas to validate responses
 * - Validate UUID formats for IDs
 * - Provide type-safe interfaces
 *
 * @example
 * ```ts
 * import { createPost } from './queries/mutate';
 *
 * const newPost = await createPost({
 *   title: 'Hello World',
 *   content: 'This is my first post'
 * });
 * ```
 */

import { fetchData } from './fetch';

/**
 * Create a new resource
 *
 * Sends a POST request to create a new resource on the server.
 *
 * @template TInput - Type of the input data
 * @template TOutput - Type of the response data
 * @param url - API endpoint URL
 * @param data - Data to send in the request body
 * @returns Promise resolving to the created resource
 *
 * @example
 * ```ts
 * const user = await createResource<UserInput, User>('/api/users', {
 *   name: 'John Doe',
 *   email: 'john@example.com'
 * });
 * ```
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
 * Update an existing resource (full replacement)
 *
 * Sends a PUT request to replace an existing resource entirely.
 * Use PATCH (patchResource) for partial updates.
 *
 * @template TInput - Type of the input data
 * @template TOutput - Type of the response data
 * @param url - API endpoint URL including resource ID
 * @param data - Complete resource data
 * @returns Promise resolving to the updated resource
 *
 * @example
 * ```ts
 * const user = await updateResource<UserInput, User>('/api/users/123', {
 *   name: 'Jane Doe',
 *   email: 'jane@example.com'
 * });
 * ```
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
 *
 * Sends a PATCH request to update only specified fields of a resource.
 * Use PUT (updateResource) for complete replacement.
 *
 * @template TInput - Type of the input data
 * @template TOutput - Type of the response data
 * @param url - API endpoint URL including resource ID
 * @param data - Partial resource data to update
 * @returns Promise resolving to the updated resource
 *
 * @example
 * ```ts
 * const user = await patchResource<UserInput, User>('/api/users/123', {
 *   email: 'newemail@example.com' // Only update email
 * });
 * ```
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
 *
 * Sends a DELETE request to remove a resource from the server.
 *
 * @param url - API endpoint URL including resource ID
 * @returns Promise resolving when deletion is complete
 *
 * @example
 * ```ts
 * await deleteResource('/api/users/123');
 * ```
 */
export async function deleteResource(url: string): Promise<void> {
  await fetchData(url, {
    method: 'DELETE',
  });
}

/**
 * Example: Create a new post
 *
 * Creates a new blog post with validation.
 *
 * @param data - Post data containing title and content
 * @returns Promise resolving to the created post with server-generated fields
 * @throws {FetchError} If the request fails or validation fails
 *
 * @example
 * ```ts
 * const post = await createPost({
 *   title: 'My First Post',
 *   content: 'This is the content...'
 * });
 * console.log(post.id); // Server-generated UUID
 * ```
 */
export async function createPost(data: { title: string; content: string }) {
  const { postSchema } = await import('../schemas/api');
  return fetchData('/api/posts', {
    method: 'POST',
    body: JSON.stringify(data),
    schema: postSchema,
  });
}

/**
 * Example: Update a user
 *
 * Updates user information with validation.
 *
 * @param userId - UUID of the user to update
 * @param data - Updated user data (name and email)
 * @returns Promise resolving to the updated user
 * @throws {Error} If userId format is invalid
 * @throws {Error} If name or email is missing
 * @throws {FetchError} If the request fails or validation fails
 *
 * @example
 * ```ts
 * const user = await updateUser('550e8400-e29b-41d4-a716-446655440000', {
 *   name: 'Jane Smith',
 *   email: 'jane.smith@example.com'
 * });
 * ```
 */
export async function updateUser(
  userId: string,
  data: { name: string; email: string }
) {
  const { userSchema } = await import('../schemas/api');
  // Validate UUID format
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      userId
    )
  ) {
    throw new Error('Invalid user ID format');
  }
  // Validate data
  if (!data.name || !data.email) {
    throw new Error('Name and email are required');
  }
  return fetchData(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    schema: userSchema,
  });
}

/**
 * Example: Delete a post
 *
 * Deletes a blog post by ID.
 *
 * @param postId - UUID of the post to delete
 * @returns Promise resolving when the post is deleted
 * @throws {Error} If postId format is invalid
 * @throws {FetchError} If the request fails
 *
 * @example
 * ```ts
 * await deletePost('550e8400-e29b-41d4-a716-446655440000');
 * ```
 */
export async function deletePost(postId: string) {
  // Validate UUID format
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      postId
    )
  ) {
    throw new Error('Invalid post ID format');
  }
  return deleteResource(`/api/posts/${postId}`);
}
