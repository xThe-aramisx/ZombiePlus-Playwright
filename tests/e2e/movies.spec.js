const {test} = require('../support') 

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')

test('eve poder cadastrar um novo filme', async ({ page }) => {
    const movie = data.create
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`) // limpeza do banco para evitar conflitos com testes anteriores
 
    await page.login.do('admin@zombieplus.com', 'abc123')

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)
    await page.toast.containText('Cadastro realizado com sucesso!')
})

test('deve poder cadastrar um novo filme', async ({ page }) => {
 
    await page.login.do('admin@zombieplus.com', 'abc123')

     await page.movies.goForm()
     await page.movies.submit()
     await page.movies.alertHaveText([
        'Por favor, informe o título.',
        'Por favor, informe a sinopse.',
        'Por favor, informe a empresa distribuidora.',
        'Por favor, informe o ano de lançamento.'
    ])
})