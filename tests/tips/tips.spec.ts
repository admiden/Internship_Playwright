import { test, expect, devices } from '@playwright/test'

// This is import of function that generate random numbers
import { getRandomNumbe, getRandomString } from '../../utils/data-helpers'

test.describe.only('Tips & Trcks Section', () => {
    test.only('TestInfo Objects', async ({ page }, testInfo)  => {
        await page.goto('https://www.example.com')
        // console.log(testInfo.expectedStatus)

        // This is call of function that generate random numbers and string
        let newNumber = await getRandomNumbe()
        let newString = await getRandomString()

        // print rungom numbers and string
        console.log(newNumber)
        console.log(newString)
    })

    // Skiping the test if it not ready for some browser
    test('Test Skip Browser', async ({page, browserName}) => {
        test.skip(browserName === 'chromium', 'Feature is not ready in Vhrome browser')
        await page.goto('https://www.example.com')
    })

    // If test has some problem and needs for fix
    test('Test Fixme Annotation', async ({page, browserName}) => {
        test.fixme(browserName === 'chromium', 'Test is not stable, needs revision')
        await page.goto('https://www.example.com')
    })

    const people = ['Mike', 'Judi', 'Peter', 'Elon', 'Alice']
    for (const name of people) {
        test(`Running the test for ${name}`, async ({ page }) => {
            await page.goto('http://zero.webappsecurity.com/index.html')
            await page.fill('#searchTerm', `${name}`)
            await page.waitForTimeout(3000)
        })
    }

    test('Mouse Movement Simuliation', async ({ page }) => {
        await page.goto('https://www.example.com')
        await page.mouse.move(0, 0)
        await page.mouse.down()
        await page.mouse.move(0, 100)
        await page.mouse.up()
    })

    // Work only with Chromium browser
    test('Multiple Browset Tabs inside 1 browser', async ({ browser }) => {
        const context = await browser.newContext()
        const page1 = await context.newPage()
        const page2 = await context.newPage()
        const page3 = await context.newPage()

        await page1.goto('https://www.example.com')
        await page2.goto('https://www.example.com')
        await page3.goto('https://www.example.com')

        await page1.waitForTimeout(5000)
    })
})