import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 *
 * Combines clsx for conditional classes and tailwind-merge
 * to properly handle Tailwind class conflicts.
 *
 * @param inputs - Class values to merge
 * @returns Merged class string
 *
 * @example
 * ```ts
 * cn('px-2 py-1', 'px-4') // Returns 'py-1 px-4'
 * cn('text-red-500', condition && 'text-blue-500') // Conditionally applies classes
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
