const { test, expect } = require('@playwright/test');

const { LoginPage } = require('../pages/LoginPages');
const {Toast} = require('../pages/Components')
const { MoviePage } = require('../pages/MoviesPage');

let loginPage
let toast
let moviePage

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
    moviePage = new MoviePage(page)
})

test('deve logar como administrador', async ({ page }) => {
    await loginPage.visit() 
    await loginPage.submit('admin@zombieplus.com', 'pwd123')
    await moviePage.isLoggedIn()
})
test('nao deve logar com senha incorreta', async ({ page }) => {
    await loginPage.visit() 
    await loginPage.submit('admin@zombieplus.com', 'abc123')

   const message = "Oops!Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente."
   await toast.haveText(message)
})
test('nao deve logar com email é invalido', async ({ page }) => {
    await loginPage.visit() 
    await loginPage.submit('www.papito.com', 'abc123')

    await loginPage.alertHaveText('Email incorreto')
})
test('nao deve logar com email nao preenchido', async ({ page }) => {
    await loginPage.visit() 
    await loginPage.submit('', 'abc123')

    await loginPage.alertHaveText('Campo obrigatório')
})

test('nao deve logar com Senha nao preenchido', async ({ page }) => {
    await loginPage.visit() 
    await loginPage.submit('admin@zombieplus.com', '')

    await loginPage.alertHaveText('Campo obrigatório')
})
test('nao deve logar com nenhum campo nao preenchido', async ({ page }) => {
    await loginPage.visit() 
    await loginPage.submit('', '')

    await loginPage.alertHaveText(['Campo obrigatório', 'Campo obrigatório'])
})
