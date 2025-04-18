import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe('Currency exchange form', () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
        await loginPage.login('username', 'password')

        // await page.goto('http://zero.webappsecurity.com/index.html')
        // await page.click('#signin_button')
        // await page.fill('#user_login', 'username')
        // await page.fill('#user_password', 'password')
        // await page.click('text=Sign in')


        // If we have SSL Certificate Error need add redirect to this link
        await loginPage.sslError()
        // await page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    })
    
    test('Should make currency exchange', async ({ page }) => {
        await page.click('#pay_bills_tab')

        await page.click('text=Purchase Foreign Currency')
        await page.selectOption('#pc_currency', 'EUR')
        const rate = await page.locator('#sp_sell_rate')
        await expect(rate).toContainText('1 euro (EUR)')

        await page.fill('#pc_amount', '1000')
        await page.click('#pc_inDollars_true')
        await page.click('#pc_calculate_costs')
        const conversionAmount = await page.locator('#pc_conversion_amount')
        await expect(conversionAmount).toContainText('1000.00 U.S. dollar (USD)')

        await page.click('#purchase_cash')
        
        const message = await page.locator('#alert_container')
        await expect(message).toBeVisible()
        await expect(message).toContainText('Foreign currency cash was successfully purchased.')
    })
})