var plugins = [
    'global',
    'core',
    'locale',
    'touch-handler',

    'accordion',
    'button-set',
    'date-format',
    'calendar',
    'datepicker',
    'carousel',
    'countdown',
    'dropdown',
    'input-control',
    'live-tile',

    'progressbar',
    'rating',
    'slider',
    'tab-control',
    'table',
    'times',
    'dialog',
    'notify',
    'listview',
    'treeview',
    'fluentmenu',
    'hint',
    'streamer',
    'stepper',
    'drag-tile',
    'scroll',
    'pull',

    'initiator'


];

$.each(plugins, function(i, plugin){
    $("<script/>").attr('src', 'js/metro/metro-'+plugin+'.js').appendTo($('head'));
});
