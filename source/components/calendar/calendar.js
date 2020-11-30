/* global Metro, METRO_LOCALE, METRO_WEEK_START, METRO_DATE_FORMAT */
(function(Metro, $) {
    'use strict';
    var Utils = Metro.utils;
    var CalendarDefaultConfig = {
        showCoincidentalDay: true,
        events: null,
        startContent: "days",
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
        labelTimeHours: null,
        labelTimeMinutes: null,

        animationContent: true,
        animationSpeed: 10,

        calendarDeferred: 0,
        dayBorder: false,
        excludeDay: null,
        prevMonthIcon: "<span class='default-icon-chevron-left'></span>",
        nextMonthIcon: "<span class='default-icon-chevron-right'></span>",
        prevYearIcon: "<span class='default-icon-chevron-left'></span>",
        nextYearIcon: "<span class='default-icon-chevron-right'></span>",
        compact: false,
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
        showWeekNumber: false,
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
        clsEventCounter: "",
        isDialog: false,
        ripple: false,
        rippleColor: "#cccccc",
        exclude: null,
        preset: null,
        minDate: null,
        maxDate: null,
        weekDayClick: false,
        weekNumberClick: false,
        multiSelect: false,
        special: null,
        format: METRO_DATE_FORMAT,
        inputFormat: null,
        onCancel: Metro.noop,
        onToday: Metro.noop,
        onClear: Metro.noop,
        onDone: Metro.noop,
        onDayClick: Metro.noop,
        onDrawDay: Metro.noop,
        onDrawMonth: Metro.noop,
        onDrawYear: Metro.noop,
        onWeekDayClick: Metro.noop,
        onWeekNumberClick: Metro.noop,
        onMonthChange: Metro.noop,
        onYearChange: Metro.noop,
        onTimeChange: Metro.noop,
        onHoursChange: Metro.noop,
        onMinutesChange: Metro.noop,
        onCalendarCreate: Metro.noop
    };

    Metro.calendarSetup = function (options) {
        CalendarDefaultConfig = $.extend({}, CalendarDefaultConfig, options);
    };

    if (typeof window["metroCalendarSetup"] !== undefined) {
        Metro.calendarSetup(window["metroCalendarSetup"]);
    }

    Metro.Component('calendar', {
        init: function( options, elem ) {

            var now = new Date();
            now.setHours(0,0,0,0);

            this._super(elem, options, CalendarDefaultConfig, {
                today: now,
                show: now,
                current: {
                    year: now.getFullYear(),
                    month: now.getMonth(),
                    day: now.getDate()
                },
                preset: [],
                selected: [],
                exclude: [],
                special: [],
                excludeDay: [],
                events: [],
                min: null,
                max: null,
                locale: null,
                minYear: null,
                maxYear: null,
                offset: null,
                id: Utils.elementId("calendar"),
                time: [new Date().getHours(), new Date().getMinutes()],
                content: "days",
                yearDistance: 11,
                yearGroupStart: now.getFullYear()
            });

            return this;
        },

        _create: function(){
            var element = this.element, o = this.options;

            this.content = o.startContent;
            this.minYear = this.current.year - this.options.yearsBefore;
            this.maxYear = this.current.year + this.options.yearsAfter;
            this.offset = (new Date()).getTimezoneOffset() / 60 + 1;

            element.html("").addClass("calendar " + (o.compact === true ? "compact" : "")).addClass(o.clsCalendar);

            if (Utils.isValue(o.initialTime)) {
                this.time = o.initialTime.split(":");
            }

            if (Utils.isValue(o.initialHours) && Utils.between(o.initialHours, 0, 23, true)) {
                this.time[0] = parseInt(o.initialHours);
            }

            if (Utils.isValue(o.initialMinutes) && Utils.between(o.initialMinutes, 0, 59, true)) {
                this.time[1] = parseInt(o.initialMinutes);
            }

            if (o.dayBorder === true) {
                element.addClass("day-border");
            }

            if (Utils.isValue(o.excludeDay)) {
                this.excludeDay = (""+o.excludeDay).toArray(",", "int");
            }

            if (Utils.isValue(o.preset)) {
                this._dates2array(o.preset, 'selected');
            }

            if (Utils.isValue(o.exclude)) {
                this._dates2array(o.exclude, 'exclude');
            }

            if (Utils.isValue(o.special)) {
                this._dates2array(o.special, 'special');
            }

            if (Utils.isValue(o.events)) {
                this._dates2array(o.events, 'events');
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
            this._createEvents();

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

            this._fireEvent("calendar-create");
        },

        _dates2array: function(val, category){
            var that = this, o = this.options;
            var dates;

            if (Utils.isNull(val)) {
                return ;
            }

            dates = typeof val === 'string' ? val.toArray() : val;

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

        _createEvents: function(){
            var that = this, element = this.element, o = this.options;

            $(window).on(Metro.events.resize, function(){
                if (o.wide !== true) {
                    if (!Utils.isNull(o.widePoint) && Utils.mediaExist(o.widePoint)) {
                        element.addClass("calendar-wide");
                    } else {
                        element.removeClass("calendar-wide");
                    }
                }
            }, {ns: this.id});

            element.on(Metro.events.click, ".prev-year-group, .next-year-group", function(){
                if ($(this).hasClass("prev-year-group")) {
                    that.yearGroupStart -= that.yearDistance;
                } else {
                    that.yearGroupStart += that.yearDistance;
                }
                that._drawContent();
            });

            element.on(Metro.events.click, ".prev-month, .next-month, .prev-year, .next-year", function(){
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
                        that._fireEvent("month-change", {
                            current: that.current
                        });
                    }
                    if (el.hasClass("prev-year") || el.hasClass("next-year")) {
                        that._fireEvent("year-change", {
                            current: that.current
                        });
                    }
                }, o.ripple ? 300 : 1);
            });

            element.on(Metro.events.click, ".button.today", function(){
                that.toDay();
                that._fireEvent("today", {
                    today: that.today,
                    time: that.time
                });
            });

            element.on(Metro.events.click, ".button.clear", function(){
                that.selected = [];
                that.time = [new Date().getHours(), new Date().getMinutes()];
                that.yearGroupStart = new Date().getFullYear();
                that._drawContent();
                that._fireEvent("clear");
            });

            element.on(Metro.events.click, ".button.cancel", function(){
                that._drawContent();
                that._fireEvent("cancel");
            });

            element.on(Metro.events.click, ".button.done", function(){
                that._drawContent();
                that._fireEvent("done", {
                    selected: that.selected,
                    time: that.time
                });
            });

            if (o.weekDayClick === true) {
                element.on(Metro.events.click, ".week-days .day", function (e) {
                    var day, index, days;

                    day = $(this);
                    index = day.index();

                    if (o.multiSelect === true) {
                        days = o.outside === true ? element.find(".days-row .day:nth-child(" + (index + 1) + ")") : element.find(".days-row .day:not(.outside):nth-child(" + (index + 1) + ")");
                        $.each(days, function () {
                            var d = $(this);
                            var dd = d.data('day');

                            if (d.hasClass("disabled") || d.hasClass("excluded")) return;

                            if (!that.selected.contains(dd))
                                that.selected.push(dd);
                            d.addClass("selected").addClass(o.clsSelected);
                        });
                    }

                    that._fireEvent("week-day-click", {
                        selected: that.selected,
                        day: day
                    });

                    e.preventDefault();
                    e.stopPropagation();
                });
            }

            if (o.weekNumberClick) {
                element.on(Metro.events.click, ".days-row .week-number", function (e) {
                    var weekNumElement, weekNumber, days;

                    weekNumElement = $(this);
                    weekNumber = weekNumElement.text();

                    if (o.multiSelect === true) {
                        days = $(this).siblings(".day");
                        $.each(days, function () {
                            var d = $(this);
                            var dd = d.data('day');

                            if (d.hasClass("disabled") || d.hasClass("excluded")) return;

                            if (!that.selected.contains(dd))
                                that.selected.push(dd);
                            d.addClass("selected").addClass(o.clsSelected);
                        });
                    }

                    that._fireEvent("week-number-click", {
                        selected: that.selected,
                        num: weekNumber,
                        numElement: weekNumElement
                    });

                    e.preventDefault();
                    e.stopPropagation();
                });
            }

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

                    that._fireEvent("month-change", {
                        current: that.current
                    });

                    return ;
                }

                if (!day.hasClass("disabled")) {

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

                }

                that._fireEvent("day-click", {
                    selected: that.selected,
                    day: day,
                    time: that.time
                });

                e.preventDefault();
                e.stopPropagation();
            });

            element.on(Metro.events.click, ".curr-month", function(e){
                that.content = "months";
                that._drawContent();

                e.preventDefault();
                e.stopPropagation();
            });

            element.on(Metro.events.click, ".month", function(e){
                that.current.month = parseInt($(this).attr("data-month"));
                that.content = "days";
                that._drawContent();

                that._fireEvent("month-change", {
                    current: that.current
                });

                e.preventDefault();
                e.stopPropagation();
            });

            element.on(Metro.events.click, ".curr-year", function(e){
                if (that.content === "years") {
                    return ;
                }
                that.content = "years";
                that._drawContent();

                e.preventDefault();
                e.stopPropagation();
            });

            element.on(Metro.events.click, ".year", function(e){
                that.current.year = parseInt($(this).attr("data-year"));
                that.yearGroupStart = that.current.year;
                that.content = "months";
                that._drawContent();

                that._fireEvent("year-change", {
                    current: that.current
                });

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

        _drawTime: function(){
            var that = this, element = this.element, o = this.options;
            var calendarContent = element.find(".calendar-content");
            var time = $("<div>").addClass("calendar-time").addClass(o.clsCalendarTime).appendTo(calendarContent);
            var inner, hours, minutes, row;
            var h = ""+this.time[0];
            var m = ""+this.time[1];
            var locale = this.locale['calendar']['time'];

            var onChange = function(val){
                var value = parseInt(val);
                if ($(this).attr("data-time-part") === "hours") {
                    that.time[0] = value;
                    that._fireEvent("hours-change", {
                        time: that.time,
                        hours: value
                    });
                } else {
                    that.time[1] = value;
                    that._fireEvent("minutes-change", {
                        time: that.time,
                        minutes: value
                    });
                }

                that._fireEvent("time-change", {
                    time: that.time
                });
            }

            time.append( inner = $("<div>").addClass("calendar-time__inner") );

            inner.append( row = $("<div>").addClass("calendar-time__inner-row") );
            row.append( $("<div>").addClass("calendar-time__inner-cell").append( $("<span>").html(o.labelTimeHours || locale['hours']) ));
            row.append( $("<div>").addClass("calendar-time__inner-cell").append( $("<span>").html(o.labelTimeMinutes || locale['minutes']) ));

            time.append( inner = $("<div>").addClass("calendar-time__inner spinners").addClass(o.clsTime) );
            inner.append( hours = $("<input type='text' data-cls-spinner-input='"+o.clsTimeHours+"' data-time-part='hours' data-buttons-position='right' data-min-value='0' data-max-value='23'>").addClass("hours").addClass(o.compact ? "input-small" : "input-normal") );
            inner.append( minutes = $("<input type='text' data-cls-spinner-input='"+o.clsTimeMinutes+"' data-time-part='minutes' data-buttons-position='right' data-min-value='0' data-max-value='59'>").addClass("minutes").addClass(o.compact ? "input-small" : "input-normal") );

            h = Utils.lpad(h, "0", 2);
            m = Utils.lpad(m, "0", 2);

            hours.val(h);
            minutes.val(m);

            inner.find("input[type=text]").spinner({
                onChange: onChange,
                clsSpinnerButton: o.clsTimeButton,
                clsSpinnerButtonPlus: o.clsTimeButtonPlus,
                clsSpinnerButtonMinus: o.clsTimeButtonMinus
            });

            if (o.showTime === false) {
                time.hide();
            }
        },

        _drawContentDays: function(){
            var element = this.element, o = this.options;
            var content = element.find(".calendar-content"), toolbar;
            var calendar_locale = this.locale['calendar'];
            var i, j, d, s, counter = 0;
            var first = new Date(this.current.year, this.current.month, 1);
            var first_day, first_time, today = {
                year: this.today.getFullYear(),
                month: this.today.getMonth(),
                day: this.today.getDate(),
                time: this.today.getTime()
            };
            var prev_month_days = (new Date(this.current.year, this.current.month, 0)).getDate();
            var year, month, eventsCount, totalDays = 0;
            var min_time = this.min ? this.min.getTime() : null,
                max_time = this.max ? this.max.getTime() : null,
                show_time= this.show ? this.show.getTime() : null;

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
            var day_class = "day";

            if (o.showWeekNumber === true) {
                $("<span>").addClass("week-number").html("#").appendTo(week_days);
                day_class += " and-week-number";
            }

            for (i = 0; i < 7; i++) {
                if (o.weekStart === 0) {
                    j = i;
                } else {
                    j = i + 1;
                    if (j === 7) j = 0;
                }
                $("<span>").addClass(day_class).html(calendar_locale["days"][j + 7]).appendTo(week_days);
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

            if (o.showWeekNumber === true) {
                $("<div>").addClass("week-number").html((new Date(year, month, prev_month_days - first_day + 1)).getWeek(o.weekStart)).appendTo(days_row);
            }

            // Days for previous month
            for(i = 0; i < first_day; i++) {
                var v = prev_month_days - first_day + i + 1;
                d = $("<div>").addClass(day_class+" outside").appendTo(days_row);
                totalDays++;
                if (o.animationContent) {
                    d.addClass("to-animate");
                }

                s = new Date(year, month, v);
                s.setHours(0,0,0,0);

                d.data('day', s.getTime());

                if (o.outside === true) {
                    d.html(v);

                    if (this.excludeDay.length > 0) {
                        if (this.excludeDay.indexOf(s.getDay()) > -1) {
                            d.addClass("disabled excluded").addClass(o.clsExcluded);
                        }
                    }

                    this._fireEvent("draw-day", {
                        date: s,
                        day: s.getDate(),
                        month: s.getMonth(),
                        year: s.getFullYear(),
                        cell: d[0]
                    });
                }

                counter++;
            }

            // Days for current month
            first.setHours(0,0,0,0);

            while(first.getMonth() === this.current.month) {
                first_time = first.getTime();

                d = $("<div>").addClass(day_class).html(first.getDate()).appendTo(days_row);

                totalDays++;

                if (o.animationContent) {
                    d.addClass("to-animate");
                }

                if (first.getDate() === today.day && first_time !== today.time && o.showCoincidentalDay) {
                    d.addClass("coincidental");
                }

                d.data('day', first_time);

                if (show_time && show_time === first_time) {
                    d.addClass("showed");
                }

                if (today.time === first_time) {
                    d.addClass("today").addClass(o.clsToday);
                }

                if (this.special.length === 0) {

                    if (this.selected.length && this.selected.indexOf(first_time) !== -1) {
                        d.addClass("selected").addClass(o.clsSelected);
                    }
                    if (this.exclude.length && this.exclude.indexOf(first_time) !== -1) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }

                    if (min_time && first_time < min_time) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }
                    if (max_time && first_time > max_time) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }

                    if (this.excludeDay.length > 0) {
                        if (this.excludeDay.indexOf(first.getDay()) > -1) {
                            d.addClass("disabled excluded").addClass(o.clsExcluded);
                        }
                    }
                } else {

                    if (this.special.length && this.special.indexOf(first_time) === -1) {
                        d.addClass("disabled excluded").addClass(o.clsExcluded);
                    }

                }

                if (this.events.length) {
                    eventsCount = 0;
                    $.each(this.events, function(){
                        if (this === first_time) {
                            eventsCount++;
                        }
                    });

                    if (eventsCount) {
                        d.append( $("<div>").addClass("badge inside").addClass(o.clsEventCounter).html(eventsCount) );
                    }
                }

                this._fireEvent("draw-day", {
                    date: first,
                    day: first.getDate(),
                    month: first.getMonth(),
                    year: first.getFullYear(),
                    cell: d[0]
                });

                counter++;
                if (counter % 7 === 0) {
                    days_row = $("<div>").addClass("days-row").appendTo(days);
                    if (o.showWeekNumber === true) {
                        $("<div>").addClass("week-number").html((new Date(first.getFullYear(), first.getMonth(), first.getDate() + 1)).getWeek(o.weekStart)).appendTo(days_row);
                    }
                }
                first.setDate(first.getDate() + 1);
                first.setHours(0,0,0,0);
            }

            // Days for next month
            //first_day = o.weekStart === 0 ? first.getDay() : (first.getDay() === 0 ? 6 : first.getDay() - 1);

            if (this.current.month + 1 > 11) {
                month = 0;
                year = this.current.year + 1;
            } else {
                month = this.current.month + 1;
                year = this.current.year;
            }

//            if (first_day > 0) for(i = 0; i < 7 - first_day; i++) {
            for(i = 0; i < 42 - totalDays; i++) {
                d = $("<div>").addClass(day_class+" outside").appendTo(days_row);

                if (o.animationContent) {
                    d.addClass("to-animate");
                }

                s = new Date(year, month, i + 1);
                s.setHours(0,0,0,0);
                d.data('day', s.getTime());
                if (o.outside === true) {
                    d.html(i + 1);

                    if (this.excludeDay.length > 0) {
                        if (this.excludeDay.indexOf(s.getDay()) > -1) {
                            d.addClass("disabled excluded").addClass(o.clsExcluded);
                        }
                    }

                    this._fireEvent("draw-day", {
                        date: s,
                        day: s.getDate(),
                        month: s.getMonth(),
                        year: s.getFullYear(),
                        cell: d[0]
                    });

                }

                counter++;
                if (counter % 7 === 0) {
                    days_row = $("<div>").addClass("days-row").appendTo(days);
                    if (o.showWeekNumber === true) {
                        $("<div>").addClass("week-number").html((new Date(first.getFullYear(), first.getMonth(), first.getDate() + 1)).getWeek(o.weekStart)).appendTo(days_row);
                    }
                }

            }

            this._drawTime();
            this._animateContent(".days .day");
        },

        _drawContentMonths: function(){
            var element = this.element, o = this.options;
            var content = element.find(".calendar-content");
            var locale = this.locale['calendar']['months'];
            var toolbar, months, month, yearToday = new Date().getFullYear(), monthToday = new Date().getMonth();

            if (content.length === 0) {
                content = $("<div>").addClass("calendar-content").addClass(o.clsCalendarContent).appendTo(element);
            }

            content.clear();

            toolbar = $("<div>").addClass("calendar-toolbar").appendTo(content);

            /**
             * Calendar toolbar
             */

            $("<span>").addClass("prev-year").html(o.prevYearIcon).appendTo(toolbar);
            $("<span>").addClass("curr-year").html(this.current.year).appendTo(toolbar);
            $("<span>").addClass("next-year").html(o.nextYearIcon).appendTo(toolbar);

            content.append( months = $("<div>").addClass("months") );

            for(var i = 12; i < 24; i++) {
                months.append(
                    month = $("<div>")
                        .attr("data-month", i - 12)
                        .addClass("month")
                        .addClass(i - 12 === monthToday && this.current.year === yearToday ? "today" : "")
                        .html(locale[i])
                );

                if (o.animationContent) {
                    month.addClass("to-animate");
                }

                this._fireEvent("draw-month", {
                    month: i - 12,
                    year: this.current.year,
                    cell: month[0]
                });
            }

            this._animateContent(".months .month");
        },

        _drawContentYears: function(){
            var element = this.element, o = this.options;
            var content = element.find(".calendar-content");
            var toolbar, years, year;

            if (content.length === 0) {
                content = $("<div>").addClass("calendar-content").addClass(o.clsCalendarContent).appendTo(element);
            }

            content.clear();

            toolbar = $("<div>").addClass("calendar-toolbar").appendTo(content);

            /**
             * Calendar toolbar
             */

            $("<span>").addClass("prev-year-group").html(o.prevYearIcon).appendTo(toolbar);
            $("<span>").addClass("curr-year").html(this.yearGroupStart + " - " + (this.yearGroupStart + this.yearDistance)).appendTo(toolbar);
            $("<span>").addClass("next-year-group").html(o.nextYearIcon).appendTo(toolbar);

            content.append( years = $("<div>").addClass("years") );

            for(var i = this.yearGroupStart; i <= this.yearGroupStart + this.yearDistance; i++) {
                years.append(
                    year = $("<div>")
                        .attr("data-year", i)
                        .addClass("year")
                        .addClass(i === this.current.year ? "today" : "")
                        .html(i)
                );

                if (o.animationContent) {
                    year.addClass("to-animate");
                }

                if (i < o.minYear || i > o.maxYear) {
                    year.addClass("disabled");
                }

                this._fireEvent("draw-year", {
                    year: i,
                    cell: year[0]
                });
            }

            this._animateContent(".years .year");
        },

        _drawContent: function(){
            switch (this.content) {
                case "years": this._drawContentYears(); break;
                case "months": this._drawContentMonths(); break;
                default: this._drawContentDays();
            }
        },

        _drawCalendar: function(){
            var that = this;
            setTimeout(function(){
                that.element.html("");
                that._drawHeader();
                that._drawContent();
                that._drawFooter();
            }, 0);
        },

        _animateContent: function(target, cls){
            var element = this.element, o = this.options;
            var content = element.find(".calendar-content");

            cls = cls || "to-animate";

            content.find(target).each(function(k){
                var day = $(this);
                setTimeout(function(){
                    day.removeClass(cls);
                }, o.animationSpeed * k);
            });
        },

        getTime: function(asString){
            var h, m;

            asString = asString || false;

            h = (""+this.time[0]).length < 2 ? "0"+this.time[0] : this.time[0];
            m = (""+this.time[1]).length < 2 ? "0"+this.time[1] : this.time[1];

            return asString ? h +":"+ m : this.time;
        },

        setTime: function(time){
            if (Array.isArray(time)) {
                this.time = time;
            } else {
                this.time = time.split(":");
            }
            this._drawCalendar();
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
            this.time = [new Date().getHours(), new Date().getMinutes()];
            this.yearGroupStart = new Date().getFullYear();
            this.content = "days";
            this._drawHeader();
            this._drawContent();
        },

        setExclude: function(exclude){
            var element = this.element, o = this.options;
            if (Utils.isNull(exclude) && Utils.isNull(element.attr("data-exclude"))) {
                return ;
            }
            o.exclude = !Utils.isNull(exclude) ? exclude : element.attr("data-exclude");
            this._dates2array(o.exclude, 'exclude');
            this._drawContent();
        },

        setPreset: function(preset){
            var element = this.element, o = this.options;
            if (Utils.isNull(preset) && Utils.isNull(element.attr("data-preset"))) {
                return ;
            }

            o.preset = !Utils.isNull(preset) ? preset : element.attr("data-preset");
            this._dates2array(o.preset, 'selected');
            this._drawContent();
        },

        setSpecial: function(special){
            var element = this.element, o = this.options;
            if (Utils.isNull(special) && Utils.isNull(element.attr("data-special"))) {
                return ;
            }
            o.special = !Utils.isNull(special) ? special : element.attr("data-special");
            this._dates2array(o.exclude, 'special');
            this._drawContent();
        },

        setShow: function(show){
            var element = this.element, o = this.options;

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
            var element = this.element, o = this.options;

            o.minDate = Utils.isValue(date) ? date : element.attr("data-min-date");
            if (Utils.isValue(o.minDate) && Utils.isDate(o.minDate, o.inputFormat)) {
                this.min = Utils.isValue(o.inputFormat) ? o.minDate.toDate(o.inputFormat) : (new Date(o.minDate));
            }

            this._drawContent();
        },

        setMaxDate: function(date){
            var element = this.element, o = this.options;

            o.maxDate = Utils.isValue(date) ? date : element.attr("data-max-date");
            if (Utils.isValue(o.maxDate) && Utils.isDate(o.maxDate, o.inputFormat)) {
                this.max = Utils.isValue(o.inputFormat) ? o.maxDate.toDate(o.inputFormat) : (new Date(o.maxDate));
            }

            this._drawContent();
        },

        setToday: function(val){
            var o = this.options;

            if (!Utils.isValue(val)) {
                val = new Date();
            }
            this.today = Utils.isDateObject(val) ? val : Utils.isValue(o.inputFormat) ? val.toDate(o.inputFormat) : new Date(val);
            this.today.setHours(0,0,0,0);
            this._drawHeader();
            this._drawContent();
        },

        i18n: function(val){
            var o = this.options;
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
            var element = this.element;
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

            if (o.ripple === true) {
                element.data("ripple").destroy();
            }

            $(window).off(Metro.events.resize, {ns: this.id});

            return element;
        }
    });

    $(document).on(Metro.events.click, function(){
        $('.calendar .calendar-years').each(function(){
            $(this).removeClass("open");
        });
        $('.calendar .calendar-months').each(function(){
            $(this).removeClass("open");
        });
    });
}(Metro, m4q));