import { test, expect } from '@playwright/test'
import { LoginPage } from '../../page-objects/LoginPage'
import { HomePage } from '../../page-objects/HomePage'

test.describe('Login / Logout Flow', () => {
    let loginPage: LoginPage
    let homePage: HomePage

    // Before Hook
    test.beforeEach(async ({ page }) =>{
        loginPage = new LoginPage(page)
        homePage = new HomePage(page)
        await homePage.visit()
        // await page.goto('http://zero.webappsecurity.com/index.html')
    })

    // Negative Scenario
    test('Negative Scenario for login', async ({ page}) => {
        await homePage.clickOnSignIn()
        // await page.click('#signin_button')

        await loginPage.login('invalid username', 'invalid password')
        // await page.fill('#user_login', 'invalid username')
        // await page.fill('#user_password', 'invalid password')
        // await page.click('text=Sign in')
        
        await loginPage.assertErrorMessage()
        // const errorMessage = await page.locator('.alert-error')
        // await expect(errorMessage).toHaveText('Login and/or password are wrong.')
    })
    // Positive Scenario + Logout
    test('Positive Scenario Log in + Logout', async ({ page }) => {
        await homePage.clickOnSignIn()
        // await page.click('#signin_button')

        await loginPage.login('username', 'password')
        // await page.fill('#user_login', 'username')
        // await page.fill('#user_password', 'password')
        // await page.click('text=Sign in')

        // If we have SSL Certificate Error need add redirect to this link
        await page.goto('http://zero.webappsecurity.com/bank/transfer-funds.html')

        const accountSumaryTab = await page.locator('#account_summary_tab')
        await expect(accountSumaryTab).toBeVisible()

        await page.goto('http://zero.webappsecurity.com/logout.html')
        await expect(page).toHaveURL('http://zero.webappsecurity.com/index.html')
    })
})