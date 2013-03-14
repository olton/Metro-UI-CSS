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
 *
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
 */

(function($) {

    var pluginName = 'calendar',
        initAllSelector = '[data-role=calendar], .calendar',
        paramKeys = ['InitDate', 'Lang'];

    $[pluginName] = function(element, options) {

        if (!element) {
            return $()[pluginName]({initAll: true});
        }

        // default settings
        var defaults = {
            initDate: false,
            lang: 'en'
        };

        var plugin = this;
        plugin.settings = {};

        var $element = $(element); // reference to the jQuery version of DOM element

        var $prevMonthBtn,
            $nextMonthBtn,
            $header,
            $days = [],
            calMoment,
            lang,
            dow,
            selectedDateString;

        // initialization
        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);

            lang = plugin.settings.lang;
            var date = plugin.settings.initDate;

            dow = moment.langData(lang)._week.dow;

            var selectedDateMoment = date ? moment(date) : moment();
            selectedDateString = selectedDateMoment.format('YYYY-MM-D');

            renderCalendar();
            plugin.setDate(date);
        };

        /**
         * generate constant elements of calendar
         * moment - is an object of moment.js
         */
        function renderCalendar () {
            var i, j, table, tr, td, mom;

            table = $('<table></table>');

            tr = $('<tr class="current-month"></tr>');
            td = $('<th colspan="2"></th>');
            $prevMonthBtn = $('<a href="javascript:void(0)" class="icon-arrow-left-3"></a>');
            td.append($prevMonthBtn);
            tr.append(td);
            $header = $('<th colspan="3"></th>');
            tr.append($header);
            td = $('<th colspan="2"></th>');
            $nextMonthBtn = $('<a href="javascript:void(0)" class="icon-arrow-right-3"></a>');
            td.append($nextMonthBtn);
            tr.append(td);
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
            $days.forEach(function(day){
                day.on('mousedown', function(event){
                    event.stopPropagation();
                    var date = day.data('date');
                    if (!date) {
                        return;
                    }
                    calMoment = moment(date);
                    calMoment.lang(lang);
                    selectedDateString = calMoment.format('YYYY-MM-D');
                    plugin.setDate(calMoment);
                    $element.trigger('date-selected', [date, calMoment]);
                });
            });
        }

        function fillCalendar () {
            var dayIndex, date, yearMonth;
            // header
            $header.text(calMoment.format('MMM YYYY'));

            // this month
            var firstDayMom = calMoment.clone().startOf('month');
            var daysInMonth = calMoment.daysInMonth();
            var firstDayIndex = +firstDayMom.format('d') - dow; // it also day of week index
            firstDayIndex = firstDayIndex < 0 ? firstDayIndex + 7 : firstDayIndex;
            var lastDayIndex = firstDayIndex + daysInMonth;
            //var currentDate = calMoment.format('YYYY-MM-D');
            yearMonth = calMoment.format('YYYY-MM-');
            date = 1;
            for (dayIndex = firstDayIndex; dayIndex < lastDayIndex; dayIndex++) {
                $days[dayIndex].text(date);
                if (yearMonth + date === selectedDateString) {
                    $days[dayIndex].prop('class', 'current-day');
                } else {
                    $days[dayIndex].prop('class', 'current-month');
                }
                $days[dayIndex].data('date', yearMonth + date);
                date++;
            }

            // prev month
            var prevMonthMom = calMoment.clone().add('month', -1).endOf('month');
            yearMonth = prevMonthMom.format('YYYY-MM-');
            date = prevMonthMom.daysInMonth();
            for (dayIndex = firstDayIndex - 1; dayIndex >= 0; dayIndex--) {
                $days[dayIndex].text(date);
                $days[dayIndex].prop('class', 'out');
                $days[dayIndex].data('date', yearMonth + date);
                date--;
            }

            // next month
            var nextMonthMom = calMoment.clone().add('month', 1);
            yearMonth = nextMonthMom.format('YYYY-MM-');
            var nextMonthDays = 7 - lastDayIndex % 7;
            nextMonthDays = nextMonthDays === 7 ? 0 : nextMonthDays;
            var nextMonthLastDayIndex = lastDayIndex + nextMonthDays;
            date = 1;
            for (dayIndex = lastDayIndex; dayIndex < nextMonthLastDayIndex; dayIndex++) {
                $days[dayIndex].text(date);
                $days[dayIndex].prop('class', 'out');
                $days[dayIndex].data('date', yearMonth + date);
                date++;
            }

            // empty rows
            for (dayIndex = nextMonthLastDayIndex; dayIndex < $days.length; dayIndex++) {
                $days[dayIndex].text('');
                $days[dayIndex].prop('class', 'empty-day');
                $days[dayIndex].data('date', false);
            }
        }


        // sets date
        // date - string ('YYYY-MM-DD') or instance of moment.js library
        plugin.setDate = function(date) {
            calMoment = date ? moment(date) : moment();
            calMoment.lang(lang);
            $element.data('date', calMoment);
            fillCalendar();
        };

        plugin.init();

    };

    // sets date
    $.fn[pluginName + 'SetDate'] = function(date) {
        var plugin = $(this.get(0)).data(pluginName);
        if (typeof plugin !== 'undefined') {
            plugin.setDte(date);
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
 *
 */
(function($) {

    var pluginName = 'datepicker',
        initAllSelector = '[data-role=datepicker], .datepicker';
        paramKeys = ['InitDate', 'Lang'];

    $[pluginName] = function(element, options) {

        if (!element) {
            return $()[pluginName]({initAll: true});
        }

        // default settings
        var defaults = {
            initDate: false,
            lang: 'en'
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
            $calendarWrap.append($calendar);
            $element.after($calendarWrap);
            $calendar.calendar({
                initDate: settings.initDate,
                lang: settings.lang
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
        }

        plugin.init();

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