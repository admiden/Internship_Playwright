import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage} from '../../page-objects/LoginPage'
import { PaymentPage } from '../../page-objects/PaymentPage'
import { Navbar } from '../../page-objects/components/Navbar'

test.describe('New paymant', () => {
    let homePage: HomePage
    let loginPage: LoginPage
    let paymentPage: PaymentPage
    let navbar: Navbar

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)
        paymentPage = new PaymentPage(page)
        navbar = new Navbar(page)

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

    test('Should sent new payment', async ({ page}) => {
        await navbar.cliclOnTab('Pay Bills')
        // await page.click('#pay_bills_tab')
        
        await paymentPage.createPayment()
        // await page.selectOption('#sp_payee', 'apple')
        // await page.click('#sp_get_payee_details')
        // await page.waitForSelector('#sp_payee_details')
        // await page.selectOption('#sp_account', '6')
        // await page.fill('#sp_amount', '5000')
        // await page.fill('#sp_date', '2024-02-07')
        // await page.fill('#sp_description', 'Some description')
        // await page.click('#pay_saved_payees')

        await paymentPage.assertSuccessMessage()
        // const message = await page.locator('#alert_content > span')
        // await expect(message).toContainText('The payment was successfully submitted.')
    })
})