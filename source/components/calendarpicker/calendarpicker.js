/* global Metro, METRO_LOCALE, METRO_WEEK_START, METRO_DATE_FORMAT */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
    var CalendarPickerDefaultConfig = {
        showTime: false,
        initialTime: null,
        initialHours: null,
        initialMinutes: null,
        clsCalendarTime: "",
        clsTime: "",
        clsTimeHours: "",
        clsTimeMinutes: "",
        clsTimeButton: "",
        clsTimeButtonPlus: "",
        clsTimeButtonMinus: "",

        label: "",
        value:'',
        calendarpickerDeferred: 0,
        nullValue: true,
        useNow: false,

        prepend: "",

        calendarWide: false,
        calendarWidePoint: null,


        dialogMode: false,
        dialogPoint: 640,
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
        clsPrepend: "",
        clsLabel: "",

        onDayClick: Metro.noop,
        onCalendarPickerCreate: Metro.noop,
        onCalendarShow: Metro.noop,
        onCalendarHide: Metro.noop,
        onChange: Metro.noop,
        onPickerChange: Metro.noop,
        onMonthChange: Metro.noop,
        onYearChange: Metro.noop
    };

    Metro.calendarPickerSetup = function (options) {
        CalendarPickerDefaultConfig = $.extend({}, CalendarPickerDefaultConfig, options);
    };

    if (typeof window["metroCalendarPickerSetup"] !== undefined) {
        Metro.calendarPickerSetup(window["metroCalendarPickerSetup"]);
    }

    Metro.Component('calendar-picker', {
        init: function( options, elem ) {
            this._super(elem, options, CalendarPickerDefaultConfig, {
                value: null,
                value_date: null,
                calendar: null,
                overlay: null,
                id: Utils.elementId("calendar-picker"),
                time: [new Date().getHours(), new Date().getMinutes()]
            });

            return this;
        },

        _create: function(){

            this._createStructure();
            this._createEvents();

            this._fireEvent("calendar-picker-create", {
                element: this.element
            });
        },

        _createStructure: function(){
            var that = this, element = this.element, o = this.options;
            var container = $("<div>").addClass("input " + element[0].className + " calendar-picker");
            var buttons = $("<div>").addClass("button-group");
            var calendarButton, clearButton, cal = $("<div>").addClass("drop-shadow");
            var curr, _curr, initTime, initHours, initMinutes, elementValue, h, m;
            var body = $("body");

            element.attr("type", "text");
            element.attr("autocomplete", "off");
            element.attr("readonly", true);

            if (Utils.isValue(o.initialTime)) {
                this.time = o.initialTime.trim().split(":");
            }

            if (Utils.isValue(o.initialHours)) {
                this.time[0] = parseInt(o.initialHours);
            }

            if (Utils.isValue(o.initialHours)) {
                this.time[1] = parseInt(o.initialMinutes);
            }

            curr = (""+o.value).trim() !== '' ? o.value : element.val().trim();

            if (!Utils.isValue(curr)) {
                if (o.useNow) {
                    this.value = new Date();
                    this.time = [this.value.getHours(), this.value.getMinutes()];
                }
            } else {
                _curr = curr.split(" ");
                this.value = !Utils.isValue(o.inputFormat) ? new Date(_curr[0]) : _curr[0].toDate(o.inputFormat, o.locale);
                if (_curr[1]) {
                    this.time = _curr[1].trim().split(":");
                }
            }

            if (Utils.isValue(this.value)) this.value.setHours(0,0,0,0);

            elementValue = !Utils.isValue(curr) && o.nullValue === true ? "" : that.value.format(o.format, o.locale);

            if (o.showTime && this.time && elementValue) {
                h = Utils.lpad(this.time[0], "0", 2);
                m = Utils.lpad(this.time[1], "0", 2);
                elementValue += " " + h + ":" + m;
            }

            element.val(elementValue);

            container.insertBefore(element);
            element.appendTo(container);
            buttons.appendTo(container);
            cal.appendTo(o.dialogMode ? body : container);

            if (this.time && this.time.length) {
                initHours = this.time[0];
                if (typeof this.time[1] !== "undefined")
                    initMinutes = this.time[1];
            }

            initTime = o.initialTime;

            if (o.initialHours) {
                initHours = o.initialHours;
            }

            if (o.initialHours) {
                initMinutes = o.initialMinutes;
            }

            Metro.makePlugin(cal, "calendar", {
                showTime: o.showTime,
                initialTime: initTime,
                initialHours: initHours,
                initialMinutes: initMinutes,
                clsCalendarTime: o.clsCalendarTime,
                clsTime: o.clsTime,
                clsTimeHours: o.clsTimeHours,
                clsTimeMinutes: o.clsTimeMinutes,
                clsTimeButton: o.clsTimeButton,
                clsTimeButtonPlus: o.clsTimeButtonPlus,
                clsTimeButtonMinus: o.clsTimeButtonMinus,

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
                onDayClick: function(sel, day, time, el){
                    var date = new Date(sel[0]);
                    var elementValue, h, m;

                    date.setHours(0,0,0,0);

                    that._removeOverlay();

                    that.value = date;
                    that.time = time;

                    elementValue = date.format(o.format, o.locale);

                    if (o.showTime) {
                        h = Utils.lpad(time[0], "0", 2);
                        m = Utils.lpad(time[1], "0", 2);
                        elementValue += " " + h + ":" + m;
                    }

                    element.val(elementValue);
                    element.trigger("change");
                    cal.removeClass("open open-up");
                    cal.hide();

                    that._fireEvent("change", {
                        val: that.value,
                        time: that.time
                    });

                    that._fireEvent("day-click", {
                        sel: sel,
                        day: day,
                        time: time,
                        el: el
                    });

                    that._fireEvent("picker-change", {
                        val: that.value,
                        time: that.time
                    });
                },
                onTimeChange: function(time){
                    var elementValue, h, m;

                    that.time = time;

                    if (!that.value) {
                        that.value = new Date();
                    }
                    elementValue = that.value.format(o.format, o.locale);

                    if (o.showTime) {
                        h = Utils.lpad(time[0], "0", 2);
                        m = Utils.lpad(time[1], "0", 2);
                        elementValue += " " + h + ":" + m;
                    }

                    element.val(elementValue);

                    that._fireEvent("change", {
                        val: that.value,
                        time: that.time
                    });

                    that._fireEvent("picker-change", {
                        val: that.value,
                        time: that.time
                    });
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
                    this.calendar.addClass("dialog-mode");
                }
            }

            if (o.label) {
                var label = $("<label>").addClass("label-for-input").addClass(o.clsLabel).html(o.label).insertBefore(container);
                if (element.attr("id")) {
                    label.attr("for", element.attr("id"));
                }
                if (element.attr("dir") === "rtl") {
                    label.addClass("rtl");
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
            var calendar = this.calendar;

            $(window).on(Metro.events.resize, function(){
                if (o.dialogMode !== true) {
                    if (Utils.media("(max-width: " + o.dialogPoint + "px)")) {
                        container.addClass("dialog-mode");
                        calendar.appendTo("body").addClass("dialog-mode");
                    } else {
                        container.removeClass("dialog-mode");
                        calendar.appendTo(container).removeClass("dialog-mode");
                    }
                }
            }, {ns: this.id});

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
                    if (!Utils.inViewport(cal[0])) {
                        cal.addClass("open-up");
                    }
                    // if (Utils.isOutsider(cal) === false) {
                    //     cal.addClass("open-up");
                    // }

                    that._fireEvent("calendar-show", {
                        calendar: cal
                    });

                } else {

                    that._removeOverlay();
                    cal.removeClass("open open-up");

                    that._fireEvent("calendar-hide", {
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
                    background: Metro.colors.toRGBA(o.overlayColor, o.overlayAlpha)
                });
            }

            return overlay;
        },

        _removeOverlay: function(){
            $('body').find('.overlay.for-calendar-picker').remove();
        },

        val: function(v){
            var element = this.element, o = this.options;
            var elementValue, h, m;

            if (Utils.isNull(v) || arguments.length === 0)  {
                return {
                    date: this.value,
                    time: this.time
                };
            }

            if (!Utils.isDate(v, o.format) && !Utils.isDateObject(v)) {
                throw new Error(v + " is a not valid date value");
            }

            var _curr = v.split(" ");
            this.value = Utils.isValue(o.inputFormat) === false ? new Date(_curr[0]) : _curr[0].toDate(o.inputFormat, o.locale);
            if (_curr[1]) {
                this.time = _curr[1].trim().split(":");
            }

            this.value.setHours(0,0,0,0);
            this.calendar.data('calendar').setTime(this.time);

            elementValue = this.value.format(o.format);

            if (o.showTime && this.time && elementValue) {
                h = Utils.lpad(this.time[0], "0", 2);
                m = Utils.lpad(this.time[1], "0", 2);
                elementValue += " " + h + ":" + m;
            }

            element.val(elementValue);
            element.trigger("change");
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

        getTime: function(asString){
            var h, m;

            asString = asString || false;

            h = Utils.lpad(this.time[0], "0", 2);
            m = Utils.lpad(this.time[1], "0", 2);

            return asString ? h +":"+ m : this.time;
        },

        changeAttribute: function(attributeName, newValue){
            var that = this;
            var cal = Metro.getPlugin(this.calendar[0], "calendar");

            switch (attributeName) {
                case "value": that.val(newValue); break;
                case 'disabled': this.toggleState(); break;
                case 'data-locale': that.i18n(newValue); break;
                case 'data-special': cal.setSpecial(newValue); break;
                case 'data-exclude': cal.setExclude(newValue); break;
                case 'data-min-date': cal.setMinDate(newValue); break;
                case 'data-max-date': cal.setMaxDate(newValue); break;
                case 'data-value': that.val(newValue); break;
            }
        },

        destroy: function(){
            var element = this.element;
            var container = element.parent();
            var clear = container.find(".input-clear-button");

            $(window).off(Metro.events.resize, {ns: this.id});
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
}(Metro, m4q));