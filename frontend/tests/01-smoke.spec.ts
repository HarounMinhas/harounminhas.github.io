import { test, expect } from '@playwright/test';

test('home loads and search suggests', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('Ontdek nieuwe muziek')).toBeVisible();
  const input = page.getByPlaceholder('Zoek artiest...');
  await input.fill('Ben How');
  await page.waitForTimeout(300);
  await expect(page.locator('.track').first()).toBeVisible();
});
