describe("Test metro 4 docs", function(){
    const targets = [
        'index', 'intro', 'download', 'contents', 'browsers', 'media', 'events', 'm4q', 'i18n', 'configuring', 'global-setup', 'vuejs',

        'm4q-about', 'm4q-population', 'm4q-constructor', 'm4q-ajax', 'm4q-animation', 'm4q-loops', 'm4q-visibility', 'm4q-effects', 'm4q-subtree',
        'm4q-attributes', 'm4q-html', 'm4q-css', 'm4q-position', 'm4q-manipulation', 'm4q-dataset', 'm4q-events', 'm4q-utils',

        'containers', 'grid', 'typography', 'tables', 'forms', 'buttons', 'images', 'figures', 'lists',

        'checkbox', 'file', 'input', 'input-material', 'keypad', 'rating', 'radio', 'select', 'slider', 'spinner', 'switch', 'tag-input', 'textarea',

        'app-bar', 'bottom-nav', 'bottom-sheet', 'menu', 'ribbon-menu', 'sidebar', 'sidenavigation',

        'accordion', 'badge', 'carousel', 'cards', 'cube', 'counter', 'charms', 'chat', 'donut', 'image-compare', 'image-magnifier', 'gravatar',
        'list', 'listview', 'master', 'navview', 'panels', 'progress', 'streamer', 'stepper', 'splitter', 'tabs', 'tabs-material', 'table', 'tiles', 'treeview', 'wizard',

        'dialog', 'info-box', 'hints', 'notify', 'popovers', 'toast', 'windows',

        'calendar', 'calendarpicker', 'datepicker', 'timepicker', 'countdown', 'dateformat',

        'video', 'audio',

        'collapse', 'color-module', 'draggable', 'dropdown', 'validator', 'hotkeys', 'micro-tpl', 'ripple', 'storage', 'session-storage', 'sorter', 'touch',

        'animation', 'border', 'clear', 'colors', 'cursors', 'display', 'embed', 'extensions', 'flex', 'functions', 'float', 'position', 'sizing', 'spacing',

        'icons', 'color-schemes'
    ];

    targets.forEach((target) => {
        it('Target - ' + target, function(){
            cy.visit(target + '.html');
        })
    })

});