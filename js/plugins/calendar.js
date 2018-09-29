var Calendar = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.today = new Date();
        this.today.setHours(0,0,0,0);
        this.show = new Date();
        this.show.setHours(0,0,0,0);
        this.current = {
            year: this.show.getFullYear(),
            month: this.show.getMonth(),
            day: this.show.getDate()
        };
        this.preset = [];
        this.selected = [];
        this.exclude = [];
        this.special = [];
        this.min = null;
        this.max = null;
        this.locale = null;
        this.minYear = this.current.year - this.options.yearsBefore;
        this.maxYear = this.current.year + this.options.yearsAfter;
        this.offset = (new Date()).getTimezoneOffset() / 60 + 1;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        prevMonthIcon: "<span class='default-icon-chevron-left'></span>",
        nextMonthIcon: "<span class='default-icon-chevron-right'></span>",
        prevYearIcon: "<span class='default-icon-chevron-left'></span>",
        nextYearIcon: "<span class='default-icon-chevron-right'></span>",
        wide: false,
        widePoint: null,
        pickerMode: false,
        show: null,
        locale: METRO_LOCALE,
        weekStart: METRO_WEEK_START,
        outside: true,
        buttons: 'cancel, today, clear, done',
        yearsBefore: 100,
        yearsAfter: 100,
        headerFormat: "%A, %b %e",
        showHeader: true,
        showFooter: true,
        showTimeField: true,
        clsCalendar: "",
        clsCalendarHeader: "",
        clsCalendarContent: "",
        clsCalendarFooter: "",
        clsCalendarMonths: "",
        clsCalendarYears: "",
        clsToday: "",
        clsSelected: "",
        clsExcluded: "",
        clsCancelButton: "",
        clsTodayButton: "",
        clsClearButton: "",
        clsDoneButton: "",
        isDialog: false,
        ripple: false,
        rippleColor: "#cccccc",
        exclude: null,
        preset: null,
        minDate: null,
        maxDate: null,
        weekDayClick: false,
        multiSelect: false,
        special: null,
        format: METRO_DATE_FORMAT,
        inputFormat: null,
        onCancel: Metro.noop,
        onToday: Metro.noop,
        onClear: Metro.noop,
        onDone: Metro.noop,
        onDayClick: Metro.noop,
        onWeekDayClick: Metro.noop,
        onMonthChange: Metro.noop,
        onYearChange: Metro.noop,
        onCalendarCreate: Metro.noop
    },

    _setOptionsFromDOM: function(){
        var element = this.element, o = this.options;

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

        element.html("").addClass("calendar").addClass(o.clsCalendar);

        if (Utils.isValue(o.preset)) {
            this._dates2array(o.preset, 'selected');
        }

        if (Utils.isValue(o.exclude)) {
            this._dates2array(o.exclude, 'exclude');
        }

        if (Utils.isValue(o.special)) {
            this._dates2array(o.special, 'special');
        }

        if (o.buttons !== false) {
            if (Array.isArray(o.buttons) === false) {
                o.buttons = o.buttons.split(",").map(function(item){
                    return item.trim();
                });
            }
        }

        if (o.minDate !== null && Utils.isDate(o.minDate, o.inputFormat)) {
            this.min = Utils.isValue(o.inputFormat) ? o.minDate.toDate(o.inputFormat) : (new Date(o.minDate));
        }

        if (o.maxDate !== null && Utils.isDate(o.maxDate, o.inputFormat)) {
            this.max = Utils.isValue(o.inputFormat) ? o.maxDate.toDate(o.inputFormat) : (new Date(o.maxDate));
        }

        if (o.show !== null && Utils.isDate(o.show, o.inputFormat)) {
            this.show = Utils.isValue(o.inputFormat) ? o.show.toDate(o.inputFormat) : (new Date(o.show));
            this.show.setHours(0,0,0,0);
            this.current = {
                year: this.show.getFullYear(),
                month: this.show.getMonth(),
                day: this.show.getDate()
            }
        }

        this.locale = Metro.locales[o.locale] !== undefined ? Metro.locales[o.locale] : Metro.locales["en-US"];

        this._drawCalendar();
        this._bindEvents();

        if (o.wide === true) {
            element.addClass("calendar-wide");
        } else {
            if (!Utils.isNull(o.widePoint) && Utils.mediaExist(o.widePoint)) {
                element.addClass("calendar-wide");
            }
        }


        if (o.ripple === true && Utils.isFunc(element.ripple) !== false) {
            element.ripple({
                rippleTarget: ".button, .prev-month, .next-month, .prev-year, .next-year, .day",
                rippleColor: this.options.rippleColor
            });
        }

        Utils.exec(this.options.onCalendarCreate, [this.element]);
    },

    _dates2array: function(val, category){
        var that = this, o = this.options;
        var dates;

        if (Utils.isNull(val)) {
            return ;
        }

        dates = typeof val === 'string' ? Utils.strToArray(val) : val;

        $.each(dates, function(){
            var _d;

            if (!Utils.isDateObject(this)) {
                _d = Utils.isValue(o.inputFormat) ? this.toDate(o.inputFormat) : new Date(this);
                if (Utils.isDate(_d) === false) {
                    return ;
                }
                _d.setHours(0,0,0,0);
            } else {
                _d = this;
            }

            that[category].push(_d.getTime());
        });
    },

    _bindEvents: function(){
        var that = this, element = this.element, o = this.options;

        $(window).on(Metro.events.resize, function(){
            if (o.wide !== true) {
                if (!Utils.isNull(o.widePoint) && Utils.mediaExist(o.widePoint)) {
                    element.addClass("calendar-wide");
                } else {
                    element.removeClass("calendar-wide");
                }
            }
        });

        element.on(Metro.events.click, ".prev-month, .next-month, .prev-year, .next-year", function(e){
            var new_date, el = $(this);

            if (el.hasClass("prev-month")) {
                new_date = new Date(that.current.year, that.current.month - 1, 1);
                if (new_date.getFullYear() < that.minYear) {
                    return ;
                }
            }
            if (el.hasClass("next-month")) {
                new_date = new Date(that.current.year, that.current.month + 1, 1);
                if (new_date.getFullYear() > that.maxYear) {
                    return ;
                }
            }
            if (el.hasClass("prev-year")) {
                new_date = new Date(that.current.year - 1, that.current.month, 1);
                if (new_date.getFullYear() < that.minYear) {
                    return ;
                }
            }
            if (el.hasClass("next-year")) {
                new_date = new Date(that.current.year + 1, that.current.month, 1);
                if (new_date.getFullYear() > that.maxYear) {
                    return ;
                }
            }

            that.current = {
                year: new_date.getFullYear(),
                month: new_date.getMonth(),
                day: new_date.getDate()
            };
            setTimeout(function(){
                that._drawContent();
                if (el.hasClass("prev-month") || el.hasClass("next-month")) {
                    Utils.exec(o.onMonthChange, [that.current, element], element[0]);
                }
                if (el.hasClass("prev-year") || el.hasClass("next-year")) {
                    Utils.exec(o.onYearChange, [that.current, element], element[0]);
                }
            }, o.ripple ? 300 : 1);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".button.today", function(e){
            that.toDay();
            Utils.exec(o.onToday, [that.today, element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".button.clear", function(e){
            that.selected = [];
            that._drawContent();
            Utils.exec(o.onClear, [element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".button.cancel", function(e){
            that._drawContent();
            Utils.exec(o.onCancel, [element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".button.done", function(e){
            that._drawContent();
            Utils.exec(o.onDone, [that.selected, element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".week-days .day", function(e){
            if (o.weekDayClick === false || o.multiSelect === false) {
                return ;
            }
            var day = $(this);
            var index = day.index();
            var days = o.outside === true ? element.find(".days-row .day:nth-child("+(index + 1)+")") : element.find(".days-row .day:not(.outside):nth-child("+(index + 1)+")");
            $.each(days, function(){
                var d = $(this);
                var dd = d.data('day');
                Utils.arrayDelete(that.selected, dd);
                that.selected.push(dd);
                d.addClass("selected").addClass(o.clsSelected);
            });
            Utils.exec(o.onWeekDayClick, [that.selected, day, element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".days-row .day", function(e){
            var day = $(this);
            var index, date;

            date = day.data('day');
            index = that.selected.indexOf(date);

            if (day.hasClass("outside")) {
                date = new Date(date);
                that.current = {
                    year: date.getFullYear(),
                    month: date.getMonth(),
                    day: date.getDate()
                };
                that._drawContent();
                return ;
            }

            if (o.pickerMode === true) {
                that.selected = [date];
                that.today = new Date(date);
                that.current.year = that.today.getFullYear();
                that.current.month = that.today.getMonth();
                that.current.day = that.today.getDate();
                that._drawHeader();
                that._drawContent();
            } else {
                if (index === -1) {
                    if (o.multiSelect === false) {
                        element.find(".days-row .day").removeClass("selected").removeClass(o.clsSelected);
                        that.selected = [];
                    }
                    that.selected.push(date);
                    day.addClass("selected").addClass(o.clsSelected);
                } else {
                    day.removeClass("selected").removeClass(o.clsSelected);
                    Utils.arrayDelete(that.selected, date);
                }
            }

            Utils.exec(o.onDayClick, [that.selected, day, element]);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".curr-month", function(e){
            var target;
            var list = element.find(".months-list");

            list.find(".active").removeClass("active");
            list.scrollTop(0);
            element.find(".calendar-months").addClass("open");

            target = list.find(".js-month-"+that.current.month).addClass("active");

            setTimeout(function(){
                list.animate({
                    scrollTop: target.position().top - ( (list.height() - target.height() )/ 2)
                }, 200);
            }, 300);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".calendar-months li", function(e){
            that.current.month = $(this).index();
            that._drawContent();
            Utils.exec(o.onMonthChange, [that.current, element], element[0]);
            element.find(".calendar-months").removeClass("open");
            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".curr-year", function(e){
            var target;
            var list = element.find(".years-list");

            list.find(".active").removeClass("active");
            list.scrollTop(0);
            element.find(".calendar-years").addClass("open");

            target = list.find(".js-year-"+that.current.year).addClass("active");

            setTimeout(function(){
                list.animate({
                    scrollTop: target.position().top - ( (list.height() - target.height() )/ 2)
                }, 200);
            }, 300);

            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, ".calendar-years li", function(e){
            that.current.year = $(this).text();
            that._drawContent();
            Utils.exec(o.onYearChange, [that.current, element], element[0]);
            element.find(".calendar-years").removeClass("open");
            e.preventDefault();
            e.stopPropagation();
        });

        element.on(Metro.events.click, function(e){
            var months = element.find(".calendar-months");
            var years = element.find(".calendar-years");
            if (months.hasClass("open")) {
                months.removeClass("open");
            }
            if (years.hasClass("open")) {
                years.removeClass("open");
            }
            e.preventDefault();
            e.stopPropagation();
        });
    },

    _drawHeader: function(){
        var element = this.element, o = this.options;
        var header = element.find(".calendar-header");

        if (header.length === 0) {
            header = $("<div>").addClass("calendar-header").addClass(o.clsCalendarHeader).appendTo(element);
        }

        header.html("");

        $("<div>").addClass("header-year").html(this.today.getFullYear()).appendTo(header);
        $("<div>").addClass("header-day").html(this.today.format(o.headerFormat, o.locale)).appendTo(header);

        if (o.showHeader === false) {
            header.hide();
        }
    },

    _drawFooter: function(){
        var element = this.element, o = this.options;
        var buttons_locale = this.locale['buttons'];
        var footer = element.find(".calendar-footer");

        if (o.buttons === false) {
            return ;
        }

        if (footer.length === 0) {
            footer = $("<div>").addClass("calendar-footer").addClass(o.clsCalendarFooter).appendTo(element);
        }

        footer.html("");

        $.each(o.buttons, function(){
            var button = $("<button>").attr("type", "button").addClass("button " + this + " " + o['cls'+this.capitalize()+'Button']).html(buttons_locale[this]).appendTo(footer);
            if (this === 'cancel' || this === 'done') {
                button.addClass("js-dialog-close");
            }
        });

        if (o.showFooter === false) {
            footer.hide();
        }
    },

    _drawMonths: function(){
        var element = this.element, o = this.options;
        var months = $("<div>").addClass("calendar-months").addClass(o.clsCalendarMonths).appendTo(element);
        var list = $("<ul>").addClass("months-list").appendTo(months);
        var calendar_locale = this.locale['calendar'];
        var i;
        for(i = 0; i < 12; i++) {
            $("<li>").addClass("js-month-"+i).html(calendar_locale['months'][i]).appendTo(list);
        }
    },

    _drawYears: function(){
        var element = this.element, o = this.options;
        var years = $("<div>").addClass("calendar-years").addClass(o.clsCalendarYears).appendTo(element);
        var list = $("<ul>").addClass("years-list").appendTo(years);
        var i;
        for(i = this.minYear; i <= this.maxYear; i++) {
            $("<li>").addClass("js-year-"+i).html(i).appendTo(list);
        }
    },

    _drawContent: function(){
        var element = this.element, o = this.options;
        var content = element.find(".calendar-content"), toolbar;
        var calendar_locale = this.locale['calendar'];
        var i, j, d, s, counter = 0;
        var first = new Date(this.current.year, this.current.month, 1);
        var first_day;
        var prev_month_days = (new Date(this.current.year, this.current.month, 0)).getDate();
        var year, month;

        if (content.length === 0) {
            content = $("<div>").addClass("calendar-content").addClass(o.clsCalendarContent).appendTo(element);
        }

        content.html("");

        toolbar = $("<div>").addClass("calendar-toolbar").appendTo(content);

        /**
         * Calendar toolbar
         */
        $("<span>").addClass("prev-month").html(o.prevMonthIcon).appendTo(toolbar);
        $("<span>").addClass("curr-month").html(calendar_locale['months'][this.current.month]).appendTo(toolbar);
        $("<span>").addClass("next-month").html(o.nextMonthIcon).appendTo(toolbar);

        $("<span>").addClass("prev-year").html(o.prevYearIcon).appendTo(toolbar);
        $("<span>").addClass("curr-year").html(this.current.year).appendTo(toolbar);
        $("<span>").addClass("next-year").html(o.nextYearIcon).appendTo(toolbar);

        /**
         * Week days
         */
        var week_days = $("<div>").addClass("week-days").appendTo(content);
        for (i = 0; i < 7; i++) {
            if (o.weekStart === 0) {
                j = i;
            } else {
                j = i + 1;
                if (j === 7) j = 0;
            }
            $("<span>").addClass("day").html(calendar_locale["days"][j + 7]).appendTo(week_days);
        }

        /**
         * Calendar days
         */
        var days = $("<div>").addClass("days").appendTo(content);
        var days_row = $("<div>").addClass("days-row").appendTo(days);

        first_day = o.weekStart === 0 ? first.getDay() : (first.getDay() === 0 ? 6 : first.getDay() - 1);

        if (this.current.month - 1 < 0) {
            month = 11;
            year = this.current.year - 1;
        } else {
            month = this.current.month - 1;
            year = this.current.year;
        }

        for(i = 0; i < first_day; i++) {
            var v = prev_month_days - first_day + i + 1;
            d = $("<div>").addClass("day outside").appendTo(days_row);

            s = new Date(year, month, v);
            s.setHours(0,0,0,0);

            d.data('day', s.getTime());

            if (o.outside === true) {
                d.html(v);
            }

            counter++;
        }

        first.setHours(0,0,0,0);
        while(first.getMonth() === this.current.month) {

            d = $("<div>").addClass("day").html(first.getDate()).appendTo(days_row);

            d.data('day', first.getTime());

            // console.log(this.show.getTime() === first.getTime());
            if (this.show.getTime() === first.getTime()) {
                d.addClass("showed");
            }

            // console.log(this.today.getTime() === first.getTime());
            if (this.today.getTime() === first.getTime()) {
                d.addClass("today").addClass(o.clsToday);
            }

            if (this.special.length === 0) {

                if (this.selected.indexOf(first.getTime()) !== -1) {
                    d.addClass("selected").addClass(o.clsSelected);
                }
                if (this.exclude.indexOf(first.getTime()) !== -1) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }

                if (this.min !== null && first.getTime() < this.min.getTime()) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }
                if (this.max !== null && first.getTime() > this.max.getTime()) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }

            } else {

                if (this.special.indexOf(first.getTime()) === -1) {
                    d.addClass("disabled excluded").addClass(o.clsExcluded);
                }

            }

            counter++;
            if (counter % 7 === 0) {
                days_row = $("<div>").addClass("days-row").appendTo(days);
            }
            first.setDate(first.getDate() + 1);
            first.setHours(0,0,0,0);
        }

        first_day = o.weekStart === 0 ? first.getDay() : (first.getDay() === 0 ? 6 : first.getDay() - 1);

        if (this.current.month + 1 > 11) {
            month = 0;
            year = this.current.year + 1;
        } else {
            month = this.current.month + 1;
            year = this.current.year;
        }

        if (first_day > 0) for(i = 0; i < 7 - first_day; i++) {
            d = $("<div>").addClass("day outside").appendTo(days_row);
            s = new Date(year, month, i + 1);
            s.setHours(0,0,0,0);
            d.data('day', s.getTime());
            if (o.outside === true) {
                d.html(i + 1);
            }
        }
    },

    _drawCalendar: function(){
        var that = this;
        setTimeout(function(){
            that.element.html("");
            that._drawHeader();
            that._drawContent();
            that._drawFooter();
            that._drawMonths();
            that._drawYears();
        }, 1);
    },

    getPreset: function(){
        return this.preset;
    },

    getSelected: function(){
        return this.selected;
    },

    getExcluded: function(){
        return this.exclude;
    },

    getToday: function(){
        return this.today;
    },

    getCurrent: function(){
        return this.current;
    },

    clearSelected: function(){
        this.selected = [];
        this._drawContent();
    },

    toDay: function(){
        this.today = new Date();
        this.today.setHours(0,0,0,0);
        this.current = {
            year: this.today.getFullYear(),
            month: this.today.getMonth(),
            day: this.today.getDate()
        };
        this._drawHeader();
        this._drawContent();
    },

    setExclude: function(exclude){
        var that = this, element = this.element, o = this.options;
        if (Utils.isNull(exclude) && Utils.isNull(element.attr("data-exclude"))) {
            return ;
        }
        o.exclude = !Utils.isNull(exclude) ? exclude : element.attr("data-exclude");
        this._dates2array(o.exclude, 'exclude');
        this._drawContent();
    },

    setPreset: function(preset){
        var that = this, element = this.element, o = this.options;
        if (Utils.isNull(preset) && Utils.isNull(element.attr("data-preset"))) {
            return ;
        }

        o.preset = !Utils.isNull(preset) ? preset : element.attr("data-preset");
        this._dates2array(o.preset, 'selected');
        this._drawContent();
    },

    setSpecial: function(special){
        var that = this, element = this.element, o = this.options;
        if (Utils.isNull(special) && Utils.isNull(element.attr("data-special"))) {
            return ;
        }
        o.special = !Utils.isNull(special) ? special : element.attr("data-special");
        this._dates2array(o.exclude, 'special');
        this._drawContent();
    },

    setShow: function(show){
        var that = this, element = this.element, o = this.options;

        if (Utils.isNull(show) && Utils.isNull(element.attr("data-show"))) {
            return ;
        }
        o.show = !Utils.isNull(show) ? show : element.attr("data-show");

        this.show = Utils.isDateObject(show) ? show : Utils.isValue(o.inputFormat) ? o.show.toDate(o.inputFormat) : new Date(o.show);
        this.show.setHours(0,0,0,0);
        this.current = {
            year: this.show.getFullYear(),
            month: this.show.getMonth(),
            day: this.show.getDate()
        };

        this._drawContent();
    },

    setMinDate: function(date){
        var that = this, element = this.element, o = this.options;

        o.minDate = date !== null ? date : element.attr("data-min-date");

        this._drawContent();
    },

    setMaxDate: function(date){
        var that = this, element = this.element, o = this.options;

        o.maxDate = date !== null ? date : element.attr("data-max-date");

        this._drawContent();
    },

    setToday: function(val){
        var that = this, element = this.element, o = this.options;

        if (!Utils.isValue(val)) {
            val = new Date();
        }
        this.today = Utils.isDateObject(val) ? val : Utils.isValue(o.inputFormat) ? val.toDate(o.inputFormat) : new Date(val);
        this.today.setHours(0,0,0,0);
        this._drawHeader();
        this._drawContent();
    },

    i18n: function(val){
        var that = this, element = this.element, o = this.options;
        if (val === undefined) {
            return o.locale;
        }
        if (Metro.locales[val] === undefined) {
            return false;
        }
        o.locale = val;
        this.locale = Metro.locales[o.locale];
        this._drawCalendar();
    },

    changeAttrLocale: function(){
        var that = this, element = this.element, o = this.options;
        this.i18n(element.attr("data-locale"));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-exclude': this.setExclude(); break;
            case 'data-preset': this.setPreset(); break;
            case 'data-special': this.setSpecial(); break;
            case 'data-show': this.setShow(); break;
            case 'data-min-date': this.setMinDate(); break;
            case 'data-max-date': this.setMaxDate(); break;
            case 'data-locale': this.changeAttrLocale(); break;
        }
    },

    destroy: function(){
        var element = this.element, o = this.options;

        element.off(Metro.events.click, ".prev-month, .next-month, .prev-year, .next-year");
        element.off(Metro.events.click, ".button.today");
        element.off(Metro.events.click, ".button.clear");
        element.off(Metro.events.click, ".button.cancel");
        element.off(Metro.events.click, ".button.done");
        element.off(Metro.events.click, ".week-days .day");
        element.off(Metro.events.click, ".days-row .day");
        element.off(Metro.events.click, ".curr-month");
        element.off(Metro.events.click, ".calendar-months li");
        element.off(Metro.events.click, ".curr-year");
        element.off(Metro.events.click, ".calendar-years li");
        element.off(Metro.events.click);

        if (o.ripple === true) Metro.destroyPlugin(element, "ripple");

        element.html("");
    }
};

$(document).on(Metro.events.click, function(e){
    $('.calendar .calendar-years').each(function(){
        $(this).removeClass("open");
    });
    $('.calendar .calendar-months').each(function(){
        $(this).removeClass("open");
    });
});

Metro.plugin('calendar', Calendar);