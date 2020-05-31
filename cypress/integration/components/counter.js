const name = 'counter';

describe("Metro 4 :: Counter", () => {
    it('Component Initialization', ()=>{
        cy.visit("cypress/"+name+".html");
    })
})