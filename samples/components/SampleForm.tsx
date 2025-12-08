import { useCallback, useState } from 'react';
import { z } from 'zod';
import { Button } from '../../src/components/Button';
import { Input, Label, Alert, AlertTitle, AlertDescription } from '@/components/shadcn';

/**
 * SampleForm Component
 *
 * Demonstrates:
 * - Form handling with Zod validation
 * - Accessible form markup with proper labels
 * - Event handlers using useCallback (no inline functions)
 * - Error handling and display
 * - Design token usage for styling
 * - WCAG 2.2 AA compliance
 *
 * This is a SAMPLE component for educational purposes.
 * DELETE this file and the entire samples/ directory before deploying to production.
 *
 * @example
 * ```tsx
 * <SampleForm />
 * ```
 */

// Zod schema for form validation
const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18 years old').max(120, 'Invalid age'),
});

type FormData = z.infer<typeof formSchema>;

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
}

export function SampleForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, name: event.target.value }));
    setErrors((prev) => ({ ...prev, name: undefined }));
  }, []);

  const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, email: event.target.value }));
    setErrors((prev) => ({ ...prev, email: undefined }));
  }, []);

  const handleAgeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, age: event.target.value }));
    setErrors((prev) => ({ ...prev, age: undefined }));
  }, []);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSubmitSuccess(false);

      try {
        // Parse age as number
        const dataToValidate: FormData = {
          name: formData.name,
          email: formData.email,
          age: formData.age ? parseInt(formData.age, 10) : 0,
        };

        // Validate form data with Zod
        formSchema.parse(dataToValidate);

        // If validation passes, show success
        setErrors({});
        setSubmitSuccess(true);

        // Reset form
        setFormData({ name: '', email: '', age: '' });
      } catch (error) {
        if (error instanceof z.ZodError) {
          // Convert Zod errors to form errors
          const formErrors: FormErrors = {};
          error.issues.forEach((issue) => {
            const field = issue.path[0] as keyof FormErrors;
            formErrors[field] = issue.message;
          });
          setErrors(formErrors);
        }
      }
    },
    [formData]
  );

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold text-text-primary mb-4">
        Sample Form Component
      </h2>
      
      <Alert variant="default" className="mb-6">
        <AlertTitle>⚠️ Sample Component</AlertTitle>
        <AlertDescription>
          This is an educational example. Delete the samples/ directory before production.
        </AlertDescription>
      </Alert>

      {submitSuccess && (
        <Alert variant="default" className="mb-4">
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            Form submitted successfully. Check console for data.
          </AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Name field */}
        <div className="space-y-2">
          <Label htmlFor="name">
            Name <span className="text-error" aria-label="required">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleNameChange}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            placeholder="John Doe"
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email field */}
        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-error" aria-label="required">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleEmailChange}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Age field */}
        <div className="space-y-2">
          <Label htmlFor="age">
            Age <span className="text-error" aria-label="required">*</span>
          </Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={handleAgeChange}
            aria-required="true"
            aria-invalid={!!errors.age}
            aria-describedby={errors.age ? 'age-error' : undefined}
            placeholder="25"
            min="0"
            max="120"
          />
          {errors.age && (
            <p id="age-error" className="text-sm text-error" role="alert">
              {errors.age}
            </p>
          )}
        </div>

        <Button type="submit" variant="primary" fullWidth>
          Submit Form
        </Button>
      </form>
    </div>
  );
}
