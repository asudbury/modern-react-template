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
