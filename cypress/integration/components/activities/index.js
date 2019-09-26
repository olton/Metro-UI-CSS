describe("Metro 4 :: Activities test", ()=>{
    const targets = [
        ['index.html', 'Clear Metro 4'],
        ['index-jquery.html', 'Interop with jQuery'],
        ['index-jquery-false.html', 'Interop with jQuery, metro4:jquery=false']
    ];

    targets.forEach((el)=>{
        it(el[1], ()=>{
            cy.visit("/cypress/components/activities/"+el[0]);

            cy.get(".activity-ring").should("be.visible");
            cy.get(".activity-ring .wrap").should("have.length", 5);

            cy.get(".activity-square").should("be.visible");
            cy.get(".activity-square .square").should("have.length", 4);

            cy.get(".activity-cycle").should("be.visible");
            cy.get(".activity-cycle .cycle").should("have.length", 1);

            cy.get(".activity-simple").should("be.visible");
            cy.get(".activity-simple svg").should("have.length", 1);

            cy.get(".activity-metro").should("be.visible");
            cy.get(".activity-metro .circle").should("have.length", 5);

            cy.get(".button").eq(0).click();
        })
    })

});