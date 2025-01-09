import { expect, Locator, Page } from "@playwright/test"

export class PaymentPage {
    readonly page: Page
    readonly payeeSelectbox: Locator
    readonly payeeDetailsButton: Locator
    readonly payeeDetails: Locator
    readonly accountSelectBox: Locator
    readonly accountInput: Locator
    readonly dateInput: Locator
    readonly descriptionInput: Locator
    readonly submitPaymentButton: Locator
    readonly message: Locator

    constructor(page: Page) {
        this.page = page
        this.payeeSelectbox = page.locator('#sp_payee')
        this.payeeDetailsButton = page.locator('#sp_get_payee_details')
        this.payeeDetails = page.locator('#sp_payee_details')
        this.accountSelectBox = page.locator('#sp_account')
        this.accountInput = page.locator('#sp_amount')
        this.dateInput = page.locator('#sp_date')
        this.descriptionInput = page.locator('#sp_description')
        this.submitPaymentButton = page.locator('#pay_saved_payees')
        this.message = page.locator('#alert_content > span')
    }

    async createPayment() {
        await this.payeeSelectbox.selectOption('apple')
        await this.payeeDetailsButton.click()
        await expect(this.payeeDetails).toBeVisible()
        await this.accountSelectBox.selectOption('6')
        await this.accountInput.fill('5000')
        await this.dateInput.fill('2024-02-07')
        await this.descriptionInput.fill('Some description')
        await this.submitPaymentButton.click()
    }

    async assertSuccessMessage() {
        await expect(this.message).toBeVisible()
        await expect(this.message).toContainText('The payment was successfully submitted.')
    }
}