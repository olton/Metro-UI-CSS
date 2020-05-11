/* global Metro, Utils, Component, Colors */
var TagInputDefaultConfig = {
    size: "normal",
    taginputDeferred: 0,
    static: false,
    clearButton: true,
    clearButtonIcon: "<span class='default-icon-cross'></span>",

    randomColor: false,
    maxTags: 0,
    tagSeparator: ",",
    tagTrigger: "Enter, Space, Comma",
    backspace: true,

    clsComponent: "",
    clsInput: "",
    clsClearButton: "",
    clsTag: "",
    clsTagTitle: "",
    clsTagRemover: "",
    onBeforeTagAdd: Metro.noop_true,
    onTagAdd: Metro.noop,
    onBeforeTagRemove: Metro.noop_true,
    onTagRemove: Metro.noop,
    onTag: Metro.noop,
    onClear: Metro.noop,
    onTagTrigger: Metro.noop,
    onTagInputCreate: Metro.noop
};

Metro.tagInputSetup = function (options) {
    TagInputDefaultConfig = $.extend({}, TagInputDefaultConfig, options);
};

if (typeof window["metroTagInputSetup"] !== undefined) {
    Metro.tagInputSetup(window["metroTagInputSetup"]);
}

Component('tag-input', {
    init: function( options, elem ) {
        this._super(elem, options, TagInputDefaultConfig);

        this.values = [];
        this.triggers = [];

        Metro.createExec(this);

        return this;
    },

    _create: function(){
        var element = this.element, o = this.options;

        Metro.checkRuntime(element, this.name);

        this.triggers = (""+o.tagTrigger).toArray(",");

        if (this.triggers.contains("Space") || this.triggers.contains("Spacebar")) {
            this.triggers.push(" ");
            this.triggers.push("Spacebar");
        }

        if (this.triggers.contains("Comma")) {
            this.triggers.push(",");
        }

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onTagInputCreate, null, element[0]);
        element.fire("taginputcreate");
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var container, input, clearButton;
        var values = element.val().trim();

        container = $("<div>").addClass("tag-input "  + element[0].className).addClass(o.clsComponent).insertBefore(element);
        element.appendTo(container);

        container.addClass("input-" + o.size)

        element[0].className = "";

        element.addClass("original-input");
        input = $("<input type='text'>").addClass("input-wrapper").addClass(o.clsInput).attr("size", 1);
        input.appendTo(container);

        if (o.clearButton !== false && !element[0].readOnly) {
            container.addClass("padding-for-clear");
            clearButton = $("<button>").addClass("button input-clear-button").attr("tabindex", -1).attr("type", "button").html(o.clearButtonIcon);
            clearButton.appendTo(container);
        }

        if (Utils.isValue(values)) {
            $.each(values.toArray(o.tagSeparator), function(){
                that._addTag(this);
            })
        }

        if (element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
        }

        if (o.static === true || element.attr("readonly") !== undefined) {
            container.addClass("static-mode");
        }
    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.closest(".tag-input");
        var input = container.find(".input-wrapper");

        input.on(Metro.events.focus, function(){
            container.addClass("focused");
        });

        input.on(Metro.events.blur, function(){
            container.removeClass("focused");
        });

        input.on(Metro.events.inputchange, function(){
            input.attr("size", Math.ceil(input.val().length / 2) + 2);
        });

        input.on(Metro.events.keydown, function(e){
            var val = input.val().trim();
            var key = e.key;

            if (key === "Enter") e.preventDefault();

            if (o.backspace === true && key === "Backspace" && val.length === 0) {
                if (that.values.length > 0) {
                    that.values.splice(-1,1);
                    element.siblings(".tag").last().remove();
                    element.val(that.values.join(o.tagSeparator));
                }
                return ;
            }

            if (val === "") {return ;}

            if (!that.triggers.contains(key)) {
                return ;
            }

            Utils.exec(o.onTagTrigger, [key], element[0]);
            element.fire("tagtrigger", {
                key: key
            });

            input.val("");
            that._addTag(val);
            input.attr("size", 1);
        });

        input.on(Metro.events.keyup, function(e){
            var val = input.val();
            var key = e.key;

            if (that.triggers.contains(key) && val[val.length - 1] === key) {
                input.val(val.slice(0, -1));
            }
        });

        container.on(Metro.events.click, ".tag .remover", function(){
            var tag = $(this).closest(".tag");
            that._delTag(tag);
        });

        container.on(Metro.events.click, function(){
            input.focus();
        });

        container.on(Metro.events.click, ".input-clear-button", function(){
            var val = element.val();
            that.clear();
            Utils.exec(o.onClear, [val], element[0]);
            element.fire("clear", {
                val: val
            });
        });
    },

    _addTag: function(val){
        var element = this.element, o = this.options;
        var container = element.closest(".tag-input");
        var input = container.find(".input-wrapper");
        var tag, title, remover;
        var tagSize, tagStatic;

        if (container.hasClass("input-large")) {
            tagSize = "large";
        } else if (container.hasClass("input-small")) {
            tagSize = "small"
        }

        if (o.maxTags > 0 && this.values.length === o.maxTags) {
            return ;
        }

        if ((""+val).trim() === "") {
            return ;
        }

        if (!Utils.exec(o.onBeforeTagAdd, [val, this.values], element[0])) {
            return ;
        }


        tag = $("<span>")
            .addClass("tag")
            .addClass(tagSize)
            .addClass(o.clsTag)
            .insertBefore(input);
        tag.data("value", val);

        tagStatic = o.static || container.hasClass("static-mode") || element.readonly || element.disabled || container.hasClass("disabled");
        if (tagStatic) {
            tag.addClass("static");
        }

        title = $("<span>").addClass("title").addClass(o.clsTagTitle).html(val);
        remover = $("<span>").addClass("remover").addClass(o.clsTagRemover).html("&times;");

        title.appendTo(tag);
        remover.appendTo(tag);

        if (o.randomColor === true) {
            var colors = Colors.colors(Colors.PALETTES.ALL), bg, fg, bg_r;

            bg = colors[$.random(0, colors.length - 1)];
            bg_r = Colors.darken(bg, 15);
            fg = Colors.isDark(bg) ? "#ffffff" : "#000000";

            tag.css({
                backgroundColor: bg,
                color: fg
            });
            remover.css({
                backgroundColor: bg_r,
                color: fg
            });
        }

        this.values.push(val);
        element.val(this.values.join(o.tagSeparator));

        Utils.exec(o.onTagAdd, [tag[0], val, this.values], element[0]);
        element.fire("tagadd", {
            tag: tag[0],
            val: val,
            values: this.values
        });

        Utils.exec(o.onTag, [tag[0], val, this.values], element[0]);
        element.fire("tag", {
            tag: tag[0],
            val: val,
            values: this.values
        });
    },

    _delTag: function(tag) {
        var element = this.element, o = this.options;
        var val = tag.data("value");

        if (!Utils.exec(o.onBeforeTagRemove, [tag, val, this.values], element[0])) {
            return ;
        }

        Utils.arrayDelete(this.values, val);
        element.val(this.values.join(o.tagSeparator));

        Utils.exec(o.onTagRemove, [tag[0], val, this.values], element[0]);
        element.fire("tagremove", {
            tag: tag[0],
            val: val,
            values: this.values
        });

        Utils.exec(o.onTag, [tag[0], val, this.values], element[0]);
        element.fire("tag", {
            tag: tag[0],
            val: val,
            values: this.values
        });

        tag.remove();
    },

    tags: function(){
        return this.values;
    },

    val: function(v){
        var that = this, o = this.options;

        if (!Utils.isValue(v)) {
            return this.tags();
        }

        this.values = [];

        if (Utils.isValue(v)) {
            $.each((""+v).toArray(o.tagSeparator), function(){
                that._addTag(this);
            })
        }
    },

    clear: function(){
        var element = this.element;
        var container = element.closest(".tag-input");

        this.values = [];

        element.val("").trigger("change");

        container.find(".tag").remove();
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

    toggleStatic: function(val){
        var container = this.element.closest(".tag-input");
        var staticMode;

        if (Utils.isValue(val)) {
            staticMode = Utils.bool(val);
        } else {
            staticMode = !container.hasClass("static-mode");
        }

        if (staticMode) {
            container.addClass("static-mode");
        } else {
            container.removeClass("static-mode");
        }
    },

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeValue = function(){
            var val = element.attr("value").trim();
            that.clear();
            if (!Utils.isValue(val)) {
                return ;
            }
            that.val(val.toArray(o.tagSeparator));
        };

        switch (attributeName) {
            case "value": changeValue(); break;
            case "disabled": this.toggleState(); break;
            case "static": this.toggleStatic(); break;
        }
    },

    destroy: function(){
        var element = this.element;
        var container = element.closest(".tag-input");
        var input = container.find(".input-wrapper");

        input.off(Metro.events.focus);
        input.off(Metro.events.blur);
        input.off(Metro.events.keydown);
        container.off(Metro.events.click, ".tag .remover");
        container.off(Metro.events.click);

        return element;
    }
});
