const name = 'template';

describe("Metro 4 :: Template", () => {
    it('Component Initialization', ()=>{
        cy.visit("cypress/"+name+".html");
    })
})