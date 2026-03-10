const {test , expect} = require('../support') 
const { Api } = require('../support/api')

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

test('Deve poder cadastrar um novo filme', async ({ page }) => {
    const movie = data.create
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`) // limpeza do banco para evitar conflitos com testes anteriores
 
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

    await page.movies.create(movie)
    await page.toast.containText('Cadastro realizado com sucesso!')
})

test('Nao poder cadastrar quando o titulo ja existe', async ({ page, request }) => {
    const movie = data.duplicate
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`) // limpeza do banco para evitar conflitos com testes anteriores

    await request.api.postMovie(movie)
    
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.movies.create(movie)
    await page.toast.containText("Oops!Este conteúdo já encontra-se cadastrado no catálogo")

})

test('Deve validar campos obrigatórios', async ({ page }) => {
 
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')

     await page.movies.goForm()
     await page.movies.submit()
     await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])
})