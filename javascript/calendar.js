/**
 * Calendar - jQuery plugin for MetroUiCss framework
 *
 * this plugin required moment.js library (http://momentjs.com/)
 *
 * to apply this plugin to element use same code:
 * <div class="calnedar"></div> or <div data-role="calendar"></div>
 *
 * init plugin manually
 * <div id="calnedar"></div>
 * $('#calendar').calendar(options)
 *
 * available options:
 * initDate: calendar start date - the instance of moment.js library, or the string like '2013-02-18', if undefined initDate = now date
 * lang: string 'en', 'ru', 'de' etc. More see here - https://github.com/timrwood/moment/blob/develop/min/langs.js
 * yearButtons: if set you will see buttons to switch years
 *
 * handling 'date-selected' event:
 * $('#calendar').on('date-selected', function(el, dateString, dateMoment){
 *     // some code here
 * });
 *
 * to retrieve current calendar date in any time use this code
 * $('#calendar').data('date')
 * you will get the instance of moment.js library
 *
 * you can set any date you want by using $('#calendar').calendarSetDate('2013-03-16');
 * if no argument - will sets current date
 *
 * you can add event on calendar by using $('#calendar').calendarSetEvent({'date': '2013-03-16', 'event': 'today my birthday'})
 * or $('#calendar').calendarSetEvents([{'date': '2013-03-16', 'event': 'today my birthday'}, ...]) to add several events
 * to remove events use clearEvents
 * $('#calendar').calendarClearEvents('all') - will remove all events
 * $('#calendar').calendarClearEvents('2013-03-16') - will remove all events for specified date
 * $('#calendar').calendarClearEvents(['2013-03-16', '2013-03-17', ...]) - will remove all events for specified dates
 * to get events of any date use $('#calendar').calendarGetEvents('2013-03-16')
 *
 */

