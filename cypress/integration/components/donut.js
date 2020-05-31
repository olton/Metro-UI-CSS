const name = 'donut';

describe("Metro 4 :: Donut", () => {
    it('Component Initialization', ()=>{
        cy.visit("cypress/"+name+".html");
    })
})