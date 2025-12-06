import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('HomePage', () => {
  test('should display the homepage with proper content', async ({ page }) => {
    await page.goto('/');

    // Check for main heading
    const heading = page.getByRole('heading', {
      name: /modern react template/i,
      level: 1,
    });
    await expect(heading).toBeVisible();

    // Check for buttons
    const primaryButton = page.getByRole('button', {
      name: /try primary button/i,
    });
    await expect(primaryButton).toBeVisible();

    const secondaryButton = page.getByRole('button', {
      name: /try secondary button/i,
    });
    await expect(secondaryButton).toBeVisible();
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Focus the first button
    const primaryButton = page.getByRole('button', {
      name: /try primary button/i,
    });
    await primaryButton.focus();
    await expect(primaryButton).toBeFocused();

    // Activate with Enter key
    await page.keyboard.press('Enter');

    // Should still be visible after interaction
    await expect(primaryButton).toBeVisible();

    // Tab to next button
    await page.keyboard.press('Tab');
    const secondaryButton = page.getByRole('button', {
      name: /try secondary button/i,
    });
    await expect(secondaryButton).toBeFocused();

    // Activate with Space key
    await page.keyboard.press('Space');
    await expect(secondaryButton).toBeVisible();
  });

  test('should have no accessibility violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check for h1
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();

    // Check for h2
    const h2 = page.getByRole('heading', { level: 2 });
    await expect(h2).toBeVisible();

    // Check for h3
    const h3 = page.getByRole('heading', { level: 3 }).first();
    await expect(h3).toBeVisible();
  });

  test('buttons should work with mouse click', async ({ page }) => {
    await page.goto('/');

    const primaryButton = page.getByRole('button', {
      name: /try primary button/i,
    });

    // Click the button
    await primaryButton.click();

    // Button should still be visible after click
    await expect(primaryButton).toBeVisible();
  });
});
