Make for study and training purposes. Automation project for an application called Zombie Plus, used playwritgh

# 🧟 ZombiePlus – Testes Automatizados com Playwright

Repositório contendo a suíte de **testes automatizados E2E** desenvolvida com **Playwright** para validar os fluxos principais da aplicação **ZombiePlus**.

> ⚠️ **Importante**
>
> Este repositório contém **apenas os testes automatizados**.
> A aplicação **ZombiePlus (API + Web)** não está inclusa no projeto.

---

## 📌 Sobre o Projeto

Este projeto foi criado para validar os principais fluxos da aplicação **ZombiePlus**, garantindo qualidade e confiabilidade através de testes automatizados.

### Funcionalidades testadas

* 🔐 Login de usuários
* 🎬 Cadastro de filmes
* 📋 Cadastro de Leads
* ✅ Validações de campos obrigatórios
* 🚫 Validações de erros
* 🔄 Fluxos completos via interface web

---

## 🏗️ Arquitetura do Ambiente

Os testes dependem da aplicação **ZombiePlus**, que é composta por:

* API (não inclusa neste repositório)
* Aplicação Web (não inclusa)
* Banco de dados **PostgreSQL**
* Interface Web do PostgreSQL
* Banco e interface executando via **Docker**

Fluxo:

```
Playwright → Web ZombiePlus → API ZombiePlus → PostgreSQL (Docker)
```

---

## 🧰 Tecnologias Utilizadas

* [Playwright](https://playwright.dev/)
* Node.js
* Docker
* PostgreSQL

---

## 📁 Estrutura do Projeto

```bash
.
├── tests/
│   ├── login.spec.ts
│   ├── filmes.spec.ts
│   └── leads.spec.ts
│
├── pages/
│   ├── login.page.ts
│   ├── filmes.page.ts
│   └── leads.page.ts
│
├── fixtures/
│   ├── users.json
│   ├── movies.json
│   └── leads.json
│
├── playwright.config.ts
├── package.json
└── README.md
```

Projeto estruturado utilizando **Page Object Model (POM)**.

---

## 🐳 Banco de Dados com Docker

Exemplo básico para subir PostgreSQL:

```bash
docker run --name zombieplus-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=zombieplus \
  -p 5432:5432 \
  -d postgres
```

Ou utilizando `docker-compose`:

```bash
docker-compose up -d
```

---

## 🚀 Instalação

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/seu-usuario/zombieplus-tests.git
cd zombieplus-tests
```

## 📊 Relatórios

Após execução:

```bash
npx playwright show-report
```

O relatório HTML exibirá:

* Status dos testes
* Screenshots em caso de falha
* Vídeos (se configurado)
* Tempo de execução

---

## ⚙️ Configuração

As configurações principais estão no arquivo:

```
playwright.config.ts
```

Nele você pode configurar:

* `baseURL`
* Timeout
* Execução paralela
* Captura de screenshots
* Gravação de vídeo
* Retries

---

## 🧪 Cenários Automatizados

### 🔐 Login

* Login com sucesso
* Login inválido
* Validação de mensagens de erro
* Redirecionamento após autenticação

### 🎬 Cadastro de Filmes

* Cadastro com dados válidos
* Validação de campos obrigatórios
* Persistência na listagem

### 📋 Cadastro de Leads

* Criação de novo Lead
* Validações obrigatórias
* Fluxo completo via UI

---

## 🔄 Integração Contínua (Sugestão)

Este projeto pode ser facilmente integrado com:

* GitHub Actions
* GitLab CI
* Azure DevOps
* Jenkins

Exemplo de execução em pipeline:

```bash
npm ci
npx playwright install --with-deps
npx playwright test
```

---

## 🎯 Objetivo

* Garantir qualidade da aplicação ZombiePlus
* Automatizar regressões
* Validar fluxos críticos
* Demonstrar boas práticas com Playwright
* Servir como base para evolução de testes automatizados

---

## 👨‍💻 Autor

Projeto desenvolvido para fins de validação e automação da aplicação **ZombiePlus**.

---

