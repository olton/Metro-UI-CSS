/* global Metro */
(function(Metro, $) {
    'use strict';
    var ClockDefaultConfig = {
        clockDeferred: 0,
        showTime: true,
        showDate: true,
        timeFormat: '24',
        dateFormat: 'american',
        divider: "&nbsp;&nbsp;",
        leadingZero: true,
        dateDivider: '-',
        timeDivider: ":",
        onTick: Metro.noop,
        onSecond: Metro.noop,
        onClockCreate: Metro.noop
    };

    Metro.clockSetup = function (options) {
        ClockDefaultConfig = $.extend({}, ClockDefaultConfig, options);
    };

    if (typeof window["metroClockSetup"] !== undefined) {
        Metro.clockSetup(window["metroClockSetup"]);
    }

    Metro.Component('clock', {
        init: function( options, elem ) {
            this._super(elem, options, ClockDefaultConfig, {
                _clockInterval: null
            });

            return this;
        },

        _create: function(){
            var that = this, element = this.element;

            this._fireEvent('clock-create', {
                element: element
            });

            this._tick();

            this._clockInterval = setInterval(function(){
                that._tick();
            }, 500);
            this._secondInterval = setInterval(function(){
                that._second();
            }, 1000);
        },

        _addLeadingZero: function(i){
            if (i<10){i="0" + i;}
            return i;
        },

        _second: function(){
            var timestamp = new Date();

            this._fireEvent('second', {
                timestamp: timestamp
            })
        },

        _tick: function(){
            var element = this.element, o = this.options;
            var timestamp = new Date();
            var result = "";
            var h = timestamp.getHours(),
                i = timestamp.getMinutes(),
                s = timestamp.getSeconds(),
                d = timestamp.getDate(),
                m = timestamp.getMonth() + 1,
                y = timestamp.getFullYear(),
                a = '';

            if (parseInt(o.timeFormat) === 12) {
                a = " AM";
                if (h > 11) { a = " PM"; }
                if (h > 12) { h = h - 12; }
                if (h === 0) { h = 12; }
            }

            i = this._addLeadingZero(i);
            s = this._addLeadingZero(s);

            if (o.leadingZero) {
                h = this._addLeadingZero(h);
                m = this._addLeadingZero(m);
                d = this._addLeadingZero(d);
            }

            if (o.showDate) {
                if (o.dateFormat === 'american') {
                    result += "<span class='date-month'>" + m + "</span>";
                    result += "<span class='date-divider'>" + o.dateDivider + "</span>";
                    result += "<span class='date-day'>" + d + "</span>";
                    result += "<span class='date-divider'>" + o.dateDivider + "</span>";
                    result += "<span class='date-year'>" + y + "</span>";
                } else {
                    result += "<span class='date-day'>" + d + "</span>";
                    result += "<span class='date-divider'>" + o.dateDivider + "</span>";
                    result += "<span class='date-month'>" + m + "</span>";
                    result += "<span class='date-divider'>" + o.dateDivider + "</span>";
                    result += "<span class='date-year'>" + y + "</span>";
                }
                result += o.divider;
            }

            if (o.showTime) {
                result += "<span class='clock-hour'>" + h + "</span>";
                result += "<span class='clock-divider'>" + o.timeDivider + "</span>";
                result += "<span class='clock-minute'>" + i + "</span>";
                result += "<span class='clock-divider'>" + o.timeDivider + "</span>";
                result += "<span class='clock-second'>" + s + "</span>";
                result += "<span class='clock-suffix'>" + a + "</span>";
            }

            element.html(result);

            this._fireEvent('tick', {
                timestamp: timestamp
            })
        },

        /* eslint-disable-next-line */
        changeAttribute: function(attributeName){
        },

        destroy: function(){
            clearInterval(this._clockInterval);
            this._clockInterval = null;
            return this.element;
        }
    });
}(Metro, m4q));