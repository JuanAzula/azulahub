import { test, expect } from '@playwright/test';

test('Login', async ({ page }) => {
    await page.goto('http://localhost:5173/')
    // const username = page.locator('input[name="username"]')
    // const password = page.locator('input[name="password"]')
    // const login = page.locator('button[type="submit"]')
})