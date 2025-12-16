/**
 * Fetch Utilities with Zod Validation
 *
 * This module provides a validated fetch utility for making API requests
 * with automatic response validation using Zod schemas.
 *
 * Key Features:
 * - Type-safe API requests with TypeScript
 * - Runtime validation with Zod schemas
 * - Comprehensive error handling with FetchError class
 * - Automatic JSON handling
 * - Example query functions demonstrating best practices
 *
 * Best Practices:
 * - Always validate external data with Zod schemas
 * - Handle errors appropriately with try-catch
 * - Validate input parameters (e.g., UUID format)
 * - Use TypeScript generics for type safety
 *
 * @example
 * ```ts
 * import { fetchData } from './queries/fetch';
 * import { userSchema } from './schemas/api';
 *
 * const user = await fetchData('/api/user/123', { schema: userSchema });
 * ```
 */

import { z } from 'zod';
import type { ZodType } from 'zod';

/**
 * FetchError Class
 *
 * Custom error class for API request failures.
 * Extends the native Error class with additional HTTP-specific properties.
 *
 * @property name - Always 'FetchError' for type checking
 * @property message - Error message describing what went wrong
 * @property status - HTTP status code (if available)
 * @property data - Additional error data from the API (if available)
 *
 * @example
 * ```ts
 * try {
 *   await fetchData('/api/user');
 * } catch (error) {
 *   if (error instanceof FetchError) {
 *     console.error(`HTTP ${error.status}: ${error.message}`);
 *   }
 * }
 * ```
 */
export class FetchError extends Error {
  status?: number;
  data?: unknown;

  constructor(message: string, status?: number, data?: unknown) {
    super(message);
    this.name = 'FetchError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Fetch options extended with Zod schema validation
 *
 * @property schema - Optional Zod schema for response validation
 */
interface FetchOptions extends RequestInit {
  schema?: ZodType;
}

/**
 * Validated Fetch Utility
 *
 * Makes an HTTP request and validates the response against a Zod schema.
 * Automatically handles JSON serialization and error responses.
 *
 * @template T - Expected response type (should match schema if provided)
 * @param url - API endpoint URL (relative or absolute)
 * @param options - Fetch options including optional Zod schema
 * @returns Promise resolving to validated response data
 * @throws {FetchError} If HTTP request fails (non-2xx status)
 * @throws {FetchError} If response validation fails (when schema provided)
 * @throws {FetchError} For network errors or other fetch failures
 *
 * @example
 * ```ts
 * // Without validation
 * const data = await fetchData<User>('/api/user/123');
 *
 * // With validation
 * const data = await fetchData<User>('/api/user/123', {
 *   schema: userSchema
 * });
 *
 * // With custom headers
 * const data = await fetchData<User>('/api/user/123', {
 *   schema: userSchema,
 *   headers: { 'Authorization': 'Bearer token' }
 * });
 * ```
 */
export async function fetchData<T>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  const { schema, ...fetchOptions } = options || {};

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new FetchError(
        `HTTP error! status: ${response.status}`,
        response.status,
        errorData
      );
    }

    const data = await response.json();

    // Validate with Zod schema if provided
    if (schema) {
      const validated = schema.parse(data);
      return validated as T;
    }

    return data as T;
  } catch (error) {
    if (error instanceof FetchError) {
      throw error;
    }
    if (error instanceof z.ZodError) {
      throw new FetchError('Response validation failed', undefined, error);
    }
    throw new FetchError(
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

/**
 * Fetch user by ID
 *
 * Example query function demonstrating validated fetching with UUID validation.
 *
 * @param userId - UUID string of the user to fetch
 * @returns Promise resolving to validated user data
 * @throws {FetchError} If userId is not a valid UUID format
 * @throws {FetchError} If the API request fails
 * @throws {FetchError} If response validation fails
 *
 * @example
 * ```ts
 * const user = await fetchUserById('550e8400-e29b-41d4-a716-446655440000');
 * console.log(user.name, user.email);
 * ```
 */
export async function fetchUserById(userId: string) {
  const { userSchema } = await import('../schemas/api');
  // Validate UUID format
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      userId
    )
  ) {
    throw new FetchError('Invalid user ID format');
  }
  return fetchData(`/api/users/${userId}`, { schema: userSchema });
}

/**
 * Fetch all posts
 *
 * Example query function demonstrating validated fetching of array data.
 *
 * @returns Promise resolving to array of validated post data
 * @throws {FetchError} If the API request fails
 * @throws {FetchError} If response validation fails
 *
 * @example
 * ```ts
 * const posts = await fetchPosts();
 * posts.forEach(post => {
 *   console.log(post.title, post.content);
 * });
 * ```
 */
export async function fetchPosts() {
  const { postSchema } = await import('../schemas/api');
  return fetchData('/api/posts', {
    schema: z.array(postSchema),
  });
}
