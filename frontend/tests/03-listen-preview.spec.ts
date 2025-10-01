import { test, expect } from '@playwright/test';

const ARTIST = 'Daft Punk';

test('listen preview plays', async ({ page }) => {
  await page.goto('/');
  const input = page.getByPlaceholder('Zoek artiest...');
  await input.fill(ARTIST);
  await page.waitForTimeout(400);
  await page.locator('.track').first().click();
  await page.mouse.click(420, 320);
  await page.getByText('Listen').click();
  await page.getByText('Global player').scrollIntoViewIfNeeded();
  await expect(page.getByRole('button', { name: 'Pause' })).toBeVisible();
});
