const name = 'activity';

describe("Metro 4 :: Test component", () => {
    it('Component ' + name, ()=>{
        cy.visit("cypress/"+name+".html");
    })
})