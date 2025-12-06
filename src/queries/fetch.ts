import { z } from 'zod';
import type { ZodSchema } from 'zod';

/**
 * Base fetch utility with Zod validation
 *
 * This utility handles API requests and validates responses against Zod schemas.
 * All external data should be validated before use in the application.
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

interface FetchOptions extends RequestInit {
  schema?: ZodSchema;
}

/**
 * Validated fetch utility
 *
 * @param url - API endpoint
 * @param options - Fetch options + optional Zod schema for response validation
 * @returns Validated response data
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
 * Example query functions using fetchData
 */

// Example: Fetch user by ID
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

// Example: Fetch all posts
export async function fetchPosts() {
  const { postSchema } = await import('../schemas/api');
  return fetchData('/api/posts', {
    schema: z.array(postSchema),
  });
}
