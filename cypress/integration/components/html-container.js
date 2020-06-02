const name = 'html-container';

describe("Metro 4 :: Html container", () => {
    it('Component Initialization', ()=>{
        cy.visit("cypress/"+name+".html");
    })
})