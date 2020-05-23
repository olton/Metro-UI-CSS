const name = 'app-bar';

describe("Metro 4 :: Tests", () => {
    it('Component ' + name, ()=>{
        cy.visit("cypress/"+name+".html");
    })
})