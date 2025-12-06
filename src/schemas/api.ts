import { z } from 'zod';

/**
 * Example API Response Schemas
 *
 * Define Zod schemas for validating API responses.
 * Export both the schema (for runtime validation) and the derived TypeScript type.
 */

// Example User schema
export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  email: z.string().email(),
  createdAt: z.string().datetime(),
});

export type User = z.infer<typeof userSchema>;

// Example Post schema
export const postSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  content: z.string(),
  authorId: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type Post = z.infer<typeof postSchema>;

// Example API Error schema
export const apiErrorSchema = z.object({
  message: z.string(),
  code: z.string().optional(),
  details: z.record(z.string(), z.unknown()).optional(),
});

export type ApiError = z.infer<typeof apiErrorSchema>;
