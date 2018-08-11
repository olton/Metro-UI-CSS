var Select = {
    init: function( options, elem ) {
        this.options = $.extend( {}, this.options, options );
        this.elem  = elem;
        this.element = $(elem);
        this.list = null;

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
        clsAppend: "",
        clsOption: "",
        clsOptionGroup: "",
        clsDropList: "",
        prepend: "",
        append: "",
        placeholder: "",
        filterPlaceholder: "",
        filter: true,
        copyInlineStyles: true,
        dropHeight: 200,
        disabled: false,
        onChange: Metro.noop,
        onSelectCreate: Metro.noop,
        onUp: Metro.noop,
        onDrop: Metro.noop
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
        this._createSelect();
        this._createEvents();
    },

    _addOption: function(item, parent){
        var option = $(item);
        var l, a;
        var element = this.element, o = this.options;
        var multiple = element[0].multiple;
        var input = element.siblings(".select-input");
        var html = Utils.isValue(option.data('template'))?option.data('template').replace("$1", item.text):item.text;
        var selected_item;

        l = $("<li>").addClass(o.clsOption).data("option", item).data("text", item.text).data('value', Utils.isValue(item.value) ? item.value : "").appendTo(parent);
        a = $("<a>").html(html).appendTo(l).addClass(item.className);

        if (item.getAttribute("selected") !== null) {
            if (multiple) {
                l.addClass("d-none");
                selected_item = $("<div>").addClass("selected-item").html("<span class='title'>"+html+"</span>").appendTo(input);
                selected_item.data("option", l);
                $("<span>").addClass("remover").html("&times;").appendTo(selected_item);
            } else {
                element.val(item.value);
                input.html(html);
                element.trigger("change");
                l.addClass("active");
            }
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
        var multiple = element[0].multiple;
        var select_id = Utils.elementId("select");
        var buttons = $("<div>").addClass("button-group");
        var input, drop_container, list, filter_input;

        container.attr("id", select_id).addClass("dropdown-toggle");

        if (multiple) {
            container.addClass("multiple");
        }

        if (prev.length === 0) {
            parent.prepend(container);
        } else {
            container.insertAfter(prev);
        }

        element.appendTo(container);
        element.addClass(o.clsSelect);
        buttons.appendTo(container);

        input = $("<div>").addClass("select-input").attr("name", "__" + select_id + "__");
        drop_container = $("<div>").addClass("drop-container");
        list = $("<ul>").addClass("d-menu").addClass(o.clsDropList).css({
            "max-height": o.dropHeight
        });
        filter_input = $("<input type='text' data-role='input'>").attr("placeholder", o.filterPlaceholder);

        container.append(input);
        container.append(drop_container);

        drop_container.append(filter_input);

        if (o.filter !== true) {
            filter_input.hide();
        }

        drop_container.append(list);

        $.each(element.children(), function(){
            if (this.tagName === "OPTION") {
                that._addOption(this, list);
            } else if (this.tagName === "OPTGROUP") {
                that._addOptionGroup(this, list);
            }
        });

        drop_container.dropdown({
            duration: o.duration,
            toggleElement: "#"+select_id,
            onDrop: function(){
                var dropped, target;

                dropped = $(".select .drop-container");
                $.each(dropped, function(){
                    var drop = $(this);
                    if (drop.is(drop_container)) {
                        return ;
                    }
                    drop.data('dropdown').close();
                });

                filter_input.val("").trigger(Metro.events.keyup).focus();

                target = list.find("li.active").length > 0 ? $(list.find("li.active")[0]) : undefined;
                if (target !== undefined) {
                    list.scrollTop(0);
                    setTimeout(function(){
                        list.animate({
                            scrollTop: target.position().top - ( (list.height() - target.height() )/ 2)
                        }, 100);
                    }, 200);
                }

                Utils.exec(o.onDrop, [list, element], list[0]);
            },
            onUp: function(){
                Utils.exec(o.onUp, [list, element], list[0]);
            }
        });

        this.list = list;

        if (o.prepend !== "") {
            var prepend = Utils.isTag(o.prepend) ? $(o.prepend) : $("<span>"+o.prepend+"</span>");
            prepend.addClass("prepend").addClass(o.clsPrepend).appendTo(container);
        }

        if (o.append !== "") {
            var append = Utils.isTag(o.append) ? $(o.append) : $("<span>"+o.append+"</span>");
            append.addClass("append").addClass(o.clsAppend).appendTo(container);
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
        var drop_container = container.find(".drop-container");
        var input = element.siblings(".select-input");
        var filter_input = drop_container.find("input");
        var list = drop_container.find("ul");

        container.on(Metro.events.click, function(e){
            e.preventDefault();
            e.stopPropagation();
        });

        input.on(Metro.events.click, function(){container.toggleClass("focused");});
        filter_input.on(Metro.events.blur, function(){container.removeClass("focused");});
        filter_input.on(Metro.events.focus, function(){container.addClass("focused");});

        list.on(Metro.events.click, "li", function(e){
            if ($(this).hasClass("group-title")) {
                e.preventDefault();
                e.stopPropagation();
                return ;
            }
            var leaf = $(this);
            var val = leaf.data('value');
            var txt = leaf.data('text');
            var html = leaf.children('a').html();
            var selected_item;

            if (element[0].multiple) {
                leaf.addClass("d-none");
                selected_item = $("<div>").addClass("selected-item").html("<span class='title'>"+html+"</span>").appendTo(input);
                selected_item.data("option", leaf);
                $("<span>").addClass("remover").html("&times;").appendTo(selected_item);
                $.each(element.find("option"), function(){
                    if (this === leaf.data("option")) {
                        this.selected = true;
                    }
                });
            } else {
                list.find("li.active").removeClass("active");
                leaf.addClass("active");
                input.html(html);
                element.val(val);
                element.trigger("change");
                drop_container.data("dropdown").close();
            }

            Utils.exec(o.onChange, [val], element[0]);
        });

        input.on("click", ".selected-item .remover", function(e){
            var item = $(this).closest(".selected-item");
            var leaf = item.data("option");
            leaf.removeClass("d-none");
            $.each(element.find("option"), function(){
                if (this === leaf.data("option")) {
                    this.selected = false;
                }
            });
            item.remove();
            e.preventDefault();
            e.stopPropagation();
        });

        filter_input.on(Metro.events.keyup, function(){
            var filter = this.value.toUpperCase();
            var li = list.find("li");
            var i, a;
            for (i = 0; i < li.length; i++) {
                if ($(li[i]).hasClass("group-title")) continue;
                a = li[i].getElementsByTagName("a")[0];
                if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        });

        drop_container.on(Metro.events.click, function(e){
            e.preventDefault();
            e.stopPropagation();
        });
    },

    reset: function(){
        var that = this, element = this.element, o = this.options;
        //TODO
    },

    disable: function(){
        this.element.data("disabled", true);
        this.element.closest(".select").addClass("disabled");
    },

    enable: function(){
        this.element.data("disabled", false);
        this.element.closest(".select").removeClass("disabled");
    },

    val: function(v){
        var element = this.element, o = this.options;
        var input = element.siblings("input");
        var options = element.find("option");
        var items = this.list.find("li");

        if (v === undefined) {
            return element.val();
        }

        options.removeAttr("selected");
        $.each(options, function(){
            var op = this;

            if (""+op.value === ""+v) {
                op.setAttribute("selected", "selected");
                input.val(op.text);
                element.trigger("change");

                items.removeClass("active");
                $.each(items, function(){
                    var item = $(this);

                    if (item.hasClass("group-title")) return ;

                    if (""+item.data("value") === ""+v) {
                        item.addClass("active");
                    }
                });

                Utils.exec(o.onChange, [v], element[0]);
            }
        });
    },

    data: function(op){
        var that = this, element = this.element;
        var select = element.parent();
        var list = select.find("ul");
        var option_group;

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
        var container = element.closest(".select");
        var drop_container = container.find(".drop-container");
        var input = element.siblings(".select-input");
        var filter_input = drop_container.find("input");
        var list = drop_container.find("ul");

        container.off(Metro.events.click);
        container.off(Metro.events.click, ".input-clear-button");
        input.off(Metro.events.click);
        filter_input.off(Metro.events.blur);
        filter_input.off(Metro.events.focus);
        list.off(Metro.events.click, "li");
        filter_input.off(Metro.events.keyup);
        drop_container.off(Metro.events.click);

        Metro.destroyPlugin(drop_container, "dropdown");

        element.insertBefore(container);
        container.remove();
    }
};

$(document).on(Metro.events.click, function(){
    var selects = $(".select .drop-container");
    $.each(selects, function(){
        $(this).data('dropdown').close();
    });
});

Metro.plugin('select', Select);

