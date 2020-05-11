/* global Metro, Utils, Component, METRO_LOCALE, METRO_WEEK_START, METRO_DATE_FORMAT */
var CalendarPickerDefaultConfig = {
    value:'',
    calendarpickerDeferred: 0,
    nullValue: true,
    useNow: false,

    prepend: "",

    calendarWide: false,
    calendarWidePoint: null,


    dialogMode: false,
    dialogPoint: 360,
    dialogOverlay: true,
    overlayColor: '#000000',
    overlayAlpha: .5,

    locale: METRO_LOCALE,
    size: "100%",
    format: METRO_DATE_FORMAT,
    inputFormat: null,
    headerFormat: "%A, %b %e",
    clearButton: false,
    calendarButtonIcon: "<span class='default-icon-calendar'></span>",
    clearButtonIcon: "<span class='default-icon-cross'></span>",
    copyInlineStyles: false,
    clsPicker: "",
    clsInput: "",

    yearsBefore: 100,
    yearsAfter: 100,
    weekStart: METRO_WEEK_START,
    outside: true,
    ripple: false,
    rippleColor: "#cccccc",
    exclude: null,
    minDate: null,
    maxDate: null,
    special: null,
    showHeader: true,

    showWeekNumber: false,

    clsCalendar: "",
    clsCalendarHeader: "",
    clsCalendarContent: "",
    clsCalendarMonths: "",
    clsCalendarYears: "",
    clsToday: "",
    clsSelected: "",
    clsExcluded: "",

    onDayClick: Metro.noop,
    onCalendarPickerCreate: Metro.noop,
    onCalendarShow: Metro.noop,
    onCalendarHide: Metro.noop,
    onChange: Metro.noop,
    onMonthChange: Metro.noop,
    onYearChange: Metro.noop
};

Metro.calendarPickerSetup = function (options) {
    CalendarPickerDefaultConfig = $.extend({}, CalendarPickerDefaultConfig, options);
};

if (typeof window["metroCalendarPickerSetup"] !== undefined) {
    Metro.calendarPickerSetup(window["metroCalendarPickerSetup"]);
}

