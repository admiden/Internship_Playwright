import {test, expect} from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'

test.describe.only('Open online bsnling page', () => {
    let homePage: HomePage

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page)

        await homePage.visit()
    })

    test('Should open online banking page', async ({ page }) => {
        await page.click('#onlineBankingMenu')

        const online_banking_page = await page.locator('div .span12 .container h1')

        await page.waitForSelector('#account_activity_link')
        if ( await online_banking_page.count() > 0 ) {
            console.log('Online Banking text exist')
            await page.click('#account_activity_link')

            const login_form = await page.locator('#login_form')

            if (await login_form.count() > 0) {
                console.log('Login for is displayed')
                await page.fill('#user_login', 'username')
                await page.fill('#user_password', 'password')
                await page.click('text=Sign in')

                // If we have SSL Certificate Error need add redirect to this link
                await page.goto('http://zero.webappsecurity.com/bank/account-activity.html')

                const main_text = await page.locator('.board-header')

                if (await main_text.count() > 0) {
                    console.log('Successfully logged in')
                    await expect(main_text).toHaveText('Show Transactions')
                    await expect(page).toHaveURL('http://zero.webappsecurity.com/bank/account-activity.html')
                }
            }
            else {
                console.log('Login for is not displayed')
            }
        }
        else {
            console.log('Online Banking text is not exist')
        }

        
    })
})