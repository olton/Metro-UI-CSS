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
 * lang: default 'en', see moment.js documentation #lang
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
            calMoment;

        // initialization
        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);

            moment().lang(plugin.settings.lang);
            var date = plugin.settings.initDate ? moment(plugin.settings.initDate) : moment();

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

            mom = moment().startOf('week');
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
            $nextMonthBtn.on('click', function(){
                calMoment.add('month', 1);
                plugin.setDate(calMoment);
            });
            $prevMonthBtn.on('click', function(){
                calMoment.add('month', -1);
                plugin.setDate(calMoment);
            });
            $days.forEach(function(day){
                day.on('click', function(){
                    var date = day.data('date');
                    if (!date) {
                        return;
                    }
                    calMoment = moment(date);
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
            var firstDayIndex = +firstDayMom.format('d'); // it also day of week index
            var lastDayIndex = firstDayIndex + daysInMonth;
            var currentDate = +calMoment.format('D');
            yearMonth = calMoment.format('YYYY-MM-');
            date = 1;
            for (dayIndex = firstDayIndex; dayIndex < lastDayIndex; dayIndex++) {
                $days[dayIndex].text(date);
                if (date === currentDate) {
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