(function($) {

    var pluginName = 'calendar',
        initAllSelector = '[data-role=calendar], .calendar',
        paramKeys = ['InitDate', 'Lang', 'YearButtons'];

    $[pluginName] = function(element, options) {

        if (!element) {
            return $()[pluginName]({initAll: true});
        }

        // default settings
        var defaults = {
            initDate: false,
            lang: 'en',
            yearButtons: false
        };

        var plugin = this;
        plugin.settings = {};

        var $element = $(element); // reference to the jQuery version of DOM element

        var $prevMonthBtn,
            $nextMonthBtn,
            $prevYearBtn,
            $nextYearBtn,
            $header,
            $days = [],
            calMoment,
            lang,
            dow,
            selectedDateString,
            calendarEvents = {}; // user defined calendar events, structure {'YYYY-MM-DD': ['string', 'string', ...]}

        // initialization
        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);

            lang = plugin.settings.lang;
            var date = plugin.settings.initDate;

            dow = moment.langData(lang)._week.dow;

            var selectedDateMoment = date ? moment(date) : moment();
            selectedDateString = selectedDateMoment.format('YYYY-MM-DD');

            renderCalendar();
            plugin.setDate(date);
        };

        /**
         * generate constant elements of calendar
         * moment - is an object of moment.js
         */
        function renderCalendar () {
            var i, j, table, tr, td, mom,
                yearBtns = plugin.settings.yearButtons;

            table = $('<table></table>');

            tr = $('<tr class="current-month"></tr>');
            if (yearBtns) {
                td = $('<th></th>');
                $prevYearBtn = $('<a href="javascript:void(0)" class="icon-arrow-left"></a>');
                td.append($prevYearBtn);
                tr.append(td);
            }
            td = $('<th ' + (yearBtns ? '' : 'colspan="2"') + '></th>');
            $prevMonthBtn = $('<a href="javascript:void(0)" class="icon-arrow-left-3"></a>');
            td.append($prevMonthBtn);
            tr.append(td);
            $header = $('<th colspan="3"></th>');
            tr.append($header);
            td = $('<th ' + (yearBtns ? '' : 'colspan="2"') + '></th>');
            $nextMonthBtn = $('<a href="javascript:void(0)" class="icon-arrow-right-3"></a>');
            td.append($nextMonthBtn);
            tr.append(td);
            if (yearBtns) {
                td = $('<th></th>');
                $nextYearBtn = $('<a href="javascript:void(0)" class="icon-arrow-right"></a>');
                td.append($nextYearBtn);
                tr.append(td);
            }
            table.append(tr);

            mom = moment().lang(lang).startOf('week').add('day', dow);
            tr = $('<tr class="weekdays"></tr>');
            for (i = 0; i < 7; i++) {
                tr.append('<td>' + mom.format('ddd') + '</td>');
                mom.add('day', 1);
            }
            table.append(tr);

            for (i = 0; i < 6; i++) {
                tr = $('<tr></tr>');
                for (j = 0; j < 7; j++) {
                    td = $('<td></td>');
                    $days[i * 7 + j] = td;
                    tr.append(td);
                }
                table.append(tr);
            }

            $element.append(table);

            // append events
            $nextMonthBtn.on('mousedown', function(event){
                event.stopPropagation();
                calMoment.add('month', 1);
                plugin.setDate(calMoment);
            });
            $prevMonthBtn.on('mousedown', function(event){
                event.stopPropagation();
                calMoment.add('month', -1);
                plugin.setDate(calMoment);
            });
            if (yearBtns) {
                $nextYearBtn.on('mousedown', function(event){
                    event.stopPropagation();
                    calMoment.add('year', 1);
                    plugin.setDate(calMoment);
                });
                $prevYearBtn.on('mousedown', function(event){
                    event.stopPropagation();
                    calMoment.add('year', -1);
                    plugin.setDate(calMoment);
                });
            }
            $days.forEach(function(day){
                day.on('mousedown', function(event){
                    event.stopPropagation();
                    var date = day.data('date');
                    if (!date) {
                        return;
                    }
                    calMoment = moment(date);
                    calMoment.lang(lang);
                    selectedDateString = calMoment.format('YYYY-MM-DD');
                    plugin.setDate(calMoment);
                    $element.trigger('date-selected', [date, calMoment]);
                });
            });
        }

        function fillCalendar () {
            var dayIndex, date, dateStr, html;
            // header
            $header.text(calMoment.format('MMM YYYY'));

            // this month
            var thisMonthMom = calMoment.clone().startOf('month');
            var daysInMonth = calMoment.daysInMonth();
            var firstDayIndex = +thisMonthMom.format('d') - dow; // it also day of week index
            firstDayIndex = firstDayIndex < 0 ? firstDayIndex + 7 : firstDayIndex;
            var lastDayIndex = firstDayIndex + daysInMonth;
            for (dayIndex = firstDayIndex; dayIndex < lastDayIndex; dayIndex++) {
                date = thisMonthMom.format('D');
                dateStr = thisMonthMom.format('YYYY-MM-DD');
                html = date;
                if (dateStr === selectedDateString) {
                    $days[dayIndex].prop('class', 'current-day');
                } else {
                    $days[dayIndex].prop('class', 'current-month');
                }
                if (calendarEvents[dateStr]) {
                    $days[dayIndex].addClass('event');
                    $days[dayIndex].prop('title', calendarEvents[dateStr][0]);
                }
                $days[dayIndex].html(html);
                $days[dayIndex].data('date', dateStr);
                thisMonthMom.add('day', 1);
            }

            // prev month
            var prevMonthMom = calMoment.clone().add('month', -1).endOf('month');
            for (dayIndex = firstDayIndex - 1; dayIndex >= 0; dayIndex--) {
                date = prevMonthMom.format('D');
                dateStr = prevMonthMom.format('YYYY-MM-DD');
                html = date;
                $days[dayIndex].prop('class', 'out');
                if (calendarEvents[dateStr]) {
                    $days[dayIndex].addClass('event');
                    $days[dayIndex].prop('title', calendarEvents[dateStr][0]);
                }
                $days[dayIndex].html(html);
                $days[dayIndex].data('date', dateStr);
                prevMonthMom.add('day', -1);
            }

            // next month
            var nextMonthMom = calMoment.clone().add('month', 1).startOf('month');
            for (dayIndex = lastDayIndex; dayIndex < 42; dayIndex++) {
                date = nextMonthMom.format('D');
                dateStr = nextMonthMom.format('YYYY-MM-DD');
                html = date;
                $days[dayIndex].prop('class', 'out');
                if (calendarEvents[dateStr]) {
                    $days[dayIndex].addClass('event');
                    $days[dayIndex].prop('title', calendarEvents[dateStr][0]);
                }
                $days[dayIndex].html(html);
                $days[dayIndex].data('date', dateStr);
                nextMonthMom.add('day', 1);
            }
        }


        // sets date
        // date - string ('YYYY-MM-DD') or instance of moment.js library
        plugin.setDate = function(date) {
            calMoment = date ? moment(date) : moment();
            calMoment.lang(lang);
            $element.data('date', calMoment);
            fillCalendar();
            $element.trigger('date-setted', [date, calMoment]);
        };

        // sets event
        // event - object {'date': '2013-03-01', 'text': 'any text'}
        plugin.setEvent = function(event) {
            var mom = event.date ? moment(event.date) : moment();
            var dateStr = mom.format('YYYY-MM-DD');
            if (!calendarEvents[dateStr]) {
                calendarEvents[dateStr] = [];
            }
            calendarEvents[dateStr].push(event.text);
            fillCalendar();
        };

        // return array of events for specified date
        plugin.getEvents = function (date) {
            var mom = date ? moment(date) : moment();
            var dateStr = mom.format('YYYY-MM-DD');
            return calendarEvents[dateStr];
        }

        // clearing events
        // dates:
        // - string - 'YYYY-MM-DD' - clearing events for this date
        // - string - 'all' - clearing all events
        // - array - ['YYYY-MM-DD', 'YYYY-MM-DD' ...] - clearing events of several dates
        plugin.clearEvents = function (dates) {
            if (dates === 'all') {
                calendarEvents = {};
            } else if (typeof dates === 'string') {
                calendarEvents[dates] = null;
            } else if (typeof dates === 'array') {
                $.each(dates, function(i, date){
                    calendarEvents[date] = null;
                });
            }
            fillCalendar();
        };

        plugin.init();

    };

    // sets date
    $.fn[pluginName + 'SetDate'] = function(date) {
        var plugin = $(this.get(0)).data(pluginName);
        if (typeof plugin !== 'undefined') {
            plugin.setDate(date);
        }
    };
    // sets event
    $.fn[pluginName + 'SetEvent'] = function(event) {
        var plugin = $(this.get(0)).data(pluginName);
        if (typeof plugin !== 'undefined') {
            plugin.setEvent(event);
        }
    };
    // set many events
    $.fn[pluginName + 'SetEvents'] = function(events) {
        var plugin = $(this.get(0)).data(pluginName);
        if (typeof plugin !== 'undefined') {
            $.each(events, function(i, event){
                plugin.setEvent(event);
            });
        }
    };
    // get events
    $.fn[pluginName + 'GetEvents'] = function(date) {
        var plugin = $(this.get(0)).data(pluginName);
        if (typeof plugin !== 'undefined') {
            return plugin.getEvents(date);
        }
    };
    // clear events for any date
    $.fn[pluginName + 'ClearEvents'] = function(dates) {
        var plugin = $(this.get(0)).data(pluginName);
        if (typeof plugin !== 'undefined') {
            plugin.clearEvents(dates);
        }
    };

    $.fn[pluginName] = function(options) {
        var elements = options && options.initAll ? $(initAllSelector) : this;
        return elements.each(function() {
            var that = $(this),
                params = {},
                plugin;
            if (undefined == that.data(pluginName)) {
                $.each(paramKeys, function(index, key){
                    params[key[0].toLowerCase() + key.slice(1)] = that.data('param' + key);
                });
                params = $.extend({}, params, options);
                plugin = new $[pluginName](this, params);
                that.data(pluginName, plugin);
            }
        });
    };
    // autoinit
    $(function(){
        $()[pluginName]({initAll: true});
    });

})(jQuery);


