var CountdownDefaultConfig = {
    stopOnBlur: true,
    animate: "none",
    animationFunc: "line",
    inputFormat: null,
    locale: METRO_LOCALE,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    date: null,
    start: true,
    clsCountdown: "",
    clsPart: "",
    clsZero: "",
    clsAlarm: "",
    clsDays: "",
    clsHours: "",
    clsMinutes: "",
    clsSeconds: "",
    onAlarm: Metro.noop,
    onTick: Metro.noop,
    onZero: Metro.noop,
    onBlink: Metro.noop,
    onCountdownCreate: Metro.noop
};

Metro.countdownSetup = function (options) {
    CountdownDefaultConfig = $.extend({}, CountdownDefaultConfig, options);
};

if (typeof window["metroCountdownSetup"] !== undefined) {
    Metro.countdownSetup(window["metroCountdownSetup"]);
}

var Countdown = {
    init: function( options, elem ) {
        this.options = $.extend( {}, CountdownDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.breakpoint = (new Date()).getTime();
        this.blinkInterval = null;
        this.tickInterval = null;

        this.zeroDaysFired = false;
        this.zeroHoursFired = false;
        this.zeroMinutesFired = false;
        this.zeroSecondsFired = false;

        this.fontSize = parseInt(Utils.getStyleOne(elem, "font-size"));

        this.current = {
            d: 0, h: 0, m: 0, s: 0
        };

        this.locale = null;

        this.inactiveTab = false;

        this._setOptionsFromDOM();
        this._create();

        return this;
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
        var element = this.element, o = this.options;
        this.locale = Metro.locales[o.locale] !== undefined ? Metro.locales[o.locale] : Metro.locales["en-US"];

        Metro.checkRuntime(element, "countdown");

        this._build();
        this._createEvents();
    },

    _setBreakpoint: function(){
        var o = this.options;
        var dm = 86400000, hm = 3600000, mm = 60000, sm = 1000;

        this.breakpoint = (new Date()).getTime();

        if (Utils.isValue(o.date) && Utils.isDate(o.date, o.inputFormat)) {
            this.breakpoint = Utils.isValue(o.inputFormat) ? (o.date.toDate(o.inputFormat)).getTime() : (new Date(o.date)).getTime();
        }

        if (parseInt(o.days) > 0) {
            this.breakpoint += parseInt(o.days) * dm;
        }
        if (parseInt(o.hours) > 0) {
            this.breakpoint += parseInt(o.hours) * hm;
        }
        if (parseInt(o.minutes) > 0) {
            this.breakpoint += parseInt(o.minutes) * mm;
        }
        if (parseInt(o.seconds) > 0) {
            this.breakpoint += parseInt(o.seconds) * sm;
        }
    },

    _build: function(){
        var that = this, element = this.element, o = this.options;
        var parts = ["days", "hours", "minutes", "seconds"];
        var dm = 24*60*60*1000;
        var delta_days;
        var now = (new Date()).getTime();
        var digit;

        if (!element.attr("id")) {
            element.attr("id", Utils.elementId("countdown"));
        }

        if (!Utils.isValue(element.attr("id"))) {
            element.attr("id", Utils.elementId("countdown"));
        }

        element.addClass("countdown").addClass(o.clsCountdown);

        this._setBreakpoint();

        delta_days = Math.round((that.breakpoint - now) / dm);

        $.each(parts, function(){
            var part = $("<div>").addClass("part " + this).addClass(o.clsPart).attr("data-label", that.locale["calendar"]["time"][this]).appendTo(element);

            if (this === "days") {part.addClass(o.clsDays);}
            if (this === "hours") {part.addClass(o.clsHours);}
            if (this === "minutes") {part.addClass(o.clsMinutes);}
            if (this === "seconds") {part.addClass(o.clsSeconds);}

            $("<div>").addClass("digit").appendTo(part);
            $("<div>").addClass("digit").appendTo(part);

            if (this === "days" && delta_days >= 100) {

                for(var i = 0; i < String(Math.round(delta_days/100)).length; i++) {
                    $("<div>").addClass("digit").appendTo(part);
                }
            }

        });

        digit = element.find(".digit");
        digit.append($("<span class='digit-placeholder'>").html("0"));
        digit.append($("<span class='digit-value'>").html("0"));


        Utils.exec(o.onCountdownCreate, [element], element[0]);
        element.fire("countdowncreate");

        if (o.start === true) {
            this.start();
        } else {
            this.tick();
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        $(document).on("visibilitychange", function() {
            if (document.hidden) {
                that.pause();
            } else {
                that.resume();
            }
        }, {ns: element.attr("id")});
    },

    blink: function(){
        var element = this.element, o = this.options;
        element.toggleClass("blink");
        Utils.exec(o.onBlink, [this.current], element[0]);
        element.fire("blink", {
            time: this.current
        })
    },

    tick: function(){
        var element = this.element, o = this.options;
        var dm = 24*60*60, hm = 60*60, mm = 60, sm = 1;
        var left, now = (new Date()).getTime();
        var d, h, m, s;
        var days = element.find(".days"),
            hours = element.find(".hours"),
            minutes = element.find(".minutes"),
            seconds = element.find(".seconds");

        left = Math.floor((this.breakpoint - now)/1000);

        if (left <= -1) {
            this.stop();
            element.addClass(o.clsAlarm);
            Utils.exec(o.onAlarm, [now], element[0]);
            element.fire("alarm", {
                time: now
            });
            return ;
        }

        d = Math.floor(left / dm);
        left -= d * dm;
        if (this.current.d !== d) {
            this.current.d = d;
            this.draw("days", d);
        }

        if (d === 0) {
            if (this.zeroDaysFired === false) {
                this.zeroDaysFired = true;
                days.addClass(o.clsZero);
                Utils.exec(o.onZero, ["days", days], element[0]);
                element.fire("zero", {
                    parts: ["days", days]
                });
            }
        }

        h = Math.floor(left / hm);
        left -= h*hm;
        if (this.current.h !== h) {
            this.current.h = h;
            this.draw("hours", h);
        }

        if (d === 0 && h === 0) {
            if (this.zeroHoursFired === false) {
                this.zeroHoursFired = true;
                hours.addClass(o.clsZero);
                Utils.exec(o.onZero, ["hours", hours], element[0]);
                element.fire("zero", {
                    parts: ["hours", hours]
                });
            }
        }

        m = Math.floor(left / mm);
        left -= m*mm;
        if (this.current.m !== m) {
            this.current.m = m;
            this.draw("minutes", m);
        }

        if (d === 0 && h === 0 && m === 0) {
            if (this.zeroMinutesFired === false) {
                this.zeroMinutesFired = true;
                minutes.addClass(o.clsZero);
                Utils.exec(o.onZero, ["minutes", minutes], element[0]);
                element.fire("zero", {
                    parts: ["minutes", minutes]
                });

            }
        }

        s = Math.floor(left / sm);
        if (this.current.s !== s) {
            this.current.s = s;
            this.draw("seconds", s);
        }

        if (d === 0 && h === 0 && m === 0 && s === 0) {
            if (this.zeroSecondsFired === false) {
                this.zeroSecondsFired = true;
                seconds.addClass(o.clsZero);
                Utils.exec(o.onZero, ["seconds", seconds], element[0]);
                element.fire("zero", {
                    parts: ["seconds", seconds]
                });

            }
        }

        Utils.exec(o.onTick, [{days:d, hours:h, minutes:m, seconds:s}], element[0]);
        element.fire("tick", {
            days:d, hours:h, minutes:m, seconds:s
        });
    },

    draw: function(part, value){
        var element = this.element, o = this.options;
        var digits, digits_length, digit_value, digit_current, digit;
        var len, i, duration = 900;

        var slideDigit = function(digit){
            var digit_copy, height = digit.height();

            digit.siblings(".-old-digit").remove();
            digit_copy = digit.clone().appendTo(digit.parent());
            digit_copy.css({
                top: -1 * height + 'px'
            });

            digit.addClass("-old-digit").animate(function(t, p){
                $(this).css({
                    top: (height * p) + 'px',
                    opacity: 1 - p
                });
            }, duration, o.animationFunc, function(){
                $(this).remove();
            });

            digit_copy.html(digit_value).animate(function(t, p){
                $(this).css({
                    top: (-height + (height * p)) + 'px',
                    opacity: p
                })
            }, duration, o.animationFunc);
        };

        var fadeDigit = function(digit){
            var digit_copy;
            digit.siblings(".-old-digit").remove();
            digit_copy = digit.clone().appendTo(digit.parent());
            digit_copy.css({
                opacity: 0
            });

            digit.addClass("-old-digit").animate(function(t, p){
                $(this).css({
                    opacity: 1 - p
                });
            }, duration / 2, o.animationFunc, function(){
                $(this).remove();
            });

            digit_copy.html(digit_value).animate(function(t, p){
                $(this).css({
                    opacity: p
                })
            }, duration, o.animationFunc);
        };

        var zoomDigit = function(digit){
            var digit_copy, height = digit.height(), fs = parseInt(digit.style("font-size"));

            digit.siblings(".-old-digit").remove();
            digit_copy = digit.clone().appendTo(digit.parent());
            digit_copy.css({
                top: 0,
                left: 0
            });

            digit.addClass("-old-digit").animate(function(t, p){
                $(this).css({
                    top: (height * p) + 'px',
                    opacity: 1 - p,
                    fontSize: fs * (1 - p) + 'px'
                });
            }, duration, o.animationFunc, function(){
                $(this).remove();
            });

            digit_copy.html(digit_value).animate(function(t, p){
                $(this).css({
                    top: (-height + (height * p)) + 'px',
                    opacity: p,
                    fontSize: fs * p + 'px'
                })
            }, duration, o.animationFunc);
        };

        value = ""+value;

        if (value.length === 1) {
            value = '0'+value;
        }

        len = value.length;

        digits = element.find("."+part+" .digit:not(-old-digit)");
        digits_length = digits.length;

        for(i = 0; i < len; i++){
            digit = digits.eq(digits_length - 1).find(".digit-value");
            digit_value = Math.floor( parseInt(value) / Math.pow(10, i) ) % 10;
            digit_current = parseInt(digit.text());

            if (digit_current === digit_value) {
                continue;
            }

            switch ((""+o.animate).toLowerCase()) {
                case "slide": slideDigit(digit); break;
                case "fade": fadeDigit(digit); break;
                case "zoom": zoomDigit(digit); break;
                default: digit.html(digit_value);
            }

            digits_length--;
        }
    },

    start: function(){
        var that = this, element = this.element;

        if (element.data("paused") === false) {
            return;
        }

        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);

        element.data("paused", false);

        this._setBreakpoint();
        this.tick();

        this.blinkInterval = setInterval(function(){that.blink();}, 500);
        this.tickInterval = setInterval(function(){that.tick();}, 1000);
    },

    stop: function(){
        var element = this.element;
        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);
        element.data("paused", true);
        element.find(".digit").html("0");
        this.current = {
            d: 0, h:0, m: 0, s:0
        };
    },

    pause: function(){
        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);
        this.element.data("paused", true);
    },

    resume: function(){
        var that = this;

        this.element.data("paused", false);
        this.blinkInterval = setInterval(function(){that.blink();}, 500);
        this.tickInterval = setInterval(function(){that.tick();}, 1000);
    },

    reset: function(){
        var that = this, element = this.element, o = this.options;

        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);

        element.find(".part").removeClass(o.clsZero);
        element.find(".digit").html("0");

        this._setBreakpoint();

        element.data("paused", false);

        this.tick();

        this.blinkInterval = setInterval(function(){that.blink();}, 500);
        this.tickInterval = setInterval(function(){that.tick();}, 1000);
    },

    togglePlay: function(){
        if (this.element.attr("data-pause") === true) {
            this.pause();
        } else {
            this.start();
        }
    },

    isPaused: function(){
        return this.element.data("paused");
    },

    getBreakpoint: function(asDate){
        return asDate === true ? new Date(this.breakpoint) : this.breakpoint;
    },

    getLeft: function(){
        var dm = 24*60*60*1000, hm = 60*60*1000, mm = 60*1000, sm = 1000;
        var now = (new Date()).getTime();
        var left_seconds = Math.floor(this.breakpoint - now);
        return {
            days: Math.round(left_seconds / dm),
            hours: Math.round(left_seconds / hm),
            minutes: Math.round(left_seconds / mm),
            seconds: Math.round(left_seconds / sm)
        };
    },

    i18n: function(val){
        var that = this, element = this.element, o = this.options;
        var parts = ["days", "hours", "minutes", "seconds"];


        if (val === undefined) {
            return o.locale;
        }
        if (Metro.locales[val] === undefined) {
            return false;
        }
        o.locale = val;
        this.locale = Metro.locales[o.locale];

        $.each(parts, function(){
            var cls = ".part." + this;
            var part = element.find(cls);
            part.attr("data-label", that.locale["calendar"]["time"][this]);
        });
    },

    changeAttrLocale: function(){
        var element = this.element;
        var locale = element.attr('data-locale');
        this.i18n(locale);
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case "data-pause": this.togglePlay(); break;
            case "data-locale": this.changeAttrLocale(); break;
        }
    },

    destroy: function(){
        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);

        $(document).off("visibilitychange", {ns: element.attr("id")});

        return this.element;
    }
};

Metro.plugin('countdown', Countdown);