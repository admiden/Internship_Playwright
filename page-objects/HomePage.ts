import { expect, Locator, Page } from "@playwright/test"

export class HomePage {
    readonly page: Page
    readonly signInButton: Locator
    readonly searchBox: Locator
    readonly linkFeedback: Locator

    constructor(page: Page) {
        this.page = page
        this.signInButton = page.locator('#signin_button')
        this.searchBox = page.locator('#searchTerm')
        this.linkFeedback = page.locator('#feedback')
    }

    async visit() {
        await this.page.goto('http://zero.webappsecurity.com/index.html')
    }

    async clickFeedbackButton() {
        await this.linkFeedback.click()
    }

    async clickOnSignIn() {
        await this.signInButton.click()
    }

    async searchFor(prase: string) {
        await this.searchBox.fill(prase)
        await this.page.keyboard.press('Enter')
    }
}