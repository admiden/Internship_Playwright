import { test, expect, request} from '@playwright/test'

test.describe.parallel('API Testing', () => {
    const baseUrl = 'https://reqres.in'

    test('Simple API Test - Assert Response Status', async ({ request }) => {
        const response = await request.get(`${baseUrl}/api/users/2`)
        expect(response.status()).toBe(200)

        const responseBody = JSON.parse(await response.text())
        // console.log(responseBody)
    })

    test('Simple API Test - Assert Invalid Endpoint', async ({ request }) => {
        const response = await request.get(`${baseUrl}/api/users/non-existing-endpoint`)
        expect(response.status()).toBe(404)
    })

    test('GET Request - Get User Details', async ({ request }) => {
        const response = await request.get(`${baseUrl}/api/users/1`)
        const responseBody = JSON.parse(await response.text())

        // console.log(responseBody)
        expect(response.status()).toBe(200)
        expect(responseBody.data.id).toBe(1)
        expect(responseBody.data.first_name).toBe('George')
        expect(responseBody.data.last_name).toBe('Bluth')
        expect(responseBody.data.email).toBeTruthy()
    })

    test('POST Request - Create New User', async ({ request }) => {
        const response = await request.post(`${baseUrl}/api/users`, {
            data: {
                id: 1000,
                first_name: "Morpheus",
                job: "Leader"
            }
        })
        const responseBody = JSON.parse(await response.text())
        
        // console.log(responseBody)
        expect(response.status()).toBe(201)
        expect(responseBody.id).toBe(1000)
        expect(responseBody.createdAt).toBeTruthy()
    })

    test('POST Request - Login', async ({ request }) => {
        const response = await request.post(`${baseUrl}/api/login`,{
            data:{
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            }
        })
        const responseBody = JSON.parse(await response.text())

        // console.log(responseBody)
        expect(response.status()).toBe(200)
        expect(responseBody.token).toBeTruthy()
    })
    
    test('POST Request -Login Fail', async ({ request }) => {
        const response = await request.post(`${baseUrl}/api/login`,{
            data:{
                email: "eve.holt@reqres.in"
            }
        })
        const responseBody = JSON.parse(await response.text())

        // console.log(responseBody)
        expect(response.status()).toBe(400)
        expect(responseBody.error).toBe('Missing password')
    })

    test('PUT Request - Update User', async ({ request }) => {
        const response = await request.put(`${baseUrl}/api/users/2`, {
            data: {
                name: 'New Name',
                job: 'Some New Job'
            }
        })
        const responseBody = JSON.parse(await response.text())

        // console.log(responseBody)
        expect(response.status()).toBe(200)
        expect(responseBody.name).toBe('New Name')
        expect(responseBody.job).toBe('Some New Job')
        expect(responseBody.updatedAt).toBeTruthy()       
    })

    test('DELETE Request - Delete User', async ({ request }) => {
        const response = await request.delete(`${baseUrl}/api/users/2`)

        expect(response.status()).toBe(204)
    })

    test('Get User List expected total users to be 12', async ({ request }) => {
        const response = await request.get(`${baseUrl}/api/users?page=2`)

        expect(response.status()).toBe(200)
        const responseBody = JSON.parse(await response.text())
        // console.log(responseBody)
        expect(responseBody.page).toBe(2)
        expect(responseBody.per_page).toBe(6)
        expect(responseBody.total).toBe(12)
        expect(responseBody.total_pages).toBe(2)
    })
})