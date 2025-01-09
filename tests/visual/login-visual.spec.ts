import { test } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { LoginPage } from '../../page-objects/LoginPage'

test.describe.parallel.only('Login page Visual Test', () => {
    let homePage: HomePage
    let loginPage: LoginPage

    test.beforeEach(async ({page}) => {
        homePage = new HomePage(page)
        loginPage = new LoginPage(page)

        await homePage.visit()
        await homePage.clickOnSignIn()
    })

    test('Snapshot Login Form', async ({page}) => {
        await loginPage.snapshopLoginForm()
    })

    test('Snapshot Login Form Error Message', async ({page}) => {
        await loginPage.login('some', 'somepassword')
        await loginPage.snapshotErrorMessage()  
    })
})
