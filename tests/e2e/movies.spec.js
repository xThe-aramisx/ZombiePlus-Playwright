const {test} = require('../support/') 

const data = require('../support/fixtures/movies.json')

const { executeSQL } = require('../support/database')

const { LoginPage } = require('../pages/LoginPages')
const {Toast} = require('../pages/Components')

const { MoviesPage } = require('../pages/MoviesPage')

let loginPage
let toast
let moviesPage

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    toast = new Toast(page)
    moviesPage = new MoviesPage(page)
})

test('deve poder cadastrar um novo filme', async ({ page, play }) => {
   // é importante estar logado 

   await play.goto('https://qaxperience.com')

//    const movie = data.create
   
//     await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`) // limpeza do banco para evitar conflitos com testes anteriores

//     await loginPage.visit() 
//     await loginPage.submit('admin@zombieplus.com', 'pwd123')
//     await moviesPage.isLoggedIn()

//     await moviesPage.create(movie.title, movie.overview, movie.company, movie.release_year)

//     await toast.containText('Cadastro realizado com sucesso!')

})

