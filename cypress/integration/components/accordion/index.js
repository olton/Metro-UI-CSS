describe("Metro 4 :: Accordion test", ()=>{

    const targets = [
        ['index.html', 'Clear Metro 4'],
        ['index-jquery.html', 'Interop with jQuery'],
        ['index-jquery-false.html', 'Interop with jQuery, metro4:jquery=false']
    ];

    targets.forEach((el)=>{
        it(el[1], ()=>{
            cy.visit("/cypress/components/accordion/"+el[0]);

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

})