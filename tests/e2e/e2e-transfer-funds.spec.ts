import {test, expect} from "@playwright/test"
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage} from '../../page-objects/LoginPage'

test.describe.parallel('Transfer Funds and Make Payments', () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
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

    test('Transfer funds', async ({ page }) => {
        await page.click('#transfer_funds_tab')
        await page.selectOption('#tf_fromAccountId', '2')
        await page.selectOption('#tf_toAccountId', '3')
        await page.fill('#tf_amount', '500')
        await page.fill('#tf_description', 'Text message')
        await page.click('#btn_submit')

        const boardHeader = await page.locator('h2.board-header')
        await expect(boardHeader).toContainText('Transfer Money & Make Payments - Verify')

        await page.click('#btn_submit')

        const message = await page.locator('.alert-success')
        await expect(message).toContainText('You successfully submitted your transaction.')
    })
})