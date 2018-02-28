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
        prepend: "",
        copyInlineStyles: true,
        clearButton: true,
        clearButtonIcon: "<span class='default-icon-cross'></span>",
        autoSize: false,
        disabled: false,
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
            clearButton.on(Metro.events.click, function(){
                element.val("").trigger('change').trigger('keyup').focus();
            });
            clearButton.appendTo(container);
        }

        element.appendTo(container);

        var resize = function(){
            element[0].style.cssText = 'height:auto;';
            element[0].style.cssText = 'height:' + element[0].scrollHeight + 'px';
        };

        if (o.autoSize) {

            container.addClass("autosize");

            timer = setTimeout(function(){
                timer = null;
                resize();
            }, 0);

            element.on(Metro.events.keyup, resize);
            element.on(Metro.events.keydown, resize);
            element.on(Metro.events.change, resize);
            element.on(Metro.events.focus, resize);
            element.on(Metro.events.cut, resize);
            element.on(Metro.events.paste, resize);
            element.on(Metro.events.drop, resize);
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        if (o.prepend !== "") {
            var prepend = Utils.isTag(o.prepend) ? $(o.prepend) : $("<span>"+o.prepend+"</span>");
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        element.on(Metro.events.blur, function(){container.removeClass("focused");});
        element.on(Metro.events.focus, function(){container.addClass("focused");});

        if (o.disabled === true || element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }
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
        if (this.element.data("disabled") === false) {
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