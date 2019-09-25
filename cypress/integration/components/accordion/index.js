describe("Metro 4 :: Accordion test", ()=>{
    it("Clear Metro 4", ()=>{
        cy.visit("/cypress/components/accordion/index.html")

        cy.get('#frame11 > .heading').click();
        cy.get('#frame11 > .content').should('be.visible');
        cy.get('#frame12 > .content').should('not.be.visible');
        cy.get('#frame13 > .content').should('not.be.visible');

        cy.get('#frame12 > .heading').click();
        cy.get('#frame12 > .content').should('be.visible');
        cy.get('#frame11 > .content').should('not.be.visible');
        cy.get('#frame13 > .content').should('not.be.visible');

        cy.get('#frame22 > .heading').click();
        cy.get('#frame21 > .content').should('be.visible');
        cy.get('#frame22 > .content').should('be.visible');
        cy.get('#frame23 > .content').should('not.be.visible');
    })
})