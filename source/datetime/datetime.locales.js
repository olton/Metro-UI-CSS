/* global Metro, Datetime */
(function() {
    'use strict';

    var getLocale = Datetime.getLocale;

    Datetime.getLocale = function(locale){
        var data;

        if (!Metro) {
            locale = 'en';
            return getLocale.call(this, locale);
        }

        if (!Metro.locales[locale]) {
            locale = "en-US";
        }

        data = Metro.locales[locale]['calendar'];

        return {
            months: data.months.filter( function(el, i){ return i < 12} ),
            monthsShort: data.months.filter( function(el, i){ return i > 11} ),
            weekdays: data.days.filter( function(el, i){ return i < 7} ),
            weekdaysShort: data.days.filter( function(el, i){ return i > 13} ),
            weekdaysMin: data.days.filter( function(el, i){ return i > 6 && i < 14} ),
            weekStart: data.weekStart
        }
    }
}());