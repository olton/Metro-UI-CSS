const name = 'adblock';

describe("Metro 4 :: Adblock", () => {
    it('Component Initialization', ()=>{
        cy.visit("cypress/"+name+".html");
    })
})