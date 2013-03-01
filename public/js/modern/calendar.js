/**
 * Calendar - jQuery plugin for MetroUiCss framework
 *
 *
 */

(function($) {

    var pluginName = 'calendar',
        initAllSelector = '[data-role=calendar], .calendar',
        paramKeys = ['InitDate'];

    $[pluginName] = function(element, options) {

        if (!element) {
            return $()[pluginName]({initAll: true});
        }

        // default settings
        var defaults = {
            initDate: 0
        };

        var plugin = this;
        plugin.settings = {};

        var $element = $(element); // reference to the jQuery version of DOM element

        var calendarTable = "";
        var padding = "";
        var i = 1;

        var current = new Date();
        var month = current.getMonth();
        var day = current.getDay();
        var year = current.getFullYear();
        var next_month = month + 1;
        var prev_month = month - 1;

        var daysInFeb = (year%100!=0) && (year%4==0) || (year%400==0) ? 29 : 28;

        var monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov", "Dec"];
        var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];
        var totalDays = ["31", ""+daysInFeb+"","31","30","31","30","31","31","30","31","30","31"];

        var tempDate = new Date(next_month +' 1 ,'+year);
        var tempweekday= tempDate.getDay();
        var tempweekday2 = tempweekday;
        var dayAmount = totalDays[month];

        while (tempweekday>0){
            padding += "<td class='premonth'></td>";
            tempweekday--;
        }

        while (i <= dayAmount){
            if (tempweekday2 > 6){
                tempweekday2 = 0;
                padding += "</tr><tr>";
            }
            if (i == day){
                padding +="<td class='current-day'>"+i+"</td>";
            }else{
                padding +="<td class='current-month'>"+i+"</td>";

            }
            tempweekday2++;
            i++;
        }

        calendarTable += "<table><tr class='current-month'><th colspan='2'><i class='icon-arrow-left-3'></i></th><th colspan='3'>"+monthNames[month]+" "+ year +"</th><th colspan='2'><i class='icon-arrow-right-3'></i></th></tr>";
        calendarTable +="<tr class='weekdays'><td>Sun</td><td>Mon</td><td>Tue</td><td>Wed</td><td>Thu</td><td>Fri</td><td>Sat</td> </tr>";
        calendarTable += "<tr>";
        calendarTable += padding;
        calendarTable += "</tr></table>";

        $element.html(calendarTable);

        // initialization
        plugin.init = function () {

            plugin.settings = $.extend({}, defaults, options);

        };

        // public methods

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