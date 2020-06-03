const name = 'vegas';

describe("Metro 4 :: Vegas", () => {
    it('Component Initialization', ()=>{
        cy.visit("cypress/"+name+".html");
    })
})