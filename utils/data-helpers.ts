const crypto = require('crypto')

// This function generate random nembers
export async function getRandomNumbe() {
    return Math.floor(Math.random() * 10000 + 1)
}

export async function getRandomString() {
    return crypto.randomBytes(20).toString('hex')
}