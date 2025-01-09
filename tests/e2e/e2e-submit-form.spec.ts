import { test, expect } from '@playwright/test'
import { HomePage } from '../../page-objects/HomePage'
import { FeedbackPage } from '../../page-objects/FeedbackPage'

test.describe.parallel('Feedback form', () => {
    let homePage: HomePage
    let feedbackPage: FeedbackPage

    test.beforeEach( async ({ page }) => {
        homePage = new HomePage(page)
        feedbackPage = new FeedbackPage(page)
        await homePage.visit()
        await homePage.clickFeedbackButton()
        // await page.goto('http://zero.webappsecurity.com/index.html')
        // await page.click('#feedback')
    })

    // Reset feedback form
    test('Reset feedback form', async ({ page }) => {
        await feedbackPage.fillForm(
            'some name',
            'email@email.com',
            'subject',
            'some wondeful comment'
        )
        // await page.fill('#name', 'some name')
        // await page.fill('#email', 'some email@email.com')
        // await page.fill('#subject', 'some subject')
        // await page.fill('#comment', 'some comment')
        // await page.click('input[name="clear"]')

        await feedbackPage.resetForm()
        await feedbackPage.assertReset()
        // const nameInput = await page.locator('#name')
        // const commentIntup = await page.locator('#comment')

        // await expect(nameInput).toBeEmpty()
        // await expect(commentIntup).toBeEmpty()
    })

    // Submit feedback form
    test('Submit feedback form', async ({ page }) => {
        await feedbackPage.fillForm(
            'some name',
            'email@email.com',
            'subject',
            'some wondeful comment'
        )
        // await page.fill('#name', 'some name')
        // await page.fill('#email', 'some email@email.com')
        // await page.fill('#subject', 'some subject')
        // await page.fill('#comment', 'some comment')
        await feedbackPage.submitForm()
        // await page.click('input[name="submit"]')

        await feedbackPage.feeadbackFormSent()
        // await page.waitForSelector('#feedback-title')
    })
})