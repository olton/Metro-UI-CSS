describe("Metro 4 :: progress test", ()=>{
    const targets = [
        ['index.html', 'Clear Metro 4'],
        ['index-jquery.html', 'Interop with jQuery'],
        ['index-jquery-false.html', 'Interop with jQuery, metro4:jquery=false']
    ];

    targets.forEach((el)=>{
        it(el[1], ()=>{
            cy.visit("/cypress/components/progress/"+el[0]);
        })
    })

});