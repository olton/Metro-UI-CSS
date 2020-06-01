const name = 'file';

describe("Metro 4 :: File input", () => {
    it('Component Initialization', ()=>{
        cy.visit("cypress/"+name+".html");
    })
})