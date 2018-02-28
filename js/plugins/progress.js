var Progress = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = 0;
        this.buffer = 0;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onProgressCreate, [this.element]);

        return this;
    },

    options: {
        value: 0,
        buffer: 0,
        type: "bar",
        small: false,
        clsBack: "",
        clsBar: "",
        clsBuffer: "",
        onValueChange: Metro.noop,
        onBufferChange: Metro.noop,
        onComplete: Metro.noop,
        onBuffered: Metro.noop,
        onProgressCreate: Metro.noop
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

        element
            .html("")
            .addClass("progress");

        function _progress(){
            $("<div>").addClass("bar").appendTo(element);
        }

        function _buffer(){
            $("<div>").addClass("bar").appendTo(element);
            $("<div>").addClass("buffer").appendTo(element);
        }

        function _load(){
            element.addClass("with-load");
            $("<div>").addClass("bar").appendTo(element);
            $("<div>").addClass("buffer").appendTo(element);
            $("<div>").addClass("load").appendTo(element);
        }

        function _line(){
            element.addClass("line");
        }

        switch (o.type) {
            case "buffer": _buffer(); break;
            case "load": _load(); break;
            case "line": _line(); break;
            default: _progress();
        }

        if (o.small === true) {
            element.addClass("small");
        }

        element.addClass(o.clsBack);
        element.find(".bar").addClass(o.clsBar);
        element.find(".buffer").addClass(o.clsBuffer);

        this.val(o.value);
        this.buff(o.buffer);
    },

    val: function(v){
        var that = this, element = this.element, o = this.options;

        if (v === undefined) {
            return that.value;
        }

        var bar  = element.find(".bar");

        if (bar.length === 0) {
            return false;
        }

        this.value = parseInt(v, 10);

        bar.css("width", this.value + "%");

        element.trigger("valuechange", [this.value]);

        Utils.exec(o.onValueChange, [this.value, element]);

        if (this.value === 100) {
            Utils.exec(o.onComplete, [this.value, element]);
        }
    },

    buff: function(v){
        var that = this, element = this.element, o = this.options;

        if (v === undefined) {
            return that.buffer;
        }

        var bar  = element.find(".buffer");

        if (bar.length === 0) {
            return false;
        }

        this.buffer = parseInt(v, 10);

        bar.css("width", this.buffer + "%");

        element.trigger("bufferchange", [this.buffer]);

        Utils.exec(o.onBufferChange, [this.buffer, element]);

        if (this.buffer === 100) {
            Utils.exec(o.onBuffered, [this.buffer, element]);
        }
    },

    changeValue: function(){
        this.val(this.element.attr('data-value'));
    },

    changeBuffer: function(){
        this.buff(this.element.attr('data-buffer'));
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'data-value': this.changeValue(); break;
            case 'data-buffer': this.changeBuffer(); break;
        }
    }
};

Metro.plugin('progress', Progress);