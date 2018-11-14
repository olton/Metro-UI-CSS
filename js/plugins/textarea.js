var Textarea = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onTextareaCreate, [this.element]);

        return this;
    },
    options: {
        charsCounter: null,
        charsCounterTemplate: "$1",
        defaultValue: "",
        prepend: "",
        append: "",
        copyInlineStyles: true,
        clearButton: true,
        clearButtonIcon: "<span class='default-icon-cross'></span>",
        autoSize: true,
        clsPrepend: "",
        clsAppend: "",
        clsComponent: "",
        clsTextarea: "",
        onChange: Metro.noop,
        onTextareaCreate: Metro.noop
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
        this._createStructure();
        this._createEvents();
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("textarea " + element[0].className);
        var clearButton;
        var timer = null;

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        if (o.clearButton !== false) {
            clearButton = $("<button>").addClass("button input-clear-button").attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.appendTo(container);
        }

        element.appendTo(container);

        if (o.autoSize) {

            container.addClass("autosize");

            timer = setTimeout(function(){
                timer = null;
                that.resize();
            }, 0);
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        if (o.prepend !== "") {
            var prepend = $("<div>").html(o.prepend);
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (o.append !== "") {
            var append = $("<div>").html(o.append);
            append.addClass("append").addClass(o.clsAppend).appendTo(container);
            clearButton.css({
                right: append.outerWidth() + 4
            });
        }

        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (Utils.isValue(o.defaultValue) && element.val().trim() === "") {
            element.val(o.defaultValue);
        }

        container.addClass(o.clsComponent);
        element.addClass(o.clsTextarea);

        if (element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var textarea = element.closest(".textarea");
        var chars_counter = $(o.charsCounter);

        textarea.on(Metro.events.click, ".input-clear-button", function(){
            element.val(Utils.isValue(o.defaultValue) ? o.defaultValue : "").trigger('change').trigger('keyup').focus();
        });

        if (o.autoSize) {
            element.on(Metro.events.keyup, $.proxy(this.resize, that));
            element.on(Metro.events.keydown, $.proxy(this.resize, that));
            element.on(Metro.events.change, $.proxy(this.resize, that));
            element.on(Metro.events.focus, $.proxy(this.resize, that));
            element.on(Metro.events.cut, $.proxy(this.resize, that));
            element.on(Metro.events.paste, $.proxy(this.resize, that));
            element.on(Metro.events.drop, $.proxy(this.resize, that));
        }

        element.on(Metro.events.blur, function(){textarea.removeClass("focused");});
        element.on(Metro.events.focus, function(){textarea.addClass("focused");});

        element.on(Metro.events.keyup, function(){
            if (Utils.isValue(o.charsCounter) && chars_counter.length > 0) {
                if (chars_counter[0].tagName === "INPUT") {
                    chars_counter.val(that.length());
                } else {
                    chars_counter.html(o.charsCounterTemplate.replace("$1", that.length()));
                }
            }
            Utils.exec(o.onChange, [element.val(), that.length()], element[0]);
        })
    },

    resize: function(){
        var element = this.element;

        element[0].style.cssText = 'height:auto;';
        element[0].style.cssText = 'height:' + element[0].scrollHeight + 'px';
    },

    clear: function(){
        this.element.val("").trigger('change').trigger('keyup').focus();
    },

    toDefault: function(){
        this.element.val(Utils.isValue(this.options.defaultValue) ? this.options.defaultValue : "").trigger('change').trigger('keyup').focus();
    },

    length: function(){
        var characters = this.elem.value.split('');
        return characters.length;
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

    changeAttribute: function(attributeName){
        switch (attributeName) {
            case 'disabled': this.toggleState(); break;
        }
    }
};

Metro.plugin('textarea', Textarea);