import { test, expect } from '@playwright/test'

import { loadHomePage, assertTitle } from '../helpers'

test('Simple basic test', async ({ page }) => {
    await page.goto('https://www.example.com')
    const pageTitle = await page.locator('h1')
    await expect(pageTitle).toContainText('Example Domain')
})

test('Click on the element @myTag', async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html')
    await page.click('#signin_button')
    await page.click('text=Sign in')

    const errorMessage = await page.locator('.alert-error')
    await expect(errorMessage).toContainText('Login and/or password are wrong.')
})

// If you need run tests as test suite add describe after test
test.describe('My first test sute', () => {  
    test('Working with Inputs', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.fill('#user_login', 'some username')
        await page.fill('#user_password', 'some password')
        await page.click('text=Sign in')
    
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })
    
    test('Assertions', async ({ page }) => {
        await page.goto('https://www.example.com/')
        // if you need to check the redirect on the page
        await expect(page).toHaveURL('https://www.example.com/') 
        // if you need to check the title of the page
        await expect(page).toHaveTitle('Example Domain')
    
        const element = await page.locator('h1')
        // if you need to check if the h1 is visible
        await expect(element).toBeVisible()
        // if you need to check if the h1 containe text
        await expect(element).toHaveText('Example Domain')
        // if you need to check how much elements on the page
        await expect(element).toHaveCount(1)
    
        // if the element is not in the code
        const nonExistingElement = await page.locator('h5')
        await expect(nonExistingElement).not.toBeVisible()
    })
    
    // if you need to skip the test need mark it like skip
    test.skip('Skipping the test: Working with Inputs', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.fill('#user_login', 'some username')
        await page.fill('#user_password', 'some password')
        await page.click('text=Sign in')
    
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })
    
    // if you need to run oly one test need mark it like only
    test('Only the test: Working with Inputs', async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html')
        await page.click('#signin_button')
        await page.fill('#user_login', 'some username')
        await page.fill('#user_password', 'some password')
        await page.click('text=Sign in')
    
        const errorMessage = await page.locator('.alert-error')
        await expect(errorMessage).toContainText('Login and/or password are wrong.')
    })
})

test.describe.parallel.only('Hooks', () => {
    test.beforeEach('', async ({ page }) => {
        // this will be direct to page each time before test
        await page.goto('https://www.example.com/') 
    })

    test('Screenshots', async ({ page }) => {
        // 1. load webside
        // await page.goto('https://www.example.com/')
        // 2. take screenshot of full page
        await page.screenshot({ path: './scren_report/screenshot.png', fullPage:true })
    })
    
    test('Single element of Screenshot', async ({ page }) => {
        // 1. load webside
        // await page.goto('https://www.example.com/')
        const single_element = await page.$('h1')
        await single_element?.screenshot({path: './scren_report/single_element_screenshot.png'})
    })
})

test('Custom Helpers', async ({ page }) => {
    await loadHomePage(page)
    // await page.pause()
    await assertTitle(page)
})