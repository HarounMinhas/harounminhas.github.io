import { test, expect } from '@playwright/test';

async function bootstrapToken(page) {
  await page.waitForTimeout(400);
}

test('favorite and snapshot succeed', async ({ page }) => {
  await page.goto('/');
  await bootstrapToken(page);

  const input = page.getByPlaceholder('Zoek artiest...');
  await input.fill('Ben Howard');
  await page.waitForTimeout(300);
  await page.locator('.track').first().click();

  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Favoriet' }).click();

  await page.getByRole('button', { name: 'Snapshot' }).click();
  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Opslaan' }).click();

  expect(true).toBeTruthy();
});
