const { test, expect } = require('@playwright/test')

const { LoginPage } = require('../pages/LoginPages')

let loginPage

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
})

test('deve logar como administrador', async ({ page }) => {

    await loginPage.visit() 



})
