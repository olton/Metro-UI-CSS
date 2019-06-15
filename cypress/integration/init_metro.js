describe("Test metro 4 initialization", function(){
    const targets = [
        'index', 'intro', 'download', 'contents', 'browsers', 'media'
    ]

    targets.forEach(function(target){
        it('Target - ' + target, function(){
            cy.visit(target === 'index' ? '/' : '/' + target + '.html');
        })
    })

})