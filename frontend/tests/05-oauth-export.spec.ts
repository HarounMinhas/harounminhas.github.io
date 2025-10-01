import { test } from '@playwright/test';

test.skip('oauth login and export', async ({ page }) => {
  await page.goto('/library');
  // Manual Spotify login flow not automated in CI.
});
