var CounterDefaultConfig = {
    delay: 10,
    step: 1,
    value: 0,
    timeout: null,
    delimiter: ",",
    onStart: Metro.noop,
    onStop: Metro.noop,
    onTick: Metro.noop,
    onCounterCreate: Metro.noop
};

Metro.counterSetup = function (options) {
    CounterDefaultConfig = $.extend({}, CounterDefaultConfig, options);
};

if (typeof window["metroCounterSetup"] !== undefined) {
    Metro.counterSetup(window["metroCounterSetup"]);
}

var Counter = {
    init: function( options, elem ) {
        this.options = $.extend( {}, CounterDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.numbers = [];
        this.html = this.element.html();

        this._setOptionsFromDOM();
        this._create();

        return this;
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

        Metro.checkRuntime(element, "counter");

        this._calcArray();

        Utils.exec(o.onCounterCreate, [element], this.elem);
        element.fire("countercreate");

        if (o.timeout !== null && Utils.isInt(o.timeout)) {
            setTimeout(function () {
                that.start();
            }, o.timeout);
        }
    },

    _calcArray: function(){
        var o = this.options;
        var i;

        this.numbers = [];

        for (i = 0; i <= o.value; i += o.step ) {
            this.numbers.push(i);
        }

        if (this.numbers[this.numbers.length - 1] !== o.value) {
            this.numbers.push(o.value);
        }
    },

    start: function(){
        var that = this, element = this.element, o = this.options;

        var tick = function(){
            if (that.numbers.length === 0) {
                Utils.exec(o.onStop, [element], element[0]);
                element.fire("stop");
                return ;
            }
            var n = that.numbers.shift();
            Utils.exec(o.onTick, [n, element], element[0]);
            element.fire("tick");
            element.html(Number(n).format(0, 0, o.delimiter));
            if (that.numbers.length > 0) {
                setTimeout(tick, o.delay);
            } else {
                Utils.exec(o.onStop, [element], element[0]);
                element.fire("stop");
            }
        };

        Utils.exec(o.onStart, [element], element[0]);
        element.fire("start");

        setTimeout(tick, o.delay);
    },

    reset: function(){
        this._calcArray();
        this.element.html(this.html);
    },

    setValueAttribute: function(){
        this.options.value = this.element.attr("data-value");
        this._calcArray();
    },

    changeAttribute: function(attributeName){
        if (attributeName === "data-value") {
            this.setValueAttribute();
        }
    },

    destroy: function(){
        return this.element;
    }
};

Metro.plugin('counter', Counter);