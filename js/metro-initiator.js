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
        return this;
    };

    $.Metro.initButtonSets = function(area){
        if (area != undefined) {
            $(area).find('[data-role=button-set]').buttonset();
            $(area).find('[data-role=button-group]').buttongroup();
        } else {
            $('[data-role=button-set]').buttonset();
            $('[data-role=button-group]').buttongroup();
        }
        return this;
    };

    $.Metro.initCalendars = function(area){
        if (area != undefined) {
            $(area).find('[data-role=calendar]').calendar();
        } else {
            $('[data-role=calendar]').calendar();
        }
        return this;
    };

    $.Metro.initCarousels = function(area){
        if (area != undefined) {
            $(area).find('[data-role=carousel]').carousel();
        } else {
            $('[data-role=carousel]').carousel();
        }
        return this;
    };

    $.Metro.initCountdowns = function(area){
        if (area != undefined) {
            $(area).find('[data-role=countdown]').countdown();
        } else {
            $('[data-role=countdown]').countdown();
        }
        return this;
    };

    $.Metro.initDatepickers = function(area){
        if (area != undefined) {
            $(area).find('[data-role=datepicker]').datepicker();
        } else {
            $('[data-role=datepicker]').datepicker();
        }
        return this;
    };

    $.Metro.initDropdowns = function(area){
        if (area != undefined) {
            $(area).find('[data-role=dropdown]').dropdown();
        } else {
            $('[data-role=dropdown]').dropdown();
        }
        return this;
    };

    $.Metro.initFluentMenus = function(area){
        if (area != undefined) {
            $(area).find('[data-role=fluentmenu]').fluentmenu();
        } else {
            $('[data-role=fluentmenu]').fluentmenu();
        }
        return this;
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
        return this;
    };

    $.Metro.transformInputs = function(area){
        if (area != undefined) {
            $(area).find('[data-transform=input-control]').inputTransform();
        } else {
            $('[data-transform=input-control]').inputTransform();
        }
        return this;
    };

    $.Metro.initListViews = function(area){
        if (area != undefined) {
            $(area).find('[data-role=listview]').listview();
        } else {
            $('[data-role=listview]').listview();
        }
        return this;
    };

    $.Metro.initLives = function(area){
        if (area != undefined) {
            $(area).find('[data-role=live-tile], [data-role=live]').livetile();
        } else {
            $('[data-role=live-tile], [data-role=live]').livetile();
        }
        return this;
    };

    $.Metro.initProgreeBars = function(area){
        if (area != undefined) {
            $(area).find('[data-role=progress-bar]').progressbar();
        } else {
            $('[data-role=progress-bar]').progressbar();
        }
        return this;
    };

    $.Metro.initRatings = function(area){
        if (area != undefined) {
            $(area).find('[data-role=rating]').rating();
        } else {
            $('[data-role=rating]').rating();
        }
        return this;
    };

    $.Metro.initScrolls = function(area){
        if (area != undefined) {
            $(area).find('[data-role=scrollbox]').scrollbar();
        } else {
            $('[data-role=scrollbox]').scrollbar();
        }
        return this;
    };

    $.Metro.initSliders = function(area){
        if (area != undefined) {
            $(area).find('[data-role=slider]').slider();
        } else {
            $('[data-role=slider]').slider();
        }
        return this;
    };

    $.Metro.initTabs = function(area){
        if (area != undefined) {
            $(area).find('[data-role=tab-control]').tabcontrol();
        } else {
            $('[data-role=tab-control]').tabcontrol();
        }
        return this;
    };

    $.Metro.initTimes = function(area){
        if (area != undefined) {
            $(area).find('[data-role=times]').times();
        } else {
            $('[data-role=times]').times();
        }
        return this;
    };

    $.Metro.initTrees = function(area){
        if (area != undefined) {
            $(area).find('[data-role=treeview]').treeview();
        } else {
            $('[data-role=treeview]').treeview();
        }
        return this;
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
        return this;
    };

    $.Metro.initStreamers = function(area){
        if (area != undefined) {
            $(area).find('[data-role=streamer]').streamer();
        } else {
            $('[data-role=streamer]').streamer();
        }
        return this;
    };

    $.Metro.initDragTiles = function(area){
        if (area != undefined) {
            $(area).find('[data-role=drag-drop]').dragtile();
        } else {
            $('[data-role=drag-drop]').dragtile();
        }
        return this;
    };

    $.Metro.initPulls = function(area){
        if (area != undefined) {
            $(area).find('[data-role=pull-menu], .pull-menu').pullmenu();
        } {
            $('[data-role=pull-menu], .pull-menu').pullmenu();
        }
        return this;
    };

    $.Metro.initPanels = function(area){
        if (area != undefined) {
            $(area).find('[data-role=panel]').panel();
        } {
            $('[data-role=panel]').panel();
        }
        return this;
    };

    $.Metro.initTileTransform = function(area){
        if (area != undefined) {
            $(area).find('[data-click=transform]').tileTransform();
        } {
            $('[data-click=transform]').tileTransform();
        }
        return this;
    };

    $.Metro.initAll = function(area) {
        $.Metro
            .initAccordions(area)
            .initButtonSets(area)
            .initCalendars(area)
            .initCarousels(area)
            .initCountdowns(area)
            .initDatepickers(area)
            .initDropdowns(area)
            .initFluentMenus(area)
            .initHints(area)
            .initInputs(area)
            .transformInputs(area)
            .initListViews(area)
            .initLives(area)
            .initProgreeBars(area)
            .initRatings(area)
            .initScrolls(area)
            .initSliders(area)
            .initTabs(area)
            .initTimes(area)
            .initTrees(area)
            .initSteppers(area)
            .initStreamers(area)
            .initDragTiles(area)
            .initPulls(area)
            .initPanels(area)
            .initTileTransform(area);
    }
})(jQuery);

$(function(){
    $.Metro.initAll();
});


$(function(){
    if (METRO_AUTO_REINIT) {
        //$(".metro").bind('DOMSubtreeModified', function(){            $.Metro.initAll();        });
        var originalDOM = $('.metro').html(),
            actualDOM;

        setInterval(function () {
            actualDOM = $('.metro').html();

            if (originalDOM !== actualDOM) {
                originalDOM = actualDOM;

                $.Metro.initAll();
            }
        }, 500);
    }
});
