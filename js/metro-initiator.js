(function($){
    /*
     * Init or ReInit components
     * */

    $.Metro.initAccordions = function(area){
        if (area != undefined) {
            $(area).find('[data-role=accordion]').accordion();
        } else {
            $('[data-role=accordion]').accordion();
        }
    };

    $.Metro.initButtonSets = function(area){
        if (area != undefined) {
            $(area).find('[data-role=button-set]').buttonset();
            $(area).find('[data-role=button-group]').buttongroup();
        } else {
            $('[data-role=button-set]').buttonset();
            $('[data-role=button-group]').buttongroup();
        }
    };

    $.Metro.initCalendars = function(area){
        if (area != undefined) {
            $(area).find('[data-role=calendar]').calendar();
        } else {
            $('[data-role=calendar]').calendar();
        }
    };

    $.Metro.initCarousels = function(area){
        if (area != undefined) {
            $(area).find('[data-role=carousel]').carousel();
        } else {
            $('[data-role=carousel]').carousel();
        }
    };

    $.Metro.initCountdowns = function(area){
        if (area != undefined) {
            $(area).find('[data-role=countdown]').countdown();
        } else {
            $('[data-role=countdown]').countdown();
        }
    };

    $.Metro.initDatepickers = function(area){
        if (area != undefined) {
            $(area).find('[data-role=datepicker]').datepicker();
        } else {
            $('[data-role=datepicker]').datepicker();
        }
    };

    $.Metro.initDropdowns = function(area){
        if (area != undefined) {
            $(area).find('[data-role=dropdown]').dropdown();
        } else {
            $('[data-role=dropdown]').dropdown();
        }
    };

    $.Metro.initFluentMenus = function(area){
        if (area != undefined) {
            $(area).find('[data-role=fluentmenu]').fluentmenu();
        } else {
            $('[data-role=fluentmenu]').fluentmenu();
        }
    };

    $.Metro.initHints = function(area){
        if (area != undefined) {
            $(area).find('[data-hint]').hint();
        } else {
            $('[data-hint]').hint();
        }
    };

    $.Metro.initInputs = function(area){
        if (area != undefined) {
            $(area).find('[data-role=input-control], .input-control').inputControl();
        } else {
            $('[data-role=input-control], .input-control').inputControl();
        }
    };

    $.Metro.transformInputs = function(area){
        if (area != undefined) {
            $(area).find('[data-transform=input-control]').inputTransform();
        } else {
            $('[data-transform=input-control]').inputTransform();
        }
    };

    $.Metro.initListViews = function(area){
        if (area != undefined) {
            $(area).find('[data-role=listview]').listview();
        } else {
            $('[data-role=listview]').listview();
        }
    };

    $.Metro.initLives = function(area){
        if (area != undefined) {
            $(area).find('[data-role=live-tile], [data-role=live]').livetile();
        } else {
            $('[data-role=live-tile], [data-role=live]').livetile();
        }
    };

    $.Metro.initProgreeBars = function(area){
        if (area != undefined) {
            $(area).find('[data-role=progress-bar]').progressbar();
        } else {
            $('[data-role=progress-bar]').progressbar();
        }
    };

    $.Metro.initRatings = function(area){
        if (area != undefined) {
            $(area).find('[data-role=rating]').rating();
        } else {
            $('[data-role=rating]').rating();
        }
    };

    $.Metro.initScrolls = function(area){
        if (area != undefined) {
            $(area).find('[data-role=scrollbox]').scrollbar();
        } else {
            $('[data-role=scrollbox]').scrollbar();
        }
    };

    $.Metro.initSliders = function(area){
        if (area != undefined) {
            $(area).find('[data-role=slider]').slider();
        } else {
            $('[data-role=slider]').slider();
        }
    };

    $.Metro.initTabs = function(area){
        if (area != undefined) {
            $(area).find('[data-role=tab-control]').tabcontrol();
        } else {
            $('[data-role=tab-control]').tabcontrol();
        }
    };

    $.Metro.initTimes = function(area){
        if (area != undefined) {
            $(area).find('[data-role=times]').times();
        } else {
            $('[data-role=times]').times();
        }
    };

    $.Metro.initTrees = function(area){
        if (area != undefined) {
            $(area).find('[data-role=treeview]').treeview();
        } else {
            $('[data-role=treeview]').treeview();
        }
    };

    /*
     * Components in develop
     * */

    $.Metro.initSteppers = function(area){
        if (area != undefined) {
            $(area).find('[data-role=stepper]').stepper();
        } else {
            $('[data-role=stepper]').stepper();
        }
    };

    $.Metro.initStreamers = function(area){
        if (area != undefined) {
            $(area).find('[data-role=streamer]').streamer();
        } else {
            $('[data-role=streamer]').streamer();
        }
    };

    $.Metro.initDragTiles = function(area){
        if (area != undefined) {
            $(area).find('[data-role=drag-drop]').dragtile();
        } else {
            $('[data-role=drag-drop]').dragtile();
        }
    };

    $.Metro.initPulls = function(area){
        if (area != undefined) {
            $(area).find('[data-role=pull-menu], .pull-menu').pullmenu();
        } {
            $('[data-role=pull-menu], .pull-menu').pullmenu();
        }
    };

    $.Metro.initAll = function(area) {
        $.Metro.initAccordions(area);
        $.Metro.initButtonSets(area);
        $.Metro.initCalendars(area);
        $.Metro.initCarousels(area);
        $.Metro.initCountdowns(area);
        $.Metro.initDatepickers(area);
        $.Metro.initDropdowns(area);
        $.Metro.initFluentMenus(area);
        $.Metro.initHints(area);
        $.Metro.initInputs(area);
        $.Metro.transformInputs(area);
        $.Metro.initListViews(area);
        $.Metro.initLives(area);
        $.Metro.initProgreeBars(area);
        $.Metro.initRatings(area);
        $.Metro.initScrolls(area);
        $.Metro.initSliders(area);
        $.Metro.initTabs(area);
        $.Metro.initTimes(area);
        $.Metro.initTrees(area);
        $.Metro.initSteppers(area);
        $.Metro.initStreamers(area);
        $.Metro.initDragTiles(area);
        $.Metro.initPulls(area);
    }
})(jQuery);

$(function(){
    $.Metro.initAll();
});