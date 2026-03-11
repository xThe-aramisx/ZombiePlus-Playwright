const { test, expect } = require('../support');
const env = require('../../playwright.env.json');

test('deve logar como administrador', async ({ page }) => {
    await page.login.visit()
    await page.login.submit(env.user_name, env.password)
    await page.login.isLoggedIn('Admin')
})
test('nao deve logar com senha incorreta', async ({ page }) => {
    await page.login.visit() 
    await page.login.submit('admin@zombieplus.com', 'abc123')

   const message = "Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
   await page.popup.haveText(message)
})
test('nao deve logar com email é invalido', async ({ page }) => {
    await page.login.visit() 
    await page.login.submit('www.papito.com', 'abc123')

    await page.login.alertHaveText('Email incorreto')
})
test('nao deve logar com email nao preenchido', async ({ page }) => {
    await page.login.visit() 
    await page.login.submit('', 'abc123')

    await page.login.alertHaveText('Campo obrigatório')
})

test('nao deve logar com Senha nao preenchido', async ({ page }) => {
    await page.login.visit() 
    await page.login.submit('admin@zombieplus.com', '')

    await page.login.alertHaveText('Campo obrigatório')
})
test('nao deve logar com nenhum campo nao preenchido', async ({ page }) => {
    await page.login.visit() 
    await page.login.submit('', '')

    await page.login.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})
