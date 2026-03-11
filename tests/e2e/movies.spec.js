const { test, expect } = require("../support");
const { Api } = require("../support/api");

const data = require("../support/fixtures/movies.json");
const { executeSQL } = require("../support/database");

test("Deve poder cadastrar um novo filme", async ({ page }) => {
  const movie = data.create;
  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`); // limpeza do banco para evitar conflitos com testes anteriores

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");

  await page.movies.create(movie);
  await page.popup.haveText(
    `O filme '${movie.title}' foi adicionado ao catálogo.`,
  );
});

test("Nao poder cadastrar quando o titulo é duplicado", async ({
  page,
  request,
}) => {
  const movie = data.duplicate;
  await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`); // limpeza do banco para evitar conflitos com testes anteriores

  await request.api.postMovie(movie);

  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
  await page.movies.create(movie);
  await page.popup.haveText(
    `O título '${movie.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`,
  );
});

test("Deve validar campos obrigatórios", async ({ page }) => {
  await page.login.do("admin@zombieplus.com", "pwd123", "Admin");

  await page.movies.goForm();
  await page.movies.submit();
  await page.movies.alertHaveText([
    "Campo obrigatório",
    "Campo obrigatório",
    "Campo obrigatório",
    "Campo obrigatório",
  ])
});

test("Deve poder remover um filme", async({page, request}) => {
    const movie = data.to_remove
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`) // limpeza do banco para evitar conflitos com testes anteriores
    await request.api.postMovie(movie)

    await page.login.do("admin@zombieplus.com", "pwd123", "Admin")
    await page.movies.remove(movie.title)
    await page.popup.haveText('Filme removido com sucesso.')
});
test('Deve pesquisar os filmes por zombie', async ({page, request})=> {
    const movies = data.search

    movies.data.forEach(async (m) => {
        await request.api.postMovie(m)
    })
    await page.login.do("admin@zombieplus.com", "pwd123", "Admin");
})
