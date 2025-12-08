import type { Meta, StoryObj } from '@storybook/react';
import { Alert, AlertDescription, AlertTitle } from './alert';

/**
 * Alert Component Stories
 *
 * Demonstrates the shadcn/ui Alert component with different variants.
 */

const meta = {
  title: 'shadcn/ui/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
      description: 'The visual variant of the alert',
    },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is an informational alert message.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-[400px]">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong. Please try again.
      </AlertDescription>
    </Alert>
  ),
};

export const WithoutTitle: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertDescription>
        This alert only has a description, no title.
      </AlertDescription>
    </Alert>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertTitle>Terms and Conditions</AlertTitle>
      <AlertDescription>
        By continuing, you agree to our Terms of Service and Privacy Policy.
        Please read them carefully before proceeding. Your data will be
        processed in accordance with applicable data protection regulations.
      </AlertDescription>
    </Alert>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <Alert variant="default">
        <AlertTitle>Note</AlertTitle>
        <AlertDescription>
          This is a default informational alert.
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>This is a destructive error alert.</AlertDescription>
      </Alert>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      <Alert>
        <span className="text-xl mr-2">ℹ️</span>
        <div>
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            Your changes have been saved successfully.
          </AlertDescription>
        </div>
      </Alert>

      <Alert variant="destructive">
        <span className="text-xl mr-2">⚠️</span>
        <div>
          <AlertTitle>Warning</AlertTitle>
          <AlertDescription>
            Unable to process your request. Please check your input.
          </AlertDescription>
        </div>
      </Alert>
    </div>
  ),
};
