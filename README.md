Make for study and training purposes. Automation project for an application called Zombie Plus, used playwritgh

🧟 ZombiePlus – Projeto de Testes Automatizados com Playwright

Este repositório contém a suíte de testes automatizados End-to-End (E2E) desenvolvida com Playwright para validar as principais funcionalidades da aplicação ZombiePlus.

⚠️ Importante:
Este projeto contém apenas os testes automatizados.
A aplicação ZombiePlus (API + Web) não está inclusa neste repositório.

📌 Sobre o Projeto

O objetivo deste projeto é validar os fluxos críticos da aplicação ZombiePlus, garantindo qualidade, estabilidade e confiabilidade das seguintes funcionalidades:

✅ Login de usuários

🎬 Cadastro de filmes

📋 Cadastro de Leads

🔐 Validações de autenticação

📄 Interações com telas do sistema

A aplicação testada é composta por:

API (não incluída no repositório)

Frontend Web (não incluído no repositório)

Banco de dados PostgreSQL

Interface Web do PostgreSQL (ex: Admin UI)

Banco e interface configurados via Docker

🧪 Tecnologias Utilizadas

Playwright

Node.js

Docker

PostgreSQL

PostgreSQL Web Admin (ex: pgAdmin)

🏗️ Arquitetura do Ambiente de Teste

Este projeto de testes depende de:

ZombiePlus API  →  Banco PostgreSQL (Docker)
ZombiePlus Web  →  Consome API
Playwright      →  Executa testes E2E na Web

O banco de dados e sua interface web são executados via containers Docker.

🐳 Subindo o Banco com Docker

Certifique-se de que o Docker está instalado.

Exemplo básico de subida do PostgreSQL via Docker:

docker-compose up -d

Ou, caso utilize apenas container direto:

docker run --name zombieplus-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=zombieplus \
  -p 5432:5432 \
  -d postgres
🚀 Instalação do Projeto de Testes
1️⃣ Instalar dependências
npm install
2️⃣ Instalar browsers do Playwright
npx playwright install
▶️ Executando os Testes
Executar todos os testes
npx playwright test
Executar em modo headed (visual)
npx playwright test --headed
Executar com interface UI
npx playwright test --ui
🧪 Cenários Automatizados
🔐 Login

Login com credenciais válidas

Login com credenciais inválidas

Validação de mensagens de erro

Validação de redirecionamento

🎬 Cadastro de Filmes

Cadastro de novo filme

Validação de campos obrigatórios

Validação de persistência no sistema

Verificação de listagem após cadastro

📋 Cadastro de Leads

Cadastro de lead válido

Validação de dados obrigatórios

Fluxo completo via interface web

📁 Estrutura Sugerida do Projeto
tests/
 ├── login.spec.ts
 ├── filmes.spec.ts
 ├── leads.spec.ts

pages/
 ├── login.page.ts
 ├── filmes.page.ts
 ├── leads.page.ts

fixtures/
 ├── users.json
 ├── movies.json
 ├── leads.json
⚙️ Configurações

As configurações do Playwright estão definidas em:

playwright.config.ts

Você pode configurar:

Base URL da aplicação

Tempo de timeout

Execução paralela

Relatórios

Screenshots e vídeos

📊 Relatórios

Após execução dos testes:

npx playwright show-report

O relatório exibirá:

Testes executados

Status (Pass/Fail)

Tempo de execução

Screenshots de falhas

Vídeos (se configurado)

🎯 Objetivo do Projeto

Este projeto foi criado com foco em:

Garantir qualidade da aplicação ZombiePlus

Automatizar regressões

Validar fluxos críticos

Servir como base para expansão futura de testes

Aplicar boas práticas com Playwright (Page Object Model)

📌 Observações Importantes

A aplicação ZombiePlus (API + Web) deve estar rodando antes da execução dos testes.

O banco PostgreSQL deve estar ativo.

As credenciais utilizadas nos testes devem existir no ambiente.

O projeto pode ser facilmente adaptado para rodar em CI/CD (GitHub Actions, GitLab CI, etc).

👨‍💻 Autor

Projeto de automação desenvolvido para fins de testes e validação da aplicação ZombiePlus.
