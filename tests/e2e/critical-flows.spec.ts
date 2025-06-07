import { test, expect } from '@playwright/test';

test.describe('Critical User Flows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Homepage → Calculator → Results flow', async ({ page }) => {
    // Check homepage loads with key elements
    await expect(page).toHaveTitle(/Royal RWA/);
    await expect(page.locator('h1')).toContainText(/Where Sovereign Wealth Meets Individual Opportunity/);
    
    // Click on calculator CTA
    await page.click('[data-testid="cta-calculator"]');
    
    // Should navigate to calculator page
    await expect(page).toHaveURL('/calculator');
    
    // Fill in calculator form
    await page.fill('[data-testid="amount-input"]', '10000');
    await page.click('[data-testid="period-1year"]');
    await page.check('[data-testid="compounding-checkbox"]');
    
    // Submit calculation
    await page.click('[data-testid="calculate-button"]');
    
    // Verify results are displayed
    await expect(page.locator('[data-testid="total-return"]')).toContainText('$11,200');
    await expect(page.locator('[data-testid="profit"]')).toContainText('$1,200');
    await expect(page.locator('[data-testid="apy"]')).toContainText('12%');
  });

  test('Connect Wallet → Stake → Success flow', async ({ page }) => {
    // Navigate to staking page
    await page.goto('/staking');
    
    // Click connect wallet button
    await page.click('[data-testid="connect-wallet"]');
    
    // Select wallet (mock for testing)
    await page.click('[data-testid="wallet-metamask"]');
    
    // Wait for connection (mocked)
    await expect(page.locator('[data-testid="wallet-address"]')).toBeVisible();
    
    // Enter staking amount
    await page.fill('[data-testid="stake-amount"]', '5000');
    
    // Select staking period
    await page.click('[data-testid="stake-period-2year"]');
    
    // Click stake button
    await page.click('[data-testid="stake-button"]');
    
    // Confirm transaction (mocked)
    await page.click('[data-testid="confirm-transaction"]');
    
    // Verify success message and celebration
    await expect(page.locator('[data-testid="success-message"]')).toContainText(/Successfully staked/);
    await expect(page.locator('[data-testid="transaction-hash"]')).toBeVisible();
    
    // Check if celebration animation triggered
    await expect(page.locator('.particle-effect')).toBeVisible();
  });

  test('Mobile Navigation', async ({ page, viewport }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check mobile menu button is visible
    await expect(page.locator('[data-testid="mobile-menu-button"]')).toBeVisible();
    
    // Open mobile menu
    await page.click('[data-testid="mobile-menu-button"]');
    
    // Verify menu items are visible
    await expect(page.locator('[data-testid="mobile-nav"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-calculator"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-tokens"]')).toBeVisible();
    await expect(page.locator('[data-testid="nav-staking"]')).toBeVisible();
    
    // Navigate to a page
    await page.click('[data-testid="nav-tokens"]');
    await expect(page).toHaveURL('/tokens');
    
    // Menu should close after navigation
    await expect(page.locator('[data-testid="mobile-nav"]')).not.toBeVisible();
  });

  test('Performance metrics', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Get performance metrics
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.fetchStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
        firstContentfulPaint: performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 0
      };
    });
    
    // Assert performance budgets
    expect(metrics.loadTime).toBeLessThan(3000); // 3s max load time
    expect(metrics.domContentLoaded).toBeLessThan(2000); // 2s max DOM ready
    expect(metrics.firstContentfulPaint).toBeLessThan(1500); // 1.5s max FCP
  });

  test('Error handling', async ({ page }) => {
    // Simulate API error
    await page.route('**/api/stats/tvl', route => {
      route.fulfill({
        status: 500,
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });
    
    await page.goto('/');
    
    // Should show error state, not crash
    await expect(page.locator('[data-testid="error-message"]')).toContainText(/Unable to load data/);
    
    // Retry button should be visible
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible();
    
    // Click retry
    await page.click('[data-testid="retry-button"]');
    
    // Should attempt to reload data
    await page.waitForRequest('**/api/stats/tvl');
  });
});

test.describe('Accessibility', () => {
  test('Homepage accessibility', async ({ page }) => {
    await page.goto('/');
    
    // Check for accessibility violations
    // Note: In real implementation, use @axe-core/playwright
    
    // Check main landmarks
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    
    // Check heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);
    
    // Check interactive elements have labels
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const ariaLabel = await button.getAttribute('aria-label');
      const text = await button.textContent();
      expect(ariaLabel || text).toBeTruthy();
    }
    
    // Check images have alt text
    const images = page.locator('img');
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const alt = await images.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });
});