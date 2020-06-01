const name = 'gravatar';

describe("Metro 4 :: Gravatar", () => {
    it('Component Initialization', ()=>{
        cy.visit("cypress/"+name+".html");
    })
})