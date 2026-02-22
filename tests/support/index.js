const {test: base} = require ('@playwright/test')

base.extend({
    play: async ({ page }, use) => {
        await use(page)    
    }
})

export {test}