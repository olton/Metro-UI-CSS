var Countdown = {
    init: function( options, elem ) {
        var that = this;
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.timepoint = (new Date()).getTime();
        this.breakpoint = null;
        this.blinkInterval = null;
        this.tickInterval = null;

        this.zeroDaysFired = false;
        this.zeroHoursFired = false;
        this.zeroMinutesFired = false;
        this.zeroSecondsFired = false;

        this.locale = null;

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        locale: METRO_LOCALE,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        date: null,
        start: true,
        clsCountdown: "",
        clsZero: "",
        clsAlarm: "",
        clsDays: "",
        clsHours: "",
        clsMinutes: "",
        clsSeconds: "",
        onCountdownCreate: Metro.noop,
        onAlarm: Metro.noop,
        onTick: Metro.noop,
        onZero: Metro.noop
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
        var o = this.options;
        this.locale = Metro.locales[o.locale] !== undefined ? Metro.locales[o.locale] : Metro.locales["en-US"];
        this._build();
    },

    _build: function(){
        var that = this, element = this.element, o = this.options;
        var parts = ["days", "hours", "minutes", "seconds"];
        var dm = 24*60*60*1000, hm = 60*60*1000, mm = 60*1000, sm = 1000;
        var delta_days, delta_hours, delta_minutes;

        element.addClass("countdown").addClass(o.clsCountdown);

        if (o.date !== null && Utils.isDate(o.date) !== false) {
            this.timepoint = (new Date(o.date)).getTime();
        }

        this.breakpoint = this.timepoint;

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

        delta_days = Math.round((that.breakpoint - that.timepoint) / dm);
        delta_hours = Math.round((that.breakpoint - that.timepoint) / hm);
        delta_minutes = Math.round((that.breakpoint - that.timepoint) / mm);

        $.each(parts, function(){
            if (this === "days" && delta_days === 0) {
                return ;
            }

            if (this === "hours" && delta_days === 0 && delta_hours === 0) {
                return ;
            }

            if (this === "minutes" && delta_days === 0 && delta_hours === 0 && delta_minutes === 0) {
                return ;
            }

            if (this === "seconds") {
            }

            var part = $("<div>").addClass("part " + this).attr("data-label", that.locale["calendar"]["time"][this]).appendTo(element);

            if (this === "days") {part.addClass(o.clsDays);}
            if (this === "hours") {part.addClass(o.clsHours);}
            if (this === "minutes") {part.addClass(o.clsMinutes);}
            if (this === "seconds") {part.addClass(o.clsSeconds);}

            $("<div>").addClass("digit").appendTo(part);
            $("<div>").addClass("digit").appendTo(part);

            if (this === "days" && delta_days >= 100) {

                for(var i = 0; i < String(delta_days/100).length; i++) {
                    $("<div>").addClass("digit").appendTo(part);
                }

            }
        });

        element.find(".digit").html("0");

        Utils.exec(this.options.onCountdownCreate, [this.element]);

        if (this.options.start === true) {
            this.start();
        }
    },

    blink: function(){
        this.element.toggleClass("blink");
    },

    tick: function(){
        var that = this, element = this.element, o = this.options;
        var dm = 24*60*60, hm = 60*60, mm = 60, sm = 1;
        var left, now = (new Date()).getTime();
        var d, h, m, s;

        left = Math.floor((this.breakpoint - now)/1000);

        if (left <= 0) {
            this.stop();
            if (o.clsZero !== "") {
                element.find(".part").removeClass(o.clsZero);
            }
            element.addClass(o.clsAlarm);
            Utils.exec(o.onAlarm, [now, element]);
            return ;
        }

        d = Math.floor(left / dm);
        left -= d * dm;
        this.draw("days", d);

        if (d === 0) {
            if (o.clsDays !== "") {
                element.find(".days").removeClass(o.clsDays);
            }
            if (this.zeroDaysFired === false) {
                this.zeroDaysFired = true;
                element.find(".days").addClass(o.clsZero);
                Utils.exec(o.onZero, ["days", element]);
            }
        }

        h = Math.floor(left / hm);
        left -= h*hm;
        this.draw("hours", h);

        if (d === 0 && h === 0) {
            if (o.clsHours !== "") {
                element.find(".hours").removeClass(o.clsHours);
            }
            if (this.zeroHoursFired === false) {
                this.zeroHoursFired = true;
                element.find(".hours").addClass(o.clsZero);
                Utils.exec(o.onZero, ["hours", element]);
            }
        }

        m = Math.floor(left / mm);
        left -= m*mm;
        this.draw("minutes", m);

        if (d === 0 && h === 0 && m === 0) {
            if (o.clsMinutes !== "") {
                element.find(".minutes").removeClass(o.clsMinutes);
            }
            if (this.zeroMinutesFired === false) {
                this.zeroMinutesFired = true;
                element.find(".minutes").addClass(o.clsZero);
                Utils.exec(o.onZero, ["minutes", element]);
            }
        }

        s = Math.floor(left / sm);
        this.draw("seconds", s);

        if (d === 0 && h === 0 && m === 0 && s === 0) {
            if (o.clsSeconds !== "") {
                element.find(".seconds").removeClass(o.clsSeconds);
            }
            if (this.zeroSecondsFired === false) {
                this.zeroSecondsFired = true;
                element.find(".seconds").addClass(o.clsZero);
                Utils.exec(o.onZero, ["seconds", element]);
            }
        }

        Utils.exec(o.onTick, [{days:d, hours:h, minutes:m, seconds:s}, element]);
    },

    draw: function(part, value){
        var that = this, element = this.element, o = this.options;
        var digit_value;
        var len = String(value).length;

        var digits = element.find("."+part+" .digit").html("0");
        var digits_length = digits.length;

        for(var i = 0; i < len; i++){
            digit_value = Math.floor( value / Math.pow(10, i) ) % 10;
            element.find("." + part + " .digit:eq("+ (digits_length - 1) +")").html(digit_value);
            digits_length--;
        }
    },

    start: function(){
        var that = this;

        if (this.element.data("paused") === false) {
            return;
        }

        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);

        this.element.data("paused", false);

        this.tick();

        this.blinkInterval = setInterval(function(){that.blink();}, 500);
        this.tickInterval = setInterval(function(){that.tick();}, 1000);
    },

    stop: function(){
        var that = this, element = this.element, o = this.options;
        element.data("paused", true);
        element.find(".digit").html("0");
        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);
    },

    pause: function(){
        this.element.data("paused", true);
        clearInterval(this.blinkInterval);
        clearInterval(this.tickInterval);
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

    getTimepoint: function(asDate){
        return asDate === true ? new Date(this.timepoint) : this.timepoint;
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

        this.element.html("");
        this.element.removeClass("countdown").removeClass(this.options.clsCountdown);
    }
};

Metro.plugin('countdown', Countdown);