import { test, expect } from '@playwright/test';

test('graph renders and more similar expands', async ({ page }) => {
  await page.goto('/');
  const input = page.getByPlaceholder('Zoek artiest...');
  await input.fill('Ben Howard');
  await page.waitForTimeout(300);
  await page.locator('.track').first().click();

  await page.mouse.click(400, 300);
  await expect(page.getByText('More Similar Artists')).toBeVisible();
  await page.getByText('More Similar Artists').click();
  await page.waitForTimeout(800);
  await expect(page.getByText('Top tracks')).toBeVisible();
});
