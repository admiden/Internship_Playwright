import { Page, Locator, expect} from '@playwright/test'
import { AbstractPage } from './AbstractPage'

export class LoginPage {
    // Define selectors
    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly submitButton: Locator
    readonly errorMessage: Locator
    readonly loginForm: Locator

    // Init selectors using constructor
    constructor(page: Page) {
        // super(page)  // this brouk test if is sscl certeficats problem
        this.page =page
        this.usernameInput = page.locator('#user_login')
        this.passwordInput = page.locator('#user_password')
        this.submitButton = page.locator('text=Sign in')
        this.errorMessage = page.locator('.alert-error')
        this.loginForm = page.locator('#login_form')
    }
    // Define Login page
    
    // Visit function was moved to HomePage.ts file
    // async visit() {
    //     await this.page.goto('http://zero.webappsecurity.com/index.html')
    // }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.submitButton.click()
    }

    // If we have SSL Certificate Error need add redirect to this link
    async sslError() {
        await this.page.goto('http://zero.webappsecurity.com/bank/account-summary.html')
    }

    async assertErrorMessage() {
        await expect(this.errorMessage).toContainText(
            'Login and/or password are wrong.'
        )
    }

    async snapshopLoginForm() {
        expect(await this.loginForm.screenshot()).toMatchSnapshot('login-form.png')
    }

    async snapshotErrorMessage() {
        expect(await this.loginForm.screenshot()).toMatchSnapshot('login-error.png')
    }
}