import { test, expect } from '@playwright/test';

test.describe('TrossApp Backend API E2E Tests', () => {
  test('API health endpoint should respond', async ({ request }) => {
    const response = await request.get('/api/health');
    expect(response.ok()).toBeTruthy();
    
    const json = await response.json();
    expect(json.status).toBe('healthy');
    expect(json.service).toBe('TrossApp Backend');
    expect(json.timestamp).toBeTruthy();
  });

  test('Hello World endpoint should respond', async ({ request }) => {
    const response = await request.get('/api/hello');
    expect(response.ok()).toBeTruthy();
    
    const json = await response.json();
    expect(json.message).toBe('Hello, World! (check terminal output)');
  });

  test('404 for unknown endpoints', async ({ request }) => {
    const response = await request.get('/api/nonexistent');
    expect(response.status()).toBe(404);
    
    const json = await response.json();
    expect(json.error).toBe('API endpoint not found');
    expect(json.path).toBe('/api/nonexistent');
  });
});

test.describe('TrossApp Future Features E2E', () => {
  test.skip('Work Order Management (Future)', async ({ page }) => {
    // TODO: Test work order creation flow when frontend is built
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toContainText('Work Orders');
  });

  test.skip('Technician Assignment (Future)', async ({ page }) => {
    // TODO: Test technician assignment when implemented
    await page.goto('/assignments');
    await expect(page.locator('.technician-list')).toBeVisible();
  });
});