Component('calendar-picker', {
    init: function( options, elem ) {
        this._super(elem, options, CalendarPickerDefaultConfig);

        this.value = null;
        this.value_date = null;
        this.calendar = null;
        this.overlay = null;

        Metro.createExec(this);

        return this;
    },

    _create: function(){

        Metro.checkRuntime(this.element, this.name);

        this._createStructure();
        this._createEvents();

        Utils.exec(this.options.onCalendarPickerCreate, [this.element], this.elem);
        this.element.fire("calendarpickercreate");
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var container = $("<div>").addClass("input " + element[0].className + " calendar-picker");
        var buttons = $("<div>").addClass("button-group");
        var calendarButton, clearButton, cal = $("<div>").addClass("drop-shadow");
        var curr;
        var id = Utils.elementId("calendarpicker");
        var body = $("body");

        container.attr("id", id);

        element.attr("type", "text");
        element.attr("autocomplete", "off");
        element.attr("readonly", true);

        curr = (""+o.value).trim() !== '' ? o.value : element.val().trim();

        if (!Utils.isValue(curr)) {
            if (o.useNow) this.value = new Date();
        } else {
            this.value = !Utils.isValue(o.inputFormat) ? new Date(curr) : curr.toDate(o.inputFormat, o.locale);
        }

        if (Utils.isValue(this.value)) this.value.setHours(0,0,0,0);

        element.val(!Utils.isValue(curr) && o.nullValue === true ? "" : that.value.format(o.format, o.locale));

        container.insertBefore(element);
        element.appendTo(container);
        buttons.appendTo(container);
        cal.appendTo(o.dialogMode ? body : container);

        Metro.makePlugin(cal, "calendar", {
            wide: o.calendarWide,
            widePoint: o.calendarWidePoint,

            format: o.format,
            inputFormat: o.inputFormat,
            pickerMode: true,
            show: o.value,
            locale: o.locale,
            weekStart: o.weekStart,
            outside: o.outside,
            buttons: false,
            headerFormat: o.headerFormat,

            clsCalendar: [o.clsCalendar, "calendar-for-picker", (o.dialogMode ? "dialog-mode":"")].join(" "),
            clsCalendarHeader: o.clsCalendarHeader,
            clsCalendarContent: o.clsCalendarContent,
            clsCalendarFooter: "d-none",
            clsCalendarMonths: o.clsCalendarMonths,
            clsCalendarYears: o.clsCalendarYears,
            clsToday: o.clsToday,
            clsSelected: o.clsSelected,
            clsExcluded: o.clsExcluded,

            ripple: o.ripple,
            rippleColor: o.rippleColor,
            exclude: o.exclude,
            minDate: o.minDate,
            maxDate: o.maxDate,
            yearsBefore: o.yearsBefore,
            yearsAfter: o.yearsAfter,
            special: o.special,
            showHeader: o.showHeader,
            showFooter: false,
            showWeekNumber: o.showWeekNumber,
            onDayClick: function(sel, day, el){
                var date = new Date(sel[0]);
                date.setHours(0,0,0,0);

                that._removeOverlay();

                that.value = date;
                element.val(date.format(o.format, o.locale));
                element.trigger("change");
                cal.removeClass("open open-up");
                cal.hide();

                Utils.exec(o.onChange, [that.value], element[0]);
                element.fire("change", {
                    val: that.value
                });

                Utils.exec(o.onDayClick, [sel, day, el], element[0]);
                element.fire("dayclick", {
                    sel: sel,
                    day: day,
                    el: el
                })
            },
            onMonthChange: o.onMonthChange,
            onYearChange: o.onYearChange
        });

        this.calendar = cal;

        if (o.clearButton === true) {
            clearButton = $("<button>").addClass("button input-clear-button").attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.appendTo(buttons);
        }

        calendarButton = $("<button>").addClass("button").attr("tabindex", -1).attr("type", "button").html(o.calendarButtonIcon);
        calendarButton.appendTo(buttons);

        if (o.prepend !== "") {
            var prepend = $("<div>").html(o.prepend);
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl");
        }

        if (String(o.size).indexOf("%") > -1) {
            container.css({
                width: o.size
            });
        } else {
            container.css({
                width: parseInt(o.size) + "px"
            });
        }

        element[0].className = '';

        if (o.copyInlineStyles === true) {
            $.each(Utils.getInlineStyles(element), function(key, value){
                container.css(key, value);
            });
        }

        container.addClass(o.clsPicker);
        element.addClass(o.clsInput);

        if (o.dialogOverlay === true) {
            this.overlay = that._overlay();
        }

        if (o.dialogMode === true) {
            container.addClass("dialog-mode");
        } else {
            if (Utils.media("(max-width: "+o.dialogPoint+"px)")) {
                container.addClass("dialog-mode");
            }
        }

        if (element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }

    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.parent();
        var clear = container.find(".input-clear-button");
        var cal = this.calendar;
        var cal_plugin = Metro.getPlugin(cal[0], 'calendar');

        $(window).on(Metro.events.resize, function(){
            if (o.dialogMode !== true) {
                if (Utils.media("(max-width: " + o.dialogPoint + "px)")) {
                    container.addClass("dialog-mode");
                } else {
                    container.removeClass("dialog-mode");
                }
            }
        }, {ns: container.attr("id")});

        if (clear.length > 0) clear.on(Metro.events.click, function(e){
            element.val("").trigger('change').blur(); // TODO change blur
            that.value = null;
            e.preventDefault();
            e.stopPropagation();
        });

        container.on(Metro.events.click, "button, input", function(e){

            var value = Utils.isValue(that.value) ? that.value : new Date();

            value.setHours(0,0,0,0);

            if (cal.hasClass("open") === false && cal.hasClass("open-up") === false) {

                $(".calendar-picker .calendar").removeClass("open open-up").hide();

                cal_plugin.setPreset([value]);
                cal_plugin.setShow(value);
                cal_plugin.setToday(value);

                if (container.hasClass("dialog-mode")) {
                    that.overlay.appendTo($('body'));
                }
                cal.addClass("open");
                if (Utils.isOutsider(cal) === false) {
                    cal.addClass("open-up");
                }
                Utils.exec(o.onCalendarShow, [element, cal], cal);
                element.fire("calendarshow", {
                    calendar: cal
                });

            } else {

                that._removeOverlay();
                cal.removeClass("open open-up");
                Utils.exec(o.onCalendarHide, [element, cal], cal);
                element.fire("calendarhide", {
                    calendar: cal
                });

            }
            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.blur, function(){container.removeClass("focused");});
        element.on(Metro.events.focus, function(){container.addClass("focused");});
        element.on(Metro.events.change, function(){
            Utils.exec(o.onChange, [that.value], element[0]);
        });

        container.on(Metro.events.click, function(e){
            e.preventDefault();
            e.stopPropagation();
        })
    },

    _overlay: function(){
        var o = this.options;

        var overlay = $("<div>");
        overlay.addClass("overlay for-calendar-picker").addClass(o.clsOverlay);

        if (o.overlayColor === 'transparent') {
            overlay.addClass("transparent");
        } else {
            overlay.css({
                background: Utils.hex2rgba(o.overlayColor, o.overlayAlpha)
            });
        }

        return overlay;
    },

    _removeOverlay: function(){
        $('body').find('.overlay.for-calendar-picker').remove();
    },

    val: function(v){
        var element = this.element, o = this.options;

        if (Utils.isNull(v)) {
            return this.value;
        }

        if (Utils.isDate(v, o.inputFormat) === true) {
            Metro.getPlugin(this.calendar[0],"calendar").clearSelected();
            this.value = typeof v === 'string' ? o.inputFormat ? v.toDate(o.inputFormat, o.locale) : new Date(v) : v;
            if (Utils.isValue(this.value)) this.value.setHours(0,0,0,0);
            element.val(this.value.format(o.format, o.locale));
            element.trigger("change");
        }
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    i18n: function(val){
        var o = this.options;
        var hidden;
        var cal = this.calendar;
        if (val === undefined) {
            return o.locale;
        }
        if (Metro.locales[val] === undefined) {
            return false;
        }

        hidden = cal[0].hidden;
        if (hidden) {
            cal.css({
                visibility: "hidden",
                display: "block"
            });
        }
        Metro.getPlugin(cal[0], 'calendar').i18n(val);
        if (hidden) {
            cal.css({
                visibility: "visible",
                display: "none"
            });
        }
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element;
        var cal = Metro.getPlugin(this.calendar[0], "calendar");

        var changeAttrLocale = function(){
            that.i18n(element.attr("data-locale"));
        };

        var changeAttrSpecial = function(){
            cal.setSpecial(element.attr("data-special"));
        };

        var changeAttrExclude = function(){
            cal.setExclude(element.attr("data-exclude"));
        };

        var changeAttrMinDate = function(){
            cal.setMinDate(element.attr("data-min-date"));
        };

        var changeAttrMaxDate = function(){
            cal.setMaxDate(element.attr("data-max-date"));
        };

        var changeAttrValue = function(){
            that.val(element.attr("value"));
        };

        var changeDataValue = function(){
            that.val(element.attr("data-value"))
        };

        switch (attributeName) {
            case "value": changeAttrValue(); break;
            case 'disabled': this.toggleState(); break;
            case 'data-locale': changeAttrLocale(); break;
            case 'data-special': changeAttrSpecial(); break;
            case 'data-exclude': changeAttrExclude(); break;
            case 'data-min-date': changeAttrMinDate(); break;
            case 'data-max-date': changeAttrMaxDate(); break;
            case 'data-value': changeDataValue(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var container = element.parent();
        var clear = container.find(".input-clear-button");

        $(window).off(Metro.events.resize, {ns: container.attr("id")});
        clear.off(Metro.events.click);
        container.off(Metro.events.click, "button, input");
        element.off(Metro.events.blur);
        element.off(Metro.events.focus);
        element.off(Metro.events.change);

        Metro.getPlugin(this.calendar, "calendar").destroy();

        return element;
    }
});

$(document).on(Metro.events.click, ".overlay.for-calendar-picker",function(){
    $(this).remove();
    $(".calendar-for-picker.open").removeClass("open open-up");
});

$(document).on(Metro.events.click, function(){
    $(".calendar-picker .calendar").removeClass("open open-up");
});
