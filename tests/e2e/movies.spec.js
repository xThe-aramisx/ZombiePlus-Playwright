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

test("Nao poder cadastrar quando o titulo ja existe", async ({
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

test("Deve poder remover um filme", async(page, request) => {
    const movie = data.to_remove
    await executeSQL(`DELETE FROM movies WHERE title = '${movie.title}'`) // limpeza do banco para evitar conflitos com testes anteriores
    await request.api.postMovie(movie)

    await page.login.do("admin@zombieplus.com", "pwd123", "Admin")
    await page.click('.remove-item')
    await page.click('.confirm-removal')



    await page.popup.haveText('O filme removido com sucesso.')


});
