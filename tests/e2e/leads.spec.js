// @ts-check
// import { test, expect } from '@playwright/test';

const { test, expect } = require('@playwright/test');

const { LandingPage } = require('../pages/LandingPage')
const {Toast} = require('../pages/Components')

let landingPage
let toast

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page)
})

test('deve cadastrar um lead na fila de espera', async ({ page }) => {
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Aramis Morales', 'aramis@gmail.com')

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.haveText(message)
});

test('nao deve cadastrar com email incorreto', async ({ page }) => {
  
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Aramis Morales', 'aramis.com.br')

  await landingPage.alertHaveText('Email incorreto')
});

test('nao deve cadastrar com quando o nome nao é preechido ', async ({ page }) => {
  
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', 'aramis@gmail.com')

  await landingPage.alertHaveText('Campo obrigatório')
});
test('nao deve cadastrar com quando email nao é preechido ', async ({ page }) => {
  
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('Aramis Morales', '')

    await landingPage.alertHaveText('Campo obrigatório')
});

test('nao deve cadastrar com quando nehhum campo é preechido ', async ({ page }) => {
  
  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm('', '')

    await landingPage.alertHaveText([
      'Campo obrigatório',
      'Campo obrigatório'
      ])
});