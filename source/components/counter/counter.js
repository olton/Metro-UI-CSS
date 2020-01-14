var CounterDefaultConfig = {
    startOnViewport: true,
    counterDeferred: 0,
    delay: 10,
    step: 1,
    value: 0,
    timeout: 0,
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
    name: "Counter",

    init: function( options, elem ) {
        this.options = $.extend( {}, CounterDefaultConfig, options );
        this.elem  = elem;
        this.element = $(elem);
        this.numbers = [];
        this.html = this.element.html();
        this.started = false;
        this.id = Utils.elementId("counter");

        this._setOptionsFromDOM();
        Metro.createExec(this);

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

        if (o.timeout > 0 && o.startOnViewport !== true) {
            setTimeout(function () {
                that.start();
            }, o.timeout);
        }

        if (o.startOnViewport === true) {
            $.window().on("scroll", function(e){
                if (Utils.inViewport(element[0]) && !that.started) {
                    that.started = true;
                    setTimeout(function () {
                        that.start();
                    }, o.timeout);
                }
            }, {ns: this.id})
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

    _tick: function(){
        var that = this, element = this.element, o = this.options;

        if (this.numbers.length === 0) {
            this.started = false;
            Utils.exec(o.onStop, [element], element[0]);
            element.fire("stop");
            return ;
        }

        var n = that.numbers.shift();

        Utils.exec(o.onTick, [n, element], element[0]);
        element.fire("tick");

        element.html(Number(n).format(0, 0, o.delimiter));

        if (that.numbers.length > 0 && that.started) {
            setTimeout(function(){
                that._tick();
            }, o.delay);
        } else {
            that.started = false;
            Utils.exec(o.onStop, [element], element[0]);
            element.fire("stop");
        }
    },

    start: function(){
        var that = this, element = this.element, o = this.options;

        this.started = true;

        Utils.exec(o.onStart, [element], element[0]);
        element.fire("start");

        setTimeout(function(){
            that._tick();
        }, o.delay);
    },

    reset: function(){
        this.started = false;
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
        if (this.options.startOnViewport === true) {
            $.window().off("scroll", {ns: this.id});
        }
        return this.element;
    }
};

Metro.plugin('counter', Counter);