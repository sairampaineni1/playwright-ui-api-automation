import { test, expect } from '@playwright/test';
test('store homepage displays products', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  const firstProduct = page.locator('[data-test^="product-"]').first();

  await expect(firstProduct).toBeVisible();
  await expect(firstProduct).toContainText(/\S+/);
});
test('search returns hammer products', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  await page.locator('[data-test="search-query"]').fill('hammer');
  await page.locator('[data-test="search-submit"]').click();

  await expect(
    page.getByText('Searched for: hammer', { exact: true })
  ).toBeVisible();

  const products = page.locator('[data-test^="product-"]');

  await expect(products.first()).toBeVisible();

  await expect(async () => {
    const names = await products
      .locator('[data-test="product-name"]')
      .allTextContents();

    expect(names.length).toBeGreaterThan(0);

    for (const name of names) {
      expect(name.toLowerCase()).toContain('hammer');
    }
  }).toPass();
});