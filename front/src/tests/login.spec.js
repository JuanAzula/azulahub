import { test, expect } from '@playwright/test';

test('Login', async ({ page }) => {
    await page.goto('http://localhost:5173/')
    await page.getByPlaceholder('email or username').fill('user@example.com')
    await page.getByPlaceholder('password').fill('123456K*')
    await page.getByRole('button', { name: 'Login' }).click()
    await page.screenshot({ path: 'login.png' })
})