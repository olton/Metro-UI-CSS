$.widget( "metro.countdown" , {

    version: "3.0.0",

    options: {
        stop: false,
        days: false,
        hours: false,
        minutes: false,
        seconds: false,
        backgroundColor: 'bg-cyan',
        digitColor: 'fg-white',
        dividerColor: 'fg-dark',
        labelColor: 'fg-grayLight',
        labels: {
            'days': 'days',
            'hours': 'hours',
            'minutes': 'mins',
            'seconds': 'secs'
        },
        onTick: function(d, h, m, s){},
        onStop: function(){}
    },

    _interval: 0,
    _interval2: 0,
    _alarmOn: undefined,

    _create: function () {
        //console.log('hi from countdown');

        var that = this, element = this.element, o = this.options;

        $.each(element.data(), function(key, value){
            if (key in o) {
                try {
                    o[key] = $.parseJSON(value);
                } catch (e) {
                    o[key] = value;
                }
            }
        });

        this._alarmOn = new Date();

        if (o.stop !== false) {
            this._alarmOn = new Date(o.stop);
        }

        var dm = 24*60*60*1000, hm = 60*60*1000, mm = 60*1000, sm = 1000;

        if (o.days !== false) {
            if (typeof this._alarmOn === 'object') {
                this._alarmOn = this._alarmOn.getTime();
            }
            this._alarmOn = this._alarmOn + o.days*dm;
        }

        if (o.hours !== false) {
            if (typeof this._alarmOn === 'object') {
                this._alarmOn = this._alarmOn.getTime();
            }
            this._alarmOn = this._alarmOn + o.hours*hm;
        }

        if (o.minutes !== false) {
            if (typeof this._alarmOn === 'object') {
                this._alarmOn = this._alarmOn.getTime();
            }
            this._alarmOn = this._alarmOn + o.minutes*mm;
        }

        if (o.seconds !== false) {
            if (typeof this._alarmOn === 'object') {
                this._alarmOn = this._alarmOn.getTime();
            }
            this._alarmOn = this._alarmOn + o.seconds*sm;
        }

        this._createDigits();

        element.find('.digit').text('0');

        that._tick();

        element.data('countdown', this);

    },

    _createDigits: function(){
        var element = this.element, o = this.options;
        var parts = ['days', 'hours', 'minutes', 'seconds'];
        var p, d;

        parts.map(function(v){
            p = $("<div/>").addClass('part ' + v).attr('data-day-text', o.labels[v]).appendTo(element);
            $("<div/>").addClass('digit').appendTo(p);
            $("<div/>").addClass('digit').appendTo(p);
            if (o.labelColor.isColor()) {
                p.css({
                    color: o.labelColor
                });
            } else {
                p.addClass(o.labelColor);
            }

            if (o.backgroundColor.isColor()) {
                p.find('.digit').css({
                    background: o.backgroundColor
                });
            } else {
                p.find('.digit').addClass(o.backgroundColor);
            }

            if (o.digitColor.isColor()) {
                p.find('.digit').css({
                    color: o.digitColor
                });
            } else {
                p.find('.digit').addClass(o.digitColor);
            }

            if (v !== 'seconds') {
                d = $("<div/>").addClass("divider").text(':').appendTo(element);
                if (o.dividerColor.isColor()) {
                    d.css({'color': o.dividerColor});
                } else {
                    d.addClass(o.dividerColor);
                }
            }

        });

    },

    _blink: function(){
        this.element.toggleClass('tick');
    },

    _tick: function(){
        var that = this, o = this.options, element = this.element;
        var days = 24*60*60,
            hours = 60*60,
            minutes = 60;

        var left, d, h, m, s;

        this._interval2 = setInterval(function(){
            that._blink();
        }, 500);

        this._interval = setInterval(function(){
            var result;

            left = Math.floor((that._alarmOn - (new Date())) / 1000);
            if (left < 0) {left = 0;}

            d = Math.floor(left / days);
            left -= d*days;
            that._update('days', d);

            if (d === 0) {
                element.find('.part.days').addClass('disabled');
            }

            h = Math.floor(left / hours);
            left -= h*hours;
            that._update('hours', h);

            if (d === 0 && h === 0) {
                element.find('.part.hours').addClass('disabled');
            }

            m = Math.floor(left / minutes);
            left -= m*minutes;
            that._update('minutes', m);

            if (d === 0 && h === 0 && m === 0) {
                element.find('.part.minutes').addClass('disabled');
            }

            s = left;
            that._update('seconds', s);

            if (typeof o.onTick === 'function') {
                o.onTick(d, h, m, s);
            } else {
                if (typeof window[o.onTick] === 'function') {
                    window[o.onTick](d, h, m, s);
                } else {
                    result = eval("(function(){"+o.onTick+"})");
                    result.call(d, h, m, s);
                }
            }

            //that._blink();

            if (d === 0 && h === 0 && m === 0 && s === 0) {
                element.find('.part').addClass('disabled');

                if (typeof o.onStop === 'function') {
                    o.onStop();
                } else {
                    if (typeof window[o.onStop] === 'function') {
                        window[o.onStop]();
                    } else {
                        result = eval("(function(){"+o.onStop+"})");
                        result.call();
                    }
                }

                that._stop('all');
                that._trigger('alarm');
                clearInterval(that._interval);
            }

        }, 1000);
    },

    _update: function(part, value){
        var element = this.element;
        var major_value = Math.floor(value/10)%10;
        var minor_value = value%10;
        var major_digit, minor_digit;

        major_digit = element.find("."+part+" .digit:eq(0)");
        minor_digit = element.find("."+part+" .digit:eq(1)");

        if (minor_value !== parseInt(minor_digit.text())) {
            minor_digit.toggleClass('scaleIn');
            setTimeout(function(){
                minor_digit.text(minor_value).toggleClass('scaleIn');
            }, 500);
        }
        if (major_value !== parseInt(major_digit.text())) {
            major_digit.toggleClass('scaleIn');
            setTimeout(function(){
                major_digit.text(major_value).toggleClass('scaleIn');
            }, 500);
        }
    },

    _stop: function(){
        clearInterval(this._interval);
        clearInterval(this._interval2);
    },

    _destroy: function () {
    },

    _setOption: function ( key, value ) {
        this._super('_setOption', key, value);
    }
});
