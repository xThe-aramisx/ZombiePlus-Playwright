const { test, expect } = require('../support');
const { faker } = require('@faker-js/faker');

test('deve cadastrar um lead na fila de espera', async ({ page }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
  await page.popup.haveText(message)
});
test('Nao deve cadastrar quando email ja existe', async ({ page, request }) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

 const newLead = await request.post('http://localhost:3333/leads', {
    data: {
      name: leadName,
      email: leadEmail
    }
  })  
  expect(newLead.ok()).toBeTruthy()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)

  const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
  await page.popup.haveText(message)
});

test('nao deve cadastrar com email incorreto', async ({ page }) => {
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Aramis Morales', 'aramis.com.br')

  await page.leads.alertHaveText('Email incorreto')
});

test('nao deve cadastrar com quando o nome nao é preechido ', async ({ page }) => {
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', 'aramis@gmail.com')

  await page.leads.alertHaveText('Campo obrigatório')
});
test('nao deve cadastrar com quando email nao é preechido ', async ({ page }) => {
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Aramis Morales', '')

  await page.leads.alertHaveText('Campo obrigatório')
});

test('nao deve cadastrar com quando nehhum campo é preechido ', async ({ page }) => {
  
  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', '')

    await page.leads.alertHaveText([
      'Campo obrigatório',
      'Campo obrigatório'
      ])
});