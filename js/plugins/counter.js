var Counter = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.numbers = [];
        this.html = this.element.html();

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        delay: 10,
        step: 1,
        value: 0,
        timeout: null,
        delimiter: ",",
        onStart: Metro.noop,
        onStop: Metro.noop,
        onTick: Metro.noop,
        onCounterCreate: Metro.noop
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

        this._calcArray();

        Utils.exec(o.onCounterCreate, [element], this.elem);

        if (o.timeout !== null && Utils.isInt(o.timeout)) {
            setTimeout(function () {
                that.start();
            }, o.timeout);
        }
    },

    _calcArray: function(){
        var o = this.options;
        var i;

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
                return ;
            }
            var n = that.numbers.shift();
            Utils.exec(o.onTick, [n, element], element[0]);
            element.html(Number(n).format(0, 0, o.delimiter));
            if (that.numbers.length > 0) {
                setTimeout(tick, o.delay);
            } else {
                Utils.exec(o.onStop, [element], element[0]);
            }
        };

        Utils.exec(o.onStart, [element], element[0]);

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
        switch (attributeName) {
            case "data-value": this.setValueAttribute(); break;
        }
    },

    destroy: function(){}
};

Metro.plugin('counter', Counter);