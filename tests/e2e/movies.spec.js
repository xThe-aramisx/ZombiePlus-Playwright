const {test} = require('../support') 

const data = require('../support/fixtures/movies.json')
const { executeSQL } = require('../support/database')


test('eve poder cadastrar um novo filme', async ({ page }) => {
   // é importante estar logado 
   const movie = data.create
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`) // limpeza do banco para evitar conflitos com testes anteriores

    await page.login.visit() 
    await page.login.submit('admin@zombieplus.com', 'pwd123')
    await page.movies.isLoggedIn()

    await page.movies.create(movie.title, movie.overview, movie.company, movie.release_year)
    await page.toast.containText('Cadastro realizado com sucesso!')

})

