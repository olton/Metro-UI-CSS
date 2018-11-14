var Keypad = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.value = "";
        this.positions = ["top-left", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left"];
        this.keypad = null;

        this._setOptionsFromDOM();

        this.keys = Utils.strToArray(this.options.keys, ",");
        this.keys_to_work = this.keys;

        this._create();

        return this;
    },

    options: {
        keySize: 32,
        keys: "1, 2, 3, 4, 5, 6, 7, 8, 9, 0",
        copyInlineStyles: false,
        target: null,
        length: 0,
        shuffle: false,
        shuffleCount: 3,
        position: Metro.position.BOTTOM_LEFT, //top-left, top, top-right, right, bottom-right, bottom, bottom-left, left
        dynamicPosition: false,
        serviceButtons: true,
        showValue: true,
        open: false,
        sizeAsKeys: false,

        clsKeypad: "",
        clsInput: "",
        clsKeys: "",
        clsKey: "",
        clsServiceKey: "",
        clsBackspace: "",
        clsClear: "",

        onChange: Metro.noop,
        onClear: Metro.noop,
        onBackspace: Metro.noop,
        onShuffle: Metro.noop,
        onKey: Metro.noop,
        onKeypadCreate: Metro.noop
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
        this._createKeypad();
        if (this.options.shuffle === true) {
            this.shuffle();
        }
        this._createKeys();
        this._createEvents();

        Utils.exec(this.options.onKeypadCreate, [this.element]);
    },

    _createKeypad: function(){
        var element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var keypad, keys;

        if (parent.hasClass("input")) {
            keypad = parent;
        } else {
            keypad = $("<div>").addClass("input").addClass(element[0].className);
        }

        keypad.addClass("keypad");
        if (keypad.css("position") === "static" || keypad.css("position") === "") {
            keypad.css({
                position: "relative"
            });
        }

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        if (prev.length === 0) {
            parent.prepend(keypad);
        } else {
            keypad.insertAfter(prev);
        }

        element.attr("readonly", true);
        element.appendTo(keypad);

        keys = $("<div>").addClass("keys").addClass(o.clsKeys);
        keys.appendTo(keypad);
        this._setKeysPosition();

        if (o.open === true) {
            keys.addClass("open keep-open");
        }


        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                keypad.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        element.addClass(o.clsInput);
        keypad.addClass(o.clsKeypad);

        element.on(Metro.events.blur, function(){keypad.removeClass("focused");});
        element.on(Metro.events.focus, function(){keypad.addClass("focused");});

        if (o.disabled === true || element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }

        this.keypad = keypad;
    },

    _setKeysPosition: function(){
        var element = this.element, o = this.options;
        var keypad = element.parent();
        var keys = keypad.find(".keys");
        keys.removeClass(this.positions.join(" ")).addClass(o.position)
    },

    _createKeys: function(){
        var element = this.element, o = this.options;
        var keypad = element.parent();
        var factor = Math.round(Math.sqrt(this.keys.length + 2));
        var key_size = o.keySize;
        var width = factor * key_size + factor * 4;
        var key, keys = keypad.find(".keys");

        keys.html("");

        $.each(this.keys_to_work, function(){
            key = $("<span>").addClass("key").addClass(o.clsKey).html(this);
            key.data("key", this);
            key.css({
                width: o.keySize,
                height: o.keySize,
                lineHeight: o.keySize - 4 + "px"
            }).appendTo(keys);
        });

        if (o.serviceButtons === true) {

            var service_keys = ['&larr;', '&times;'];

            $.each(service_keys, function () {
                key = $("<span>").addClass("key service-key").addClass(o.clsKey).addClass(o.clsServiceKey).html(this);
                if (this === '&larr;') {
                    key.addClass(o.clsBackspace);
                }
                if (this === '&times;') {
                    key.addClass(o.clsClear);
                }
                key.data("key", this);
                key.css({
                    width: o.keySize,
                    height: o.keySize,
                    lineHeight: o.keySize - 4 + "px"
                }).appendTo(keys);
            });
        }

        keys.width(width);

        if (o.sizeAsKeys === true && ['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right'].indexOf(o.position) !== -1) {
            keypad.outerWidth(keys.outerWidth());
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var keypad = element.parent();
        var keys = keypad.find(".keys");

        keypad.on(Metro.events.click, ".keys", function(e){
            e.preventDefault();
            e.stopPropagation();
        });

        keypad.on(Metro.events.click, function(e){
            if (o.open === true) {
                return ;
            }
            if (keys.hasClass("open") === true) {
                keys.removeClass("open");
            } else {
                keys.addClass("open");
            }
            e.preventDefault();
            e.stopPropagation();
        });

        keypad.on(Metro.events.click, ".key", function(e){
            var key = $(this);

            if (key.data('key') !== '&larr;' && key.data('key') !== '&times;') {
                if (o.length > 0 && (String(that.value).length === o.length)) {
                    return false;
                }

                that.value = that.value + "" + key.data('key');

                if (o.shuffle === true) {
                    that.shuffle();
                    that._createKeys();
                }

                if (o.dynamicPosition === true) {
                    o.position = that.positions[Utils.random(0, that.positions.length - 1)];
                    that._setKeysPosition();
                }

                Utils.exec(o.onKey, [key.data('key'), that.value, element]);
            } else {
                if (key.data('key') === '&times;') {
                    that.value = "";
                    Utils.exec(o.onClear, [element]);
                }
                if (key.data('key') === '&larr;') {
                    that.value = (that.value.substring(0, that.value.length - 1));
                    Utils.exec(o.onBackspace, [that.value, element]);
                }
            }

            if (o.showValue === true) {
                if (element[0].tagName === "INPUT") {
                    element.val(that.value);
                } else {
                    element.text(that.value);
                }
            }

            element.trigger('change');
            Utils.exec(o.onChange, [that.value, element]);

            e.preventDefault();
            e.stopPropagation();
        });

        if (o.target !== null) {
            element.on(Metro.events.change, function(){
                var t = $(o.target);
                if (t.length === 0) {
                    return ;
                }
                if (t[0].tagName === "INPUT") {
                    t.val(that.value);
                } else {
                    t.text(that.value);
                }
            });
        }
    },

    shuffle: function(){
        for (var i = 0; i < this.options.shuffleCount; i++) {
            this.keys_to_work = this.keys_to_work.shuffle();
        }
        Utils.exec(this.options.onShuffle, [this.keys_to_work, this.keys, this.element]);
    },

    shuffleKeys: function(count){
        if (count === undefined) {
            count = this.options.shuffleCount;
        }
        for (var i = 0; i < count; i++) {
            this.keys_to_work = this.keys_to_work.shuffle();
        }
        this._createKeys();
    },

    val: function(v){
        if (v !== undefined) {
            this.value = v;
            this.element[0].tagName === "INPUT" ? this.element.val(v) : this.element.text(v);
        } else {
            return this.value;
        }
    },

    open: function(){
        var element = this.element;
        var keypad = element.parent();
        var keys = keypad.find(".keys");

        keys.addClass("open");
    },

    close: function(){
        var element = this.element;
        var keypad = element.parent();
        var keys = keypad.find(".keys");

        keys.removeClass("open");
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    toggleState: function(){
        if (this.elem.disabled) {
            this.disable();
        } else {
            this.enable();
        }
    },

    setPosition: function(pos){
        var new_position = pos !== undefined ? pos : this.element.attr("data-position");
        if (this.positions.indexOf(new_position) === -1) {
            return ;
        }
        this.options.position = new_position;
        this._setKeysPosition();
    },

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
            case 'data-position': this.setPosition(); break;
        }
    },

    destroy: function(){
        var element = this.element, keypad = this.keypad;

        keypad.off(Metro.events.click, ".keys");
        keypad.off(Metro.events.click);
        keypad.off(Metro.events.click, ".key");
        element.off(Metro.events.change);

        element.insertBefore(keypad);
        keypad.remove();
    }
};

Metro.plugin('keypad', Keypad);

$(document).on(Metro.events.click, function(){
    var keypads = $(".keypad .keys");
    $.each(keypads, function(){
        if (!$(this).hasClass("keep-open")) {
            $(this).removeClass("open");
        }
    });
});
