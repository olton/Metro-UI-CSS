var CalendarPicker = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = null;
        this.value_date = null;
        this.calendar = null;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onCalendarPickerCreate, [this.element]);

        return this;
    },

    dependencies: ['calendar'],

    options: {
        locale: METRO_LOCALE,
        size: "100%",
        format: "%Y/%m/%d",
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
        clsCalendar: "",
        clsCalendarHeader: "",
        clsCalendarContent: "",
        clsCalendarFooter: "",
        clsCalendarMonths: "",
        clsCalendarYears: "",
        clsToday: "",
        clsSelected: "",
        clsExcluded: "",
        ripple: false,
        rippleColor: "#cccccc",
        exclude: null,
        preset: null,
        minDate: null,
        maxDate: null,
        special: null,
        showHeader: true,
        showFooter: true,

        onDayClick: Metro.noop,
        onCalendarPickerCreate: Metro.noop,
        onCalendarShow: Metro.noop,
        onCalendarHide: Metro.noop,
        onChange: Metro.noop,
        onMonthChange: Metro.noop,
        onYearChange: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = JSON.parse(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });
    },

    _create: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("input " + element[0].className + " calendar-picker");
        var buttons = $("<div>").addClass("button-group");
        var calendarButton, clearButton, cal = $("<div>").addClass("drop-shadow");

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        this.value = element.val();
        if (Utils.isDate(this.value)) {
            this.value_date = new Date(this.value);
            this.value_date.setHours(0,0,0,0);
            element.val(this.value_date.format(o.format));
        }

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        buttons.appendTo(container);
        cal.appendTo(container);

        cal.calendar({
            pickerMode: true,
            show: o.value,
            locale: o.locale,
            weekStart: o.weekStart,
            outside: o.outside,
            buttons: false,
            headerFormat: o.headerFormat,
            clsCalendar: o.clsCalendar,
            clsCalendarHeader: o.clsCalendarHeader,
            clsCalendarContent: o.clsCalendarContent,
            clsCalendarFooter: o.clsCalendarFooter,
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
            showFooter: o.showFooter,
            onDayClick: function(sel, day, el){
                var date = new Date(sel[0]);
                that.value = date.format("%Y/%m/%d");
                that.value_date = date;
                element.val(date.format(o.format, o.locale));
                element.trigger("change");
                cal.removeClass("open open-up");
                cal.hide();
                Utils.exec(o.onChange, [that.value, that.value_date, element]);
                Utils.exec(o.onDayClick, [sel, day, el]);
            },
            onMonthChange: o.onMonthChange,
            onYearChange: o.onYearChange
        });

        cal.hide();

        this.calendar = cal;

        calendarButton = $("<button>").addClass("button").attr("tabindex", -1).attr("type", "button").html(o.calendarButtonIcon);
        calendarButton.appendTo(buttons);
        container.on(Metro.events.click, "button, input", function(e){
            if (Utils.isDate(that.value) && (cal.hasClass("open") === false && cal.hasClass("open-up") === false)) {
                cal.css({
                    visibility: "hidden",
                    display: "block"
                });
                cal.data('calendar').setPreset(that.value);
                cal.data('calendar').setShow(that.value);
                cal.data('calendar').setToday(that.value);
                cal.css({
                    visibility: "visible",
                    display: "none"
                });
            }
            if (cal.hasClass("open") === false && cal.hasClass("open-up") === false) {
                $(".calendar-picker .calendar").removeClass("open open-up").hide();
                cal.addClass("open");
                if (Utils.isOutsider(cal) === false) {
                    cal.addClass("open-up");
                }
                cal.show();
                Utils.exec(o.onCalendarShow, [element, cal]);
            } else {
                cal.removeClass("open open-up");
                cal.hide();
                Utils.exec(o.onCalendarHide, [element, cal]);
            }
            e.preventDefault();
            e.stopPropagation();
        });

        if (o.clearButton === true) {
            clearButton = $("<button>").addClass("button").attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.on(Metro.events.click, function () {
                element.val("").trigger('change');
            });
            clearButton.appendTo(buttons);
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
        element.attr("readonly", true);

        if (o.copyInlineStyles === true) {
            $.each(Utils.getInlineStyles(element), function(key, value){
                container.css(key, value);
            });
        }

        container.addClass(o.clsPicker);
        element.addClass(o.clsInput);

        element.on(Metro.events.blur, function(){container.removeClass("focused");});
        element.on(Metro.events.focus, function(){container.addClass("focused");});
        element.on(Metro.events.change, function(){
            Utils.exec(o.onChange, [that.value_date, that.value, element]);
        });
    },

    val: function(v){
        var that = this, element = this.element, o = this.options;

        if (v === undefined) {
            return this.value_date;
        }

        if (Utils.isDate(v) === true) {
            this.value_date = new Date(v);
            this.value = this.value_date.format(o.format);
            element.val(this.value_date.format(o.format));
            element.trigger("change");
        }
    },

    changeValue: function(){
        var that = this, element = this.element, o = this.options;
        this.val(element.attr("value"));
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
        if (this.element.data("disabled") === false) {
            this.disable();
        } else {
            this.enable();
        }
    },

    i18n: function(val){
        var that = this, element = this.element, o = this.options;
        var hidden = false;
        var cal = this.calendar;
        if (val === undefined) {
            return o.locale;
        }
        if (Metro.locales[val] === undefined) {
            return false;
        }

        hidden = cal.is(':hidden');
        if (hidden) {
            cal.css({
                visibility: "hidden",
                display: "block"
            });
        }
        cal.data('calendar').i18n(val);
        if (hidden) {
            cal.css({
                visibility: "visible",
                display: "none"
            });
        }
    },

    changeAttrLocale: function(){
        var that = this, element = this.element, o = this.options;
        this.i18n(element.attr("data-locale"));
    },

    changeAttrSpecial: function(){
        var that = this, element = this.element, o = this.options;
        var cal = this.calendar.data("calendar");
        cal.setSpecial(element.attr("data-special"));
    },

    changeAttrExclude: function(){
        var that = this, element = this.element, o = this.options;
        var cal = this.calendar.data("calendar");
        cal.setExclude(element.attr("data-exclude"));
    },

    changeAttrMinDate: function(){
        var that = this, element = this.element, o = this.options;
        var cal = this.calendar.data("calendar");
        cal.setMinDate(element.attr("data-min-date"));
    },

    changeAttrMaxDate: function(){
        var that = this, element = this.element, o = this.options;
        var cal = this.calendar.data("calendar");
        cal.setMaxDate(element.attr("data-max-date"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "value": this.changeValue(); break;
            case 'disabled': this.toggleState(); break;
            case 'data-locale': this.changeAttrLocale(); break;
            case 'data-special': this.changeAttrSpecial(); break;
            case 'data-exclude': this.changeAttrExclude(); break;
            case 'data-min-date': this.changeAttrMinDate(); break;
            case 'data-max-date': this.changeAttrMaxDate(); break;
        }
    }
};

Metro.plugin('calendarpicker', CalendarPicker);

$(document).on(Metro.events.click, function(e){
    $(".calendar-picker .calendar").removeClass("open open-up").hide();
});
