
(function($){
    $.Metro = function(params){
        params = $.extend({
        }, params);
    };

    $.Metro.getOffset = function(element) {
        var f1 = function(element){
            var box = element.getBoundingClientRect()
            var body = document.body
            var docElem = document.documentElement
            var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
            var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
            var clientTop = docElem.clientTop || body.clientTop || 0
            var clientLeft = docElem.clientLeft || body.clientLeft || 0
            var top  = box.top +  scrollTop - clientTop
            var left = box.left + scrollLeft - clientLeft
            return { top: Math.round(top), left: Math.round(left) }
        }

        var f2 = function(element){
            var top=0, left=0
            while(element) {
                top = top + parseInt(element.offsetTop)
                left = left + parseInt(element.offsetLeft)
                element = element.offsetParent
            }
            return {top: top, left: left}
        }

        return element.getBoundingClientRect() ? f1(element) : f2(element);
    }

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

    $.Metro.initPulls = function(){
        $('[data-role=pull-menu], .pull-menu').pullmenu();
    };
})(jQuery);
