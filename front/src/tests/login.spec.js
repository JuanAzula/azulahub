// import { test, expect } from '@playwright/test';
// import { config } from 'dotenv'
// config()

// test('Login', async ({ page }) => {
//     await page.goto(`${process.env.FRONT_URL}`)
//     await page.getByPlaceholder('email or username').fill(`${process.env.USERNAME}`)
//     await page.getByPlaceholder('password').fill(`${process.env.USER_PASSWORD}`)
//     await page.getByRole('button', { name: 'Login' }).click()
//     await page.waitForSelector('.text-red-500', { timeout: 5000 })
//     await page.screenshot({ path: 'login.png' })
// })