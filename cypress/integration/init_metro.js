describe("Test metro 4 initialization", function(){
    const targets = [
        'index', 'intro', 'download', 'contents', 'browsers', 'media', 'events', 'm4q', 'i18n', 'configuring', 'global-setup', 'vuejs',

        'm4q-about', 'm4q-population', 'm4q-constructor', 'm4q-ajax', 'm4q-animation', 'm4q-loops', 'm4q-visibility', 'm4q-effects', 'm4q-subtree',
        'm4q-attributes', 'm4q-html', 'm4q-css', 'm4q-position', 'm4q-manipulation', 'm4q-dataset', 'm4q-events', 'm4q-utils',

        'containers', 'grid', 'typography', 'tables', 'forms', 'buttons', 'images', 'figures', 'lists'
    ]

    targets.forEach(function(target){
        it('Target - ' + target, function(){
            cy.visit(target === 'index' ? '/' : '/' + target + '.html');
        })
    })

})