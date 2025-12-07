import type { Preview } from '@storybook/react-vite';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      config: {
        rules: [
          {
            // This tells Axe to run the 'color-contrast' rule on all elements
            // that have a color-contrast issue
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};

export default preview;