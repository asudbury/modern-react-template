/**
 * Test Setup Configuration
 *
 * This file configures the testing environment for Vitest and React Testing Library.
 * It's automatically loaded before running tests via vitest.config.ts.
 *
 * Setup includes:
 * - @testing-library/jest-dom matchers for DOM assertions
 * - Automatic cleanup after each test to prevent memory leaks
 * - happy-dom environment for fast DOM simulation
 */

import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

/**
 * Clean up DOM after each test
 *
 * Ensures that each test runs in isolation with a clean DOM state.
 * This prevents test pollution and memory leaks.
 */
afterEach(() => {
  cleanup();
});
