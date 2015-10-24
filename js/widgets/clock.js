$.widget( "metro.clock" , {

    version: "1.0.0",

    options: {
<<<<<<< HEAD
        format: '24',
        showSeconds: true,
        showDate: false,
        dateFormat: 'american'
=======
        showTime: true,
        showDate: true,
        timeFormat: '24',
        dateFormat: 'american',
        divider: "&nbsp;&nbsp;"
>>>>>>> release-3.0.13
    },

    _create: function () {
        var that = this, element = this.element, o = this.options;

        this._setOptionsFromDOM();

<<<<<<< HEAD
        this._createClock();
=======
        this._tick();
        this._clockInterval = setInterval(function(){
            that._tick();
        }, 500);
>>>>>>> release-3.0.13

        element.data('clock', this);
    },

<<<<<<< HEAD
    _tick: function(){
        var that = this, element = this.element, o = this.options;
        var current_time = new Date();

        var h = current_time.getHours(),
            m = current_time.getMinutes(),
            s = current_time.getSeconds(),
            dy = current_time.getDay(),
            dt = current_time.getDate(),
            mo = current_time.getMonth() + 1,
            y = current_time.getFullYear(),
            ap = "";

        if (o.format == "12") {
            ap = " AM";
            if (h > 11) { ap = " PM"; }
=======
    _addLeadingZero: function(i){
        if (i<10){i="0" + i;}
        return i;
    },

    _tick: function(){
        var that = this, element = this.element, o = this.options;
        var timestamp = new Date();
        var time = timestamp.getTime();
        var result = "";
        var h = timestamp.getHours(),
            i = timestamp.getMinutes(),
            s = timestamp.getSeconds(),
            d = timestamp.getDate(),
            m = timestamp.getMonth() + 1,
            y = timestamp.getFullYear(),
            a = '';

        if (o.timeFormat == '12') {
            a = " AM";
            if (h > 11) { a = " PM"; }
>>>>>>> release-3.0.13
            if (h > 12) { h = h - 12; }
            if (h == 0) { h = 12; }
        }

<<<<<<< HEAD
        h = this._leadZero(h);
        m = this._leadZero(m);
        s = this._leadZero(s);

        dy = this._leadZero(dt);
        mo = this._leadZero(mo);

        var ddd, result = "";

        if (o.dateFormat == 'american') {
            ddd = y+"-"+mo+"-"+dy;
        } else {
            ddd = dy+"-"+mo+"-"+y;
        }

        if (o.showDate) {
            result += ddd;
        }

        result += "<span></span> <span class='hour'>"+h+"</span>:<span class='minute'>"+m+"</span>";

        if (o.showSeconds) {
            result += ":<span class='second'>"+s+"</span>";
        }

        result += "<span class='ap'>"+ap+"</span>";

        element.html(result);
    },

    _leadZero: function(i){
        return i < 10 ? "0" + i : i;
    },

    _createClock: function(){
        var that = this, element = this.element, o = this.options;

        element.addClass('clock');

        this._tick();

        this._clockInterval = setInterval(function(){
            that._tick();
        }, 1000);
    },

=======
        h = this._addLeadingZero(h);
        i = this._addLeadingZero(i);
        s = this._addLeadingZero(s);
        m = this._addLeadingZero(m);
        d = this._addLeadingZero(d);

        if (o.showDate) {
            if (o.dateFormat == 'american') {
                result += "<span class='date-month'>" + m + "</span>";
                result += "<span class='date-divider'>-</span>";
                result += "<span class='date-day'>" + d + "</span>";
                result += "<span class='date-divider'>-</span>";
                result += "<span class='date-year'>" + y + "</span>";
            } else {
                result += "<span class='date-day'>" + d + "</span>";
                result += "<span class='date-divider'>-</span>";
                result += "<span class='date-month'>" + m + "</span>";
                result += "<span class='date-divider'>-</span>";
                result += "<span class='date-year'>" + y + "</span>";
            }
            result += o.divider;
        }

        if (o.showTime) {
            result += "<span class='clock-hour'>" + h + "</span>";
            result += "<span class='clock-divider'>:</span>";
            result += "<span class='clock-minute'>" + i + "</span>";
            result += "<span class='clock-divider'>:</span>";
            result += "<span class='clock-second'>" + s + "</span>";
        }

        element.html(result);
    },

>>>>>>> release-3.0.13
    _setOptionsFromDOM: function(){
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
    },

    _destroy: function () {
        clearInterval(this._clockInterval);
    },

    _setOption: function ( key, value ) {
        this._super('_setOption', key, value);
    }
});
