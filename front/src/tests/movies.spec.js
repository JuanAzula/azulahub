import { test, expect } from '@playwright/test'
import { config } from 'dotenv'
config()

test.beforeEach(async ({ page }) => {
    await page.goto(`${process.env.FRONT_URL}`)
    await page.getByPlaceholder('email or username').fill(`${process.env.USERNAME}`)
    await page.getByPlaceholder('password').fill(`${process.env.USER_PASSWORD}`)
    await page.getByRole('button', { name: 'Login' }).click()
    await page.waitForSelector('.text-red-500', { timeout: 5000 })
})

test('create movie', async ({ page }) => {
    await page.getByPlaceholder('Title').fill('Pulp Fiction')
    await page.getByPlaceholder('Description').fill('Pulp Fiction is a 1994 American black-and-white crime film written and directed by Quentin Tarantino and starring John Travolta and Samuel L. Jackson.')
    await page.getByPlaceholder('Year').fill('1994')
    await page.getByPlaceholder('Genre').fill('action')
    await page.getByPlaceholder('Score').fill('8.9')
    const fileInput = await page.getByTestId('file-input');
    await fileInput.setInputFiles(['pulp-fiction.webp']);

    const selectedFile = await fileInput.inputValue();
    if (selectedFile === 'pulp-fiction.webp') {
        console.log('Selected file:', selectedFile);
    } else {
        console.log('No selected file', selectedFile);
    }
    await page.getByTestId('upload-button').click()
    await page.getByRole('button', { name: 'Add' }).click()
})
test('update movie', async ({ page }) => {

    await page.getByTestId('editPulp Fiction').click()
    await page.getByPlaceholder('Title').fill('Pulp Fiction 2')
    await page.getByPlaceholder('Year').fill('1998')
    await page.getByPlaceholder('Score').fill('6.9')
    await page.getByRole('button', { name: 'Add' }).click()

})
test('delete movie', async ({ page }) => {
    // await page.waitForTimeout(4000)
    await page.getByTestId('deletePulp Fiction 2').click()
})