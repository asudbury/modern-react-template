import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './separator';

/**
 * Separator Component Stories (shadcn/ui)
 *
 * Demonstrates the shadcn/ui Separator component with different orientations.
 */

const meta = {
  title: 'shadcn/ui/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the separator',
    },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Radix Primitives</h4>
        <p className="text-sm text-neutral-500">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium">shadcn/ui</h4>
        <p className="text-sm text-neutral-500">
          Beautifully designed components.
        </p>
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-[100px] items-center gap-4">
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Section 1</h4>
        <p className="text-sm text-neutral-500">Content here</p>
      </div>
      <Separator orientation="vertical" />
      <div className="space-y-1">
        <h4 className="text-sm font-medium">Section 2</h4>
        <p className="text-sm text-neutral-500">Content here</p>
      </div>
    </div>
  ),
};

export const InList: Story = {
  render: () => (
    <div className="w-[300px]">
      <div className="space-y-1">
        <p className="text-sm">Item 1</p>
      </div>
      <Separator className="my-2" />
      <div className="space-y-1">
        <p className="text-sm">Item 2</p>
      </div>
      <Separator className="my-2" />
      <div className="space-y-1">
        <p className="text-sm">Item 3</p>
      </div>
    </div>
  ),
};
