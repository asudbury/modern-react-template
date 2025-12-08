import type { Meta, StoryObj } from '@storybook/react';
import { ShadcnButton } from './button';

/**
 * Button Component Stories (shadcn/ui)
 *
 * Demonstrates the shadcn/ui Button component with different variants and sizes.
 */

const meta = {
  title: 'shadcn/ui/Button',
  component: ShadcnButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ],
      description: 'The visual variant of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
  },
} satisfies Meta<typeof ShadcnButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
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

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ShadcnButton variant="default">Default</ShadcnButton>
      <ShadcnButton variant="secondary">Secondary</ShadcnButton>
      <ShadcnButton variant="destructive">Destructive</ShadcnButton>
      <ShadcnButton variant="outline">Outline</ShadcnButton>
      <ShadcnButton variant="ghost">Ghost</ShadcnButton>
      <ShadcnButton variant="link">Link</ShadcnButton>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <ShadcnButton size="sm">Small</ShadcnButton>
      <ShadcnButton size="default">Default</ShadcnButton>
      <ShadcnButton size="lg">Large</ShadcnButton>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ShadcnButton disabled>Disabled Default</ShadcnButton>
      <ShadcnButton variant="secondary" disabled>
        Disabled Secondary
      </ShadcnButton>
      <ShadcnButton variant="outline" disabled>
        Disabled Outline
      </ShadcnButton>
    </div>
  ),
};
