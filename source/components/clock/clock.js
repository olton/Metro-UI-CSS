/* global Metro, Utils, Component */
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
    onClockCreate: Metro.noop
};

Metro.clockSetup = function (options) {
    ClockDefaultConfig = $.extend({}, ClockDefaultConfig, options);
};

if (typeof window["metroClockSetup"] !== undefined) {
    Metro.clockSetup(window["metroClockSetup"]);
}

Component('clock', {
    init: function( options, elem ) {
        this._super(elem, options, ClockDefaultConfig);

        this._clockInterval = null;

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        var that = this, element = this.element;

        Metro.checkRuntime(element, this.name);

        this._tick();

        Utils.exec(this.options.onClockCreate, [this.element]);
        element.fire("clockcreate");

        this._clockInterval = setInterval(function(){
            that._tick();
        }, 500);
    },

    _addLeadingZero: function(i){
        if (i<10){i="0" + i;}
        return i;
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
