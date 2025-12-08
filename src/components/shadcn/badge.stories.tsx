import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './badge';

/**
 * Badge Component Stories
 *
 * Demonstrates the shadcn/ui Badge component with different variants.
 */

const meta = {
  title: 'shadcn/ui/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'The visual variant of the badge',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Destructive',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm">Status:</span>
        <Badge variant="default">Active</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Status:</span>
        <Badge variant="secondary">Pending</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Status:</span>
        <Badge variant="destructive">Error</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm">Status:</span>
        <Badge variant="outline">Draft</Badge>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Badge variant="default">
        <span className="mr-1">✓</span> Success
      </Badge>
      <Badge variant="secondary">
        <span className="mr-1">⏱</span> Pending
      </Badge>
      <Badge variant="destructive">
        <span className="mr-1">✗</span> Failed
      </Badge>
      <Badge variant="outline">
        <span className="mr-1">📝</span> Draft
      </Badge>
    </div>
  ),
};
