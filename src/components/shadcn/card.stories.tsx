import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card';

/**
 * Card Component Stories
 *
 * Demonstrates the shadcn/ui Card component and its sub-components.
 */

const meta = {
  title: 'shadcn/ui/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content area.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          Enter a name for your project and click deploy.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button className="px-4 py-2 text-sm">Cancel</button>
        <button className="px-4 py-2 text-sm bg-primary text-white rounded">
          Deploy
        </button>
      </CardFooter>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardContent className="pt-6">
        <p>This card only has content, no header or footer.</p>
      </CardContent>
    </Card>
  ),
};

export const FullExample: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Accessibility</CardTitle>
          <CardDescription>WCAG 2.2 AA compliant</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>✓ Keyboard navigable</li>
            <li>✓ Screen reader friendly</li>
            <li>✓ Semantic HTML</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>TypeScript</CardTitle>
          <CardDescription>Fully typed</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>✓ Type safety</li>
            <li>✓ IntelliSense support</li>
            <li>✓ Compile-time checks</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customizable</CardTitle>
          <CardDescription>Tailwind CSS</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>✓ Design tokens</li>
            <li>✓ Easy styling</li>
            <li>✓ Responsive</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  ),
};
