const { expect } = require ('@playwright/test')

    export class Api {
    constructor(request) {
        this.request = request
        this.token = undefined
    }

    async setToken() {
        const response = await this.request.post('http://localhost:3333/sessions', {
                data: {
                    email: 'admin@zombieplus.com',
                    password: 'pwd123',
                }
            })
        
            expect(response.ok()).toBeTruthy()
            //console.log(await response.text())
            const body = JSON.parse(await response.text())
            this.token = 'Bearer ' + body.token
            console.log(this.token)
    }
    async getCompanyIdByName(companyName) {
            const response = await this.request.get('http://localhost:3333/companies', {
                    headers: {
                        Authorization: this.token
                    },
                    
                    params: {
                        name: companyName
                    }
                })

                expect(response.ok()).toBeTruthy()
                const body = JSON.parse(await response.text()) // response vem como text, e é formatado para json, para acessar os campos, almacendo na variavel body
                return body.data[0].id  // body ja formatdo como json, pega o campo data e retorna o id da empresa encontrada

        }
    async postMovie(movie) {

        const companyId = await this.getCompanyIdByName(movie.company)

        const response = await this.request.post('http://localhost:3333/movies', {
                headers: {
                   Authorization: this.token, 
                   ContentType: 'multipart/form-data',
                   Accept:'application/json, text/plain, */*', //application/json, text/plain, */*
                },
                multipart: {
                    title: movie.title,
                    overview: movie.overview,
                    company_id: companyId,
                    release_year: movie.release_year,
                    featured: movie.featured
                }
            })
            expect(response.ok()).toBeTruthy()
    }

 }