/**
 * datepicker plugin
 *
 * this plugin required moment.js library (http://momentjs.com/)
 *
 * to apply this plugin to element use same code:
 * <div class="datepicker"></div> or <div data-role="datepicker"></div>
 *
 * init plugin manually
 * <div id="datepicker"></div>
 * $('#datepicker').datepicker(options)
 *
 * available options:
 * initDate: calendar start date - the instance of moment.js library, or the string like '2013-02-18', if undefined initDate = now date
 * lang: string 'en', 'ru', 'de' etc. More see here - https://github.com/timrwood/moment/blob/develop/min/langs.js
 * yearButtons: if set you will see buttons to switch years
 *
 * handling 'date-selected' event:
 * $('#datepicker').on('date-selected', function(el, dateString, dateMoment){
 *     // some code here
 * });
 *
 * to retrieve current calendar date in any time use this code
 * $('#datepicker').data('date')
 * you will get the instance of moment.js library
 *
 * you can set any date you want by using $('#datepicker').datepickerSetDate('2013-03-16');
 * if no argument - will sets current date
 *
 * you can add event on datepicker by using $('#datepicker').datepickerSetEvent({'date': '2013-03-16', 'event': 'today my birthday'})
 * or $('#datepicker').datepickerSetEvents([{'date': '2013-03-16', 'event': 'today my birthday'}, ...]) to add several events
 * to remove events use clearEvents
 * $('#datepicker').datepickerClearEvents('all') - will remove all events
 * $('#datepicker').datepickerClearEvents('2013-03-16') - will remove all events for specified date
 * $('#datepicker').datepickerClearEvents(['2013-03-16', '2013-03-17', ...]) - will remove all events for specified dates
 * to get events of any date use $('#datepicker').datepickerGetEvents('2013-03-16')
 *
 */
