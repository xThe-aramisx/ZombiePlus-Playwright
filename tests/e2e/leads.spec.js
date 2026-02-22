// @ts-check
// import { test, expect } from '@playwright/test';

const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');

const { LandingPage } = require('../pages/LandingPage')
const {Toast} = require('../pages/Components');
const { partialDeepStrictEqual } = require('node:assert');

let landingPage
let toast

test.beforeEach(async ({ page }) => {
  landingPage = new LandingPage(page)
  toast = new Toast(page)
})
test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.toContainText(message)
});
test('Nao deve cadastrar quando email ja existe', async ({ page, request }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

 const newLead = await request.post('http://localhost:3000/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })  
  expect(newLead.ok()).toBeTruthy()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
  await toast.containText(message)
});

test(' Nao deve cadastrar si tem  Lead com email ja cadastrado', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await landingPage.visit()
  await landingPage.openLeadModal()
  await landingPage.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await toast.containText(message)
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