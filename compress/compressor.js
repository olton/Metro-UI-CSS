var compressor = require('node-minify');
var project_root = '/Projects/Metro-UI-CSS/',
    module_path = project_root+'docs/js/metro/',
    css_path = project_root+'docs/css/',
    js_compile_path = project_root+'docs/js/',
    css_compile_path = project_root+'docs/css/';

new compressor.minify({
    type: 'gcc',
    language: 'ECMASCRIPT5',
    fileIn: [
        module_path+'metro-core.js',
        module_path+'metro-touch-handler.js',
        module_path+'metro-accordion.js',
        module_path+'metro-button-set.js',
        module_path+'metro-date-format.js',
        module_path+'metro-calendar.js',
        module_path+'metro-datepicker.js',
        module_path+'metro-carousel.js',
        module_path+'metro-countdown.js',
        module_path+'metro-dropdown.js',
        module_path+'metro-input-control.js',
        module_path+'metro-live-tile.js',
        module_path+'metro-progressbar.js',
        module_path+'metro-rating.js',
        module_path+'metro-slider.js',
        module_path+'metro-tab-control.js',
        module_path+'metro-table.js',
        module_path+'metro-times.js',
        module_path+'metro-dialog.js',
        module_path+'metro-notify.js',
        module_path+'metro-listview.js',
        module_path+'metro-treeview.js',
        module_path+'metro-fluentmenu.js',
        module_path+'metro-hint.js',
        module_path+'metro-streamer.js',
        module_path+'metro-scroll.js'
    ],
    fileOut: js_compile_path+'metro.min.js',
    callback: function(err, min){
        console.log(err);
    }
});

new compressor.minify({
    type: 'yui-css',
    fileIn: css_path+'metro-bootstrap.css',
    fileOut: css_compile_path+'metro.min.css',
    callback: function(err, min){
        console.log(err);
    }
});

new compressor.minify({
    type: 'yui-css',
    fileIn: css_path+'metro-bootstrap-responsive.css',
    fileOut: css_compile_path+'metro-responsive.min.css',
    callback: function(err, min){
        console.log(err);
    }
});
