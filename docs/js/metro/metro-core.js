
(function($){
    $.Metro = function(params){
        params = $.extend({
        }, params);
    };

    /*
    * Init or ReInit components
    * */

    $.Metro.initAccordions = function(){
        $('[data-role=accordion]').accordion();
    };

    $.Metro.initButtonSets = function(){
        $('[data-role=button-set]').buttonset();
        $('[data-role=button-group]').buttongroup();
    };

    $.Metro.initCalendars = function(){
        $('[data-role=calendar]').calendar();
    };

    $.Metro.initCarousels = function(){
        $('[data-role=carousel]').carousel();
    };

    $.Metro.initCountdowns = function(){
        $('[data-role=countdown]').countdown();
    };

    $.Metro.initDatepickers = function(){
        $('[data-role=datepicker]').datepicker();
    };

    $.Metro.initDropdowns = function(){
        $('[data-role=dropdown]').dropdown();
    };

    $.Metro.initFluentMenus = function(){
        $('[data-role=fluentmenu]').fluentmenu();
    };

    $.Metro.initHints = function(){
        $('[data-hint]').hint();
    };

    $.Metro.initInputs = function(){
        $('[data-role=input-control], .input-control').inputControl();
    };

    $.Metro.transformInputs = function(){
        $('[data-transform=input-control]').inputTransform();
    };

    $.Metro.initListViews = function(){
        $('[data-role=listview]').listview();
    };

    $.Metro.initLives = function(){
        $('[data-role=live-tile], [data-role=live]').livetile();
    };

    $.Metro.initProgreeBars = function(){
        $('[data-role=progress-bar]').progressbar();
    };

    $.Metro.initRatings = function(){
        $('[data-role=rating]').rating();
    };

    $.Metro.initScrolls = function(){
        $('[data-role=scrollbox]').scrollbar();
    };

    $.Metro.initSliders = function(){
        $('[data-role=slider]').slider();
    };

    $.Metro.initTabs = function(){
        $('[data-role=tab-control]').tabcontrol();
    };

    $.Metro.initTimes = function(){
        $('[data-role=times]').times();
    };

    $.Metro.initTrees = function(){
        $('[data-role=treeview]').treeview();
    };

    /*
    * Components in develop
    * */

    $.Metro.initSteppers = function(){
        $('[data-role=stepper]').stepper();
    };

    $.Metro.initStreamers = function(){
        $('[data-role=streamer]').streamer();
    };

    $.Metro.initDragTiles = function(){
        $('[data-role=drag-drop]').dragtile();
    };
})(jQuery);


