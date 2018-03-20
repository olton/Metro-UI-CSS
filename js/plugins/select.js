var Select = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);

        this._setOptionsFromDOM();
        this._create();

        Utils.exec(this.options.onSelectCreate, [this.element]);

        return this;
    },
    options: {
        duration: 100,
        clsElement: "",
        clsSelect: "",
        clsPrepend: "",
        clsOption: "",
        clsOptionGroup: "",
        prepend: "",
        copyInlineStyles: true,
        dropHeight: 200,
        disabled: false,
        onChange: Metro.noop,
        onSelectCreate: Metro.noop,
        onUp: Metro.noop,
        onDrop: Metro.noop
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
        this._createSelect();
        this._createEvents();
    },

    _addOption: function(item, parent){
        var option = $(item);
        var l, a;
        var element = this.element, o = this.options;
        var input = element.siblings("input");

        l = $("<li>").addClass(o.clsOption).data("text", item.text).data('value', item.value ? item.value : item.text).appendTo(parent);
        a = $("<a>").html(item.text).appendTo(l).addClass(item.className);

        if (option.is(":selected")) {
            element.val(item.value);
            input.val(item.text).trigger("change");
            element.trigger("change");
        }

        a.appendTo(l);
        l.appendTo(parent);
    },

    _addOptionGroup: function(item, parent){
        var that = this;
        var group = $(item);

        $("<li>").html(item.label).addClass("group-title").appendTo(parent);

        $.each(group.children(), function(){
            that._addOption(this, parent);
        })
    },

    _createSelect: function(){
        var that = this, element = this.element, o = this.options;

        var prev = element.prev();
        var parent = element.parent();
        var container = $("<div>").addClass("select " + element[0].className).addClass(o.clsElement);
        var multiple = element.prop("multiple");
        var select_id = Utils.elementId("select");

        container.attr("id", select_id).addClass("dropdown-toggle");

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        element.addClass(o.clsSelect);

        if (multiple === false) {
            var input = $("<input>").attr("type", "text").attr("name", "__" + select_id + "__").prop("readonly", true);
            var list = $("<ul>").addClass("d-menu").css({
                "max-height": o.dropHeight
            });

            container.append(input);
            container.append(list);

            $.each(element.children(), function(){
                if (this.tagName === "OPTION") {
                    that._addOption(this, list);
                } else if (this.tagName === "OPTGROUP") {
                    that._addOptionGroup(this, list);
                }
            });

            list.dropdown({
                duration: o.duration,
                toggleElement: "#"+select_id,
                onDrop: function(){
                    var selects = $(".select ul");
                    $.each(selects, function(){
                        var l = $(this);
                        if (l.is(list)) {
                            return ;
                        }
                        l.data('dropdown').close();
                    });
                    Utils.exec(o.onDrop, [list, element], list[0]);
                },
                onUp: function(){
                    Utils.exec(o.onUp, [list, element], list[0]);
                }
            });

        }

        if (o.prepend !== "") {
            var prepend = Utils.isTag(o.prepend) ? $(o.prepend) : $("<span>"+o.prepend+"</span>");
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (o.copyInlineStyles === true) {
            for (var i = 0, l = element[0].style.length; i < l; i++) {
                container.css(element[0].style[i], element.css(element[0].style[i]));
            }
        }

        if (element.attr('dir') === 'rtl' ) {
            container.addClass("rtl").attr("dir", "rtl");
        }

        if (o.disabled === true || element.is(':disabled')) {
            this.disable();
        } else {
            this.enable();
        }

    },

    _createEvents: function(){
        var that = this, element = this.element, o = this.options;
        var container = element.closest(".select");
        var input = element.siblings("input");
        var list = element.siblings("ul");

        container.on(Metro.events.click, function(e){
            e.preventDefault();
            e.stopPropagation();
        });

        input.on(Metro.events.blur, function(){container.removeClass("focused");});
        input.on(Metro.events.focus, function(){container.addClass("focused");});

        list.on(Metro.events.click, "li", function(e){
            if ($(this).hasClass("group-title")) {
                e.preventDefault();
                e.stopPropagation();
                return ;
            }
            var val = $(this).data('value');
            var txt = $(this).data('text');
            var list_obj = list.data('dropdown');
            input.val(txt).trigger("change");
            element.val(val);
            element.trigger("change");
            list_obj.close();
            Utils.exec(o.onChange, [val], element[0]);
        });
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.parent().addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.parent().removeClass("disabled");
    },

    val: function(v){
        var that = this, element = this.element;
        var input = element.siblings("input");
        var options = element.find("option");
        if (v === undefined) {
            return element.val();
        }
        options.removeAttr("selected");
        $.each(options, function(){
            var op = $(this);
            if (this.value == v) {
                op.attr("selected", "selected");
                input.val(this.text);
                element.trigger("change");
            }
        });
    },

    data: function(op){
        var that = this, element = this.element;
        var list = element.siblings("ul");
        var option, option_group;

        element.html("");
        list.html("");

        if (typeof op === 'string') {
            element.html(op);
        } else if (Utils.isObject(op)) {
            $.each(op, function(key, val){
                if (Utils.isObject(val)) {
                    option_group = $("<optgroup>").attr("label", key).appendTo(element);
                    $.each(val, function(key2, val2){
                        $("<option>").attr("value", key2).text(val2).appendTo(option_group);
                    });
                } else {
                    $("<option>").attr("value", key).text(val).appendTo(element);
                }
            });
        }

        $.each(element.children(), function(){
            if (this.tagName === "OPTION") {
                that._addOption(this, list);
            } else if (this.tagName === "OPTGROUP") {
                that._addOptionGroup(this, list);
            }
        });
    },

    changeAttribute: function(attributeName){

    },

    destroy: function(){
        var element = this.element;
        var container = element.parent();
        var list = element.siblings("ul");
        container.off(Metro.events.click);
        list.off(Metro.events.click, "li");
        Metro.destroyPlugin(list, "dropdown");
        element.insertBefore(container);
        container.remove();
    }
};

$(document).on(Metro.events.click, function(e){
    var selects = $(".select ul");
    $.each(selects, function(){
        $(this).data('dropdown').close();
    });
});

Metro.plugin('select', Select);

