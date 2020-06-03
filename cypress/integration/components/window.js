const name = 'window';

describe("Metro 4 :: Window", () => {
    it('Component Initialization', ()=>{
        cy.visit("cypress/"+name+".html");
    })
})