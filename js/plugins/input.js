var Input = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.history = [];
        this.historyIndex = -1;

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onInputCreate, [this.element]);

        return this;
    },
    options: {
        history: false,
        historyPreset: "",
        preventSubmit: "",
        defaultValue: "",
        clsElement: "",
        clsInput: "",
        clsPrepend: "",
        clsAppend: "",
        clsClearButton: "",
        clsRevealButton: "",
        size: "default",
        prepend: "",
        append: "",
        copyInlineStyles: true,
        clearButton: true,
        revealButton: true,
        clearButtonIcon: "<span class='default-icon-cross'></span>",
        revealButtonIcon: "<span class='default-icon-eye'></span>",
        customButtons: [],
        disabled: false,
        onHistoryChange: Metro.noop,
        onHistoryUp: Metro.noop,
        onHistoryDown: Metro.noop,
        onInputCreate: Metro.noop
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
        this._createStructure();
        this._createEvents();
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("input " + element[0].className);
        var buttons = $("<div>").addClass("button-group");
        var clearButton, revealButton;

        if (Utils.isValue(o.historyPreset)) {
            $.each(Utils.strToArray(o.historyPreset, ","), function(){
                that.history.push(this);
            });
            that.historyIndex = that.history.length - 1;
        }

        if (element.attr("type") === undefined) {
            element.attr("type", "text");
        }

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        buttons.appendTo(container);

        if (!Utils.isValue(element.val().trim())) {
            element.val(o.defaultValue);
        }

        if (o.clearButton !== false) {
            clearButton = $("<button>").addClass("button input-clear-button").addClass(o.clsClearButton).attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.appendTo(buttons);
        }
        if (element.attr('type') === 'password' && o.revealButton !== false) {
            revealButton = $("<button>").addClass("button input-reveal-button").addClass(o.clsRevealButton).attr("tabindex", -1).attr("type", "button").html(o.revealButtonIcon);
            revealButton.appendTo(buttons);
        }

        if (o.prepend !== "") {
            var prepend = Utils.isTag(o.prepend) ? $(o.prepend) : $("<span>"+o.prepend+"</span>");
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (typeof o.customButtons === "string") {
            o.customButtons = Utils.isObject(o.customButtons);
        }

        if (typeof o.customButtons === "object" && Utils.objectLength(o.customButtons) > 0) {
            $.each(o.customButtons, function(){
                var item = this;
                var customButton = $("<button>").addClass("button input-custom-button").addClass(item.cls).attr("tabindex", -1).attr("type", "button").html(item.html);
                customButton.data("action", item.onclick);
                // customButton.on(Metro.events.click, function(){
                //     Utils.exec(item.onclick, [element.val(), customButton], element[0]);
                // });
                customButton.appendTo(buttons);
            });
        }

        if (o.append !== "") {
            var append = Utils.isTag(o.append) ? $(o.append) : $("<span>"+o.append+"</span>");
            append.addClass("append").addClass(o.clsAppend).appendTo(container);
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        element[0].className = '';
        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        container.addClass(o.clsElement);
        element.addClass(o.clsInput);

        if (o.size !== "default") {
            container.css({
                width: o.size
            });
        }

        if (o.disabled === true || element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.closest(".input");

        container.on(Metro.events.click, ".input-clear-button", function(){
            element.val(Utils.isValue(o.defaultValue) ? o.defaultValue : "").trigger('change').trigger('keyup').focus();
        });

        container.on(Metro.events.start, ".input-reveal-button", function(){
            element.attr('type', 'text');
        });

        container.on(Metro.events.stop, ".input-reveal-button", function(){
            element.attr('type', 'password').focus();
        });

        container.on(Metro.events.stop, ".input-custom-button", function(){
            var button = $(this);
            var action = button.data("action");
            Utils.exec(action, [element.val(), button], this);
        });

        element.on(Metro.events.keyup, function(e){
            var val = element.val().trim();

            if (o.history && e.keyCode === Metro.keyCode.ENTER && val !== "") {
                element.val("");
                that.history.push(val);
                that.historyIndex = that.history.length - 1;
                Utils.exec(o.onHistoryChange, [val, that.history, that.historyIndex], element[0]);
                if (o.preventSubmit === true) {
                    e.preventDefault();
                }
            }

            if (o.history && e.keyCode === Metro.keyCode.UP_ARROW) {
                that.historyIndex--;
                if (that.historyIndex >= 0) {
                    element.val("");
                    element.val(that.history[that.historyIndex]);
                    Utils.exec(o.onHistoryDown, [element.val(), that.history, that.historyIndex], element[0]);
                } else {
                    that.historyIndex = 0;
                }
                e.preventDefault();
            }

            if (o.history && e.keyCode === Metro.keyCode.DOWN_ARROW) {
                that.historyIndex++;
                if (that.historyIndex < that.history.length) {
                    element.val("");
                    element.val(that.history[that.historyIndex]);
                    Utils.exec(o.onHistoryDown, [element.val(), that.history, that.historyIndex], element[0]);
                } else {
                    that.historyIndex = that.history.length - 1;
                }
                e.preventDefault();
            }
        });

        element.on(Metro.events.blur, function(){container.removeClass("focused");});
        element.on(Metro.events.focus, function(){container.addClass("focused");});
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
    },

    destroy: function(){
        var element = this.element;
        var parent = element.parent();
        var clearBtn = parent.find(".input-clear-button");
        var revealBtn = parent.find(".input-reveal-button");
        var customBtn = parent.find(".input-custom-button");

        if (clearBtn.length > 0) {
            clearBtn.off(Metro.events.click);
        }
        if (revealBtn.length > 0) {
            revealBtn.off(Metro.events.start);
            revealBtn.off(Metro.events.stop);
        }
        if (customBtn.length > 0) {
            clearBtn.off(Metro.events.click);
        }

        element.off(Metro.events.blur);
        element.off(Metro.events.focus);

        element.insertBefore(parent);
        parent.remove();
    }
};

Metro.plugin('input', Input);