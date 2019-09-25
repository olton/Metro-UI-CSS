describe("Metro 4 :: Dialog test", () => {
    it("Clear Metro 4", ()=>{
        cy.visit("/cypress/components/dialog/index.html")
        cy.get('.js-button').eq(0).click()
        cy.get('#idDialog').should('be.visible')
        cy.get('.js-dialog-close').click()

        cy.get('.js-button').eq(1).click()
        cy.get('#idDialog').should('be.visible')
        cy.get('.js-dialog-close').click()

        cy.get('.js-button').eq(2).click()
        cy.get('.dialog').should('be.visible')
        cy.get('button.js-dialog-close').click()
    })

    it("Interop Metro 4 and jQuery", ()=>{
        cy.visit("/cypress/components/dialog/index-jquery.html")
        cy.get('.js-button').eq(0).click()
        cy.get('#idDialog').should('be.visible')
        cy.get('.js-dialog-close').click()

        cy.get('.js-button').eq(1).click()
        cy.get('#idDialog').should('be.visible')
        cy.get('.js-dialog-close').click()

        cy.get('.js-button').eq(2).click()
        cy.get('.dialog').should('be.visible')
        cy.get('button.js-dialog-close').click()
    })

    it("Interop Metro 4 and jQuery. Meta tag metro:jquery=false", ()=>{
        cy.visit("/cypress/components/dialog/index-jquery-false.html")
        cy.get('.js-button').eq(0).click()
        cy.get('#idDialog').should('be.visible')
        cy.get('.js-dialog-close').click()

        cy.get('.js-button').eq(1).click()
        cy.get('#idDialog').should('be.visible')
        cy.get('.js-dialog-close').click()

        cy.get('.js-button').eq(2).click()
        cy.get('.dialog').should('be.visible')
        cy.get('button.js-dialog-close').click()
    })
});