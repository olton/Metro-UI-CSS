var METRO_LOCALE;

(function($){
    $.Metro = function(params){
        params = $.extend({
        }, params);
    };

    $.Metro.currentLocale = 'en';

    if (METRO_LOCALE != undefined)  $.Metro.currentLocale = METRO_LOCALE; else $.Metro.currentLocale = 'en';
    //console.log(METRO_LOCALE, $.Metro.currentLocale);

    $.Metro.Locale = {
        'en': {
            months: [
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
            days: [
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
                "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
            ],
            buttons: [
                "Today", "Clear"
            ]
        },
        'ru': {
            months: [
                "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
                "Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"
            ],
            days: [
                "Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота",
                "Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
            ],
            buttons: [
                "Сегодня", "Очистить"
            ]
        }
    };

    $.Metro.setLocale = function(locale, data){
        $.Metro.Locale[locale] = data;
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


