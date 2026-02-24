const {test: base, expect} = require ('@playwright/test')

const { LandingPage } = require('../actions/Leads')
const { LoginPage } = require('../actions/Login')
const { MoviesPage } = require('../actions/Movies')
const {Toast} = require('../actions/Components')

const test = base.extend({
    page: async ({ page }, use) => {
        
           const context = page

           context['leads'] = new Leads(page)
           context['login'] = new Login(page)
           context['toast'] = new Toast(page)
           context['movies'] = new Movies(page)

        await use(context)    
    }
})

export {test, expect}