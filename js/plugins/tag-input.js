var TagInput = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.values = [];

        this._setOptionsFromDOM();
        this._create();

        return this;
    },

    options: {
        randomColor: false,
        maxTags: 0,
        tagSeparator: ",",
        tagTrigger: "13,188",
        clsTag: "",
        clsTagTitle: "",
        clsTagRemover: "",
        onBeforeTagAdd: Metro.noop_true,
        onTagAdd: Metro.noop,
        onBeforeTagRemove: Metro.noop_true,
        onTagRemove: Metro.noop,
        onTag: Metro.noop,
        onTagInputCreate: Metro.noop
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
        var element = this.element, o = this.options;

        this._createStructure();
        this._createEvents();

        Utils.exec(o.onTagInputCreate, [element], element[0]);
    },

    _createStructure: function(){
        var that = this, element = this.element, o = this.options;
        var container, input;
        var values = element.val().trim();

        container = $("<div>").addClass("tag-input "  + element[0].className).insertBefore(element);
        element.appendTo(container);

        element[0].className = "";

        element.addClass("original-input");
        input = $("<input type='text'>").addClass("input-wrapper").attr("size", 1);
        input.appendTo(container);

        if (Utils.isValue(values)) {
            $.each(Utils.strToArray(values, o.tagSeparator), function(){
                that._addTag(this);
            })
        }

        if (element.is(":disabled")) {
            this.disable();
        } else {
            this.enable();
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

        input.on(Metro.events.keyup, function(e){
            var val = input.val().trim();

            if (val === "") {return ;}

            if (Utils.strToArray(o.tagTrigger, ",", "integer").indexOf(e.keyCode) === -1) {
                return ;
            }

            input.val("");
            that._addTag(val.replace(",", ""));
            input.attr("size", 1);

            if (e.keyCode === Metro.keyCode.ENTER) {
                e.preventDefault();
            }
        });

        container.on(Metro.events.click, ".tag .remover", function(){
            var tag = $(this).closest(".tag");
            that._delTag(tag);
        });

        container.on(Metro.events.click, function(){
            input.focus();
        });
    },

    _addTag: function(val){
        var element = this.element, o = this.options;
        var container = element.closest(".tag-input");
        var input = container.find(".input-wrapper");
        var tag, title, remover;

        if (o.maxTags > 0 && this.values.length === o.maxTags) {
            return ;
        }

        if (!Utils.exec(o.onBeforeTagAdd, [val, this.values], element[0])) {
            return ;
        }


        tag = $("<span>").addClass("tag").addClass(o.clsTag).insertBefore(input);
        tag.data("value", val);

        title = $("<span>").addClass("title").addClass(o.clsTagTitle).html(val);
        remover = $("<span>").addClass("remover").addClass(o.clsTagRemover).html("&times;");

        title.appendTo(tag);
        remover.appendTo(tag);

        if (o.randomColor === true) {
            var colors = Colors.colors(Colors.PALETTES.ALL), bg, fg, bg_r;

            bg = colors[Utils.random(0, colors.length - 1)];
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

        Utils.exec(o.onTagAdd, [tag, val, this.values], element[0]);
        Utils.exec(o.onTag, [tag, val, this.values], element[0]);
    },

    _delTag: function(tag) {
        var element = this.element, o = this.options;
        var val = tag.data("value");

        if (!Utils.exec(o.onBeforeTagRemove, [tag, val, this.values], element[0])) {
            return ;
        }

        Utils.arrayDelete(this.values, val);
        element.val(this.values.join(o.tagSeparator));

        Utils.exec(o.onTagRemove, [tag, val, this.values], element[0]);
        Utils.exec(o.onTag, [tag, val, this.values], element[0]);
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
            $.each(Utils.strToArray(v, o.tagSeparator), function(){
                that._addTag(this);
            })
        }
    },

    clear: function(){
        var element = this.element;
        var container = element.closest(".tag-input");

        this.values = [];
        element.val("");

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

    changeAttribute: function(attributeName){
        var that = this, element = this.element, o = this.options;

        var changeValue = function(){
            var val = element.attr("value").trim();
            that.clear();
            if (!Utils.isValue(val)) {
                return ;
            }
            that.val(Utils.strToArray(val, ","));
        };

        switch (attributeName) {
            case "value": changeValue(); break;
            case "disabled": this.toggleState(); break;
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

        element.insertBefore(container);
        container.remove();
    }
};

Metro.plugin('taginput', TagInput);