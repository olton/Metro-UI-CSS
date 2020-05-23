const name = 'component_name';

describe("Metro 4 :: Tests", () => {
    it('Component ' + name, ()=>{
        cy.visit("cypress/"+name+".html");
    })
})