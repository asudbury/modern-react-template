import { forwardRef, type HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Alert Component
 *
 * Displays a callout for user attention with different severity levels.
 * Accessible and follows WCAG 2.2 AA guidelines.
 *
 * Features:
 * - Multiple variants for different alert types
 * - Proper ARIA roles for accessibility
 * - Semantic color coding
 *
 * @example
 * ```tsx
 * <Alert variant="default">
 *   <AlertTitle>Note</AlertTitle>
 *   <AlertDescription>This is an informational alert.</AlertDescription>
 * </Alert>
 *
 * <Alert variant="destructive">
 *   <AlertTitle>Error</AlertTitle>
 *   <AlertDescription>Something went wrong.</AlertDescription>
 * </Alert>
 * ```
 */

const alertVariants = cva(
  'relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-neutral-950 dark:[&>svg]:text-neutral-50',
  {
    variants: {
      variant: {
        default:
          'bg-white text-neutral-950 border-neutral-200 dark:bg-neutral-950 dark:text-neutral-50 dark:border-neutral-800',
        destructive:
          'border-red-500/50 text-red-900 dark:border-red-500 [&>svg]:text-red-900 dark:text-red-50 dark:[&>svg]:text-red-50 bg-red-50 dark:bg-red-900/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export const Alert = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

export const AlertTitle = forwardRef<
  HTMLHeadingElement,
  HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  // eslint-disable-next-line jsx-a11y/heading-has-content
  <h5
    ref={ref}
    className={cn('mb-1 font-medium leading-none tracking-tight', className)}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

export const AlertDescription = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('text-sm [&_p]:leading-relaxed', className)}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';