(function($) {

    var pluginName = 'datepicker',
        initAllSelector = '[data-role=datepicker], .datepicker';
        paramKeys = ['InitDate', 'Lang', 'YearButtons'];

    $[pluginName] = function(element, options) {

        if (!element) {
            return $()[pluginName]({initAll: true});
        }

        // default settings
        var defaults = {
            initDate: false,
            lang: 'en',
            yearButtons: false
        };

        var plugin = this;
        plugin.settings = {};

        var $element = $(element); // reference to the jQuery version of DOM element

        var $calendar,
            $input,
            $button;

        // initialization
        plugin.init = function () {
            var settings = plugin.settings = $.extend({}, defaults, options);

            $input = $element.find('input');
            $button = $element.find('button');

            var $calendarWrap = $('<div class="span4" style="position:relative"></div>');
            $calendar = $('<div class="calendar span4" style="position:absolute;display:none;z-index:10000"></div>');
            $element.data('calendar', $calendar);
            $calendarWrap.append($calendar);
            $element.after($calendarWrap);
            $calendar.calendar({
                initDate: settings.initDate,
                lang: settings.lang,
                yearButtons: settings.yearButtons
            });

            dateSelected(null, null, $calendar.data('date'));

            $input.on('focus', showCalendar);
            $button.on('click', showCalendar);
            $element.on('mousedown', function(event){
                event.stopPropagation();
            });
            $calendar.on('mousedown', function(event){
                event.stopPropagation();
            });

            $calendar.on('date-selected', dateSelected);
            $calendar.on('date-setted', dateSetted);
        };

        function showCalendar (event) {
            if ($calendar.css('display') !== 'none') {
                return;
            }
            var doc = $(document);
            $calendar.css('bottom', '');
            var docHeight = doc.height();
            $calendar.show();
            var docHeightNew = doc.height();
            if (docHeight < docHeightNew) {
                $calendar.css('bottom', $element.height() + 11);
            }
            $input.prop('disabled', true);
            $(document).one('mousedown.calendar', hideCalendar);
        }

        function hideCalendar () {
            $calendar.hide();
            $input.prop('disabled', false);
            $(document).off('mousedown.calendar');
            $input.blur();
        }

        function dateSelected (event, dateString, dateMoment) {
            hideCalendar();
            $input.val(dateMoment.format('ll'));
            $element.data('date', dateMoment);
            $input.trigger('date-selected', [dateString, dateMoment]);
        }
        function dateSetted (event, dateString, dateMoment) {
            $input.val(dateMoment.format('ll'));
            $element.data('date', dateMoment);
        }

        plugin.init();

    };

    // sets date
    $.fn[pluginName + 'SetDate'] = function(date) {
        var $calendar = $(this.get(0)).data('calendar');
        if (typeof $calendar !== 'undefined') {
            $calendar.calendarSetDate(date);
        }
    };
    // sets event
    $.fn[pluginName + 'SetEvent'] = function(event) {
        var $calendar = $(this.get(0)).data('calendar');
        if (typeof $calendar !== 'undefined') {
            $calendar.calendarSetEvent(event);
        }
    };
    // set many events
    $.fn[pluginName + 'SetEvents'] = function(events) {
        var $calendar = $(this.get(0)).data('calendar');
        if (typeof $calendar !== 'undefined') {
            $.each(events, function(i, event){
                $calendar.calendarSetEvent(event);
            });
        }
    };
    // get events
    $.fn[pluginName + 'GetEvents'] = function(date) {
        var $calendar = $(this.get(0)).data('calendar');
        if (typeof $calendar !== 'undefined') {
            return $calendar.calendarGetEvents(date);
        }
    };
    // clear events for any date
    $.fn[pluginName + 'ClearEvents'] = function(dates) {
        var $calendar = $(this.get(0)).data('calendar');
        if (typeof $calendar !== 'undefined') {
            $calendar.calendarClearEvents(dates);
        }
    };

    $.fn[pluginName] = function(options) {
        var elements = options && options.initAll ? $(initAllSelector) : this;
        return elements.each(function() {
            var that = $(this),
                params = {},
                plugin;
            if (undefined == that.data(pluginName)) {
                $.each(paramKeys, function(index, key){
                    params[key[0].toLowerCase() + key.slice(1)] = that.data('param' + key);
                });
                plugin = new $[pluginName](this, params);
                that.data(pluginName, plugin);
            }
        });
    };
    // autoinit
    $(function(){
        $()[pluginName]({initAll: true});
    });

})(jQuery);