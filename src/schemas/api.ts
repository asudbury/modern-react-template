/**
 * API Response Schemas
 *
 * This module defines Zod schemas for validating API responses.
 * All external data from APIs must be validated using these schemas
 * to ensure type safety and data integrity.
 *
 * Best Practices:
 * - Export both the schema (for runtime validation) and the TypeScript type
 * - Use strict validation rules (e.g., UUID format, email format)
 * - Document the purpose of each schema and its properties
 *
 * @example
 * ```ts
 * import { userSchema, type User } from './schemas/api';
 *
 * const data = await fetchData('/api/user/123', { schema: userSchema });
 * // data is now validated and typed as User
 * ```
 */

import { z } from 'zod';

/**
 * User Schema
 *
 * Validates user data from the API.
 *
 * @property id - Unique identifier in UUID format
 * @property name - User's display name (non-empty)
 * @property email - User's email address (validated format)
 * @property createdAt - ISO 8601 datetime when the user was created
 */
export const userSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  email: z.email(),
  createdAt: z.iso.datetime(),
});

/**
 * User type derived from userSchema
 */
export type User = z.infer<typeof userSchema>;

/**
 * Post Schema
 *
 * Validates blog post or article data from the API.
 *
 * @property id - Unique identifier in UUID format
 * @property title - Post title (non-empty)
 * @property content - Post content/body text
 * @property authorId - UUID of the post author
 * @property createdAt - ISO 8601 datetime when the post was created
 * @property updatedAt - ISO 8601 datetime when the post was last modified
 */
export const postSchema = z.object({
  id: z.uuid(),
  title: z.string().min(1),
  content: z.string(),
  authorId: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

/**
 * Post type derived from postSchema
 */
export type Post = z.infer<typeof postSchema>;

/**
 * API Error Schema
 *
 * Validates error responses from the API.
 *
 * @property message - Human-readable error message
 * @property code - Optional error code for programmatic handling
 * @property details - Optional additional error details as key-value pairs
 */
export const apiErrorSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
  details: z.record(z.string(), z.unknown()).optional(),
});

/**
 * ApiError type derived from apiErrorSchema
 */
export type ApiError = z.infer<typeof apiErrorSchema>;
