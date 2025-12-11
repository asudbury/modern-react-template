import type { Meta, StoryObj } from '@storybook/react';
import { ErrorFallback } from './ErrorFallback';

const meta = {
  title: 'Components/ErrorFallback',
  component: ErrorFallback,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    error: new Error(
      'This is a simulated error message for the Storybook preview.'
    ),
    resetErrorBoundary: () => console.log('Reset triggered'),
  },
} satisfies Meta<typeof ErrorFallback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongError: Story = {
  args: {
    error: new Error(
      'This is a much longer error message to test how the component handles wrapping and scrolling when the error stack or message is very large. ' +
        'repeated text '.repeat(20)
    ),
  },
};
