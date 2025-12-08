import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Separator Component (shadcn/ui)
 *
 * A visual separator component for dividing content sections.
 * Follows WCAG 2.2 AA guidelines.
 *
 * Features:
 * - Horizontal and vertical orientations
 * - Semantic separator role for screen readers
 * - Consistent styling with design system
 *
 * @example
 * ```tsx
 * <Separator />
 * <Separator orientation="vertical" />
 * ```
 */

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  (
    { className, orientation = 'horizontal', decorative = true, ...props },
    ref
  ) => (
    <div
      ref={ref}
      role={decorative ? 'none' : 'separator'}
      aria-orientation={decorative ? undefined : orientation}
      className={cn(
        'shrink-0 bg-neutral-200 dark:bg-neutral-800',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = 'Separator';
